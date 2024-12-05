export const timeIt = <T extends (...args: any[]) => any> (fn: T) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const time = Date.now();
    const res = await fn(...args);
    console.log(`${fn.name} took ${Date.now() - time} ms:`, res);
    return res;
  };
};

type Args = unknown[]
type SyncFn = (...args: any[]) => any;

export const implementSync = <TFn extends SyncFn>(fn: SyncFn) => {
  const result = (...params: Parameters<TFn>): ReturnType<TFn> =>
    fn(...params) as ReturnType<TFn>;

  return result;
};

const testFn = (a: number, b: number) => a + b

const test = implementSync(testFn);

test(1, 2, 3); // 3