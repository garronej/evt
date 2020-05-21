

import type { EvtLike } from "./UnpackEvt";
import type { StatefulPostable } from "../interfaces";
import type { NonPostableEvt } from "../interfaces";
import type { StatefulReadonlyEvt } from "../interfaces";


//NOTE: Omit only introduced in 3.5
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;


type ToNonPostableEvtBase<E extends EvtLike<any>> =
    E extends StatefulReadonlyEvt<infer U> ? StatefulReadonlyEvt<U> :
    E extends NonPostableEvt<infer U> ? NonPostableEvt<U> :
    Omit<E, Exclude<keyof StatefulPostable<any>, "state">>
    ;

type ToNonPostableEvtRecord<R extends { [key: string]: any; }> = {
    [P in keyof R]: R[P] extends EvtLike<any> ? ToNonPostableEvtBase<R[P]> : R[P];
};

/** https://docs.evt.land/api/helpertypes#tononpostableevt-less-than-e-greater-than */
export type ToNonPostableEvt<E extends ({ [key: string]: any; } | EvtLike<any>)> =
    E extends EvtLike<any> ? ToNonPostableEvtBase<E> :
    ToNonPostableEvtRecord<E>
    ;


