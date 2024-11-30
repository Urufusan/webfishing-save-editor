<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { items } from "../game/things";
  import type { InventoryItem } from "../game/types";
  import type { GodotCustomDictionary } from "../lib/types";
  import { iconsDir } from "../lib/site";
  import ItemSelect from "./ItemSelect.svelte";

  const dispatch = createEventDispatcher();

  export let i: number;
  export let item: GodotCustomDictionary<InventoryItem>;
</script>

<div
  class="rounded-2xl bg-cream text-ui p-2 flex flex-col items-center gap-2 justify-between hover:outline hover:outline-8 hover:outline-accent"
>
  <ItemSelect {item} />
  <img
    class="rendering-pixelated max-w-20"
    src={`${iconsDir}/${items[item.value.id.value]?.icon}`}
    alt={items[item.value.id.value]?.name}
  />

  <fieldset class="grid">
    <div>
      <label for={`item-${i}-quality`}>Quality</label>
      <input type="number" bind:value={item.value.quality.value} id={`item-${i}-quality`} />
    </div>

    <div>
      <label for={`item-${i}-size`}>Size</label>
      <input type="number" bind:value={item.value.size.value} id={`item-${i}-size`} />
    </div>
  </fieldset>

  <button class="py-2 px-4 text-cream bg-cancel hover:brightness-125 rounded-lg" on:click={() => dispatch("explode")}
    >Remove</button
  >
</div>
