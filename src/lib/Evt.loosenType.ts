import /*type*/ { SwapEvtType } from "./types/helper/SwapEvtType";
import { UnpackEvt } from "./types/helper/UnpackEvt";

type EvtLike<T> = import("./types/helper/UnpackEvt").EvtLike<T>;

/**
 * https://docs.evt.land/api/evt/loosenType
 * 
 * Swipe the type argument with a superset 
 * without giving up type safety.
 * 
 * if A is assignable to B then
 * Evt<A> is assignable to Evt<B>
 * 
 * Example Evt<1 | 2 | 3> is assignable to Evt<number>
 * 
 * It is true but typescript does not realise it by itself.
 * 
 * Example: 
 * 
 * Consider the example: 
 * declare const evFooBar: Evt<"FOO" | "BAR">;
 * declare function myFunc(evtText: Evt<string>): void;
 * 
 * myFunc(evtFooBar); //Gives a type error;
 * myFunc(loosenType(evtFooBar)); //OK
 * 
 * NOTE: At runtime this is the identity function! 
 */
export function loosenType<E extends EvtLike<any>, SupersetOfT>(
    evt: E
): UnpackEvt<E> extends SupersetOfT ?
    SwapEvtType<typeof evt, SupersetOfT> : "NOT A SUPERSET" {
    return evt as any;
}

/*
import { Evt } from "./Evt";
const x: Evt<boolean> = loosenType(new Evt<true>()); x;
const y: Evt<boolean> = loosenType(new Evt<number>()); y;
*/

