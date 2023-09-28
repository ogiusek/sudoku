<script lang="ts">
  import type { ITile } from "../utils/tile";
  import Number from "./Number.svelte";

  export let number: number;
  export let board: ITile[][];

  export let handleClick = (val: number) => {
    number = val;
  };

  let numbersFound: number[] = Array(10)
    .fill(0)
    .map(() => 0);

  $: (() => {
    for (let i = 0; i < numbersFound.length; i++) numbersFound[i] = 0;

    for (let i = 0; i < 81; i++)
      numbersFound[board[i % 9][Math.floor(i / 9)].input] += 1; // @ts-ignore
    numbersFound = numbersFound.map((e) => (e === 9) + 0);
  })();
</script>

<ul>
  <li class={`${numbersFound[1] && "fullfield"}`}>
    <Number bind:selectedValue={number} value={1} {handleClick} />
  </li>
  <li class={`${numbersFound[2] && "fullfield"}`}>
    <Number bind:selectedValue={number} value={2} {handleClick} />
  </li>
  <li class={`${numbersFound[3] && "fullfield"}`}>
    <Number bind:selectedValue={number} value={3} {handleClick} />
  </li>

  <li class={`${numbersFound[4] && "fullfield"}`}>
    <Number bind:selectedValue={number} value={4} {handleClick} />
  </li>
  <li class={`${numbersFound[5] && "fullfield"}`}>
    <Number bind:selectedValue={number} value={5} {handleClick} />
  </li>
  <li class={`${numbersFound[6] && "fullfield"}`}>
    <Number bind:selectedValue={number} value={6} {handleClick} />
  </li>

  <li class={`${numbersFound[7] && "fullfield"}`}>
    <Number bind:selectedValue={number} value={7} {handleClick} />
  </li>
  <li class={`${numbersFound[8] && "fullfield"}`}>
    <Number bind:selectedValue={number} value={8} {handleClick} />
  </li>
  <li class={`${numbersFound[9] && "fullfield"}`}>
    <Number bind:selectedValue={number} value={9} {handleClick} />
  </li>
</ul>

<style lang="scss">
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;

    padding: 0;

    li {
      list-style: none;

      &.fullfield {
        pointer-events: none;
        opacity: 0;
      }
    }
  }
</style>
