import { EvtBase } from "./EvtBase";
import { Handler, UserProvidedParams, ImplicitParams } from "./defs";
export declare class EvtCompat<T> extends EvtBase<T> {
    readonly evtAttach: EvtBase<Handler<T, any>>;
    protected addHandler<U>(attachParams: UserProvidedParams<T, U>, implicitAttachParams: ImplicitParams): Handler<T, U>;
    /** Wait until an handler that match the event data have been attached
     * return a promise that resolve with post count.
     * The event is not posted synchronously when the candidate handler attach.
     *  */
    postOnceMatched(data: T): Promise<number>;
    protected __createDelegate<U>(matcher: (data: T) => [U] | null): EvtCompat<U>;
    createDelegate<U>(matcher: (data: T) => [U] | null): EvtCompat<U>;
    createDelegate<Q extends T>(matcher: (data: T) => data is Q): EvtCompat<Q>;
    createDelegate(matcher: (data: T) => boolean): EvtCompat<T>;
    createDelegate(): EvtCompat<T>;
}
export declare class VoidEvtCompat extends EvtCompat<void> {
    post(): number;
    postOnceMatched(): Promise<number>;
}
