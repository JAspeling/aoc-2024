import { day } from '.';
import {fetchAoc, splitOnNewlines} from '../../utils/fetch-input';
import {getMiddleNumber, getRule, getRules, getUpdate, getUpdates, getValidUpdates, part1, part2, sortUpdate, validateUpdate} from './2024-5';

const testInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

xdescribe('fetch 2024', () => {
  it(`should fetch day ${day} data`, async () => {
    const data = await fetchAoc(2024, day);

    expect(data).toBeTruthy();
    expect(localStorage.getItem(`2024-${day}`)).toBeTruthy();
  });
});

describe('part 1', () => {
  it('should calculate part 1 (Test input)', async () => {
    const result = await part1(testInput);
    expect(result).toBe(143);
  });

  it('should calculate part 1 (Real input)', async () => {
    const realInput = await fetchAoc(2024, day);
    const result = await part1(realInput);
    expect(result).toBe(4872);
  });
});

describe('part 2', () => {
  it('should calculate part 2 (Test input)', async () => {
    const result = await part2(testInput);
    expect(result).toBe(123);
  });

  it('should calculate part 2 (Real input)', async () => {
    const realInput = await fetchAoc(2024, day);
    const result = await part2(realInput);
    expect(result).toBe(5564);
  });
});

describe(`2024 day ${day}`, () => {
  it('should get a list of rules from an input string', () => {
    const input = `47|53\n97|13\n97|61\n\n75,47,61,53,29\n97,61,53,29,13`;
    expect(getRules(input)).toEqual([
      { before: 47, after: 53 },
      { before: 97, after: 13 },
      { before: 97, after: 61 },
    ]);
  });

  it('should get a list of updates from an input string', () => {
    const input = `47|53\n97|13\n97|61\n\n75,47,61,53,29\n97,61,53,29,13`;
    expect(getUpdates(input)).toEqual([
      [75, 47, 61, 53, 29],
      [97, 61, 53, 29, 13],
    ]);
  });

  it('should get a rule from a string', () => {
    expect(getRule('47|53')).toEqual({ before: 47, after: 53 });
  });

  it('should get an update from a string', () => {
    expect(getUpdate('75,47,61,53,29')).toEqual([75, 47, 61, 53, 29]);
  });

  it.each(['75,47,61,53,29', '97,61,53,29,13', '75,29,13'])(
    'should identify a valid update for %s',
    (updateStr) => {
      const rules = getRules(testInput);
      const update = getUpdate(updateStr);
      expect(validateUpdate(rules, update)).toBe(true);
    },
  );


  it.each(['75,97,47,61,53', '61,13,29', '97,13,75,29,47'])(
    'should identify an invalid update for %i',
    (updateStr) => {
      const rules = getRules(testInput);
      const update = getUpdate(updateStr);
      expect(validateUpdate(rules, update)).toBe(false);
    },
  );

  it('should get 3 valid updates', () => {
    expect(getValidUpdates(testInput)).toHaveLength(3);
  })

  it('should get the middle index of an array', () => {
    expect(getMiddleNumber([4,5,6,7,8])).toBe(6);
  })

  it.each([
    {
      unsorted: '75,97,47,61,53',
      sorted: [97,75,47,61,53],
    },
    {
      unsorted: '61,13,29',
      sorted: [61,29,13],
    },
    {
      unsorted: '97,13,75,29,47',
      sorted: [97,75,47,29,13],
    },
  ])('should sort an invalid update: $unsorted', (test) => {
    const rules = getRules(testInput);
    expect(sortUpdate(rules, getUpdate(test.unsorted))).toEqual(test.sorted);
  });
});