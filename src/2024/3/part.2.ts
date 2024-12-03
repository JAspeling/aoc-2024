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

export const run = (input: string) => {
  const regex = /(do\(\))|(don't\(\))|(mul\(\d+,\d+\))/g;

  const matches = input.matchAll(regex);
  let total = 0;
  let toggle = true;

  for (const match of matches) {
    if (match[0] === 'do()') {
      toggle = true;
      continue;
    }

    if (match[0] === `don't()`) {
      toggle = false;
      continue;
    }

    // has to be a mul instruction
    if (toggle) {
      total += executeMulInstruction(match[0]);
    }
  }

  return total;
};
