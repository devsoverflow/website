<script lang="ts">
  import { prog_langs, type ProgLang } from '@/configs/prog_langs';
  import { plogos_found } from '@/stores/plogos';
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  import LogoCard from './LogoCard.svelte';
  import { receive, send } from './transition';

  export let logosFound: Record<string, number>;

  type Logo = ProgLang & { count: number };

  const base_logos: Logo[] = [];
  for (const plang of prog_langs) {
    base_logos.push({ ...plang, count: 0 });
  }
  base_logos.sort((a, b) => a.name.localeCompare(b.name));

  let logos_found: Logo[] = [];
  let logos_not_found: Logo[] = [];

  function replace_with_rand(original:string) {
    const chars = '+ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < original.length; i++) {
      if (original[i] === ' ') {
        result += ' ';
      } else {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    return result;
  }

  function update_logos() {
    logos_found = [];
    logos_not_found = [];
    for (const logo of base_logos) {
      if (logo.id in logosFound) {
        logo.count = logosFound[logo.id]!;
        logos_found.push(logo);
      } else {
        logos_not_found.push(
          { ...logo,
            name: replace_with_rand(logo.name),
          }
        );
      }
    }
    logos_found = logos_found.sort((a, b) => b.count - a.count);
    logos_not_found = logos_not_found;
  }

  update_logos();

  onMount(() => {
    plogos_found.set(logosFound);

    const cu = plogos_found.subscribe((value) => {
      logosFound = value;
      update_logos();
    });

    return () => {
      cu();
    };
  });
</script>

<section class="space-y-4 py-8">
  <h2 class="text-2xl font-bold">Logos collection</h2>
  <div class="py-4">
    <h3 class="text-xl font-semibold">Found - {logos_found.length}</h3>
    <ul class="my-4 flex flex-wrap gap-6 px-4">
      {#each logos_found as logo (logo.id)}
        <li
          in:receive={{ key: logo.id }}
          out:send={{ key: logo.id }}
          animate:flip={{ duration: 200 }}
          class="w-48"
        >
          <LogoCard {logo} found count={logo.count} />
        </li>
      {/each}
    </ul>
  </div>
  <div class="py-4">
    <h3 class="text-xl font-semibold">To be found - {logos_not_found.length}</h3>
    <ul class="my-4 flex flex-wrap gap-6 px-4">
      {#each logos_not_found as logo (logo.id)}
        <li
          in:receive={{ key: logo.id }}
          out:send={{ key: logo.id }}
          animate:flip={{ duration: 200 }}
          class="w-48"
        >
          <LogoCard {logo} />
        </li>
      {/each}
    </ul>
  </div>
</section>
