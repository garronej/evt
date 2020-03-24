import { id } from "../../tools/typeSafety/id";
import { assert } from "../../tools/typeSafety/assert";
import { typeGuard } from "../../tools/typeSafety/typeGuard";
import { EventTargetLike } from "../types/EventTargetLike";
import { mergeImpl } from "./merge";
import { importProxy } from "../importProxy";
import /*type*/ * as dom from "../types/lib.dom";
type Evt<T>= import("../Evt").Evt<T>;
type EvtLike<T> = import("../Evt").EvtLike<T>;

type OneOrMany<T> = T | ArrayLike<T>;
type CtxLike<Result> = import("../Ctx").CtxLike<Result> & {
      getEvtDone(): EvtLike<unknown> & { attachOnce(callback: ()=> void): void; };
};

function fromImpl<T>(
    ctx: CtxLike<any> | undefined,
    target: OneOrMany<EventTargetLike<T>>,
    eventName?: string,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<T> {

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

    ctx?.getEvtDone().attachOnce(
        () => proxy.off(
            listener,
            eventName!,
            options
        )
    );

    proxy.on(listener, eventName!, options);

    return evt;

}

export function from<K extends keyof dom.HTMLElementEventMap>(
    ctx: CtxLike<any>,
    target: EventTargetLike.HTMLElement,
    eventName: K,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.HTMLElementEventMap[K]>;

export function from <K extends keyof dom.WindowEventMap>(
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



export function from<K extends keyof dom.HTMLElementEventMap>(
    target: EventTargetLike.HTMLElement,
    eventName: K,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.HTMLElementEventMap[K]>;
export function from <K extends keyof dom.WindowEventMap>(
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
    ctxOrTarget: CtxLike<any> | OneOrMany<EventTargetLike<T>>,
    targetOrEventName?: OneOrMany<EventTargetLike<T>> | string,
    eventNameOrOptions?: string | EventTargetLike.HasEventTargetAddRemove.Options,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<T> {

    if ("getEvtDone" in ctxOrTarget) {

        assert(
            typeGuard<OneOrMany<EventTargetLike<T>>>(targetOrEventName) &&
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
