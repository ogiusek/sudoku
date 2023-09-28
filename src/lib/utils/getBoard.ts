import { numberCollides } from "./collides";
import { shuffleArray } from "./shuffleArray";
import type { ITile } from "./tile";

function getEmptyBoard() {
  return Array(9)
    .fill([]).map(() =>
      Array(9).fill([]).map(() => {
        const tile: ITile = { value: 0, input: 0 }
        return tile;
      }));
}

function collapseTile(board: ITile[][], xPos: number, yPos: number) {
  const defineTile = (xPos: number, yPos: number) => {
    const numbers = shuffleArray(Array(9).fill(0).map((_, i) => i + 1));
    for (let i = 0; i < numbers.length; i++)
      if (!numberCollides(board, numbers[i], xPos, yPos)) {
        board[xPos][yPos].value = numbers[i];
        return;
      }
  };

  defineTile(xPos, yPos);

  for (let x = 0; x < board.length; x++)
    if (!board[x][yPos].input)
      defineTile(x, yPos);

  for (let y = 0; y < board[xPos].length; y++)
    if (!board[xPos][y].input)
      defineTile(xPos, y);

  for (let index = 0; index < 9; index++) {
    const x = xPos - (xPos % 3) + (index % 3),
      y = yPos - (yPos % 3) + Math.floor(index / 3);
    if (!board[x][y].value) defineTile(x, y);
  }
}

function unCoverTile(board: ITile[][]) {
  const x = Math.floor(board.length * Math.random()),
    y = Math.floor(board[x].length * Math.random());

  if (!board[x][y].input) board[x][y].input = board[x][y].value;
  else unCoverTile(board);
}

export function getBoard(seed: string): ITile[][] {
  const board = getEmptyBoard();

  const seedArr = seed.split(",");
  for (let e = 0; e < seedArr.length; e++) {
    const elem = Number(seedArr[e]),
      x = Math.floor(elem / 9),
      y = elem % 9;
    collapseTile(board, x, y);
  }

  const min = 0.4;
  const max = 0.5;
  // const unCoveredTiles = 81;
  const unCoveredTiles = Math.floor((Math.random() * (max - min)) + min * (9 * 9));

  for (let i = 0; i < unCoveredTiles; i++) unCoverTile(board);

  for (let i = 0; i < 81; i++)
    if (board[i % 9][Math.floor(i / 9)].value === 0)
      return getBoard(seed);

  return board;
}