
import * as _1 from "./EvtError.Timeout";
import * as _2 from "./EvtError.Detached";

export type EvtError =
    EvtError.Timeout |
    EvtError.Detached
    ;
export namespace EvtError {

    export type Timeout = typeof _1.Timeout["prototype"];

    export const Timeout: {
        new(timeout: number): Timeout;
        readonly prototype: Timeout;
    } = _1.Timeout;

    export type Detached = typeof _2.Detached["prototype"];

    export const Detached: {
        new(): Detached;
        readonly prototype: Detached;
    } = _2.Detached;

}
