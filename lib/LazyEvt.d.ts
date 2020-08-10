declare type Evt<T> = import("./types/interfaces").Evt<T>;
export declare class LazyEvt<T> {
    private initialPostCount;
    readonly evt: Evt<T>;
    private __evt;
    private static __1;
    post(data: T): number;
}
export {};
