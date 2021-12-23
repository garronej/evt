
export function isPromiseLike<T = void>(o: any): o is PromiseLike<T> {
    return typeof o?.then === "function";
}