export const timeIt = (fn: Function) => {
  return async () => {
    const time = Date.now();
    await fn();
    console.log(`${fn.name} took ${Date.now() - time} ms`);
  };
};
