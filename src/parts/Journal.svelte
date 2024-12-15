<script lang="ts">
  import type { WebfishingSave } from "../game/types";
  import Section from "../components/Section.svelte";
  import JournalSection from "../components/JournalSection.svelte";
  import Tabs from "../components/Tabs.svelte";

  export let save: WebfishingSave;

  const sections = Object.keys(save.value.journal.value).filter((x) => !x.startsWith("_"));
  const sectionNames = {
    lake: "freshwater",
    ocean: "saltwater",
    rain: "rain",
    water_trash: "trash",
    alien: "alien",
    void: "void"
  };
</script>

<Section title="Journal">
  <div data-selected="lake" class="group bg-cream flex flex-col gap-8 rounded-2xl -my-2 p-4 w-full">
    <Tabs {sections} {sectionNames} />
    <div class="bg-content rounded-2xl p-4 h-[800px] overflow-auto scroll-accent">
      {#each sections as sectionName}
        <JournalSection {save} {sectionName} />
      {/each}
    </div>
  </div>
</Section>
