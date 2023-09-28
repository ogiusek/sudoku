<script lang="ts">
  import Board from "./lib/board/Board.svelte";
  import Numbers from "./lib/numbers/Numbers.svelte";
  import { getBoard } from "./lib/utils/getBoard";
  import type { ITile } from "./lib/utils/tile";
  import { getSeed } from "./lib/utils/getSeed";
  import WinScreen from "./lib/components/winScreen.svelte";

  let inputNumber = 0;

  let seed: string;
  let board: ITile[][];
  let foundZeros: number;

  let winScreenMesseage: string = "";

  const t = {
    time: 0,
    timeInterval: setInterval(() => {}, 1000000),
    createTimeInterval: () => {
      t.time = 0;
      clearInterval(t.timeInterval);
      t.timeInterval = setInterval(() => !!foundZeros && t.time++, 1000);
    },
  };

  let mistakes = 0;
  let usedHints = 0;

  const winCheck = () => {
    for (let i = 0; i < 81; i++) {
      const tile = board[i % 9][Math.floor(i / 9)];
      if (tile.input !== tile.value) return;
    }
    winScreenMesseage = "You've won!";
  };

  const handleTileClick = (x: number, y: number) => {
    if (board[x][y].input !== board[x][y].value)
      board[x][y].input = board[x][y].input === inputNumber ? 0 : inputNumber;

    if (board[x][y].input && board[x][y].input !== board[x][y].value)
      mistakes++;

    foundZeros = board.flat().filter((e) => e.input === 0).length;
    winCheck();
  };

  const restart = () => {
    seed = getSeed();
    board = getBoard(seed);
    t.createTimeInterval();

    mistakes = 0;
    foundZeros = board.flat().filter((e) => e.input === 0).length;
    usedHints = 0;
    winScreenMesseage = "";
  };
  restart();

  const solveSquare = () => {
      const available: number[] = [];
      for (let i = 0; i < 81; i++)
        if (!board[i % 9][Math.floor(i / 9)].input) available.push(i);

      if (!available.length) return false;
      usedHints++;
      const tileNum = available[Math.floor(Math.random() * available.length)];
      board[tileNum % 9][Math.floor(tileNum / 9)].input = inputNumber =
        board[tileNum % 9][Math.floor(tileNum / 9)].value;

      //  = ;
      foundZeros = board.flat().filter((e) => e.input === 0).length;
      winCheck();
      return true;
    },
    solveSquares = () => {
      if (solveSquare())
        setTimeout(() => {
          solveSquares();
        }, 50 + Math.random() * 150);
    };
</script>

<main>
  <WinScreen
    bind:messeage={winScreenMesseage}
    time={t.time}
    {usedHints}
    {mistakes}
  />
  <div style="height: 1rem;" />
  <h1>sudoku</h1>
  <ul class="brokenHearts">
    {#each Array(mistakes) as _}
      <li>
        <img
          src="https://www.svgrepo.com/show/181225/broken-heart-shapes.svg"
          alt="broken heart"
        />
      </li>
    {/each}
  </ul>
  <p class="time">{Math.floor(t.time / 60)}m {t.time % 60}s</p>
  <ul class="buttons">
    <li>
      <button on:click={restart}>
        <img
          class="restart"
          src="https://www.svgrepo.com/show/529805/restart-circle.svg"
          alt="restart"
        />
      </button>
    </li>
    <li>
      <button on:click={solveSquare}>
        <img
          src="https://www.svgrepo.com/show/216651/idea-light-bulb.svg"
          alt="restart"
        />
      </button>
    </li>
    <li>
      <button on:click={solveSquares}>
        <img
          src="https://www.svgrepo.com/show/421431/idea-innovation-light.svg"
          alt="restart"
        />
      </button>
    </li>
  </ul>

  <Board {board} {handleTileClick} highlighted={inputNumber} />
  <Numbers bind:number={inputNumber} {board} />
</main>

<style lang="scss">
  main {
    width: 100vw;
    height: 100vh;

    position: relative;

    h1 {
      text-align: center;
      margin: 0 0 1rem 0;
      margin: 0;
      text-transform: uppercase;
      font-size: 2rem;
    }

    .time {
      font-size: 1.5rem;
      text-align: center;
    }

    .brokenHearts {
      height: 2rem;
      padding: 0;
      margin: 0;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;

      li {
        list-style: none;
        img {
          height: 2rem;
          margin: 0 0.5rem;
          filter: invert(100%);
        }
      }
    }

    .buttons {
      width: 100vw;
      padding: 0;
      display: flex;
      justify-content: center;
      align-content: center;
      flex-direction: row;
      margin: 0.5rem 0;

      li {
        list-style: none;

        button {
          border: none;
          margin: none;
          background-color: transparent;

          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 1rem;

          img {
            filter: invert(100%);
            width: 3rem;
            &:hover {
              scale: 1.2;
              &.restart {
                rotate: 360deg;
              }
            }
          }
        }
      }
    }
  }
</style>
