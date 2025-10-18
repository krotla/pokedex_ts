export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, value: T) {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: value,
        }
        this.#cache.set(key, entry);
    }

    get<T>(key: string) {
        const cacheEntry = this.#cache.get(key)
        return cacheEntry? cacheEntry.val : undefined;
    }

    #reap() {
        const intervalDate = Date.now() - this.#interval;
        for (const [key, entry] of this.#cache) {
            if (entry.createdAt < intervalDate) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop() {
        if (!this.#reapIntervalId) {
            const timeout = setInterval(() => { 
                this.#reap();
            }, this.#interval);
            this.#reapIntervalId = timeout;
        }
    }

    stopReapLoop() {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
}