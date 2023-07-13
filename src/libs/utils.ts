export function to<D, E = Error>(
  promise: Promise<D>,
  errorExt?: Record<string, any>,
): Promise<[undefined, E] | [D, null]> {
  return promise
    .then<[D, null]>((data: D) => [data, null])
    .catch<[undefined, E]>((err: E) => {
    if (errorExt) {
      Object.assign(err as any, errorExt);
    }
    return [undefined, err];
  });
}
