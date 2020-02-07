import { EvtBase } from "./EvtBase";
import { Handler, UserProvidedParams, ImplicitParams } from "./defs";

export class Evt<T> extends EvtBase<T> {

    public readonly evtAttach = new EvtBase<Handler<T>>()

    protected addHandler(
        attachParams: UserProvidedParams<T>,
        implicitAttachParams: ImplicitParams
    ): Handler<T> {

        let handler = super.addHandler(attachParams, implicitAttachParams);

        this.evtAttach.post(handler);

        return handler;

    }

    /** Wait until an handler that match the event data have been attached
     * return a promise that resolve with post count */
    public async postOnceMatched(eventData: T): Promise<number> {

        if (!this.getHandlers().find(handler => handler.matcher(eventData))) {

            await this.evtAttach.waitFor(handler => handler.matcher(eventData));

        }

        return this.post(eventData);

    }


}

export namespace Evt {

    export type Unpack<T> = T extends Evt<infer U> ? U : never;

}

export class VoidEvt extends Evt<void> {
    public post(): number {
        return super.post(undefined);
    }

    public postOnceMatched(): Promise<number> {
        return super.postOnceMatched(undefined);
    }
}
