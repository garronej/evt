
import { Evt } from "../Evt";
import { id, assert, typeGuard } from "../../tools/typeSafety";
import { EventTargetLike } from "../types/EventTargetLike";
import { mergeImpl } from "./merge";
type Ref = import("../Ref").Ref;
type RefConstructor = typeof import("../Ref").Ref;

type OneOrMany<T> = T | ArrayLike<T>;

function fromEventImpl<T>(
    ref: Ref | undefined,
    target: OneOrMany<EventTargetLike<T>>,
    eventName?: string,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<T> {

    if ("length" in target) {
        return mergeImpl<Evt<T>>(
            ref,
            Array.from(target).map(
                target => fromEventImpl<T>(ref, target, eventName, options)
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

    const evt = new Evt<T>();

    const listener = (data: T) => evt.post(data);

    ref?.evtDetached.attachOnce(
        () => proxy.off(
            listener,
            eventName!,
            options
        )
    );

    proxy.on(listener, eventName!, options);

    return evt;

}

export function fromEvent<T>(
    ref: Ref,
    target: OneOrMany<
        EventTargetLike.NodeStyleEventEmitter |
        EventTargetLike.JQueryStyleEventEmitter
    >,
    eventName: string
): Evt<T>;
export function fromEvent<T>(
    ref: Ref,
    target: OneOrMany<
        EventTargetLike.HasEventTargetAddRemove<T>
    >,
    eventName: string,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<T>;
export function fromEvent<T>(
    ref: Ref,
    target: OneOrMany<EventTargetLike.RxJSSubject<T>>
): Evt<T>;

export function fromEvent<T>(
    target: OneOrMany<
        EventTargetLike.NodeStyleEventEmitter |
        EventTargetLike.JQueryStyleEventEmitter
    >,
    eventName: string
): Evt<T>;
export function fromEvent<T>(
    target: OneOrMany<
        EventTargetLike.HasEventTargetAddRemove<T>
    >,
    eventName: string,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<T>;
export function fromEvent<T>(
    target: OneOrMany<EventTargetLike.RxJSSubject<T>>
): Evt<T>;

export function fromEvent<T>(
    refOrTarget: Ref | OneOrMany<EventTargetLike<T>>,
    targetOrEventName?: OneOrMany<EventTargetLike<T>> | string,
    eventNameOrOptions?: string | EventTargetLike.HasEventTargetAddRemove.Options,
    options?: EventTargetLike.HasEventTargetAddRemove.Options
): Evt<T> {

    if (
        id<RefConstructor>(
            Object.getPrototypeOf(refOrTarget)
                .constructor
        ).__RefForEvtBrand === true
    ) {

        assert(
            typeGuard.dry<Ref>(refOrTarget) &&
            typeGuard.dry<OneOrMany<EventTargetLike<T>>>(targetOrEventName) &&
            typeGuard.dry<string | undefined>(eventNameOrOptions) &&
            typeGuard.dry<EventTargetLike.HasEventTargetAddRemove.Options | undefined>(options)
        );

        return fromEventImpl(
            refOrTarget,
            targetOrEventName,
            eventNameOrOptions,
            options
        );

    } else {

        assert(
            typeGuard.dry<OneOrMany<EventTargetLike<T>>>(refOrTarget) &&
            typeGuard.dry<string | undefined>(targetOrEventName) &&
            typeGuard.dry<EventTargetLike.HasEventTargetAddRemove.Options | undefined>(eventNameOrOptions)
        );

        return fromEventImpl(
            undefined,
            refOrTarget,
            targetOrEventName,
            eventNameOrOptions
        );

    }

}
