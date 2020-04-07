declare type StatefulEvt<T> = import("../interfaces").StatefulEvt<T>;
declare type StatefulNonPostableEvt<T> = import("../interfaces").StatefulNonPostableEvt<T>;
declare type Evt<T> = import("../interfaces").Evt<T>;
declare type NonPostableEvt<T> = import("../interfaces").NonPostableEvt<T>;
declare type EvtLike<T> = import("./UnpackEvt").EvtLike<T>;
export declare type SwapEvtType<E extends EvtLike<any>, T> = E extends StatefulEvt<any> ? StatefulEvt<T> : E extends StatefulNonPostableEvt<any> ? StatefulNonPostableEvt<T> : E extends Evt<any> ? Evt<T> : E extends NonPostableEvt<any> ? NonPostableEvt<T> : EvtLike<T>;
export {};
