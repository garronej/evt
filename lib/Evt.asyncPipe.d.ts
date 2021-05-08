import { Evt } from "./Evt";
declare type StatefulEvt<T> = import("./types/interfaces").StatefulEvt<T>;
declare type StatefulReadonlyEvt<T> = import("./types/interfaces").StatefulReadonlyEvt<T>;
declare type NonPostableEvt<T> = import("./types/interfaces").NonPostableEvt<T>;
declare type UnpackEvt<T extends ({
    [key: string]: any;
} | import("./types/helper/UnpackEvt").EvtLike<any>)> = import("./types/helper").UnpackEvt<T>;
declare type EvtLike<T> = import("./types/helper/UnpackEvt").EvtLike<T> & {
    attach(callback: (data: T) => void): void;
};
declare type UseVoidEvt<T> = import("./types/helper/SwapEvtType").UseVoidEvt<T>;
declare type PromiseOrNot<T> = import("../tools/typeSafety").PromiseOrNot<T>;
/**
 * NOTE: Workaround until v2.0 where .pipe() will support async operators
 * Usage example: https://stackblitz.com/edit/evt-async-op?file=index.ts
 *
 * When the argument is a StatefulEvt:
 * If, wile asyncOp was running, the state of the source evt
 * have changed then the result will be discarded.
 *
 * If the asyncOp complete synchronously (meaning it does not return
 * a promise) then the result is synchronously transformed. (As with .pipe() )
 *
 * More usage example in src/test/test95.ts
 */
export declare function asyncPipe<E extends EvtLike<any>, U>(evt: E, asyncOp: (data: UnpackEvt<E>) => PromiseOrNot<[U] | null>): UseVoidEvt<E extends StatefulReadonlyEvt<any> ? StatefulEvt<U | undefined> : E extends NonPostableEvt<any> ? Evt<U> : EvtLike<U>>;
export {};
