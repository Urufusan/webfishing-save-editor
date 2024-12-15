<script lang="ts">
  let className = "";
  export { className as class };

  let clientX: Number, clientY: Number, state: boolean;

  function showPopover() {
    state = true;
  }
  function hidePopover() {
    state = false;
  }

  function updatePosition(event: MouseEvent) {
    clientX = event.clientX + 16;
    clientY = event.clientY + 16;
  }
</script>

<svelte:window on:mousemove={updatePosition} />
<div
  class={className}
  on:mouseover={showPopover}
  on:mouseout={hidePopover}
  role="region"
  on:focus={null}
  on:blur={null}
>
  <div role="tooltip" class="fixed z-20 {state ? '' : 'hidden'}" style={`top: ${clientY}px; left: ${clientX}px`}>
    <slot name="popover" />
  </div>

  <slot />
</div>
