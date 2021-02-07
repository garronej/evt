import type { StatefulEvt, StatefulReadonlyEvt, Evt, NonPostableEvt, VoidEvt } from "../interfaces";
import type { EvtLike } from "./EvtLike";

export type UseVoidEvt<E> = E extends Evt<void> ? VoidEvt : E;

/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export type SwapEvtType<E extends EvtLike<any>, T> =
    UseVoidEvt<
        E extends StatefulEvt<any> ? StatefulEvt<T> :
        E extends StatefulReadonlyEvt<any> ? StatefulReadonlyEvt<T> :
        E extends Evt<any> ? Evt<T> :
        E extends NonPostableEvt<any> ? NonPostableEvt<T> :
        EvtLike<T>
    >
    ;
