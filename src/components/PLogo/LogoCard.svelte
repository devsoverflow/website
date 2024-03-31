<script lang="ts">
  import IconInfo from '@/assets/icons/info.svg?raw';
  import type { ProgLang } from '@/configs/prog_langs';
  import { hover3d } from './hover3d_effect';

  export let logo: ProgLang;
  export let found: boolean = true;
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
  <img src={logo.icon} alt={logo.name} class="size-full rounded-xl" class:not-found={!found} />
  <div class="my-4 flex min-h-16 flex-col justify-center">
    {#if found}
      <div class="flex justify-between">
        <p class="flex-1 text-lg font-bold capitalize text-neutral-content">{logo.name}</p>
        <a
          href={logo.homepage}
          target="_blank"
          rel="noopener noreferrer"
          class="flex font-semibold underline hover:underline-offset-4"
          ><span class="hover:white size-full">{@html IconInfo}</span></a
        >
      </div>
      <div class="mt-auto text-lg font-bold text-neutral-content"><span class="text-base">x</span> {count}</div>
    {:else}
      <p class="w-full text-center text-lg font-bold text-neutral-content">Not found</p>
    {/if}
  </div>
</div>

<style>
  .my-card {
    background: linear-gradient(120deg, hsl(0, 85%, 5%) 20%, hsl(0, 85%, 25%));
    /* box-shadow: 0 1px 5px #000000; */
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
    filter: grayscale(75%);
    transform: scale(1.025) !important;
  }

  :global(body) {
    perspective: 1500px;
  }
</style>
