"use strict";
exports.__esModule = true;
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
function loosenType(evt) {
    return evt;
}
exports.loosenType = loosenType;
/*
import { Evt } from "./Evt";
const x: Evt<boolean> = loosenType(new Evt<true>()); x;
const y: Evt<boolean> = loosenType(new Evt<number>()); y;
*/
//# sourceMappingURL=Evt.loosenType.js.map