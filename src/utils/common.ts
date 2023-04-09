// write a function to find and extract the first JSON from a string

export function extractJson(str) {
  const first = str.indexOf('{');
  const last = str.lastIndexOf('}');

  if (first === -1 || last === -1) {
    return {
      front: str,
      back: {},
    };
  }

  return JSON.parse(
    str.substring(first, last + 1) || '{ front: str, back: {}, }',
  );
}
