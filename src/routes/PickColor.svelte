<script lang="ts">
  import { colors } from "./common";
  export let value: keyof typeof colors | undefined;
  export let optional = false;
  $: colorData = Object.entries(colors) as [keyof typeof colors, string][];
</script>

<div class="flex gap-2">
  {#if optional}
    <button
      class="dot flex items-center justify-center overflow-hidden text-sm"
      class:dot-selected={undefined == value}
      type="button"
      on:click={() => (value = undefined)}
    >
      ALL
    </button>
  {/if}
  {#each colorData as [color, hex]}
    <button
      class="dot"
      style="background-color: {hex}"
      class:dot-selected={color == value}
      type="button"
      on:click={() => (value = color)}
    />
  {/each}
</div>

<style lang="postcss">
  .dot {
    @apply w-6 h-6 rounded-full border border-white/20 transition-colors;
  }
  .dot-selected {
    @apply border-white;
  }
</style>
