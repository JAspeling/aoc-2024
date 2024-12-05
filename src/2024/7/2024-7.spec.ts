import { day } from '.';
import { fetchAoc, splitOnNewlines } from '../../utils/fetch-input';
import { part1, part2 } from './2024-7';

const testInput = ``;

xdescribe('fetch 2024', () => {
  it(`should fetch day ${day} data`, async () => {
    const data = await fetchAoc(2024, day);

    expect(data).toBeTruthy();
    expect(localStorage.getItem(`2024-${day}`)).toBeTruthy();
  });
});

xdescribe('part 1', () => {
  it('should calculate part 1 (Test input)', async () => {
    const result = await part1(testInput);
    // expect(result).toBe(x);
  });

  it('should calculate part 1 (Real input)', async () => {
    const realInput = await fetchAoc(2024, day);
    const inputArr = splitOnNewlines(realInput);
    const result = await part1(realInput);
    // expect(result).toBe(x);
  });
});

xdescribe('part 2', () => {
  it('should calculate part 2 (Test input)', async () => {
    const realInput = await fetchAoc(2024, day);
    const result = await part2(testInput);
    // expect(result).toBe(x);
  });

  it('should calculate part 2 (Real input)', async () => {
    const realInput = await fetchAoc(2024, day);
    const result = await part2(realInput);
    // expect(result).toBe(x);
  });
});

describe(`2024 day ${day}`, () => {});
