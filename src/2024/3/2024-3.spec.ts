import {fetchAoc} from '../../utils/fetch-input';
import {part1, part2} from './2024-3';

const testInput = ``;
const day = 3;

describe('fetch 2024', () => {
  it(`should fetch day ${day} data`, async () => {
    const data = await fetchAoc(2024, day);

    expect(data).toBeTruthy();
    expect(localStorage.getItem(`2024-${day}`)).toBeTruthy();
  });
});

describe('part 1', () => {
  it('should calculate part 1', async () => {
    const realInput = await fetchAoc(2024, day)
    const result = await part1(realInput);
    // expect(result).toBe(x);
  });
}); 


describe('part 2', () => {
  it('should calculate part 1', async () => {
    const realInput = await fetchAoc(2024, day);
    const result = await part2(realInput);
    // expect(result).toBe(x);
  });
}); 
