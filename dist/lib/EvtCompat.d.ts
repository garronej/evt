import { EvtBase } from "./EvtBase";
import { Handler, UserProvidedParams, ImplicitParams } from "./defs";
export declare class EvtCompat<T> extends EvtBase<T> {
    /**
     * https://garronej.github.io/ts-evt/#evtevtattach
     */
    readonly evtAttach: EvtBase<Handler<T, any>>;
    protected addHandler<U>(attachParams: UserProvidedParams<T, U>, implicitAttachParams: ImplicitParams): Handler<T, U>;
    /** https://garronej.github.io/ts-evt/#evtpostoncematched */
    postOnceMatched(data: T): Promise<number>;
    protected __createDelegate<U>(matcher: (data: T) => [U] | null): EvtCompat<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtcreatedelegate
     *
     * matcher - Transformative
     */
    createDelegate<U>(matcher: (data: T) => [U] | null): EvtCompat<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtcreatedelegate
     *
     * matcher - Type guard
     */
    createDelegate<Q extends T>(matcher: (data: T) => data is Q): EvtCompat<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtcreatedelegate
     *
     * matcher - Filter only
     */
    createDelegate(matcher: (data: T) => boolean): EvtCompat<T>;
    /** https://garronej.github.io/ts-evt/#evtcreatedelegate */
    createDelegate(): EvtCompat<T>;
}
/** https://garronej.github.io/ts-evt/#voidevt */
export declare class VoidEvtCompat extends EvtCompat<void> {
    post(): number;
    postOnceMatched(): Promise<number>;
}
