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

    private __createDelegate<Q extends T>(
        matcher: (data: T) => data is Q,
    ): Evt<Q> {

        const evtDelegate = new Evt<Q>();

        this.attach(
            matcher,
            data => evtDelegate.post(data)
        );

        return evtDelegate;

    }

    public createDelegate<Q extends T>(matcher: (data: T) => data is Q): Evt<Q>;
    public createDelegate(matcher: (data: T) => boolean): Evt<T>;
    public createDelegate(matcher: (data: T) => boolean): Evt<T> {

        return this.__createDelegate(
            (data): data is T => matcher(data)
        );

    }

    /*
    public createDelegateExperiment<R>( matcher: (data: T)=> Evt.Formated<R>): Evt<R>;
    public createDelegateExperiment<Q extends T>( matcher: (data: T)=> data is Q): Evt<Q>;
    public createDelegateExperiment(matcher: (data: T)=> boolean): Evt<T>;
    public createDelegateExperiment( matcher: (data: T)=> boolean | Evt.Formated<any>): Evt<any> {

        return this.__createDelegateExperiment(
            data => { 

                const v= matcher(data)

                return typeof v === "boolean" ?
                     v ? Evt.Formated.Matched.create(data) : Evt.Formated.NotMatched.inst
                     :
                     v
                     ;


            }
        );

    }

    public __createDelegateExperiment<R>(matcher: (data: T) => Evt.Formated<R>): Evt<R> {


        const evtDelegate = new Evt<R>();

        this.attach(
            data => {

                const formated = matcher(data);

                if (formated.isMatched === false) {
                    return;
                }

                evtDelegate.post(formated.formatedData);

            }
        );

        return evtDelegate;

    }
    */


}

/*
type Circle = {
    type: "CIRCLE";
    radius: number;
};

type Square = {
    type: "SQUARE";
    sideLength: number;
};

type Shape = Circle | Square;

const matchCircle = (shape: Shape): shape is Circle =>
    shape.type === "CIRCLE";

const evtShape = new Evt<Shape>();


const evtRadius = evtShape.createDelegateExperiment(
    shape => shape.type === "CIRCLE" ?
        Evt.Formated.Matched.create(shape.radius) :
        Evt.Formated.NotMatched.inst
);

const evtCircle = evtShape.createDelegateExperiment(
    matchCircle
);


const evtBigShape = evtShape.createDelegateExperiment(
    shape => shape.type === "SQUARE"
);
*/


export namespace Evt {

    export type Unpack<T> = T extends Evt<infer U> ? U : never;

    /*
    export type Formated<T> = Formated.Matched<T> | Formated.NotMatched;

    export namespace Formated {

        type Common = {
            _formattedBrand: any;
        };

        export type Matched<T> = Common & {
            isMatched: true;
            formatedData: T
        };

        export namespace Matched {

            export function create<T>(formatedData: T): Matched<T> {

                const out: Omit<Matched<T>, "_formattedBrand"> = {
                    "isMatched": true,
                    formatedData
                };

                return out as Matched<T>;

            }

        }

        export type NotMatched = Common & {
            isMatched: false;
        };

        export namespace NotMatched {

            export const inst: NotMatched = (() => {


                const out: Omit<NotMatched, "_formattedBrand"> = {
                    "isMatched": false,
                };

                return out as NotMatched;


            })();

        }

    }
    */


}

export class VoidEvt extends Evt<void> {
    public post(): number {
        return super.post(undefined);
    }

    public postOnceMatched(): Promise<number> {
        return super.postOnceMatched(undefined);
    }
}
