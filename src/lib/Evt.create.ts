
import { importProxy } from "./importProxy";
import type { Evt, StatefulEvt, NonPostableEvtLike, UnpackEvt } from "./types";

export function create<E extends NonPostableEvtLike<any> | undefined = NonPostableEvtLike<void>>(): Evt<UnpackEvt<E>>;
/** 
 * https://docs.evt.land/api/evt/create
 * Return a new Evt<T> instance.
 */
export function create<T>(): Evt<T>;
/** 
 * https://docs.evt.land/api/evt/create
 * Return a new StatefulEvt<T> instance.
 */
export function create<T>(initialState: T ): StatefulEvt<T>;
export function create<E extends NonPostableEvtLike<any> | undefined>(initialState: UnpackEvt<E> ): StatefulEvt<UnpackEvt<E>>;
export function create(...args: [] | [any] ): Evt<any> | StatefulEvt<any> {
    return args.length === 0 ? 
        new importProxy.Evt() : 
        new importProxy.StatefulEvt(args[0])
        ;
}