import type { NonPostableEvtLike, StatefulReadonlyEvtLike, StatefulEvt, Evt } from "../interfaces";
declare type ToPostableEvtBase<E extends NonPostableEvtLike<any>> = E extends StatefulReadonlyEvtLike<infer U> ? StatefulEvt<U> : E extends NonPostableEvtLike<infer U> ? Evt<U> : never;
declare type ToPostableEvtRecord<R extends {
    [key: string]: any;
}> = {
    [P in keyof R]: R[P] extends NonPostableEvtLike<any> ? ToPostableEvtBase<R[P]> : R[P];
};
/** https://docs.evt.land/api/helpertypes#topostableevt-less-than-e-greater-than */
export declare type ToPostableEvt<E extends ({
    [key: string]: any;
} | NonPostableEvtLike<any>)> = E extends NonPostableEvtLike<any> ? ToPostableEvtBase<E> : ToPostableEvtRecord<E>;
export {};
