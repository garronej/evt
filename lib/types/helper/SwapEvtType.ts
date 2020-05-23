type StatefulEvt<T> = import("../interfaces/index.ts").StatefulEvt<T>;
type StatefulReadonlyEvt<T> = import("../interfaces/index.ts").StatefulReadonlyEvt<T>;
type Evt<T> = import("../interfaces/index.ts").Evt<T>;
type NonPostableEvt<T> = import("../interfaces/index.ts").NonPostableEvt<T>;
type EvtLike<T> = import("./UnpackEvt.ts").EvtLike<T>;
type VoidEvt = import("../interfaces/index.ts").VoidEvt;

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
