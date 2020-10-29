declare type EvtLike<T> = import("./UnpackEvt").EvtLike<T>;
declare type StatefulPostable<T> = import("../interfaces").StatefulPostable<T>;
declare type Postable<T> = import("../interfaces").Postable<T>;
declare type NonPostableEvt<T> = import("../interfaces").NonPostableEvt<T>;
declare type StatefulReadonlyEvt<T> = import("../interfaces").StatefulReadonlyEvt<T>;
declare type StatefulEvt<T> = import("../interfaces").StatefulEvt<T>;
declare type Evt<T> = import("../interfaces").Evt<T>;
declare type VoidEvt = import("../interfaces").VoidEvt;
declare type UseVoidEvt<E> = E extends Evt<void> ? VoidEvt : E;
declare type ToPostableEvtBase<E extends EvtLike<any>> = UseVoidEvt<E extends StatefulReadonlyEvt<infer U> ? StatefulEvt<U> : E extends NonPostableEvt<infer U> ? Evt<U> : E extends {
    state: infer U;
} ? E & StatefulPostable<U> : E & Postable<E>>;
declare type ToPostableEvtRecord<R extends {
    [key: string]: any;
}> = {
    [P in keyof R]: R[P] extends EvtLike<any> ? ToPostableEvtBase<R[P]> : R[P];
};
/** https://docs.evt.land/api/helpertypes#topostableevt-less-than-e-greater-than */
export declare type ToPostableEvt<E extends ({
    [key: string]: any;
} | EvtLike<any>)> = E extends EvtLike<any> ? ToPostableEvtBase<E> : ToPostableEvtRecord<E>;
export {};
