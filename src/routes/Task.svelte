<script lang="ts">
  import iconEdit from "@iconify-icons/mdi/edit";
  import iconDelete from "@iconify-icons/mdi/delete";
  import iconLeft from "@iconify-icons/mdi/arrow-left";
  import iconRight from "@iconify-icons/mdi/arrow-right";
  import Icon from "$lib/Icon.svelte";
  import { colors } from "./common";
  import { createEventDispatcher } from "svelte";

  export let subject: string;
  export let name: string;
  export let date: string;
  export let color: keyof typeof colors;
  export let tags: string;
  const dispatch = createEventDispatcher();
</script>

<div class="p-4 rounded-2xl task-flex" style="background-color: {colors[color]};">
  <p class="font-bold">{subject}: {name}</p>
  <p>{date}</p>
  <p class="mb-6">{tags}</p>
  <div class="flex mt-auto">
    <button class="transition-colors hover:text-gray-300" on:click={() => dispatch("edit")}>
      <Icon icon={iconEdit} size={20} />
    </button>
    <button class="transition-colors hover:text-gray-300" on:click={() => dispatch("delete")}>
      <Icon icon={iconDelete} size={20} />
    </button>
    <button class="transition-colors hover:text-gray-300 ml-auto" on:click={() => dispatch("left")}>
      <Icon icon={iconLeft} size={20} />
    </button>
    <button class="transition-colors hover:text-gray-300" on:click={() => dispatch("right")}>
      <Icon icon={iconRight} size={20} />
    </button>
  </div>
</div>

<style>
  .task-flex {
    display: flex;
    flex-direction: column;
    flex: 1 1 24rem;
  }
</style>
