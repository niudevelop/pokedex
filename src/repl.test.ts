import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: " Hello world ",
    expected: ["Hello", "world"],
  },
  {
    input: "one",
    expected: ["one"],
  },
  {
    input: " multiple   spaces here ",
    expected: ["multiple", "spaces", "here"],
  },
  {
    input: "",
    expected: [],
  },
  {
    input: "   leading and trailing   ",
    expected: ["leading", "and", "trailing"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${JSON.stringify(expected)}`, () => {
    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);

    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});