import { fetchAoc, timeIt } from "../../utils";

const day = 2;

/**
 * Input:
 * - One report per line
 * - Each report is a list of numbers called levels, separated by spaces
 *
 * Which reports are safe?
 *  - The levels are either all increasing or all decreasing
 *  - Any two adjacent levels differ by at least one and at most three
 */

export const run = async () => {
  const input = await fetchAoc(2024, day);
  const inputArray = input.split('/\s+/');

  await timeIt(part1)(inputArray);
  await timeIt(part2)(inputArray);
};

export const part1 = async (input: string[]) => {

  const reports = input.map(convertToArray);
  const safeReports = reports.filter(isSafeReport).length;

  return safeReports;
};

export const part2 = async (input: string[]) => {
  const reports = input.map(convertToArray);

  const unsafeReports = reports.filter(r => !isSafeReport(r));
  const safeReports = reports.length - unsafeReports.length;

  let toleratedReports = 0;

  unsafeReports.forEach(report => {
    const length = report.length;
    let index = 0;

    while (index <= length) {
      const modifiedReport = [...report];
      modifiedReport.splice(index, 1);
      const isSafe = isSafeReport(modifiedReport);
      if (isSafe) {
        toleratedReports++;
        break;
      }
      index++;
    }
  })

  return safeReports + toleratedReports;
};

/**
 * Convert a row of numbers into an array of levels
 */
export function convertToArray (row: string) {
   return row.split(/\s+/).map(Number);
}

/**
 * Convert the input into an array of reports
 */
export const convertInputLine = (input: string) =>
  input.split("\n").map(convertToArray);

/**
 * Generate the reports from the input
 */
export const generateReports = (input: string) => convertInputLine(input);

export function isSafeReport(report: number[]) {
  const validIncreasing = report.every(
    (level, i, arr) =>
      i === 0 ||
      (biggerThan(arr[i - 1], level) &&
        between1And3(arr[i - 1], level))
  );

  const validDecreasing = report.every(
    (level, i) =>
      i === 0 ||
      (smallerThan(report[i - 1], level) &&
      between1And3(report[i - 1], level))
  );

  return validIncreasing || validDecreasing;
};

const biggerThan = (previous: number, current: number) => current > previous;
const smallerThan = (previous: number, current: number) => current < previous;

const difference = (num1: number, num2: number) => Math.abs(num1 - num2);
const between1And3 = (previous: number, current: number) => between(difference(previous,current), 1, 3)

export const between = (diff: number, lowerRange: number, upperRange: number): boolean => diff >= lowerRange && diff <= upperRange;