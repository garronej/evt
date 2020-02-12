import { EvtBase } from "./EvtBase";
import { Handler, UserProvidedParams, ImplicitParams } from "./defs";
export declare class Evt<T> extends EvtBase<T> {
    readonly evtAttach: EvtBase<Handler<T, any>>;
    protected addHandler<U>(attachParams: UserProvidedParams<T, U>, implicitAttachParams: ImplicitParams): Handler<T, U>;
    /** Wait until an handler that match the event data have been attached
     * return a promise that resolve with post count.
     * The event is not posted synchronously when the candidate handler attach.
     *  */
    postOnceMatched(data: T): Promise<number>;
    private __createDelegate;
    createDelegate<U>(matcher: (data: T) => [U] | null): Evt<U>;
    createDelegate<Q extends T>(matcher: (data: T) => data is Q): Evt<Q>;
    createDelegate(matcher: (data: T) => boolean): Evt<T>;
    createDelegate(): Evt<T>;
}
export declare namespace Evt {
    type Unpack<T> = T extends Evt<infer U> ? U : never;
}
export declare class VoidEvt extends Evt<void> {
    post(): number;
    postOnceMatched(): Promise<number>;
}
