<script lang="ts">
  import type { InventoryItem, WebfishingSave } from "../game/types";
  import { isNotFish } from "../game/util";
  import Section from "../components/Section.svelte";
  import { randi } from "../game/util";
  import { string, int, real, array, customDict } from "../lib/godot";
  import type { GodotCustomDictionary } from "../lib/types";
  import Item from "../components/Item.svelte";

  export let save: WebfishingSave;

  function addItem() {
    const item: InventoryItem = {
      id: string("fishing_rod_simple"),
      quality: int(0),
      ref: int(randi()),
      size: real(1),
      tags: array([]),
      count: int(1)
    };
    save.value.inventory.value.push(customDict(item));
    save = save;
  }

  function removeItem(ref: number) {
    save.value.inventory.value = save.value.inventory.value.filter((item) => item.value.ref.value !== ref);

    // Clear hotbar - this type sucks lol
    const hotbarSlots = [
      save.value.hotbar.value["0"],
      save.value.hotbar.value["1"],
      save.value.hotbar.value["2"],
      save.value.hotbar.value["3"],
      save.value.hotbar.value["4"]
    ];
    for (const slot of hotbarSlots) {
      if (slot.value === ref) {
        slot.value = 0;
      }
    }

    // Clear aqua fish
    if (save.value.saved_aqua_fish.value.ref.value === ref) {
      save.value.saved_aqua_fish.value.ref.value = 0;
    }

    save = save;
  }

  const fishSort = (a: GodotCustomDictionary<InventoryItem>, b: GodotCustomDictionary<InventoryItem>) => {
    const ida = a.value.id.value;
    const idb = b.value.id.value;

    const x = isNotFish(a.value.id.value);
    const y = isNotFish(b.value.id.value);

    if (x && y) return 0;
    else if (x && !y) return -1;
    if (!x && y) return 1;
    else {
      if (ida === idb) return 0;
      else if (a.value.id.value === "luck_moneybag") return -1;
      else if (b.value.id.value === "luck_moneybag") return 1;
      else return 0;
    }
  };
  function sortFunction(
    sort: (a: GodotCustomDictionary<InventoryItem>, b: GodotCustomDictionary<InventoryItem>) => number
  ) {
    save.value.inventory.value.sort(sort).sort(fishSort);

    save = save;
  }
</script>

<Section title="Inventory">
  <div class="grid grid-cols-6 gap-4">
    {#each save.value.inventory.value as item, i (item)}
      <Item {i} {item} on:explode={() => removeItem(item.value.ref.value)} />
    {/each}
  </div>
  <button class="m-auto bg-accent hover:bg-accent-highlight rounded-lg py-4 px-2 text-3xl text-cream" on:click={addItem}
    >Add item</button
  >
</Section>
