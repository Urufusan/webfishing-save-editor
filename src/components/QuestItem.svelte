<script lang="ts">
  import { iconsDir } from "../lib/site";
  import type { Thing } from "../game/types";
  import things from "../game/things";
  import Popover from "./Popover.svelte";

  export let quest: {
    title: string;
    tier: number;
    action: string;
    gold_reward: number;
    xp_reward: number;
    rewards: { value: string; flags?: number }[];
    goal_id: string;
    icon: string;
    progress: number;
    max_level: number;
    hidden: boolean;
    goal_amt: number;
    goal_array: { value: number; flags?: number }[];
    flags: number[];
  };
  export let questId: string;
  export let updateProgress: (progress: number) => void;

  function handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    updateProgress(parseInt(input.value, 10));
  }

  function localizeIcon(icon: string) {
    if (icon.includes("void")) return "fish_void_voidfish.gif";
    else return icon.split("/").pop();
  }

  const rewards = quest.rewards.values().drop(quest.tier);
  const reward = rewards.next().value?.value;
  let rewardItem: Thing;

  reward && (rewardItem = things[reward]);
</script>

<Popover
  class="bg-cream flex-grow flex flex-row items-center relative rounded-full hover:outline hover:outline-8 hover:outline-accent"
>
  <span class="bg-accent text-cream absolute text-3xl -top-1 -left-2 px-5 rounded-full">{quest.tier + 1}</span>

  <figure class="h-32 w-32 flex justify-center items-center ml-8">
    <img class="max-h-32" src={`${iconsDir}/${localizeIcon(quest.icon)}`} alt={quest.title} />
  </figure>

  <span class="w-1/6"></span>

  <div class="w-1/2 flex flex-col gap-4">
    <h2 class="questTitle">{quest.title}</h2>
    <figure
      class="text-xl text-center text-cream bg-ui rounded-xl relative overflow-clip h-12 flex flex-row justify-center items-center"
    >
      <div
        class="rounded-xl left-0 bg-accent absolute h-full z-0"
        style={`width:${(quest.progress * 100) / quest.goal_amt}%`}
      ></div>
      <div class="relative z-10">
        <label for={`quest-progress-${questId}`}>Edit Progress:</label>
        <input
          type="number"
          on:input={handleInput}
          bind:value={quest.progress}
          min="0"
          max={quest.goal_amt}
          on:input={handleInput}
        />
        / {quest.goal_amt}
      </div>
    </figure>
  </div>

  <div class="flex flex-row flex-grow justify-end gap-2 mr-8 mb-4 self-end">
    {#if reward}
      <div class="bg-accent text-cream text-3xl px-5 rounded-full">
        <img class="h-9" src={`${iconsDir}/${rewardItem.icon}`} alt={rewardItem.name} />
      </div>
    {/if}
    <div class="bg-accent text-cream text-3xl px-5 rounded-full">${quest.gold_reward}</div>
  </div>

  <div slot="popover" class="bg-cream rounded-2xl p-4 ring-2 ring-content">
    <h2>Quest Rewards:</h2>
    <p class="text-xl">${quest.gold_reward}</p>
    <p class="text-xl">{quest.xp_reward}xp</p>
    {#if rewardItem}
      <p class="text-xl">{rewardItem.name}</p>
    {/if}
  </div>
</Popover>
