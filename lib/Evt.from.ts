import { id } from "../tools/typeSafety/id.ts";
import { assert } from "../tools/typeSafety/assert.ts";
import { typeGuard } from "../tools/typeSafety/typeGuard.ts";
import { EventTargetLike } from "./types/EventTargetLike.ts";
import { mergeImpl } from "./Evt.merge.ts";
import { importProxy } from "./importProxy.ts";
import * as dom from "./types/lib.dom.ts";
type Evt<T>= import("./types/interfaces/Evt.ts").Evt<T>;
type EvtLike<T> = import("./types/helper/UnpackEvt.ts").EvtLike<T>;

type OneOrMany<T> = T | ArrayLike<T>;
type CtxLike<Result> = import("./types/interfaces/index.ts").CtxLike<Result> & {
      evtDoneOrAborted: EvtLike<unknown> & { postCount: number; attachOnce(callback: ()=> void): void; };
};

function fromImpl<T>(
    ctx: CtxLike<any> | undefined,
    target: OneOrMany<EventTargetLike<T>> | PromiseLike<T>,
    eventName?: string,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<T> {

    if ("then" in target) {

        const evt = new importProxy.Evt<T>();

        const isCtxDone = (()=>{

            const getEvtDonePostCount = () => ctx?.evtDoneOrAborted.postCount;

            const n = getEvtDonePostCount();

            return ()=> n !== getEvtDonePostCount();

        })();

        target.then(data => {

            if( isCtxDone() ){
                return;
            }

            evt.post(data);

        });

        return evt;

    }

    if ("length" in target) {
        return mergeImpl<Evt<T>>(
            ctx,
            Array.from(target).map(
                target => fromImpl<T>(ctx, target, eventName, options)
            )
        );
    }

    type ProxyMethod<T> = (
        listener: (data: T) => void,
        eventName: string,
        options?: EventTargetLike.HasEventTargetAddRemove.Options
    ) => void;

    let proxy: {
        on: ProxyMethod<T>;
        off: ProxyMethod<T>;
    };

    if (EventTargetLike.NodeStyleEventEmitter.match(target)) {
        proxy = {
            "on": (listener, eventName) => target.addListener(eventName, listener),
            "off": (listener, eventName) => target.removeListener(eventName, listener)
        };
    } else if (EventTargetLike.JQueryStyleEventEmitter.match(target)) {
        proxy = {
            "on": (listener, eventName) => target.on(eventName, listener),
            "off": (listener, eventName) => target.off(eventName, listener)
        };
    } else if (EventTargetLike.HasEventTargetAddRemove.match(target)) {
        proxy = {
            "on": (listener, eventName, options) => target.addEventListener(eventName, listener, options),
            "off": (listener, eventName, options) => target.removeEventListener(eventName, listener, options)
        };
    } else if (EventTargetLike.RxJSSubject.match(target)) {

        let subscription: EventTargetLike.RxJSSubject.Subscription;

        proxy = {
            "on": listener => subscription = target.subscribe(data => listener(data)),
            "off": () => subscription.unsubscribe()
        };

    } else {

        id<never>(target);
        assert(false);

    }

    const evt = new importProxy.Evt<T>();

    const listener = (data: T) => evt.post(data);

    ctx?.evtDoneOrAborted.attachOnce(
        () => proxy.off(
            listener,
            eventName!,
            options
        )
    );

    proxy.on(listener, eventName!, options);

    return evt;

}


/** https://docs.evt.land/api/evt/from */
export function from<K extends keyof dom.HTMLElementEventMap>(
    ctx: CtxLike<any>,
    target: EventTargetLike.HTMLElement,
    eventName: K,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.HTMLElementEventMap[K]>;

export function from<K extends keyof dom.WindowEventMap>(
    ctx: CtxLike<any>,
    target: EventTargetLike.Window,
    eventName: K,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.WindowEventMap[K]>;

export function from<K extends keyof dom.DocumentEventMap>(
    ctx: CtxLike<any>,
    target: EventTargetLike.Document,
    eventName: K,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.DocumentEventMap[K]>;

export function from<T>(
    ctx: CtxLike<any>,
    target: OneOrMany<
        EventTargetLike.NodeStyleEventEmitter |
        EventTargetLike.JQueryStyleEventEmitter
    >,
    eventName: string
): Evt<T>;
export function from<T>(
    ctx: CtxLike<any>,
    target: OneOrMany<
        EventTargetLike.HasEventTargetAddRemove<T>
    >,
    eventName: string,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<T>;
export function from<T>(
    ctx: CtxLike<any>,
    target: OneOrMany<EventTargetLike.RxJSSubject<T>>
): Evt<T>;

export function from<T>(
    ctx: CtxLike<any>,
    target: PromiseLike<T>
): Evt<T>;


export function from<K extends keyof dom.HTMLElementEventMap>(
    target: EventTargetLike.HTMLElement,
    eventName: K,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.HTMLElementEventMap[K]>;
export function from<K extends keyof dom.WindowEventMap>(
    target: EventTargetLike.Window,
    eventName: K,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.WindowEventMap[K]>;
export function from<K extends keyof dom.DocumentEventMap>(
    target: EventTargetLike.Document,
    eventName: K,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.DocumentEventMap[K]>;
export function from<T>(
    target: OneOrMany<
        EventTargetLike.NodeStyleEventEmitter |
        EventTargetLike.JQueryStyleEventEmitter
    >,
    eventName: string
): Evt<T>;
export function from<T>(
    target: OneOrMany<
        EventTargetLike.HasEventTargetAddRemove<T>
    >,
    eventName: string,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<T>;
export function from<T>(
    target: OneOrMany<EventTargetLike.RxJSSubject<T>>
): Evt<T>;
export function from<T>(
    target: PromiseLike<T>
): Evt<T>;

export function from<T>(
    ctxOrTarget: CtxLike<any> | OneOrMany<EventTargetLike<T>> | PromiseLike<T>,
    targetOrEventName?: OneOrMany<EventTargetLike<T>> | string | PromiseLike<T>,
    eventNameOrOptions?: string | EventTargetLike.HasEventTargetAddRemove.Options,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<T> {

    if ("evtDoneOrAborted" in ctxOrTarget) {

        assert(
            typeGuard<OneOrMany<EventTargetLike<T>> | PromiseLike<T>>(targetOrEventName) &&
            typeGuard<string | undefined>(eventNameOrOptions) &&
            typeGuard<EventTargetLike.HasEventTargetAddRemove.Options | undefined>(options)
        );

        return fromImpl(
            ctxOrTarget,
            targetOrEventName,
            eventNameOrOptions,
            options
        );

    } else {

        assert(
            typeGuard<string | undefined>(targetOrEventName) &&
            typeGuard<EventTargetLike.HasEventTargetAddRemove.Options | undefined>(eventNameOrOptions)
        );

        return fromImpl(
            undefined,
            ctxOrTarget,
            targetOrEventName,
            eventNameOrOptions
        );

    }

}
