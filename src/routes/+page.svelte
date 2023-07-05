<script lang="ts">
  import "../app.postcss";

  import iconAdd from "@iconify-icons/mdi/plus";
  import iconExport from "@iconify-icons/mdi/export";
  import iconFilter from "@iconify-icons/mdi/filter";
  import { slide } from "svelte/transition";
  import type { ComponentProps } from "svelte";
  import { browser } from "$app/environment";

  import type { colors, TaskData } from "./common";
  import Icon from "$lib/Icon.svelte";
  import Add from "./Add.svelte";
  import Task from "./Task.svelte";
  import PickColor from "./PickColor.svelte";

  let tasks: TaskData[] = [];
  let page = "";
  let prefillTask: ComponentProps<Add> | undefined;
  let filterColor: keyof typeof colors | undefined;

  if (browser) {
    const taskStr = localStorage.tasks;
    if (taskStr) {
      tasks = JSON.parse(taskStr);
    }
  }
  $: if (browser) {
    localStorage.tasks = JSON.stringify(tasks);
  }

  const runExport = () => {
    const tasksStr = tasks
      .map((task) =>
        JSON.stringify(task, null, 2).replace(/^\{\n/, "").replace(/\n\}$/, "").replace(/^  /gm, "")
      )
      .join("\n\n");
    navigator.clipboard.writeText("```js\n" + tasksStr + "```");
    alert("Copied to clipboard");
  };
</script>

<svelte:head>
  <title>School Tasks</title>
</svelte:head>

<p class="text-2xl mb-4">Tasks</p>
<div class="flex gap-4 mb-4">
  <button
    class="square action"
    class:action-selected={page == "add"}
    on:click={() => {
      if (page == "add") page = "";
      else page = "add";
    }}
  >
    <Icon icon={iconAdd} />
    <span class="mt-auto">Add</span>
  </button>
  <button
    class="square action"
    class:action-selected={page == "filter"}
    on:click={() => {
      if (page == "filter") page = "";
      else page = "filter";
    }}
  >
    <Icon icon={iconFilter} />
    <span class="mt-auto">Filter</span>
  </button>
  <button class="square action" on:click={runExport}>
    <Icon icon={iconExport} />
    <span class="mt-auto">Export</span>
  </button>
</div>
{#if page}
  <div transition:slide class="bg-gray-800 p-4 rounded-2xl mb-4">
    {#if page == "add"}
      <Add
        {...prefillTask}
        on:add={(e) => {
          const task = {
            subject: e.detail.subject,
            name: e.detail.name,
            date: e.detail.date,
            color: e.detail.color,
            tags: Object.keys(e.detail.tags)
              .filter((tag) => e.detail.tags[tag])
              .join(", "),
          };
          tasks = [...tasks, task];
          prefillTask = undefined;
          page = "";
        }}
      />
    {:else if page == "filter"}
      <p class="mb-2">Only show tasks the color</p>
      <PickColor optional={true} bind:value={filterColor} />
    {/if}
  </div>
{/if}
<div class="flex flex-wrap gap-2">
  {#each tasks as task, i}
    {#if filterColor ? task.color == filterColor : true}
      <Task
        subject={task.subject}
        name={task.name}
        date={task.date}
        color={task.color}
        tags={task.tags}
        on:edit={() => {
          prefillTask = {
            subject: task.subject,
            name: task.name,
            date: task.date,
            color: task.color,
          };
          page = "add";
          tasks = tasks.filter((t) => t != task);
        }}
        on:delete={() => {
          tasks = tasks.filter((t) => t != task);
        }}
        on:left={() => {
          tasks.splice(i, 1);
          tasks.splice(i - 1, 0, task);
          tasks = tasks;
        }}
        on:right={() => {
          tasks.splice(i, 1);
          tasks.splice(i + 1, 0, task);
          tasks = tasks;
        }}
      />
    {/if}
  {/each}
</div>

<style lang="postcss">
  .square {
    @apply w-24 h-24 p-4 flex flex-col items-start;
  }
  .action {
    @apply bg-slate-800 rounded-2xl text-xl transition-colors;
  }
  .action-selected {
    @apply bg-blue-800;
  }
</style>
