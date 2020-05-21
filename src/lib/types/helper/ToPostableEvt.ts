
import type { EvtLike } from "./UnpackEvt";
import type { StatefulPostable } from "../interfaces";
import type { Postable } from "../interfaces";
import type { NonPostableEvt } from "../interfaces";
import type { StatefulReadonlyEvt } from "../interfaces";
import type { StatefulEvt } from "../interfaces";
import type { Evt } from "../interfaces";
import type { VoidEvt } from "../interfaces";


type UseVoidEvt<E> = E extends Evt<void> ? VoidEvt : E;

type ToPostableEvtBase<E extends EvtLike<any>> =
    UseVoidEvt<
        E extends StatefulReadonlyEvt<infer U> ? StatefulEvt<U> :
        E extends NonPostableEvt<infer U> ? Evt<U> :
        E extends { state: infer U } ? E & StatefulPostable<U> :
        E & Postable<E>
    >
    ;

type ToPostableEvtRecord<R extends { [key: string]: any; }> = {
    [P in keyof R]: R[P] extends EvtLike<any> ? ToPostableEvtBase<R[P]> : R[P];
};

/** https://docs.evt.land/api/helpertypes#topostableevt-less-than-e-greater-than */
export type ToPostableEvt<E extends ({ [key: string]: any; } | EvtLike<any>)> =
    E extends EvtLike<any> ? ToPostableEvtBase<E> :
    ToPostableEvtRecord<E>
    ;

