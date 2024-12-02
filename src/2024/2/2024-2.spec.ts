import { fetchAoc } from "../../utils/fetch-input";
import {
  between,
  convertToArray,
  generateReports,
  isSafeReport,
  part1,
  part2,
} from "./2024-2";

// Six reports each containing five levels
const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;
const day = 2;

describe("fetch 2024", () => {
  it(`should fetch day ${day} data`, async () => {
    const data = await fetchAoc(2024, day);

    expect(data).toBeTruthy();
    expect(localStorage.getItem(`2024-${day}`)).toBeTruthy();
  });
});

describe("general tests", () => {
  it("should generate an array from the line input", () => {
    const row = testInput.split("\n")[0];
    expect(convertToArray(row)).toEqual([7, 6, 4, 2, 1]);
  });

  it("should generate an array of reports from the input", () => {
    const reports = generateReports(testInput);
    expect(reports.length).toBe(6);
  });

  describe("safe reports", () => {
    it("should mark a report as safe for ascending levels", () => {
      const safeReport = [1, 2, 3, 4, 5];
      expect(isSafeReport(safeReport)).toBe(true);
    });

    it("should mark a report as safe for descending levels", () => {
      const safeReport = [5, 4, 3, 2, 1];
      expect(isSafeReport(safeReport)).toBe(true);
    });

    it("should be safe if adjacent levels differ by at most three", () => {
      const safeReport = [1, 4, 7, 10, 11];
      expect(isSafeReport(safeReport)).toBe(true);
    });

    it("should be safe if adjacent levels differ by at least one", () => {
      const safeReport = [1, 2, 3, 4, 5];
      expect(isSafeReport(safeReport)).toBe(true);
    });
  });

  describe("unsafe reports", () => {
    it('should be unsafe for increasing with more than 3', () => {
      const report = [1, 5, 6, 7, 10]
      expect(isSafeReport(report)).toBe(false);
    })

    it("should be unsafe for not increasing by at least 1", () => {
      const report = [1, 1, 2, 3, 4];
      expect(isSafeReport(report)).toBe(false);
    });

    it('should be unsafe if not in ascending or descending', () => {
      const report = [1, 2, 1, 2, 3];
      expect(isSafeReport(report)).toBe(false);
    })
  });

  describe('between', () => {
    it.each([1,2,3])('should return true for in-range %i', (value) => {
      expect(between(value, 1, 3)).toBe(true);
    })

    it.each([4])("should return false for out-of-range %i", (value) => {
      expect(between(value, 1, 3)).toBe(false);
    });
  })
});

describe("part 1", () => {
  it("should calculate part 1", async () => {
    const realInput = await fetchAoc(2024, day);
    const result = await part1(realInput);
    // expect(result).toBe(x);
  });
});

describe("part 2", () => {
  it("should calculate part 1", async () => {
    const realInput = await fetchAoc(2024, day);
    const result = await part2(realInput);
    // expect(result).toBe(x);
  });
});
