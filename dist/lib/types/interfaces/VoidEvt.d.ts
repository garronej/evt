declare type Evt<T> = import("./Evt").Evt<T>;
export interface VoidEvt extends Evt<void> {
    post(): number;
    postAsyncOnceHandled(): Promise<number>;
}
export {};
