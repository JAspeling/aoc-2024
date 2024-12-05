import { day } from '.';
import {fetchAoc, splitOnNewlines, timeIt} from '../../utils';


export const run = async () => {
  const input = await fetchAoc(2024, day);

  await timeIt(part1)(input);
  await timeIt(part2)(input);
};

export const part1 = async (input: string) => {
  // const rules = getRules(input);
  // const updates = getUpdates(input);
  const validUpdates = getValidUpdates(input);
  return validUpdates.map(getMiddleNumber).reduce((acc, prev) => acc + prev);
};

export const part2 = async (input: string) => {
  const updates = getUpdates(input);
  const rules = getRules(input);
  const invalidUpdates = updates.filter(update => !validateUpdate(rules, update));
  const fixedUpdates = invalidUpdates.map(update => sortUpdate(rules, update));
  return fixedUpdates.map(getMiddleNumber).reduce((acc, prev) => acc + prev);
};

type Rule = { before: number, after: number };

const getParts = (input: string) => input.split('\n\n');

export const getUpdates = (input: string) =>  getParts(input)[1].split('\n').map(getUpdate);
export const getRules = (input: string) => getParts(input)[0].split('\n').map(getRule);

export const getRule = (input: string) => {
  const [before, after] = input.split('|').map(Number);
  return { before, after };
};

export const getUpdate = (input: string) => input.split(',').map(Number);

export const validateUpdate = (rules: Rule [], update: number[]) => {
  return update.every((num, i, arr) => {
    // 75,47,61,53,29
    if (i < update.length - 1) {
      // If the before rule matches the current number and the after rule matches the next number, return true
      return rules.find(rule => rule.before === num && rule.after === arr[i + 1])
    }

    return rules.find(rule => rule.after === num && rule.before === arr[i - 1]);
  });
}

export const getValidUpdates = (input: string) => {
  const updates = getUpdates(input);
  const rules = getRules(input);
  return updates.filter(update => validateUpdate(rules, update));
}

export const getMiddleNumber = (input: number[]): number => {
  return input[Math.floor(input.length / 2)];
}

export const sortUpdate = (rules: Rule[], update: number[]): number[] => {
  const ruleMap = new Map<number, number>();
  rules.forEach(rule => ruleMap.set(rule.before, rule.after));

  return update.sort((a, b) => {
    // if the current number is the `before` rule of the next number, return -1
    if (ruleMap.get(a) === b) return -1;
    if (ruleMap.get(b) === a) return 1;
    return 0;
  });
}