export declare type EvtError = EvtError.Timeout | EvtError.Detached;
export declare namespace EvtError {
    class Timeout extends Error {
        readonly timeout: number;
        constructor(timeout: number);
    }
    class Detached extends Error {
        constructor();
    }
}
