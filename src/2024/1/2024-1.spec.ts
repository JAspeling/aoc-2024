import {fetchAoc, splitOnNewlines} from '../../utils/fetch-input';
import {calculateDistance, extractArrays, part1, part2} from './2024-1';

jest.mock('./2024-1.ts', () => ({
  ...jest.requireActual('./2024-1.ts'),
  run: jest.fn(),
}));

  const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

describe('fetch 2024', () => {
  it('should fetch day 1 data', async () => {
    const data = await fetchAoc(2024, 1);

    expect(data).toBeTruthy();
    expect(localStorage.getItem('2024-1')).toBeTruthy();
  });



  it('should find the distance between 2 points', async () => {
    expect(calculateDistance(1, 2)).toBe(1);
  });

  it('should extract the arrays from the input', () => {
    const [left, right] = extractArrays(input.split('\n'));

    expect(left).toEqual([3, 4, 2, 1, 3, 3]);
    expect(right).toEqual([4, 3, 5, 3, 9, 3]);
  });

  it('should extract the arrays with more than single-digit numbers', () => {
    const newInput = ["12   32"]
    const [left, right] = extractArrays(newInput);

    expect(left).toEqual([12]);
    expect(right).toEqual([32]);
  })
});

describe('part 1', () => {
  it('should calculate part 1', async () => {
    const realInput = await fetchAoc(2024, 1)
    const inputArr = splitOnNewlines( realInput);
    const result = await part1(inputArr);
    expect(result).toBe(2166959);
  });
});


describe('part 2', () => {
  it('should calculate part 1', async () => {
    const realInput = await fetchAoc(2024, 1);
    const inputArr = splitOnNewlines(realInput);
    const result = await part2(inputArr);
    expect(result).toBe(23741109);
  });
});
