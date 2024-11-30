<script lang="ts">
  import type { JournalItem } from "../game/types";
  import { items } from "../game/things";
  import { int } from "../lib/godot";
  import { iconsDir } from "../lib/site";

  export let id: string;
  export let item: JournalItem;

  item.record.value = +item.record.value.toFixed(2); // resolves floating point errors

  const rarities = ["Normal", "Shining", "Glistening", "Opulent", "Radiant", "Alpha"];
  const rarityArray = [0, 1, 2, 3, 4, 5].map((r) => item.quality.value.find((q) => q.value === r) != null);

  function setRarity(rarity: number) {
    if (item.quality.value.find((q) => q.value === rarity)) {
      item.quality.value = item.quality.value.filter((q) => q.value !== rarity);
      rarityArray[rarity] = false;
    } else {
      item.quality.value.push(int(rarity));
      rarityArray[rarity] = true;
    }

    seen = rarityArray.some((r) => r);
  }

  function updateCount(event: Event) {
    const target = event.target as HTMLInputElement;
    item.count.value = parseInt(target.value, 10) || 0; // Ensure count is a valid number
  }

  let seen = rarityArray.some((r) => r);
</script>

<div class="bg-cream rounded-2xl p-4 flex flex-col {seen ? '' : 'brightness-75'}">
  <h2>{items[id]?.name || id}</h2>

  <!-- Rarity selection -->
  <div class="flex flex-row justify-between">
    {#each [0, 1, 2, 3, 4, 5] as rarity}
      <div>
        <button
          class="h-12 w-12 rounded-full aria-[checked=false]:brightness-50 data-[rarity=0]:bg-normal data-[rarity=1]:bg-shining data-[rarity=2]:bg-glistening data-[rarity=3]:bg-opulent data-[rarity=4]:bg-radiant data-[rarity=5]:bg-alpha"
          id={`journalItem-${id}-quality-${rarity}`}
          title={rarities[rarity]}
          data-rarity={rarity}
          role="switch"
          aria-checked={rarityArray[rarity]}
          aria-label={`Toggle rarity ${rarities[rarity]}`}
          on:click={(event) => setRarity(rarity)}
        />
      </div>
    {/each}
  </div>

  <img class="m-auto w-auto aspect-square" src={`${iconsDir}/${items[id].icon}`} alt={items[id].name} />

  <!-- Record display -->
  <div>
    <label for={`journalItem-${id}-record`}>Record</label>
    <input type="number" bind:value={item.record.value} id={`journalItem-${id}-record`} />
  </div>

  <!-- Count editing -->
  <div>
    <label for={`journalItem-${id}-count`}>Amount Caught</label>
    <input type="number" id={`journalItem-${id}-count`} bind:value={item.count.value} on:input={updateCount} min="0" />
  </div>
</div>
