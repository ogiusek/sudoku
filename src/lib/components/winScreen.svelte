<script lang="ts">
  export let messeage: string;
  export let time: number;
  export let usedHints: number;
  export let mistakes: number;

  const hide = () => {
    messeage = "";
  };
</script>

{#if messeage.length !== 0}
  <button class="background" on:click={hide} />
  <div class="dialog">
    <h1>{messeage}</h1>
    <p>time: {Math.floor(time / 60)}m {time % 60}s</p>
    <p>hints used: {usedHints}</p>
    <p>mistakes: {mistakes}</p>

    <button on:click={hide}>ok</button>
  </div>
{/if}

<style lang="scss">
  .background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.4);
    border: none;
  }

  .dialog {
    z-index: 1;
    width: 15rem;
    height: 7rem;

    position: fixed;
    top: calc(50vh - 8.5rem);
    left: calc(50vw - 12.5rem);

    padding: 5rem;
    border-radius: 2rem;

    background-color: var(--main-color);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    p,
    h1 {
      text-align: center;
    }
    p {
      font-size: 1rem;
      text-transform: capitalize;
    }
    h1 {
      font-size: 2rem;
      text-transform: uppercase;
    }

    button {
      border: 1px solid var(--accent-color);
      border-radius: 1rem;
      padding: 0.5rem 2rem;

      background-color: transparent;
      color: var(--accent-color);
      font-size: 1rem;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
</style>
