
import { NonPostable } from "./NonPostable";

type EvtBaseProtected<T> = import("../EvtBaseProtected").EvtBaseProtected<T>;

/** https://garronej.github.io/ts-evt/#unpackevttypeof-evt */
export type UnpackEvt<T extends NonPostable<EvtBaseProtected<any>>>= 
    T extends NonPostable<EvtBaseProtected<infer U>> ? U : never
    ;

