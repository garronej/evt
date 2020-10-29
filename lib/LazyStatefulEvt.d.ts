declare type StatefulEvt<T> = import("./types/interfaces").StatefulEvt<T>;
export declare class LazyStatefulEvt<T> {
    private initialPostCount;
    private initialState;
    readonly evt: StatefulEvt<T>;
    private __evt;
    constructor(initialState: T);
    private static __1;
    post(data: T): number;
}
export {};
