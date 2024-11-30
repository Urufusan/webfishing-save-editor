<script lang="ts">
  import type { Things, WebfishingSave } from "../game/types";
  import CosmeticItem from "./CosmeticItem.svelte";
  import KnotSeparator from "./KnotSeparator.svelte";

  export let categoryName: string;
  export let categoryValues: Record<string, Things>;
  export let save: WebfishingSave;
</script>

<div data-section={categoryName} class="hidden flex-col gap-4">
  {#each Object.entries(categoryValues) as [sectionName, sectionValues]}
    <div>
      <h2 class="text-cream mb-4">{sectionName}</h2>
      <div class="grid grid-cols-6 gap-4">
        {#each Object.entries(sectionValues) as cosmeticItem}
          <CosmeticItem {save} {cosmeticItem} />
        {/each}
      </div>
    </div>
    <KnotSeparator />
  {/each}
</div>
