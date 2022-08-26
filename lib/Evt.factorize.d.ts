import type { FactorizeEvt, NonPostableEvtLike } from "./types";
/** https://docs.evt.land/api/evt/factorize */
export declare function factorize<E extends NonPostableEvtLike<any>>(evt: E): FactorizeEvt<E>;
