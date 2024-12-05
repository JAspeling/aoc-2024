import {fetchAoc, splitOnNewlines, timeIt} from '../../utils';

const day = 4;

/**
 * Puzzle input: Word search
 *  - Only has to find one word: XMAS
 *  - horizontal, vertical, diagonal, written backwards
 *
 * You have to find all of the instances
 *
 * 1 2 3 4 5
 * 1 2 3 4 5
 * 1 2 3 4 5
 * 1 2 3 4 5
 * 1 2 3 4 5
 *
 * [0 0]
 * [0 1] [1 0]
 * [0 2] [1 1] [2 1]
 * [0 3] [1 2] [2 1] [3 0]
 */

export const run = async () => {
  const input = await fetchAoc(2024, day);
  // const inputArr = splitOnNewlines(input)

  await timeIt(part1)(input);
  await timeIt(part2)(input);
};

export const part1 = async (input: string) => {
  return getMatches(input); // 2397
};

export const part2 = async (input: string) => {
  const sanitize = input.replace(/[^A-Z\n]/g, '');
  const arr = input.split('\n');

  let total = 0;

  // Iterate over the rows
  for (let r = 1; r < arr.length - 1; r++) {
    // Iterate over the columns
    for (let c = 1; c < arr[r].length - 1; c++) {
      // Check the surrounding blocks if it contains S or M on the edges.
      // S     M
      //    A
      // S     M
      // The corresponding edges cant be the same, if S is in the top left, M has to be in the bottom right
      // If S is in the top right, M has to be in the bottom left
      // Increase the counter for each match

      // M M M S X X M A S M
      // M S A M X M S M S A
      // A M X S X M A A M M
      // M S A M A S M S M X
      // X M A S A M X A M M
      // X X A M M X X A M A
      // S M S M S A S X S S
      // S A X A M A S A A A
      // M A M M M X M M M M
      // M X M X A X M A S X

      const current = arr[r][c];
      // const currentArea = arr.slice(r - 1, r + 2).map(row => row.slice(c - 1, c + 2).join('')).join('');
      const topLeft = arr[r - 1][c - 1];
      const topRight = arr[r - 1][c + 1];
      const bottomLeft = arr[r + 1][c - 1];
      const bottomRight = arr[r + 1][c + 1];

      if ( current === 'A' &&
        ((topLeft === 'S' && bottomRight === 'M') || (topLeft === 'M' && bottomRight === 'S')) &&
        ((topRight === 'M' && bottomLeft === 'S') || (topRight === 'S' && bottomLeft === 'M'))
      ) {
        total++;
      }
    }
  }

  return total;
};

// Matches and reverses
export const matchXMAS = (input: string) => {
  return input.matchAll(/(?=(XMAS|SAMX))/g).toArray().map(match => match[1]);
}

export const getVertical = (input: string): string => {
  let result: string = '';
  const arr = input.split('\n');

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      result += arr[j][i];
    }
    result += '\n';
  }

  return result;
}

// Get the diagonal arrays starting from the top left
export const getDiagonalLeftToRight = (input: string): string => {
  let result: string = '';
  const arr = input.split('\n');

  // start with the first row
  for (let i = 0; i < arr.length; i++) {
    let row = i;
    let col = 0;

    while (row >= 0) {
      result += arr[row][col];
      row--;
      col++;
    }
    result += '\n';
  }

  for (let i = arr.length - 1; i > 0; i--) {
    let row = arr.length - 1;
    let col = arr.length - i;

    while (col <= arr.length - 1) {
      result += arr[row][col];
      row--;
      col++;
    }
    result += '\n';
  }

  return result.trim();
}

export const getDiagonalRightToLeft = (input: string): string => {
  let result: string = '';
  const arr = input.split('\n');

  // 1 2 3 4
  // 1 2 3 4
  // 1 2 3 4
  // 1 2 3 4

  // start with the first row (0), last column (0)
  for (let i = 0; i < arr.length; i++) {
    let row = 0;
    let col = arr.length - 1 - i;

    while (row <= i) {
      result += arr[row][col];
      row++;
      col++;
    }
    result += '\n';
  }

  // start with the last row (9), first column (8)
  for (let i = 1; i < arr.length; i++) {
    let row = i;
    let col = 0;

    while (col < arr.length - i) {
      result += arr[row][col];
      row++;
      col++;
    }
    result += '\n';
  }

  return result.trim();
}

// Get all the matches in the array
export const getMatches = (input: string): number => {
  const horizontal = input.split('\n');
  const vertical = getVertical(input).split('\n');
  const diagonalLeftToRight = getDiagonalLeftToRight(input).split('\n');
  const diagonalRightToLeft = getDiagonalRightToLeft(input).split('\n');

  const horizontalMatches = getMatchesInArray(horizontal);
  const verticalMatches = getMatchesInArray(vertical);
  const diagonalLTR = getMatchesInArray(diagonalLeftToRight);
  const diagonalRTL = getMatchesInArray(diagonalRightToLeft);

  return horizontalMatches + verticalMatches + diagonalLTR + diagonalRTL;
}

export const getMatchesInArray = (input: string[]): number => {
  return input.map(matchXMAS).reduce((acc, curr) => acc + curr.length, 0);
}