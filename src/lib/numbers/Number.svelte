<script lang="ts">
  export let value: number;
  export let selectedValue: number;
  export let handleClick: (_: number) => any;
</script>

<button
  class={`button ${value === selectedValue && "selected"}`}
  on:click={() => handleClick(value)}
>
  {value}
</button>

<style lang="scss">
  .button {
    $font-size: 1.5rem;
    width: $font-size;
    height: $font-size;

    border-radius: 5rem;
    padding: 1rem 0.5rem;
    margin: 0 0.5rem;
    box-sizing: content-box;

    font-size: $font-size;
    color: black;
    font-weight: 100;

    border: none;
    background-color: white;

    &.selected {
      background-color: var(--accent-color);
    }
  }
</style>
