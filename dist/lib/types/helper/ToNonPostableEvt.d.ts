declare type EvtLike<T> = import("./UnpackEvt").EvtLike<T>;
declare type StatefulPostable<T> = import("../interfaces").StatefulPostable<T>;
/**
 * Construct a type with the properties of T except for those in type K.
 */
declare type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
declare type NonPostableEvt<T> = import("../interfaces").NonPostableEvt<T>;
declare type StatefulReadonlyEvt<T> = import("../interfaces").StatefulReadonlyEvt<T>;
declare type ToNonPostableEvtBase<T extends EvtLike<any>> = T extends StatefulReadonlyEvt<infer U> ? StatefulReadonlyEvt<U> : T extends NonPostableEvt<infer U> ? NonPostableEvt<U> : Omit<T, Exclude<keyof StatefulPostable<any>, "state">>;
declare type ToNonPostableEvtRecord<T extends {
    [key: string]: any;
}> = {
    [P in keyof T]: T[P] extends EvtLike<any> ? ToNonPostableEvtBase<T[P]> : T[P];
};
export declare type ToNonPostableEvt<T extends ({
    [key: string]: any;
} | EvtLike<any>)> = T extends EvtLike<any> ? ToNonPostableEvtBase<T> : ToNonPostableEvtRecord<T>;
export {};
