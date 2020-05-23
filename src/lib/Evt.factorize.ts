
import { FactorizeEvt } from "./types/helper/FactorizeEvt";

type EvtLike<T> = import("./types/helper/UnpackEvt").EvtLike<T>;

/** https://docs.evt.land/api/evt/factorize */
export function factorize<E extends EvtLike<any>>(
    evt: E
): FactorizeEvt<E> {
    return evt as any;
}

/*
import { Evt } from "./Evt";
const x: Evt<boolean> = loosenType(new Evt<true>()); x;
const y: Evt<boolean> = loosenType(new Evt<number>()); y;
*/