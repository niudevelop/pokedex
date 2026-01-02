import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";

test.concurrent.each([
  { key: "https://example.com", val: "testdata", interval: 500 },
  { key: "https://example.com/path", val: "moretestdata", interval: 1000 },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  try {
    cache.add(key, val);

    const cachedEntry = cache.get<string>(key);
    expect(cachedEntry?.val).toBe(val);

    // Your reap condition uses `< Date.now() - interval`, so expiry can miss on the first tick.
    // Waiting > 2 * interval guarantees deletion without changing implementation.
    await new Promise((r) => setTimeout(r, interval * 2 + 50));

    const reapedEntry = cache.get<string>(key);
    expect(reapedEntry).toBe(undefined);
  } finally {
    cache.stopReapLoop();
  }
});
