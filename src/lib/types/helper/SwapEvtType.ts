type StatefulEvt<T> = import("../interfaces").StatefulEvt<T>;
type StatefulNonPostableEvt<T> = import("../interfaces").StatefulNonPostableEvt<T>;
type Evt<T> = import("../interfaces").Evt<T>;
type NonPostableEvt<T> = import("../interfaces").NonPostableEvt<T>;
type EvtLike<T> = import("./UnpackEvt").EvtLike<T>;

export type SwapEvtType<E extends EvtLike<any>, T> =
    E extends StatefulEvt<any> ? StatefulEvt<T> :
    E extends StatefulNonPostableEvt<any> ? StatefulNonPostableEvt<T> :
    E extends Evt<any> ? Evt<T> :
    E extends NonPostableEvt<any> ? NonPostableEvt<T> :
    EvtLike<T>
    ;
