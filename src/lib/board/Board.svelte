<script lang="ts">
  import type { ITile } from "../utils/tile";
  import Square from "./Square.svelte";

  export let board: ITile[][];
  export let handleTileClick: (x: number, y: number) => any;
  export let highlighted: number;
</script>

<div class="board">
  {#each board as column, cIndex}
    <div class="column">
      {#each column as tile, tIndex}
        <Square
          highlighted={tile.input === highlighted}
          {cIndex}
          {tIndex}
          bind:tile
          onClick={() => handleTileClick(cIndex, tIndex)}
        />
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .board {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    margin-bottom: 1rem;

    .column {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
</style>
