<script lang="ts">
  import iconPlus from "@iconify-icons/mdi/plus";
  import { createEventDispatcher } from "svelte";
  import Icon from "$lib/Icon.svelte";
  import type { colors } from "./common";
  import PickColor from "./PickColor.svelte";

  export let subject = "";
  export let name = "";
  export let date = "";
  export let color: keyof typeof colors = "NONE";
  export let tags = {
    Easy: false,
    Online: false,
    "In class": false,
    Language: false,
    Test: false,
  };
  const dispatch = createEventDispatcher();
  $: tagNames = Object.keys(tags) as (keyof typeof tags)[];
</script>

<form
  class="flex gap-4 max-lg:flex-col"
  on:submit|preventDefault={() => dispatch("add", { subject, name, date, color, tags })}
>
  <div class="flex flex-col flex-1">
    <p>Name</p>
    <input bind:value={name} class="bg-gray-700 px-4 py-2 rounded-lg mt-2" />
  </div>
  <div class="flex flex-col flex-1">
    <p>Day</p>
    <input bind:value={date} type="date" class="bg-gray-700 px-4 py-2 rounded-lg mt-2" />
  </div>
  <div class="flex flex-col flex-1">
    <p>Subject</p>
    <input bind:value={subject} class="bg-gray-700 px-4 py-2 rounded-lg mt-2" />
  </div>
  <div class="flex flex-col flex-1">
    <p>Tags</p>
    <div class="flex gap-2 flex-wrap mt-2">
      {#each tagNames as tag}
        <input
          type="checkbox"
          id="tag-{tag}"
          class="opacity-0 absolute pointer-events-none"
          bind:checked={tags[tag]}
        />
        <label for="tag-{tag}" class="p-2 rounded-lg chip">
          {tag}
        </label>
      {/each}
    </div>
  </div>
  <div class="flex flex-col flex-1">
    <p>Color</p>
    <PickColor bind:value={color} />
  </div>
  <button class="self-start bg-blue-800 rounded-full p-2 -m-2">
    <Icon icon={iconPlus} />
  </button>
</form>

<style>
  .chip {
    background-color: #374151;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }
  input:focus + .chip {
    background-color: #4b5563;
  }
  input:checked + .chip {
    background-color: #1e3a8a;
  }
</style>
