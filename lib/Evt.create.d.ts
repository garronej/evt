declare type Evt<T> = import("./types/interfaces").Evt<T>;
declare type VoidEvt = import("./types/interfaces").VoidEvt;
declare type StatefulEvt<T> = import("./types/interfaces").StatefulEvt<T>;
/**
 * https://docs.evt.land/api/evt/create
 * Return a new VoidEvt instance.
 */
export declare function create(): VoidEvt;
/**
 * https://docs.evt.land/api/evt/create
 * Return a new Evt<T> instance.
 */
export declare function create<T>(): Evt<T>;
/**
 * https://docs.evt.land/api/evt/create
 * Return a new StatefulEvt<T> instance.
 */
export declare function create<T>(initialState: T): StatefulEvt<T>;
export {};
