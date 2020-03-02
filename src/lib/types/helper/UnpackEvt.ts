
import { NonPostable } from "./NonPostable";
import { OneShot } from "./OneShot";

type Evt<T> = import("../../Evt").Evt<T>;
type EvtCore<T> = import("../../EvtCore").EvtCore<T>;

/** https://garronej.github.io/ts-evt/#unpackevttypeof-evt */
export type UnpackEvt<T extends NonPostable<EvtCore<any>> | OneShot<Evt<any>>> =
    T extends NonPostable<EvtCore<infer U>> ? U :
    T extends OneShot<Evt<infer U>> ? U : never
    ;

