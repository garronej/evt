import { EvtBase } from "./EvtBase";
import { invokeMatcher } from "./EvtBaseProtected";
import { Handler, UserProvidedParams, ImplicitParams } from "./defs";

export class Evt<T> extends EvtBase<T> {

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

    private __createDelegate<U>(
        matcher: (data: T) => [U] | null,
    ): Evt<U> {

        const evtDelegate = new Evt<U>();

        this.attach_(
            matcher,
            transformedData => evtDelegate.post(transformedData)
        );

        return evtDelegate;

    }

    public createDelegate<U>(matcher: (data: T) => [U] | null): Evt<U>;
    public createDelegate<Q extends T>(matcher: (data: T) => data is Q): Evt<Q>;
    public createDelegate(matcher: (data: T) => boolean): Evt<T>;
    public createDelegate(): Evt<T>;
    public createDelegate<U>(matcher?: (data: T) => boolean | [U] | null): Evt<T | U> {

        return this.__createDelegate<T | U>(
            data => invokeMatcher<T, U>(
                matcher ?? (() => true),
                data
            )
        );

    }


}

/*
export namespace Evt {
    export type Unpack<T> = T extends Evt<infer U> ? U : never;
}
*/

export class VoidEvt extends Evt<void> {
    public post(): number {
        return super.post(undefined);
    }

    public postOnceMatched(): Promise<number> {
        return super.postOnceMatched(undefined);
    }
}
