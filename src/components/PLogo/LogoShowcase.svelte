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

<section>
  <h2>Logos</h2>
  <p>Logos encontrados</p>
  <ul class="flex flex-wrap gap-4">
    {#each logos_found as logo (logo.id)}
      <li in:receive={{ key: logo.id }} out:send={{ key: logo.id }} animate:flip={{ duration: 200 }}>
        <LogoCard {logo} found />
      </li>
    {/each}
  </ul>
  <p>Logos no encontrados</p>
  <ul class="grid grid-cols-3 gap-4">
    {#each logos_not_found as logo (logo.id)}
      <li in:receive={{ key: logo.id }} out:send={{ key: logo.id }} animate:flip={{ duration: 200 }}>
        <LogoCard {logo} found={false} />
      </li>
    {/each}
  </ul>
</section>
