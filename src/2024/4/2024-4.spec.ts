import { fetchAoc, splitOnNewlines } from '../../utils/fetch-input';
import { getDiagonalLeftToRight, getDiagonalRightToLeft, getMatches, getVertical, matchXMAS, part1, part2 } from './2024-4';

const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
const day = 4;

describe('fetch 2024', () => {
  it(`should fetch day ${day} data`, async () => {
    const data = await fetchAoc(2024, day);

    expect(data).toBeTruthy();
    expect(localStorage.getItem(`2024-${day}`)).toBeTruthy();
  });
});

describe('part 1', () => {
  xit('should calculate part 1', async () => {
    const realInput = await fetchAoc(2024, day);
    const result = await part1(realInput);
    expect(result).toBe(18);
  });
});

describe('part 2', () => {
  it('should calculate part 2', async () => {
    const realInput = await fetchAoc(2024, day);
    const result = await part2(realInput);
    // expect(result).toBe(4057); // 4057 - Too high
    expect(result).toBe(1776); // 1776 - Too low
    expect(result).toBe(1824); // 1824 - Too low
  });
});

describe(`2024 day ${day}`, () => {
  it('should match XMAS for all matches within a string', () => {
    expect(matchXMAS('XMASAMXMAS')).toHaveLength(3);
  });

  it('should get vertical strings from an array', () => {
    expect(getVertical(testInput).split('\n')[0]).toBe('MMAMXXSSMM');
  });

  it('should get the diagonal strings from an array', () => {
    const input = `1234\n1234\n1234\n1234`;
    expect(getDiagonalLeftToRight(input)).toBe('1\n12\n123\n1234\n234\n34\n4');
  })

  it('should get the diagonal strings from an array, right to left', () => {
    const input = `1234\n1234\n1234\n1234`;
    expect(getDiagonalRightToLeft(input)).toBe('4\n34\n234\n1234\n123\n12\n1');
  });

  it('should get the words 18 times in the sample data', () => {
    expect(getMatches(testInput)).toBe(18);
  })
});
