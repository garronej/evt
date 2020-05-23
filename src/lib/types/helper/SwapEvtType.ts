type StatefulEvt<T> = import("../interfaces").StatefulEvt<T>;
type StatefulReadonlyEvt<T> = import("../interfaces").StatefulReadonlyEvt<T>;
type Evt<T> = import("../interfaces").Evt<T>;
type NonPostableEvt<T> = import("../interfaces").NonPostableEvt<T>;
type EvtLike<T> = import("./UnpackEvt").EvtLike<T>;
type VoidEvt = import("../interfaces").VoidEvt;

type UseVoidEvt<E> = E extends Evt<void> ? VoidEvt : E;

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
