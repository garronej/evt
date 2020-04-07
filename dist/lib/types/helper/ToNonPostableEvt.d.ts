declare type EvtLike<T> = import("./UnpackEvt").EvtLike<T>;
declare type Postable<T> = import("../interfaces").Postable<T>;
/**
 * Construct a type with the properties of T except for those in type K.
 */
declare type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
declare type NonPostableEvt<T> = import("../interfaces").NonPostableEvt<T>;
declare type StatefulNonPostableEvt<T> = import("../interfaces").StatefulNonPostableEvt<T>;
declare type ToNonPostableEvtBase<T extends EvtLike<any>> = T extends StatefulNonPostableEvt<infer U> ? StatefulNonPostableEvt<U> : T extends NonPostableEvt<infer U> ? NonPostableEvt<U> : Omit<T, keyof Postable<any>>;
declare type ToNonPostableEvtRecord<T extends {
    [key: string]: any;
}> = {
    [P in keyof T]: T[P] extends EvtLike<any> ? ToNonPostableEvtBase<T[P]> : T[P];
};
export declare type ToNonPostableEvt<T extends ({
    [key: string]: any;
} | EvtLike<any>)> = T extends EvtLike<any> ? ToNonPostableEvtBase<T> : ToNonPostableEvtRecord<T>;
export {};
