import { fetchAoc, splitOnNewlines, timeIt } from '../../utils';
import { run as _part2 } from './part.2'

const day = 3;

/**
 * Puzzle input is corrupted.
 * Instructions have been jumbled up
 * (Seems like) Goal: multiply some numbers
 *  - mul(X,Y)
 * X, Y = 1-3 digit numbers
 *
 * Currupted:
 *  - Some characters should be ignored.
 *  - Even if they look like part of a mul action
 * Sequences like
 *  - mul(4*
 *  - mul(6,9!
 *  - ?(12,34)
 *  - mul ( 2 , 4 )
 *  DO NOTHING
 *
 * xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
 *
 * real mul instructions:
 *  - mul(2,4)
 *  - mul(5,5)
 *  - mul(11,8)
 *  - mul(8,5)
 *
 * PART 2
 *  - Some of the conditional statements are still intact
 *
 * Two new instructions
 *  - do()
 *   - enables future mul instructions
 *  - don't()
 *   - disables future mul instructions
 *
 * Only the most recent "do" or "don't" instruction applies
 *
 *  - Beginning of the program mul instructions are enabled.
 *
 * xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))
 *  --------           ~~~~~~~    ~~~~~            ~~~~~~~~~  ---- --------
 *  - ["mul(2,4)", "mul(8,5)"]
 */

export const run = async () => {
  const input = await fetchAoc(2024, day);

  await timeIt(part1)(input);
  await timeIt(part2)(input);
};

// Input is only one long line.
export const part1 = async (input: string) => {
  const instructions = extractInstructions(input);
  // 168539636
  const result = processInstructions(instructions);
  return result;
};

export const part2 = async (input: string) => {
  // Gets all the instructions
  // 79469310 = too low
  // 79469310 // 326, has to be 396
  // 82824215 = too low
  // 82824215 = 335
  // 98024896 = too high
  // 98024896 = 388

  // 82824215
  // 97529391
  return _part2(input)
};


export const extractInstructions = (input: string): string[] => {
  const regex = /mul\(\d+,\d+\)/g;
  const match = input.match(regex);

  if (!match) {
    return [];
  }

  return match;
};


export const executeMulInstruction = (instruction: string): number => {
  const mulInstructionRegex = /mul\((?<first>\d+),(?<second>\d+)\)/;
  const match = instruction.match(mulInstructionRegex);

  if (!match || !match.groups) {
    throw new Error('Expected to match the instruction', {
      cause: instruction,
    });
  }

  const [first, second] = [
    Number(match.groups['first']),
    Number(match.groups['second']),
  ];

  return first * second;
};

export const processInstructions = (instructions: string[]) => {
  let total = 0;

  instructions.forEach((instruction) => {
    total += executeMulInstruction(instruction);
  });

  return total;
};

export const getInstructions = (input: string): string[] => {
  const instructions: string[] = [];

  const initialSection = getInitialSection(input);
  const initialInstructions = extractInstructions(initialSection);

  // Get all the sections between do() and dont't()
  const doSections = getDoSections(input);
  const doInstructions = doSections.map(section => extractInstructions(section)).flat()
  instructions.push(...initialInstructions, ...doInstructions);

  return instructions;
};

export const getInitialSection = (input: string) => {
  // Get the initial section
  const initialRegex = /^(?<section>.*?)(don't\(\))/g;
  return input
    .matchAll(initialRegex)
    .toArray()
    .map((g) => g.groups!['section'])[0];
}

export const getAllDontIndexes = (input: string): number[] => {
  const dontRegex = /don't\(\)/g;

  return input
    .matchAll(dontRegex)
    .toArray()
    .map((match) => match.index);
}

export const getAllDoIndexes = (input: string): number[] => {
  const doRegex = /do\(\)/g;
  return input
    .matchAll(doRegex)
    .toArray()
    .map((match) => match.index);
}


export const getDoSections = (input: string): string[] => {
  const regex = /(?=do\(\)(?<section>.*?)(don't\(\)|do\(\)|$))/g;

  const sectionMatches = input
    .matchAll(regex);

  const sections = sectionMatches
    .toArray()
    .map((exp) => exp.groups!['section']);

  // Get the last section (between a do and newline, NOT with don't() as the last command)
  // Might need to check here for duplicates

  // const lastSection = getLastDoSection(input);

  // if (lastSection) {
  //   return [...sections, lastSection];
  // }

  return [...sections]
}

export const getLastDoSection = (input: string): string => {
  const regex = /(?<=do\(\))(?<section>.*)/;
  const doIndex = input.lastIndexOf('do()');
  const dontIndex = input.lastIndexOf(`don't()`);
  if (dontIndex > doIndex) {
    return ''
  }

  return input.substring(doIndex).match(regex)?.groups!['section'] || '';
}