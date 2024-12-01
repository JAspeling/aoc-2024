
export const part1 = async (input: string[]) => {
  const [leftArr, rightArr] = extractArrays(input);
  const distances: number[] = [];

  leftArr.sort((a, b) => a - b);
  rightArr.sort((a, b) => a - b);

  leftArr.forEach((item, index) => {
    distances.push(calculateDistance(item, rightArr[index]));
  })
  return distances.reduce((prev, curr) => prev + curr, 0);
}

export const part2 = async (input: string[]) => {
  const [leftArr, rightArr] = extractArrays(input);

  let total = 0

  leftArr.forEach(item => {
    const count = rightArr.filter(i => i == item).length;
    total += (item * count)
  })

  return total;
}

export const extractArrays = (input: string[]): number[][] => {
  const leftArray: number[] = [];
  const rightArray: number[] = [];
  input.forEach((row: string) => {
    // Split the row by whitespace
    const [left, right] = row.split(/\s+/).map(Number);

    leftArray.push(left);
    rightArray.push(right);   
  })

  return [leftArray, rightArray]
}

export const calculateDistance = (p1: number, p2: number): number => Math.abs(p1 - p2)

export const findSmallest = (list: number[]): number => Math.min(...list);
