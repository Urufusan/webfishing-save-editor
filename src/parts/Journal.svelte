<script lang="ts">
  import type { WebfishingSave } from "../game/types";
  import Section from "../components/Section.svelte";
  import JournalSection from "../components/JournalSection.svelte";
  import JournalTabs from "./JournalTabs.svelte";

  export let save: WebfishingSave;

  const sections = Object.keys(save.value.journal.value).filter((x) => !x.startsWith("_"));
</script>

<Section title="Journal">
  <div data-selected="lake" class="group bg-cream flex flex-col gap-8 rounded-2xl p-4 w-full">
    <JournalTabs {sections} />
    <div class="bg-content rounded-2xl p-4 h-[800px] overflow-auto scroll-accent">
      {#each sections as key}
        <JournalSection {save} sectionName={key} />
      {/each}
    </div>
  </div>
</Section>
