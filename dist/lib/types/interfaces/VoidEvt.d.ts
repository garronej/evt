declare type Evt<T> = import("./Evt").Evt<T>;
declare type Void = import("./Void").Void;
export interface VoidEvt extends Evt<Void> {
    post(): number;
    postAsyncOnceHandled(): Promise<number>;
}
export {};
