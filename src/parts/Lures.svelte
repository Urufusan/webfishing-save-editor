<script lang="ts">
  import type { WebfishingSave } from "../game/types";
  import Section from "../components/Section.svelte";
  import { lures, baits } from "../game/lure";
  import { iconsDir } from "../lib/site";
  import TackleboxItem from "../components/TackleboxItem.svelte";

  export let save: WebfishingSave;
</script>

<Section title="Baits & lures">
  <div class="rounded-2xl p-2 flex flex-col gap-2 flex-grow mt-12 bg-cream relative">
    <div class="absolute -top-12 left-0 text-accent text-3xl p-2 pb-4 w-40 bg-cream rounded-t-2xl">Baits</div>
    {#each Object.keys(baits) as key}
      <TackleboxItem {key} {save} type="bait" />
    {/each}
  </div>

  <div class="rounded-2xl p-2 flex-grow mt-12 bg-cream relative">
    <div class="absolute -top-12 left-0 text-accent text-3xl p-2 pb-4 w-40 bg-cream rounded-t-2xl">Lures</div>
    <div class="overflow-auto max-h-[328px] flex flex-col gap-2 scroll-accent relative z-10">
      {#each Object.keys(lures) as key}
        <TackleboxItem {key} {save} type="lure" />
      {/each}
    </div>
  </div>
</Section>
