<script lang="ts">
  import type { Things, WebfishingSave } from "../game/types";
  import Section from "../components/Section.svelte";
  import { cosmetics } from "../game/things";
  import Tabs from "../components/Tabs.svelte";
  import CosmeticSection from "../components/CosmeticSection.svelte";

  export let save: WebfishingSave;

  // These are cosmetics the developer gave to their friends with specific Steam IDs
  // These mean something to the people who have them - don't be an asshole
  let blockedCosmetics = [
    "title_stupididiotbaby",
    "title_imnormal",
    "title_bipedalanimaldrawer",
    "pcolor_west",
    "title_lamedev_real",
    "title_cadaverdog"
  ];

  const filteredCosmetics = Object.entries(cosmetics).filter(([id, cosmetic]) => !blockedCosmetics.includes(id));
  const cosmeticSections: Record<string, Things> = {
    species: {},
    pattern: {},
    primary_color: {},
    secondary_color: {},
    tail: {},
    eye: {},
    nose: {},
    mouth: {},
    hat: {},
    undershirt: {},
    overshirt: {},
    legs: {},
    accessory: {},
    title: {},
    bobber: {}
  };

  filteredCosmetics.forEach(([id, cosmetic]) => {
    cosmeticSections[cosmetic.category][id] = cosmetic;
  });

  const structuredCosmetics: Record<string, Record<string, Things>> = {
    body: {
      species: cosmeticSections.species,
      pattern: cosmeticSections.pattern,
      "primary color": cosmeticSections.primary_color,
      "secondary color": cosmeticSections.secondary_color,
      tail: cosmeticSections.tail
    },
    face: {
      eyes: cosmeticSections.eye,
      nose: cosmeticSections.nose,
      mouth: cosmeticSections.mouth
    },
    clothes: {
      hat: cosmeticSections.hat,
      undershirt: cosmeticSections.undershirt,
      overshirt: cosmeticSections.overshirt,
      legs: cosmeticSections.legs,
      "accessories [max 4]": cosmeticSections.accessory
    },
    misc: {
      title: cosmeticSections.title,
      bobber: cosmeticSections.bobber
    }
  };

  const sections = Object.keys(structuredCosmetics);
</script>

<Section title="Cosmetics">
  <div data-selected="body" class="group bg-cream flex flex-col gap-8 rounded-2xl -my-2 p-4 w-full">
    <Tabs {sections} sectionNames={null} />
    <div class="bg-content rounded-2xl p-4 h-[800px] overflow-auto scroll-accent">
      {#each Object.entries(structuredCosmetics) as [categoryName, categoryValues]}
        <CosmeticSection {categoryName} {categoryValues} {save} />
      {/each}
    </div>
  </div>
</Section>
