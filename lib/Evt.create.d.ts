import type { Evt, StatefulEvt, NonPostableEvtLike, UnpackEvt } from "./types";
export declare function create<E extends NonPostableEvtLike<any> | undefined = NonPostableEvtLike<void>>(): Evt<UnpackEvt<E>>;
/**
 * https://docs.evt.land/api/evt/create
 * Return a new Evt<T> instance.
 */
export declare function create<T>(): Evt<T>;
/**
 * https://docs.evt.land/api/evt/create
 * Return a new StatefulEvt<T> instance.
 */
export declare function create<T>(initialState: T): StatefulEvt<T>;
export declare function create<E extends NonPostableEvtLike<any> | undefined>(initialState: UnpackEvt<E>): StatefulEvt<UnpackEvt<E>>;
