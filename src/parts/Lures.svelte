<script lang="ts">
  import type { WebfishingSave } from "../game/types";
  import Section from "../components/Section.svelte";
  import { lures, baits } from "../game/lure";
  import { string } from "../lib/godot";
  import { iconsDir } from "../lib/site";

  export let save: WebfishingSave;

  function setLure(id: string, value: boolean) {
    if (save.value.lure_unlocked.value.find((i) => i.value === id)) {
      save.value.lure_unlocked.value = save.value.lure_unlocked.value.filter((i) => i.value !== id);
    } else {
      save.value.lure_unlocked.value.push(string(id));
    }
  }

  function setLureWrapped(id: string, event: Event) {
    setLure(id, (event.target as HTMLInputElement).checked);
  }

  function setBait(id: string, value: boolean) {
    if (save.value.bait_unlocked.value.find((i) => i.value === id)) {
      save.value.bait_unlocked.value = save.value.bait_unlocked.value.filter((i) => i.value !== id);
    } else {
      save.value.bait_unlocked.value.push(string(id));
    }
  }

  function setBaitWrapped(id: string, event: Event) {
    setBait(id, (event.target as HTMLInputElement).checked);
  }
</script>

<Section title="Baits & lures">
  <div class="rounded-2xl p-2 flex flex-col gap-2 flex-grow mt-12 bg-cream relative">
    <div class="absolute -top-12 left-0 text-accent text-3xl p-2 pb-4 w-40 bg-cream rounded-t-2xl">Baits</div>
    {#each Object.keys(baits) as bait, i}
      <div
        class="text-cream bg-accent w-full rounded-2xl flex flex-row gap-2 items-center px-4 relative z-10 hover:bg-accent-highlight"
      >
        <img src={`${iconsDir}/${baits[bait].icon}`} alt={baits[bait].name} class="icon" />
        <h2>{baits[bait].name}</h2>
        <span class="flex-grow"></span>
        <label for={`bait-${bait}`}>Unlocked</label>
        <input
          type="checkbox"
          id={`bait-${bait}`}
          checked={save.value.bait_unlocked.value.find((l) => l.value === bait) != null}
          on:change={(e) => setBaitWrapped(bait, e)}
        />
      </div>
    {/each}
  </div>

  <div class="rounded-2xl p-2 flex-grow mt-12 bg-cream relative">
    <div class="absolute -top-12 left-0 text-accent text-3xl p-2 pb-4 w-40 bg-cream rounded-t-2xl">Lures</div>
    <div class="overflow-auto max-h-[328px] flex flex-col gap-2 scroll-accent relative z-10">
      {#each Object.keys(lures) as lure, i}
        <div
          class="text-cream bg-accent w-full rounded-2xl flex flex-row gap-2 items-center px-4 hover:bg-accent-highlight"
        >
          <img src={`${iconsDir}/${lures[lure].icon}`} alt={lures[lure].name} class="icon" />
          <h2>{lures[lure].name}</h2>
          <span class="flex-grow"></span>
          <label for={`lure-${lure}`}>Unlocked</label>
          <input
            type="checkbox"
            id={`lure-${lure}`}
            checked={save.value.lure_unlocked.value.find((l) => l.value === lure) != null}
            on:change={(e) => setLureWrapped(lure, e)}
          />
        </div>
      {/each}
    </div>
  </div>
</Section>

<style>
  .icon {
    max-width: 3rem;
  }
</style>
