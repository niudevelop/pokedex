export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};
export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(cleanupInterval: number) {
    this.#interval = cleanupInterval;
    this.#startReapLoop();
  }
  add<T>(key: string, val: T) {
    this.#cache.set(key, {
      createdAt: Date.now(),
      val: val,
    });
  }

  get<T>(key: string) {
    return this.#cache.get(key) ?? undefined;
  }
  getAll<T>() {
    const values: T[] = [];
    for (const [key, val] of this.#cache) {
      values.push(val.val);
    }
    return values;
  }
  stopReapLoop() {
    if (this.#reapIntervalId) clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }
  #reap() {
    const cutoff = Date.now() - this.#interval;
    for (const [key, value] of this.#cache) {
      if (value.createdAt < cutoff) this.#cache.delete(key);
    }
  }
}
