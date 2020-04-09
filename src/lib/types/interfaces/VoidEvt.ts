
type Evt<T> = import("./Evt").Evt<T>;
type Void = import("./Void").Void;


export interface VoidEvt extends Evt<Void> {
    post(): number;
    postAsyncOnceHandled(): Promise<number>;
};