<script lang="ts">
  import IconInfo from '@/assets/icons/info.svg?raw';
  import type { ProgLang } from '@/configs/prog_langs';
  import { slide } from 'svelte/transition';
  import { hover3d } from './hover3d_effect';

  export let logo: ProgLang;
  export let found: boolean = false;
  export let count: number = 0;
</script>

<div
  use:hover3d={{
    glow: found
  }}
  class="
  my-card overflow-hidden rounded-lg
  px-4 py-3
  shadow-2xl
  "
  class:not-found={!found}
>
  <img src={logo.icon} alt={logo.name} class="size-full" class:not-found={!found} />
  <div class="my-4 flex min-h-16 flex-col justify-center">
    {#if found}
      <div class="flex justify-between">
        <p class="flex-1 text-lg font-bold capitalize text-neutral-content">{logo.name}</p>
        <a
          href={logo.homepage}
          target="_blank"
          rel="noopener noreferrer"
          class="flex size-5 font-semibold transition-transform hover:scale-105">{@html IconInfo}</a
        >
      </div>
      {#key count}
        <div in:slide={{ axis: 'y', duration: 500 }} class="mt-auto text-lg font-bold text-neutral-content">
          <span class="text-[0.6em]">X</span>
          {count}
        </div>
      {/key}
    {:else}
      <p class="w-full text-center text-lg font-bold capitalize text-neutral-content blur-sm">{logo.name}</p>
    {/if}
  </div>
</div>

<style>
  .my-card {
    background: linear-gradient(120deg, hsl(0, 85%, 5%) 20%, hsl(0, 85%, 25%));
    transition-duration: 300ms;
    transition-property: transform, box-shadow;
    transition-timing-function: ease-out;
    transform: rotate3d(0);
  }

  .my-card:hover {
    transition-duration: 150ms;
    box-shadow: 0 5px 20px 5px #00000044;
    z-index: 10;
  }

  .my-card.not-found {
    filter: grayscale(100%);
    transform: none !important;
  }

  .my-card.not-found:hover {
    transform: scale(1.025) !important;
  }

  :global(body) {
    perspective: 1500px;
  }
</style>
