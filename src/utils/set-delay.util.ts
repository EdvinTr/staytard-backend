export const setDelay = (ms: number): Promise<unknown> =>
  new Promise((resolve) => setTimeout(resolve, ms));
