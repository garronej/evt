import * as _1 from "./types/EventTargetLike";
declare namespace dom {
    type HTMLElementEventMap = import("./types/lib.dom").HTMLElementEventMap;
    type WindowEventMap = import("./types/lib.dom").WindowEventMap;
    type DocumentEventMap = import("./types/lib.dom").DocumentEventMap;
}
declare type Evt<T> = import("./types/interfaces/Evt").Evt<T>;
declare type EvtLike<T> = import("./types/helper/UnpackEvt").EvtLike<T>;
declare type OneOrMany<T> = T | ArrayLike<T>;
declare type CtxLike<Result> = import("./types/interfaces").CtxLike<Result> & {
    evtDoneOrAborted: EvtLike<unknown> & {
        postCount: number;
        attachOnce(callback: () => void): void;
    };
};
/** https://docs.evt.land/api/evt/from */
export declare function from<K extends keyof dom.HTMLElementEventMap>(ctx: CtxLike<any>, target: _1.EventTargetLike.HTMLElement, eventName: K, options?: _1.EventTargetLike.HasEventTargetAddRemove.Options): Evt<dom.HTMLElementEventMap[K]>;
export declare function from<K extends keyof dom.WindowEventMap>(ctx: CtxLike<any>, target: _1.EventTargetLike.Window, eventName: K, options?: _1.EventTargetLike.HasEventTargetAddRemove.Options): Evt<dom.WindowEventMap[K]>;
export declare function from<K extends keyof dom.DocumentEventMap>(ctx: CtxLike<any>, target: _1.EventTargetLike.Document, eventName: K, options?: _1.EventTargetLike.HasEventTargetAddRemove.Options): Evt<dom.DocumentEventMap[K]>;
export declare function from<T>(ctx: CtxLike<any>, target: OneOrMany<_1.EventTargetLike.NodeStyleEventEmitter | _1.EventTargetLike.JQueryStyleEventEmitter>, eventName: string): Evt<T>;
export declare function from<T>(ctx: CtxLike<any>, target: OneOrMany<_1.EventTargetLike.HasEventTargetAddRemove<T>>, eventName: string, options?: _1.EventTargetLike.HasEventTargetAddRemove.Options): Evt<T>;
export declare function from<T>(ctx: CtxLike<any>, target: OneOrMany<_1.EventTargetLike.RxJSSubject<T>>): Evt<T>;
export declare function from<T>(ctx: CtxLike<any>, target: PromiseLike<T>): Evt<T>;
export declare function from<K extends keyof dom.HTMLElementEventMap>(target: _1.EventTargetLike.HTMLElement, eventName: K, options?: _1.EventTargetLike.HasEventTargetAddRemove.Options): Evt<dom.HTMLElementEventMap[K]>;
export declare function from<K extends keyof dom.WindowEventMap>(target: _1.EventTargetLike.Window, eventName: K, options?: _1.EventTargetLike.HasEventTargetAddRemove.Options): Evt<dom.WindowEventMap[K]>;
export declare function from<K extends keyof dom.DocumentEventMap>(target: _1.EventTargetLike.Document, eventName: K, options?: _1.EventTargetLike.HasEventTargetAddRemove.Options): Evt<dom.DocumentEventMap[K]>;
export declare function from<T>(target: OneOrMany<_1.EventTargetLike.NodeStyleEventEmitter | _1.EventTargetLike.JQueryStyleEventEmitter>, eventName: string): Evt<T>;
export declare function from<T>(target: OneOrMany<_1.EventTargetLike.HasEventTargetAddRemove<T>>, eventName: string, options?: _1.EventTargetLike.HasEventTargetAddRemove.Options): Evt<T>;
export declare function from<T>(target: OneOrMany<_1.EventTargetLike.RxJSSubject<T>>): Evt<T>;
export declare function from<T>(target: PromiseLike<T>): Evt<T>;
export {};
