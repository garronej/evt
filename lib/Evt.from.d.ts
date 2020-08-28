import { EventTargetLike } from "./types/EventTargetLike";
import * as dom from "./types/lib.dom";
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
export declare function from<K extends keyof dom.HTMLElementEventMap>(ctx: CtxLike<any>, target: EventTargetLike.HTMLElement, eventName: K, options?: EventTargetLike.HasEventTargetAddRemove.Options): Evt<dom.HTMLElementEventMap[K]>;
export declare function from<K extends keyof dom.WindowEventMap>(ctx: CtxLike<any>, target: EventTargetLike.Window, eventName: K, options?: EventTargetLike.HasEventTargetAddRemove.Options): Evt<dom.WindowEventMap[K]>;
export declare function from<K extends keyof dom.DocumentEventMap>(ctx: CtxLike<any>, target: EventTargetLike.Document, eventName: K, options?: EventTargetLike.HasEventTargetAddRemove.Options): Evt<dom.DocumentEventMap[K]>;
export declare function from<T>(ctx: CtxLike<any>, target: OneOrMany<EventTargetLike.NodeStyleEventEmitter | EventTargetLike.JQueryStyleEventEmitter>, eventName: string): Evt<T>;
export declare function from<T>(ctx: CtxLike<any>, target: OneOrMany<EventTargetLike.HasEventTargetAddRemove<T>>, eventName: string, options?: EventTargetLike.HasEventTargetAddRemove.Options): Evt<T>;
export declare function from<T>(ctx: CtxLike<any>, target: OneOrMany<EventTargetLike.RxJSSubject<T>>): Evt<T>;
export declare function from<T>(ctx: CtxLike<any>, target: PromiseLike<T>): Evt<T>;
export declare function from<K extends keyof dom.HTMLElementEventMap>(target: EventTargetLike.HTMLElement, eventName: K, options?: EventTargetLike.HasEventTargetAddRemove.Options): Evt<dom.HTMLElementEventMap[K]>;
export declare function from<K extends keyof dom.WindowEventMap>(target: EventTargetLike.Window, eventName: K, options?: EventTargetLike.HasEventTargetAddRemove.Options): Evt<dom.WindowEventMap[K]>;
export declare function from<K extends keyof dom.DocumentEventMap>(target: EventTargetLike.Document, eventName: K, options?: EventTargetLike.HasEventTargetAddRemove.Options): Evt<dom.DocumentEventMap[K]>;
export declare function from<T>(target: OneOrMany<EventTargetLike.NodeStyleEventEmitter | EventTargetLike.JQueryStyleEventEmitter>, eventName: string): Evt<T>;
export declare function from<T>(target: OneOrMany<EventTargetLike.HasEventTargetAddRemove<T>>, eventName: string, options?: EventTargetLike.HasEventTargetAddRemove.Options): Evt<T>;
export declare function from<T>(target: OneOrMany<EventTargetLike.RxJSSubject<T>>): Evt<T>;
export declare function from<T>(target: PromiseLike<T>): Evt<T>;
export {};
