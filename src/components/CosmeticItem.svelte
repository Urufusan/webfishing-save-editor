<script lang="ts">
  import type { Thing, WebfishingSave } from "../game/types";
  import { string } from "../lib/godot";
  import { iconsDir } from "../lib/site";

  export let save: WebfishingSave;
  export let cosmeticItem: [id: string, cosmetic: Thing];

  const [id, cosmetic] = cosmeticItem;

  function setCosmetic(id: string) {
    if (save.value.cosmetics_unlocked.value.find((i) => i.value === id)) {
      save.value.cosmetics_unlocked.value = save.value.cosmetics_unlocked.value.filter((i) => i.value !== id);
      unlocked = false;
    } else {
      save.value.cosmetics_unlocked.value.push(string(id));
      unlocked = true;
    }
  }

  function setCosmeticWrapped(id: string, event: Event) {
    setCosmetic(id);
  }

  let unlocked = save.value.cosmetics_unlocked.value.find((i) => i.value === id) != null;
</script>

<div
  class="rounded-2xl bg-cream text-ui p-2 flex flex-col items-center gap-2 justify-between {unlocked
    ? ''
    : 'brightness-75'}"
>
  <img
    src={`${iconsDir}/${cosmetic.icon}`}
    alt={cosmetic.name}
    class="rendering-pixelated max-w-20"
    color={cosmetic.color}
    data-blendmode="multiply"
  />
  <h2 class="text-center">{cosmetic.name}</h2>
  <button
    class="py-2 px-4 bg-accent hover:bg-accent-highlight text-cream text-3xl rounded-lg"
    role="checkbox"
    id={`cosmetic-${id}`}
    aria-checked={unlocked}
    on:click={(e) => setCosmeticWrapped(id, e)}>{unlocked ? "unlocked" : "unlock"}</button
  >
</div>
