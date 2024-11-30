<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { iconsDir } from "../lib/site";
  import { items } from "../game/things";
  import { isNotFish } from "../game/util";
  import type { InventoryItem, Things } from "../game/types";
  import type { GodotCustomDictionary } from "../lib/types";

  const dispatch = createEventDispatcher();

  export let i: number;
  export let item: GodotCustomDictionary<InventoryItem>;

  const qualities = ["Normal", "Shining", "Glistening", "Opulent", "Radiant", "Alpha"];

  const categories: Record<string, Things> = {};
  Object.entries(items).forEach(([id, item]) => {
    categories[item.category] ??= {};

    categories[item.category][id] = item;
  });
</script>

<div
  role="listitem"
  class="rounded-2xl bg-cream text-ui p-2 flex flex-col items-center gap-2 justify-between hover:outline hover:outline-8 hover:outline-accent"
>
  <select class="h-8 pl-2 text-2xl rounded-md bg-white" bind:value={item.value.id.value}>
    {#each Object.entries(categories) as [category, categoryValues]}
      <optgroup class="not-italic" label={category}>
        {#each Object.keys(categoryValues) as id}
          <option value={id}>{items[id]?.name}</option>
        {/each}
      </optgroup>
    {/each}
  </select>
  <code class="w-full text-right overflow-auto">{item.value.id.value}</code>

  <img
    class="rendering-pixelated max-w-20"
    src={`${iconsDir}/${items[item.value.id.value]?.icon}`}
    alt={items[item.value.id.value]?.name}
  />

  <fieldset class="flex flex-col gap-2">
    <div class="flex flex-row justify-between">
      <label for={`item-${i}-quality`}>Quality</label>
      <select
        class="pl-2 text-2xl rounded-md bg-white disabled:brightness-75 disabled:cursor-not-allowed disabled:bg/40"
        disabled={isNotFish(item.value.id.value)}
        bind:value={item.value.quality.value}
        id={`item-${i}-quality`}
      >
        {#each qualities as quality, q}
          <option value={q}>{quality}</option>
        {/each}
      </select>
    </div>

    <div class="flex flex-row justify-between">
      <label for={`item-${i}-size`}>Size</label>
      <input
        class="disabled:brightness-75 disabled:cursor-not-allowed"
        disabled={isNotFish(item.value.id.value)}
        type="number"
        bind:value={item.value.size.value}
        id={`item-${i}-size`}
      />
    </div>

    {#if item.value.count}
      <div class="flex flex-row justify-between">
        <label for={`item-${i}-count`}>Count</label>
        <input
          type="number"
          disabled={!items[item.value.id.value].max_stacks}
          bind:value={item.value.count.value}
          id={`item-${i}-count`}
          min="0"
          max={items[item.value.id.value].max_stacks}
        />
      </div>
    {/if}
  </fieldset>

  <button class="py-2 px-4 text-cream bg-cancel hover:brightness-125 rounded-lg" on:click={() => dispatch("explode")}
    >Remove</button
  >
</div>
