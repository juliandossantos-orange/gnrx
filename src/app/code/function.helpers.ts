export function arrayOf<T>(value: T | T[] | undefined) {
  if(value === undefined) {
    return [];
  } else if (Array.isArray(value)) {
    return value;
  } else {
    return [value];
  }
}
