import {fetchAoc, timeIt} from '../../utils';

const day = 3;

export const run = async () => {
  const input = await fetchAoc(2024, day);

  await timeIt(part1)(input);
  await timeIt(part2)(input);
};

export const part1 = async (input: string[]) => {};

export const part2 = async (input: string[]) => {};
