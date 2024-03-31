<script lang="ts">
  import { prog_langs, type ProgLang } from '@/configs/prog_langs';
  import { plogos_found } from '@/stores/plogos';
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  import LogoCard from './LogoCard.svelte';
  import { receive, send } from './transition';

  export let found_ids: Set<string>;

  let logos_found: ProgLang[] = [];
  let logos_not_found: ProgLang[] = [];
  function update_logos() {
    logos_found = [];
    logos_not_found = [];
    console.log('found_ids', ...found_ids);
    for (const logo of prog_langs) {
      if (found_ids.has(logo.id)) {
        logos_found.push(logo);
      } else {
        logos_not_found.push(logo);
      }
    }
    logos_found = logos_found;
    logos_not_found = logos_not_found;
    console.log('logos_found', logos_found);
    console.log('logos_not_found', logos_not_found);
  }
  update_logos();
  // $: {
  //   logos_found = [];
  //   logos_not_found = [];
  //   for (const logo of prog_langs) {
  //     if ($plogos_found.has(logo.id)) {
  //       logos_found.push(logo);
  //     }
  //     else {
  //       logos_not_found.push(logo);
  //     }
  //   }
  // }

  onMount(() => {
    plogos_found.set(found_ids);

    const cu = plogos_found.subscribe((value) => {
      console.log('value', value);
      found_ids = value;
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
          class="w-48 md:w-56"
        >
          <LogoCard {logo} found />
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
          class="w-48 md:w-56"
        >
          <LogoCard {logo} found={false} />
        </li>
      {/each}
    </ul>
  </div>
</section>
