export declare type EvtError = EvtError.Timeout | EvtError.Detached;
export declare namespace EvtError {
    class Timeout extends Error {
        readonly timeout: number;
        constructor(timeout: number);
    }
    class Detached extends Error {
        constructor();
    }
    class RacePromiseRejection extends Error {
        readonly onRejectedArgument: any;
        readonly i: number;
        readonly racer: PromiseLike<any>;
        constructor(onRejectedArgument: any, i: number, racer: PromiseLike<any>);
    }
}
