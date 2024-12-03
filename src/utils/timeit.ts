export const timeIt =<T extends (...args: any[]) => any> (fn: T) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const time = Date.now();
    const res = await fn(...args);
    console.log(`${fn.name} took ${Date.now() - time} ms:`, res);
    return res;
  };
};
