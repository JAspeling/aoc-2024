import { fetchAoc } from '../../utils/fetch-input';
import { getCalibration, totalCalibrated } from './1';

describe('Advent of code day 1', () => {
  it.each([
    {
      test: 'two1nine',
      expected: 29,
    },
    {
      test: 'eightwothree',
      expected: 83,
    },
    {
      test: 'abcone2threexyz',
      expected: 13,
    },
    {
      test: 'xtwone3four',
      expected: 24,
    },

    {
      test: '4nineeightseven2',
      expected: 42,
    },
    {
      test: 'zoneight234',
      expected: 14,
    },
    {
      test: '7pqrstsixteen',
      expected: 76,
    }
  ])('should get $expected out of $test', (testCase) => {
    expect(getCalibration(testCase.test)).toBe(testCase.expected);
  });

  it('should work with spelled out numbers (one) to be 11', () => {
    expect(getCalibration('one')).toBe(11);
  });

  it('should work with combined numbers', () => {
    expect(getCalibration('twone')).toBe(21)
  })

  it('should test', () => {
    const str = '4twone8eightfiveone';
    const regex = /(\d)|(?=(two|one))/g; // Lookahead to match overlapping patterns

    const matches: string[] = [];
    let match;

    // Use while loop to collect matches
    while ((match = regex.exec(str)) !== null) {
      // Ensure match[1] exists before pushing
      
      matches.push(match[1] || match[2]);
      

      // Prevent infinite loops by moving the regex index forward
      regex.lastIndex = match.index + 1;
    }

    console.log(matches);
    // Output: ["two", "one"]
  })

  it('should fetch the values for Day 1', async () => {
    await expect(fetchAoc(2023, 1)).resolves.toBeTruthy();
  });

  it('should read the input for the day and convert to string[]', async () => {
    const value = await fetchAoc(2023, 1);
    expect(value.length).toBeGreaterThan(0);
  });

  it('should sum the values for the given test case to 142', () => {
    const testCase = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'];

    expect(totalCalibrated(testCase)).toBe(142);
  });

  it('should return 0 for an empty string', () => {
    expect(getCalibration('')).toBe(0);
  });

  it('should sum the values', async () => {
    expect(totalCalibrated(await fetchAoc(2023, 1))).toBe(54925);
  });
});
