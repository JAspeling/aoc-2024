export const timeIt = (fn: Function) => {
  return async (...args: any[]) => {
    const time = Date.now();
    const res = await fn(...args);
    console.log(`${fn.name} took ${Date.now() - time} ms:`, res);
  };
};
