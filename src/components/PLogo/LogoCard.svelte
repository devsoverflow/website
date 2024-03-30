<script lang="ts">
  import type { ProgLang } from '@/configs/prog_langs';
  import { hover3d } from './hover3d_effect';

  export let logo: ProgLang;
  export let found: boolean = true;
</script>

<div
  use:hover3d={{
    glow: found
  }}
  class="
  my-card w-64 rounded-lg overflow-hidden
  px-4 py-3
  sm:px-6 sm:py-4
  shadow-2xl
  "
  class:not-found={!found}
>
  <img src={logo.icon} alt={logo.name} class="size-full rounded-xl" class:not-found={!found} />
  <div class="flex h-16 items-center">
    <p class="w-full text-center text-xl font-bold text-base-100">
      {#if found}{logo.name}
      {:else}No encontrado{/if}
    </p>
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
    filter: grayscale(90%);
  }

  :global(body) {
    perspective: 1500px;
  }
</style>
