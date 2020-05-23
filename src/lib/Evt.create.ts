
import { importProxy } from "./importProxy";

type Evt<T> = import("./types/interfaces").Evt<T>;
type VoidEvt= import("./types/interfaces").VoidEvt;
type StatefulEvt<T> = import("./types/interfaces").StatefulEvt<T>;

/** 
 * https://docs.evt.land/api/evt/create
 * Return a new VoidEvt instance.
 */
export function create(): VoidEvt;
/** 
 * https://docs.evt.land/api/evt/create
 * Return a new Evt<T> instance.
 */
export function create<T>(): Evt<T>;
/** 
 * https://docs.evt.land/api/evt/create
 * Return a new StatefulEvt<T> instance.
 */
export function create<T>(initialState: T): StatefulEvt<T>;
export function create(...args: [] | [any] ): Evt<any> | StatefulEvt<any> {
    return args.length === 0 ? 
        new importProxy.Evt() : 
        new importProxy.StatefulEvt(args[0])
        ;
}