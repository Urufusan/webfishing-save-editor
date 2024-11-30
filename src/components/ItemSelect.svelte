<script lang="ts">
  import type { GodotCustomDictionary } from "../lib/types";
  import type { InventoryItem, Things } from "../game/types";
  import { items } from "../game/things";
  import { string } from "../lib/godot";

  export let item: GodotCustomDictionary<InventoryItem>;

  const categories: Record<string, Things> = {};
  Object.entries(items).forEach(([id, item]) => {
    categories[item.category] ??= {};

    categories[item.category][id] = item;
  });
</script>

<select class="text-2xl rounded-md bg-white" bind:value={item.value.id.value}>
  {#each Object.entries(categories) as [category, categoryValues]}
    <optgroup class="not-italic" label={category}>
      {#each Object.keys(categoryValues) as id}
        <option value={id}>{items[id]?.name}</option>
      {/each}
    </optgroup>
  {/each}
</select>
