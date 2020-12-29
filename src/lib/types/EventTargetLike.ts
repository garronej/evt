
import { typeGuard } from "../../tools/typeSafety";

export const z_2 = {
    "RxJSSubject_match":
        function match<T>(eventTarget: EventTargetLike<T>): eventTarget is EventTargetLike.RxJSSubject<T> {
            return (
                typeGuard<EventTargetLike.RxJSSubject<T>>(eventTarget) &&
                eventTarget instanceof Object &&
                typeof eventTarget.subscribe === "function"
            );
        },
    "NodeStyleEventEmitter_match":
        function match<T>(eventTarget: EventTargetLike<T>): eventTarget is EventTargetLike.NodeStyleEventEmitter {
            return (
                typeGuard<EventTargetLike.NodeStyleEventEmitter>(eventTarget) &&
                eventTarget instanceof Object &&
                typeof eventTarget.addListener === "function" &&
                typeof eventTarget.removeListener === "function"
            );
        },
    "JQueryStyleEventEmitter_match":
        function match<T>(eventTarget: EventTargetLike<T>): eventTarget is EventTargetLike.JQueryStyleEventEmitter {
            return (
                typeGuard<EventTargetLike.JQueryStyleEventEmitter>(eventTarget) &&
                eventTarget instanceof Object &&
                typeof eventTarget.on === "function" &&
                typeof eventTarget.off === "function"
            );
        },
    "HasEventTargetAddRemove_match":

        function match<T>(eventTarget: EventTargetLike<T>): eventTarget is EventTargetLike.HasEventTargetAddRemove<T> {
            return (
                typeGuard<EventTargetLike.HasEventTargetAddRemove<T>>(eventTarget) &&
                eventTarget instanceof Object &&
                typeof eventTarget.addEventListener === "function" &&
                typeof eventTarget.removeEventListener === "function"
            );
        },
    "canBe":
        function canBe(o: any): boolean {

            try {

                return (
                    z_2.HasEventTargetAddRemove_match(o) ||
                    z_2.NodeStyleEventEmitter_match(o) ||
                    z_2.JQueryStyleEventEmitter_match(o) ||
                    z_2.RxJSSubject_match(o)
                );

            } catch {

                return false;

            }

        }


};

export type EventTargetLike<T> =
    EventTargetLike.HasEventTargetAddRemove<T> |
    EventTargetLike.NodeStyleEventEmitter |
    EventTargetLike.JQueryStyleEventEmitter |
    EventTargetLike.RxJSSubject<T>
    ;

export namespace EventTargetLike {

    export type HTMLElement = HasEventTargetAddRemove<any> & {
        innerText: string;
    };

    export type Window = HasEventTargetAddRemove<any> & {
        document: EventTargetLike.Document;
    };

    export type Document = HasEventTargetAddRemove<any> & {
        URL: string;
    };

    export type RxJSSubject<T> = {
        subscribe: (next: (data: T) => void) => RxJSSubject.Subscription;
    };

    export namespace RxJSSubject {

        export type Subscription = {
            unsubscribe(): void;
        };

        export const match = z_2.RxJSSubject_match;

    }


    export type NodeStyleEventEmitter =
        NodeStyleEventEmitter.Compat |
        NodeStyleEventEmitter.Regular
        ;

    export namespace NodeStyleEventEmitter {

        export interface Regular {
            addListener: (eventName: string | symbol, handler: NodeEventHandler) => this;
            removeListener: (eventName: string | symbol, handler: NodeEventHandler) => this;
        };

        export interface Compat {
            addListener: (eventName: string, handler: NodeEventHandler) => void | {};
            removeListener: (eventName: string, handler: NodeEventHandler) => void | {};
        }

        export declare type NodeEventHandler = (...args: any[]) => void;

        export const match = z_2.NodeStyleEventEmitter_match;

    }

    export interface JQueryStyleEventEmitter {
        on: (eventName: string, handler: Function) => void;
        off: (eventName: string, handler: Function) => void;
    }

    export namespace JQueryStyleEventEmitter {

        export const match = z_2.JQueryStyleEventEmitter_match;

    }

    export interface HasEventTargetAddRemove<E> {
        addEventListener(type: string, listener: ((evt: E) => void) | null, options?: boolean | HasEventTargetAddRemove.Options): void;
        removeEventListener(type: string, listener?: ((evt: E) => void) | null, options?: HasEventTargetAddRemove.Options | boolean): void;
    }

    export namespace HasEventTargetAddRemove {

        export interface Options {
            capture?: boolean;
            passive?: boolean;
            once?: boolean;
        }

        export const match = z_2.HasEventTargetAddRemove_match;

    }


    /* Return true if o can be a EventTargetLike */
    export const canBe = z_2.canBe;

}
