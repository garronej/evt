declare type EvtBaseProtected<T> = import("./EvtBaseProtected").EvtBaseProtected<T>;
export declare type UnpackEvt<T extends EvtBaseProtected<any>> = T extends EvtBaseProtected<infer U> ? U : never;
export {};
