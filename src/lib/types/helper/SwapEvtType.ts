import type {
    StatefulEvtLike, StatefulEvt,
    StatefulReadonlyEvtLike, StatefulReadonlyEvt,
    EvtLike, Evt,
    NonPostableEvtLike, NonPostableEvt
} from "../interfaces";

/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export type SwapEvtType<E extends NonPostableEvtLike<any>, T> =
    E extends StatefulEvtLike<any> ? StatefulEvt<T> :
    E extends StatefulReadonlyEvtLike<any> ? StatefulReadonlyEvt<T> :
    E extends EvtLike<any> ? Evt<T> :
    NonPostableEvt<T>
    ;
