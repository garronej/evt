import { NonPostable } from "./NonPostable";
declare type EvtBaseProtected<T> = import("../EvtBaseProtected").EvtBaseProtected<T>;
/** https://garronej.github.io/ts-evt/#unpackevttypeof-evt */
export declare type UnpackEvt<T extends NonPostable<EvtBaseProtected<any>>> = T extends NonPostable<EvtBaseProtected<infer U>> ? U : never;
export {};
