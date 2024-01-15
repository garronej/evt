export interface LightSet<T> {
    [Symbol.toStringTag]: string;
    has(value: T): boolean;
    add(value: T): this;
    values(): Iterable<T>;
    delete(value: T): boolean;
}
