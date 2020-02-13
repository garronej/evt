import { EvtBase } from "./EvtBase";
import { invokeMatcher } from "./EvtBaseProtected";
import { Handler, UserProvidedParams, ImplicitParams } from "./defs";

export class EvtCompat<T> extends EvtBase<T> {

    public readonly evtAttach = new EvtBase<Handler<T, any>>()

    protected addHandler<U>(
        attachParams: UserProvidedParams<T, U>,
        implicitAttachParams: ImplicitParams
    ): Handler<T, U> {

        let handler = super.addHandler(attachParams, implicitAttachParams);

        this.evtAttach.post(handler);

        return handler;

    }

    /** Wait until an handler that match the event data have been attached
     * return a promise that resolve with post count.
     * The event is not posted synchronously when the candidate handler attach.
     *  */
    public async postOnceMatched(data: T): Promise<number> {

        if (!this.getHandlers().find(handler => handler.matcher(data))) {

            await this.evtAttach.waitFor(
                handler => invokeMatcher(handler.matcher, data) !== null
            );

        }

        return this.post(data);

    }

    protected __createDelegate<U>(
        matcher: (data: T) => [U] | null,
    ): EvtCompat<U> {

        const evtDelegate = new EvtCompat<U>();

        this.$attach(
            matcher,
            transformedData => evtDelegate.post(transformedData)
        );

        return evtDelegate;

    }

    public createDelegate<U>(matcher: (data: T) => [U] | null): EvtCompat<U>;
    public createDelegate<Q extends T>(matcher: (data: T) => data is Q): EvtCompat<Q>;
    public createDelegate(matcher: (data: T) => boolean): EvtCompat<T>;
    public createDelegate(): EvtCompat<T>;
    public createDelegate<U>(matcher?: (data: T) => boolean | [U] | null): EvtCompat<T | U> {

        return this.__createDelegate<T | U>(
            data => invokeMatcher<T, U>(
                matcher ?? (() => true),
                data
            )
        );

    }


}

export class VoidEvtCompat extends EvtCompat<void> {
    public post(): number {
        return super.post(undefined);
    }

    public postOnceMatched(): Promise<number> {
        return super.postOnceMatched(undefined);
    }
}
