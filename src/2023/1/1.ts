const numberValues: Record<string, number> = {
 "one": 1,
 "two": 2,
 "three": 3,
 "four": 4,
 "five": 5,
 "six": 6,
 "seven": 7,
 "eight": 8,
 "nine": 9
}

export function getCalibration(calibrationValue: string): number {
  const regex = /(?<digits>\d)|(?=(?<words>(one|two|three|four|five|six|seven|eight|nine)))/g;

  const matches: string[] = [];
  let match;

  // Use while loop to collect matches
  while ((match = regex.exec(calibrationValue)) !== null) {
    // Ensure match[1] exists before pushing

    matches.push(match[1] || match[2]);

    // Prevent infinite loops by moving the regex index forward
    regex.lastIndex = match.index + 1;
  }

  if (matches?.length && matches.length > 0) {
    const newMatches: number[] = matches.map((match) => {
      if (match.match(/\d/)) {
        return Number(match);
      } else {
        return numberValues[match]
      }
    });
    const last = newMatches.slice(-1)?.toString();
    const first = newMatches[0]?.toString();

    return Number(first + last);
  }

  /asdf/.test
  return 0;
}

export function totalCalibrated(array: string[]): number {
  return array.reduce((previous, current) => previous + getCalibration(current), 0);
}
