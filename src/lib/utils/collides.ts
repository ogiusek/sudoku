import type { ITile } from "./tile";

export function numberCollides(board: ITile[][], num: number, xPos: number, yPos: number) {
  for (let x = 0; x < board.length; x++) {
    if (board[x][yPos].value === num) {
      return true;
    }
  }

  for (let y = 0; y < board.length; y++) {
    if (board[xPos][y].value === num) {
      return true;
    }
  }

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (board[xPos - (xPos % 3) + x][yPos - (yPos % 3) + y].value === num) {
        return true;
      }
    }
  }

  return false;
}