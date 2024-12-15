<script lang="ts">
  export let sections: string[];
  export let sectionNames: Record<string, string> | null;

  let selected = sections[0];
  const fallback = selected;

  function changeTabs(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const section = target.dataset.targetsection;

    selected = section || fallback;
    const container = target.closest("[data-selected]") as HTMLElement;

    if (container) {
      container.dataset.selected = section || fallback;
    }
  }
</script>

<div class="flex flex-row gap-4 w-full">
  {#each sections as section}
    <button
      role="radio"
      data-targetsection={section}
      aria-checked={section === selected}
      class="aria-[checked=false]:brightness-75 bg-accent hover:bg-accent-highlight text-center text-cream rounded-lg py-1 flex-grow text-3xl"
      on:click={changeTabs}
    >
      {#if sectionNames}
        {sectionNames[section].toUpperCase()}
      {:else}
        {section.toUpperCase()}
      {/if}
    </button>
  {/each}
</div>
