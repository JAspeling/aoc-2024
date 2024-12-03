import {fetchAoc, splitOnNewlines, timeIt} from '../../utils';

const day = 4;

export const run = async () => {
  const input = await fetchAoc(2024, day);
  const inputArr = splitOnNewlines(input)

  await timeIt(part1)(inputArr);
  await timeIt(part2)(inputArr);
};

export const part1 = async (input: string[]) => {};

export const part2 = async (input: string[]) => {};
