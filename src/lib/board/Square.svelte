<script lang="ts">
  import type { ITile } from "../utils/tile";

  export let cIndex: number; // 0-8
  export let tIndex: number; // 0-8

  export let highlighted: boolean = false;
  export let tile: ITile;
  export let onClick = () => {};

  const borderRight = cIndex % 3 === 2;
  const borderBottom = tIndex % 3 === 2;
  const lightColor = "#888";
  const solidColor = "#000";
</script>

<button
  class={`tile ${tile.input && highlighted && "highlighted"} ${
    ((tile.input && tile.value !== tile.input) || !tile.value) && "invalid"
  }`}
  on:click|preventDefault={onClick}
  style={`
  border-top: ${tIndex !== 0 ? "0px" : "2px"} solid ${solidColor};
  border-left: ${cIndex !== 0 ? "0px" : "2px"} solid ${solidColor};
  border-right: ${!borderRight ? "1px" : "2px"} solid ${
    !borderRight ? lightColor : solidColor
  };
  border-bottom: ${!borderBottom ? "1px" : "2px"} solid ${
    !borderBottom ? lightColor : solidColor
  };`}
>
  {#if tile.input}
    <div class={`value`}>{tile.input}</div>
  {:else}
    <div />
  {/if}
</button>

<style lang="scss">
  .tile {
    background-color: white;
    $width: min(3rem, calc((100vw / 9) - 1px));
    width: $width;
    height: $width;

    &.highlighted {
      background-color: var(--accent-color);
    }

    &.invalid {
      background-color: #ffb6c1;
    }

    .value {
      width: $width;
      height: $width;

      margin: 0;
      padding: 0.5rem;
      font-size: calc($width - 1rem);
      box-sizing: border-box;

      color: black;
    }
  }
</style>
