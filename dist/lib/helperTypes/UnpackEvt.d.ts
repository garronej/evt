import { NonPostable } from "./NonPostable";
import { OneShot } from "./OneShot";
declare type EvtCompat<T> = import("../EvtCompat").EvtCompat<T>;
declare type EvtBaseProtected<T> = import("../EvtBaseProtected").EvtBaseProtected<T>;
/** https://garronej.github.io/ts-evt/#unpackevttypeof-evt */
export declare type UnpackEvt<T extends NonPostable<EvtBaseProtected<any>> | OneShot<EvtCompat<any>>> = T extends NonPostable<EvtBaseProtected<infer U>> ? U : T extends OneShot<EvtCompat<infer U>> ? U : never;
export {};
