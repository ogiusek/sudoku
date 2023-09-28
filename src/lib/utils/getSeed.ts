import { shuffleArray } from "./shuffleArray";

export function getSeed() {
  const sortedArr = Array(81).fill('').map((e, i) => i);
  const shuffledArr = shuffleArray(sortedArr);
  return shuffledArr.join(",");
}