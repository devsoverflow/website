<script lang="ts">
  import { progLangs, type ProgLang } from '@configs/prog_langs';
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';

  export let user: import('lucia').User | null;

  export let randomize = false;

  /**
   * Rate of logo spawn in seconds
   */
  const RATE_BASE = 1;
  const RATE_UPTO_FACTOR = 1.5;

  const LOGO_SIZE = 96;
  const LOGO_OUTSIDE_TRESHOLD = LOGO_SIZE * 2;

  const AVOIDING_TRESHOLD = LOGO_SIZE * 1.5 + LOGO_SIZE / 2;
  const AVOIDING_FACTOR = 1;

  const EXPLOSION_DURATION = 0.8 * 1000;
  const EXPLOSION_FADE = 0.4 * 1000;
  const EXPLOSION_SIZE = LOGO_SIZE * 1.5;

  type SpawnSide = 'top' | 'right' | 'bottom' | 'left';

  type Logo = {
    idx: number;
    data: ProgLang;
    clicked: boolean;
    avoiding: boolean;
    path: string;
    initial: {
      pos: { x: number; y: number; z: number };
      dir: { x: number; y: number };
      speed: number;
      side: SpawnSide;
    };
    pos: { x: number; y: number; z: number };
    dir: { x: number; y: number };
    speed: number;
    html: string;
  };

  function init_logos(langs: ProgLang[]) {
    if (randomize) {
      langs.sort(() => Math.random() - 0.5);
    }

    const logos: Logo[] = [];
    for (let i = 0; i < langs.length; i++) {
      const lang = langs[i]!;
      logos.push({
        idx: i,
        data: lang,
        clicked: false,
        avoiding: false,
        path: lang.icon,
        initial: {
          pos: { x: 0, y: 0, z: 0 },
          dir: { x: 0, y: 0 },
          speed: 0,
          side: 'top'
        },
        pos: { x: 0, y: 0, z: 0 },
        dir: { x: 0, y: 0 },
        speed: 0,
        html: ''
      });
    }

    return logos;
  }

  const logos: Logo[] = init_logos([...progLangs]);

  let current_logo: Logo = logos[0]!;
  let logo_el: HTMLDivElement;
  let updateId: number;
  let nextLogoId: ReturnType<typeof setTimeout>;
  let cursor = { x: 0, y: 0, active: false };
  let exploding = false;
  let explosionId: ReturnType<typeof setTimeout>;
  let audio: HTMLAudioElement;

  let clicks = user?.logosClicked ?? 0;

  const sides = ['top', 'right', 'bottom', 'left'] as SpawnSide[];

  function pick_random<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)] as T;
  }

  function rand_range(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  function rand_range_int(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function init_logo_from_side(logo: Logo, side: SpawnSide) {
    switch (side) {
      case 'top':
        logo.dir.x = rand_range(-0.75, 0.75);
        logo.dir.y = rand_range(0.25, 1);
        logo.pos.x = Math.floor(Math.random() * window.innerWidth);
        logo.pos.y = -LOGO_SIZE * 2;
        break;
      case 'right':
        logo.dir.x = rand_range(-1, -0.25);
        logo.dir.y = rand_range(-0.75, 0.75);
        logo.pos.x = window.innerWidth + LOGO_SIZE;
        logo.pos.y = Math.floor(Math.random() * window.innerHeight);
        break;
      case 'bottom':
        logo.dir.x = rand_range(-0.75, 0.75);
        logo.dir.y = rand_range(-1, -0.25);
        logo.pos.x = Math.floor(Math.random() * window.innerWidth);
        logo.pos.y = window.innerHeight + LOGO_SIZE;
        break;
      case 'left':
        logo.dir.x = rand_range(0.25, 1);
        logo.dir.y = rand_range(-0.75, 0.75);
        logo.pos.x = -LOGO_SIZE;
        logo.pos.y = Math.floor(Math.random() * window.innerHeight);
        break;
    }
    logo.pos.z = rand_range(0.25, 1);
    logo.speed = 1 + rand_range(0.25, 1) * logo.pos.z;

    logo.initial.dir.x = logo.dir.x;
    logo.initial.dir.y = logo.dir.y;
    logo.initial.pos.x = logo.pos.x;
    logo.initial.pos.y = logo.pos.y;
    logo.initial.pos.z = logo.pos.z;
    logo.initial.speed = logo.speed;
    logo.initial.side = side;
  }

  function is_off_screen(logo: Logo): boolean {
    switch (logo.initial.side) {
      case 'top':
        return (
          logo.pos.x < -LOGO_OUTSIDE_TRESHOLD ||
          logo.pos.x > window.innerWidth + LOGO_OUTSIDE_TRESHOLD ||
          logo.pos.y > window.innerHeight + LOGO_OUTSIDE_TRESHOLD
        );
      case 'right':
        return (
          logo.pos.x < -LOGO_OUTSIDE_TRESHOLD ||
          logo.pos.y < -LOGO_OUTSIDE_TRESHOLD ||
          logo.pos.y > window.innerHeight + LOGO_OUTSIDE_TRESHOLD
        );
      case 'bottom':
        return (
          logo.pos.y < -LOGO_OUTSIDE_TRESHOLD ||
          logo.pos.x <= -LOGO_OUTSIDE_TRESHOLD ||
          logo.pos.x >= window.innerWidth
        );
      case 'left':
        return (
          logo.pos.x >= window.innerWidth || logo.pos.y <= -LOGO_OUTSIDE_TRESHOLD || logo.pos.y >= window.innerHeight
        );
    }
  }

  function schedule_next_logo() {
    cancelAnimationFrame(updateId);
    clearTimeout(nextLogoId);
    setTimeout(dropLogo, rand_range_int(RATE_BASE, RATE_BASE * RATE_UPTO_FACTOR) * 1000);
  }

  function dropLogo() {
    const idx = (current_logo.idx + 1) % logos.length;
    current_logo = logos[idx]!;
    current_logo.clicked = false;
    current_logo.avoiding = false;
    init_logo_from_side(current_logo, pick_random(sides));
    logo_el.style.setProperty('--size', `${LOGO_SIZE * current_logo.pos.z}px`);
    logo_el.style.filter = `brightness(${current_logo.pos.z})`;
    logo_el.style.fill = current_logo.data.color;
    update_logo();
  }

  function update_logo() {
    const dx = cursor.x - current_logo.pos.x;
    const dy = cursor.y - current_logo.pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > AVOIDING_TRESHOLD || current_logo.clicked) {
      if (current_logo.avoiding && !current_logo.clicked) {
        current_logo.avoiding = false;
        current_logo.dir.x = current_logo.initial.dir.x;
        current_logo.dir.y = current_logo.initial.dir.y;
        current_logo.speed = current_logo.initial.speed;
      }
    } else {
      current_logo.avoiding = true;
      current_logo.dir.x = (dx / dist) * -1;
      current_logo.dir.y = (dy / dist) * -1;
      current_logo.speed =
        (1 / (dist / (AVOIDING_TRESHOLD * AVOIDING_FACTOR))) * current_logo.initial.speed * current_logo.initial.speed;
    }
    current_logo.pos.x += current_logo.dir.x * current_logo.pos.z * current_logo.speed;
    current_logo.pos.y += current_logo.dir.y * current_logo.pos.z * current_logo.speed;
    logo_el.style.transform = `translate(${current_logo.pos.x}px, ${current_logo.pos.y}px)`;

    if (!current_logo.avoiding && is_off_screen(current_logo)) {
      schedule_next_logo();
    } else {
      updateId = requestAnimationFrame(update_logo);
    }
  }

  function on_loco_click(e: Event) {
    e.preventDefault();
    if (current_logo.clicked) {
      return;
    }

    exploding = true;
    current_logo.clicked = true;
    audio.play().catch(() => void 0);
    audio.playbackRate = 1.25;
    explosionId = setTimeout(() => {
      exploding = false;
      schedule_next_logo();
    }, EXPLOSION_DURATION);

    fetch(`/api/v1/user/prog_langs/clicked?id=${current_logo.data.id}`, { method: 'POST' })
      .then((res) => {
        if (!res.ok) {
          console.error('Failed to update user clicked logos');
          return;
        }
        clicks += 1;
      })
      .catch((err) => {
        console.error('Failed to update user clicked logos', err);
      });
  }

  onMount(() => {
    if (!user) {
      return;
    }

    let clear_touch_id: ReturnType<typeof setTimeout>;
    function on_mouse_move(e: MouseEvent) {
      cursor.x = e.clientX;
      cursor.y = e.clientY;

      // @ts-expect-error - sourceCapabilities is not in the type definition
      if ('sourceCapabilities' in e && e.sourceCapabilities.firesTouchEvents) {
        clearTimeout(clear_touch_id);
        clear_touch_id = setTimeout(() => {
          cursor.active = false;
          cursor.x = Number.MAX_SAFE_INTEGER;
          cursor.y = Number.MAX_SAFE_INTEGER;
        }, 250);
      }
    }

    function on_mouse_enter(e: MouseEvent) {
      cursor.active = true;
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    }

    function on_mouse_leave(_e: MouseEvent) {
      cursor.active = false;
      cursor.x = Number.MAX_SAFE_INTEGER;
      cursor.y = Number.MAX_SAFE_INTEGER;
    }

    document.addEventListener('mousemove', on_mouse_move);
    document.addEventListener('mouseenter', on_mouse_enter);
    document.addEventListener('mouseleave', on_mouse_leave);

    schedule_next_logo();

    audio = new Audio('/prog_langs/despacito.wav');

    return () => {
      document.removeEventListener('mousemove', on_mouse_move);
      document.removeEventListener('mouseenter', on_mouse_enter);
      document.removeEventListener('mouseleave', on_mouse_leave);
      cancelAnimationFrame(updateId);
      clearTimeout(nextLogoId);
      clearTimeout(explosionId);
    };
  });
</script>

<div class="pointer-events-none fixed inset-0 z-10 overflow-hidden">
  {#if user && current_logo}
    <div
      class="
      absolute
      -left-[calc(var(--size,96px)/2)]
      -top-[calc(var(--size,96px)/2)]
      size-[var(--size,96px)]
      select-none"
      bind:this={logo_el}
      hidden={current_logo.clicked}
    >
      <button on:pointerdown={on_loco_click} tabindex="-1" class="pointer-events-auto relative size-full select-none">
        <!-- {@html current_logo.html} -->
        <img
          src={current_logo.path}
          alt="Logo de {current_logo.data.name}"
          class="size-full"
          draggable="false"
          style="fill: {current_logo.data.color}"
        />
      </button>
    </div>
    <!-- a text buble that says Ahhh -->
    {#if !current_logo.clicked && current_logo.avoiding}
      <div
        class="absolute -top-[calc(var(--size,96px)*0.5)] left-[calc(var(--size)*0.5)]"
        style="transform: translate({current_logo.pos.x}px, {current_logo.pos.y}px); --size: {LOGO_SIZE *
          current_logo.pos.z}px;"
      >
        <div class="-ml-2 -mt-6 rounded-lg bg-neutral-50 p-2 shadow-lg">
          <p class="text-sm font-bold text-neutral-950">Ahhh!</p>
        </div>
      </div>
    {/if}

    {#if current_logo.clicked && exploding}
      <div
        class="
          pointer-events-none
          absolute
          -left-[calc(var(--size,96px)/2)]
          -top-[calc(var(--size,96px)/2)]
          grid size-[var(--size,96px)]
          select-none
          place-items-center"
        out:fade={{ duration: EXPLOSION_FADE }}
        style="
        transform: translate({current_logo.pos.x}px, {current_logo.pos.y}px);
        --size: {EXPLOSION_SIZE * current_logo.pos.z}px;"
      >
        <img src="/prog_langs/pum.gif" alt="Explosion" class="size-[150%]" draggable="false" />
      </div>
    {/if}
    <!-- center point -->
    <!-- <div
      class="bg-fuchsia-500 size-1 -top-px -left-px absolute"
      style="transform: translate({current_logo.pos.x}px, {current_logo.pos.y}px);"
    ></div> -->
  {/if}
</div>

{#if import.meta.env.DEV}
  <div class="absolute bottom-12 right-2">
    <button
      on:click={() => {
        schedule_next_logo();
        clicks += 1;
      }}
      class="rounded-lg bg-neutral-50 p-2 font-bold text-neutral-950 shadow-lg"
    >
      Next
    </button>
    <!-- <code><pre>{JSON.stringify({ current_logo, cursor }, null, 2)}</pre></code> -->
  </div>
{/if}

{#if clicks > 0}
  <div class="pointer-events-none absolute bottom-0 right-0">
    <p class="inline-block p-2 text-end text-2xl font-bold !leading-none sm:text-4xl">
      <span class="inline-block font-mono text-[1em]">&nbsp;</span>
      <span class="text-[0.5em]">X </span>{#key clicks}
        <span in:slide={{ axis: 'y' }} class="inline-block font-mono text-[1em]">{clicks}</span>
      {/key}
    </p>
  </div>
{/if}
