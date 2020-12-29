import { id } from "../tools/typeSafety/id";
import { assert } from "../tools/typeSafety/assert";
import { typeGuard } from "../tools/typeSafety/typeGuard";
import { mergeImpl } from "./Evt.merge";
import { importProxy } from "./importProxy";

import * as _1 from "./types/EventTargetLike";

namespace dom {

    export type HTMLElementEventMap = import("./types/lib.dom").HTMLElementEventMap;
    export type WindowEventMap = import("./types/lib.dom").WindowEventMap;
    export type DocumentEventMap = import("./types/lib.dom").DocumentEventMap;

}

type Evt<T>= import("./types/interfaces/Evt").Evt<T>;
type EvtLike<T> = import("./types/helper/UnpackEvt").EvtLike<T>;

type OneOrMany<T> = T | ArrayLike<T>;
type CtxLike<Result> = import("./types/interfaces").CtxLike<Result> & {
      evtDoneOrAborted: EvtLike<unknown> & { postCount: number; attachOnce(callback: ()=> void): void; };
};

function fromImpl<T>(
    ctx: CtxLike<any> | undefined,
    target: OneOrMany<_1.EventTargetLike<T>> | PromiseLike<T>,
    eventName?: string,
    options?: _1.EventTargetLike.HasEventTargetAddRemove.Options
): Evt<T> {

    const matchEventTargetLike =
        (target_: typeof target): target_ is _1.EventTargetLike<T> =>
            _1.z_2.canBe(target_);

    if (!matchEventTargetLike(target)) {

        if ("then" in target) {

            const evt = new importProxy.Evt<T>();

            const isCtxDone = (() => {

                const getEvtDonePostCount = () => ctx?.evtDoneOrAborted.postCount;

                const n = getEvtDonePostCount();

                return () => n !== getEvtDonePostCount();

            })();

            target.then(data => {

                if (isCtxDone()) {
                    return;
                }

                evt.post(data);

            });

            return evt;

        }

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
        options?: _1.EventTargetLike.HasEventTargetAddRemove.Options
    ) => void;

    let proxy: {
        on: ProxyMethod<T>;
        off: ProxyMethod<T>;
    };

    if (_1.z_2.NodeStyleEventEmitter_match(target)) {
        proxy = {
            "on": (listener, eventName) => target.addListener(eventName, listener),
            "off": (listener, eventName) => target.removeListener(eventName, listener)
        };
    } else if (_1.z_2.JQueryStyleEventEmitter_match(target)) {
        proxy = {
            "on": (listener, eventName) => target.on(eventName, listener),
            "off": (listener, eventName) => target.off(eventName, listener)
        };
    } else if (_1.z_2.HasEventTargetAddRemove_match(target)) {
        proxy = {
            "on": (listener, eventName, options) => target.addEventListener(eventName, listener, options),
            "off": (listener, eventName, options) => target.removeEventListener(eventName, listener, options)
        };
    } else if (_1.z_2.RxJSSubject_match(target)) {

        let subscription: _1.EventTargetLike.RxJSSubject.Subscription;

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
    target: _1.EventTargetLike.HTMLElement,
    eventName: K,
    options?: _1.EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.HTMLElementEventMap[K]>;

export function from<K extends keyof dom.WindowEventMap>(
    ctx: CtxLike<any>,
    target: _1.EventTargetLike.Window,
    eventName: K,
    options?: _1.EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.WindowEventMap[K]>;

export function from<K extends keyof dom.DocumentEventMap>(
    ctx: CtxLike<any>,
    target: _1.EventTargetLike.Document,
    eventName: K,
    options?: _1.EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.DocumentEventMap[K]>;

export function from<T>(
    ctx: CtxLike<any>,
    target: OneOrMany<
        _1.EventTargetLike.NodeStyleEventEmitter |
        _1.EventTargetLike.JQueryStyleEventEmitter
    >,
    eventName: string
): Evt<T>;
export function from<T>(
    ctx: CtxLike<any>,
    target: OneOrMany<
        _1.EventTargetLike.HasEventTargetAddRemove<T>
    >,
    eventName: string,
    options?: _1.EventTargetLike.HasEventTargetAddRemove.Options
): Evt<T>;
export function from<T>(
    ctx: CtxLike<any>,
    target: OneOrMany<_1.EventTargetLike.RxJSSubject<T>>
): Evt<T>;

export function from<T>(
    ctx: CtxLike<any>,
    target: PromiseLike<T>
): Evt<T>;


export function from<K extends keyof dom.HTMLElementEventMap>(
    target: _1.EventTargetLike.HTMLElement,
    eventName: K,
    options?: _1.EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.HTMLElementEventMap[K]>;
export function from<K extends keyof dom.WindowEventMap>(
    target: _1.EventTargetLike.Window,
    eventName: K,
    options?: _1.EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.WindowEventMap[K]>;
export function from<K extends keyof dom.DocumentEventMap>(
    target: _1.EventTargetLike.Document,
    eventName: K,
    options?: _1.EventTargetLike.HasEventTargetAddRemove.Options
): Evt<dom.DocumentEventMap[K]>;
export function from<T>(
    target: OneOrMany<
        _1.EventTargetLike.NodeStyleEventEmitter |
        _1.EventTargetLike.JQueryStyleEventEmitter
    >,
    eventName: string
): Evt<T>;
export function from<T>(
    target: OneOrMany<
        _1.EventTargetLike.HasEventTargetAddRemove<T>
    >,
    eventName: string,
    options?: _1.EventTargetLike.HasEventTargetAddRemove.Options
): Evt<T>;
export function from<T>(
    target: OneOrMany<_1.EventTargetLike.RxJSSubject<T>>
): Evt<T>;
export function from<T>(
    target: PromiseLike<T>
): Evt<T>;

export function from<T>(
    ctxOrTarget: CtxLike<any> | OneOrMany<_1.EventTargetLike<T>> | PromiseLike<T>,
    targetOrEventName?: OneOrMany<_1.EventTargetLike<T>> | string | PromiseLike<T>,
    eventNameOrOptions?: string | _1.EventTargetLike.HasEventTargetAddRemove.Options,
    options?: _1.EventTargetLike.HasEventTargetAddRemove.Options
): Evt<T> {

    if ("evtDoneOrAborted" in ctxOrTarget) {

        assert(
            typeGuard<OneOrMany<_1.EventTargetLike<T>> | PromiseLike<T>>(targetOrEventName) &&
            typeGuard<string | undefined>(eventNameOrOptions) &&
            typeGuard<_1.EventTargetLike.HasEventTargetAddRemove.Options | undefined>(options)
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
            typeGuard<_1.EventTargetLike.HasEventTargetAddRemove.Options | undefined>(eventNameOrOptions)
        );

        return fromImpl(
            undefined,
            ctxOrTarget,
            targetOrEventName,
            eventNameOrOptions
        );

    }

}
