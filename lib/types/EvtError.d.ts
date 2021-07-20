import * as _1 from "./EvtError.Timeout";
import * as _2 from "./EvtError.Detached";
export declare type EvtError = EvtError.Timeout | EvtError.Detached;
export declare namespace EvtError {
    type Timeout = typeof _1.Timeout["prototype"];
    const Timeout: {
        new (timeout: number): Timeout;
        readonly prototype: Timeout;
    };
    type Detached = typeof _2.Detached["prototype"];
    const Detached: {
        new (): Detached;
        readonly prototype: Detached;
    };
}
