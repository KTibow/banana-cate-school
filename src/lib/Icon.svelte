<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  export let icon: IconifyIcon;
  export let size = 24;
</script>

<svg width={size} height={size} viewBox="0 0 {icon.width} {icon.height}">{@html icon.body}</svg>
