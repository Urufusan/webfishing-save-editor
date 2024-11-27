<script lang="ts">
  export let sections: string[];

  let selected = "lake";

  const sectionNames: Record<string, string> = {
    lake: "Freshwater",
    ocean: "Saltwater",
    rain: "Rain",
    water_trash: "Trash",
    alien: "Alien",
    void: "Void"
  };

  function changeTabs(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const section = target.dataset.section;

    selected = section || "lake";
    const container = target.closest("[data-selected]") as HTMLElement;

    if (container) {
      container.dataset.selected = section || "lake";
    }
  }
</script>

<div class="flex flex-row gap-4 w-full">
  {#each sections as section}
    <button
      role="radio"
      data-section={section}
      aria-checked={section === selected}
      class="aria-[checked=false]:brightness-75 bg-accent hover:bg-accent-highlight text-center text-cream rounded-lg py-1 flex-grow text-3xl"
      on:click={changeTabs}>{sectionNames[section]}</button
    >
  {/each}
</div>
