
type EvtLike<T> = import("./UnpackEvt").EvtLike<T>;
type StatefulPostable<T> = import("../interfaces").StatefulPostable<T>;

//NOTE: Omit only introduced in 3.5
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type NonPostableEvt<T> = import("../interfaces").NonPostableEvt<T>;
type StatefulReadonlyEvt<T> = import("../interfaces").StatefulReadonlyEvt<T>;

type ToNonPostableEvtBase<T extends EvtLike<any>> =
    T extends StatefulReadonlyEvt<infer U> ? StatefulReadonlyEvt<U> :
    T extends NonPostableEvt<infer U> ? NonPostableEvt<U> :
    Omit<T, Exclude<keyof StatefulPostable<any>, "state">>
    ;

type ToNonPostableEvtRecord<T extends { [key: string]: any; }> = {
    [P in keyof T]: T[P] extends EvtLike<any> ? ToNonPostableEvtBase<T[P]> : T[P];
};

export type ToNonPostableEvt<T extends ({ [key: string]: any; } | EvtLike<any>)> =
    T extends EvtLike<any> ? ToNonPostableEvtBase<T> :
    ToNonPostableEvtRecord<T>
    ;


