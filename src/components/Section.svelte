<script lang="ts">
  export let title: string;
</script>

<details>
  <summary>{title}</summary>
  <div class="px-4 py-2 rounded-2xl bg-content flex flex-row flex-wrap gap-x-8 gap-y-4">
    <slot />
  </div>
</details>
