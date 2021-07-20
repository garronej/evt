type EvtLike<T> = import("./UnpackEvt.ts").EvtLike<T>;
type StatefulPostable<T> = import("../interfaces/index.ts").StatefulPostable<T>;
type Postable<T> = import("../interfaces/index.ts").Postable<T>;
type NonPostableEvt<T> = import("../interfaces/index.ts").NonPostableEvt<T>;
type StatefulReadonlyEvt<T> = import("../interfaces/index.ts").StatefulReadonlyEvt<T>;
type StatefulEvt<T> = import("../interfaces/index.ts").StatefulEvt<T>;
type Evt<T> = import("../interfaces/index.ts").Evt<T>;
type VoidEvt = import("../interfaces/index.ts").VoidEvt;

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

