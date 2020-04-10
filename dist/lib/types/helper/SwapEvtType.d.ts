declare type StatefulEvt<T> = import("../interfaces").StatefulEvt<T>;
declare type StatefulReadonlyEvt<T> = import("../interfaces").StatefulReadonlyEvt<T>;
declare type Evt<T> = import("../interfaces").Evt<T>;
declare type NonPostableEvt<T> = import("../interfaces").NonPostableEvt<T>;
declare type EvtLike<T> = import("./UnpackEvt").EvtLike<T>;
declare type VoidEvt = import("../interfaces").VoidEvt;
declare type UseVoidEvt<E> = E extends Evt<void> ? VoidEvt : E;
/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export declare type SwapEvtType<E extends EvtLike<any>, T> = UseVoidEvt<E extends StatefulEvt<any> ? StatefulEvt<T> : E extends StatefulReadonlyEvt<any> ? StatefulReadonlyEvt<T> : E extends Evt<any> ? Evt<T> : E extends NonPostableEvt<any> ? NonPostableEvt<T> : EvtLike<T>>;
export {};
