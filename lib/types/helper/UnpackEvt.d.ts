import type { NonPostableEvtLike } from "../interfaces/NonPostableEvtLike";
declare type UnpackEvtBase<T extends NonPostableEvtLike<any>> = T extends NonPostableEvtLike<infer U> ? U : never;
declare type UnpackEvtRecord<T extends {
    [key: string]: any;
}> = {
    [P in keyof T]: T[P] extends NonPostableEvtLike<any> ? UnpackEvtBase<T[P]> : T[P];
};
declare type UnpackNonNullableEvt<T extends ({
    [key: string]: any;
} | NonPostableEvtLike<any>)> = T extends NonPostableEvtLike<any> ? UnpackEvtBase<T> : UnpackEvtRecord<T>;
/** https://docs.evt.land/api/helpertypes#unpackevt-less-than-e-greater-than */
export declare type UnpackEvt<T extends ({
    [key: string]: any;
} | NonPostableEvtLike<any> | undefined | null)> = UnpackNonNullableEvt<NonNullable<T>>;
export {};
