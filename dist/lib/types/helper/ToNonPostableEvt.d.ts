declare type EvtLike<T> = import("./UnpackEvt").EvtLike<T>;
declare type StatefulPostable<T> = import("../interfaces").StatefulPostable<T>;
declare type NonPostableEvt<T> = import("../interfaces").NonPostableEvt<T>;
declare type StatefulReadonlyEvt<T> = import("../interfaces").StatefulReadonlyEvt<T>;
/**
 * Construct a type with the properties of T except for those in type K.
 */
declare type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
declare type ToNonPostableEvtBase<E extends EvtLike<any>> = E extends StatefulReadonlyEvt<infer U> ? StatefulReadonlyEvt<U> : E extends NonPostableEvt<infer U> ? NonPostableEvt<U> : Omit<E, Exclude<keyof StatefulPostable<any>, "state">>;
declare type ToNonPostableEvtRecord<R extends {
    [key: string]: any;
}> = {
    [P in keyof R]: R[P] extends EvtLike<any> ? ToNonPostableEvtBase<R[P]> : R[P];
};
/** https://docs.evt.land/api/helpertypes#tononpostableevt-less-than-e-greater-than */
export declare type ToNonPostableEvt<E extends ({
    [key: string]: any;
} | EvtLike<any>)> = E extends EvtLike<any> ? ToNonPostableEvtBase<E> : ToNonPostableEvtRecord<E>;
export {};
