export interface LightMap<K, V> {
    [Symbol.toStringTag]: string;
    has(key: K): boolean;
    get(key: K): V | undefined;
    set(key: K, value: V): this;
    delete(key: K): boolean;
    keys(): Iterable<K>;
}
