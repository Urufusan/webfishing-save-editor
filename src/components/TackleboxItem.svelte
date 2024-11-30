<script lang="ts">
  import type { Thing, WebfishingSave } from "../game/types";
  import { iconsDir } from "../lib/site";
  import { string } from "../lib/godot";
  import { lures, baits } from "../game/lure";

  export let key: string;
  export let save: WebfishingSave;
  export let type: string;

  const item = { ...lures, ...baits }[key];

  function setLure(id: string, value: boolean) {
    if (save.value.lure_unlocked.value.find((i) => i.value === id)) {
      save.value.lure_unlocked.value = save.value.lure_unlocked.value.filter((i) => i.value !== id);
      unlocked = false;
    } else {
      save.value.lure_unlocked.value.push(string(id));
      unlocked = true;
    }
  }

  function setLureWrapped(id: string, event: Event) {
    setLure(id, (event.target as HTMLInputElement).checked);
  }

  function setBait(id: string, value: boolean) {
    if (save.value.bait_unlocked.value.find((i) => i.value === id)) {
      save.value.bait_unlocked.value = save.value.bait_unlocked.value.filter((i) => i.value !== id);
      unlocked = false;
    } else {
      save.value.bait_unlocked.value.push(string(id));
      unlocked = true;
    }
  }

  function setBaitWrapped(id: string, event: Event) {
    setBait(id, (event.target as HTMLInputElement).checked);
  }

  let unlocked =
    (type === "lure" && save.value.lure_unlocked.value.find((l) => l.value === key) != null) ||
    (type === "bait" && save.value.bait_unlocked.value.find((l) => l.value === key) != null);
</script>

<div
  class="text-cream bg-accent w-full rounded-2xl flex flex-row gap-2 items-center px-4 hover:bg-accent-highlight relative z-10 {unlocked
    ? ''
    : 'brightness-75'}"
>
  <img src={`${iconsDir}/${item.icon}`} alt={item.name} class="max-w-12" />
  <h2>{item.name}</h2>
  <span class="flex-grow"></span>
  <label class="cursor-pointer" for={`${type}-${key}`}>Unlocked</label>
  {#if type === "lure"}
    <input
      type="checkbox"
      id={`lure-${key}`}
      class="cursor-pointer"
      checked={save.value.lure_unlocked.value.find((l) => l.value === key) != null}
      on:change={(e) => setLureWrapped(key, e)}
    />
  {/if}
  {#if type === "bait"}
    <input
      type="checkbox"
      id={`bait-${key}`}
      class="cursor-pointer"
      checked={save.value.bait_unlocked.value.find((l) => l.value === key) != null}
      on:change={(e) => setBaitWrapped(key, e)}
    />
  {/if}
</div>
