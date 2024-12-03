import {fetchAoc, splitOnNewlines} from '../../utils/fetch-input';
import {part1, part2} from './2024-5';

const testInput = ``;
const day = 5;

describe('fetch 2024', () => {
  it(`should fetch day ${day} data`, async () => {
    const data = await fetchAoc(2024, day);

    expect(data).toBeTruthy();
    expect(localStorage.getItem(`2024-${day}`)).toBeTruthy();
  });
});

describe('part 1', () => {
  it('should calculate part 1', async () => {
    const realInput = await fetchAoc(2024, day);
    const inputArr = splitOnNewlines(realInput);
    const result = await part1(inputArr);
    // expect(result).toBe(x);
  });
});


describe('part 2', () => {
  it('should calculate part 2', async () => {
    const realInput = await fetchAoc(2024, day);
    const inputArr = splitOnNewlines(realInput);
    const result = await part2(inputArr);
    // expect(result).toBe(x);
  });
});

describe(`2024 day ${day}`, () => {});