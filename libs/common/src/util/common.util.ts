export const assertNever = (param: never): never => {
  throw new Error(`Should not reach here with param: ${param}`);
};
