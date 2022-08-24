import type { StatefulReadonlyEvtLike, NonPostableEvtLike, NonPostableEvt, StatefulReadonlyEvt } from "../interfaces";
declare type ToNonPostableEvtBase<E extends NonPostableEvt<any>> = E extends StatefulReadonlyEvtLike<infer U> ? StatefulReadonlyEvt<U> : E extends NonPostableEvtLike<infer U> ? NonPostableEvt<U> : never;
declare type ToNonPostableEvtRecord<R extends {
    [key: string]: any;
}> = {
    [P in keyof R]: R[P] extends NonPostableEvt<any> ? ToNonPostableEvtBase<R[P]> : R[P];
};
/** https://docs.evt.land/api/helpertypes#tononpostableevt-less-than-e-greater-than */
export declare type ToNonPostableEvt<E extends ({
    [key: string]: any;
} | NonPostableEvt<any>)> = E extends NonPostableEvt<any> ? ToNonPostableEvtBase<E> : ToNonPostableEvtRecord<E>;
export {};
