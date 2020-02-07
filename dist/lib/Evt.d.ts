import { EvtBase } from "./EvtBase";
import { Handler, UserProvidedParams, ImplicitParams } from "./defs";
export declare class Evt<T> extends EvtBase<T> {
    readonly evtAttach: EvtBase<Handler<T>>;
    protected addHandler(attachParams: UserProvidedParams<T>, implicitAttachParams: ImplicitParams): Handler<T>;
    /** Wait until an handler that match the event data have been attached
     * return a promise that resolve with post count */
    postOnceMatched(eventData: T): Promise<number>;
}
export declare namespace Evt {
    type Unpack<T> = T extends Evt<infer U> ? U : never;
}
export declare class VoidEvt extends Evt<void> {
    post(): number;
    postOnceMatched(): Promise<number>;
}
