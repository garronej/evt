
import { Evt } from "../lib";
import { UnpackEvt } from "../lib/UnpackEvt";
type UnpackEvt_<T> = import("../lib/UnpackEvt").UnpackEvt<T>;


let evt = new Evt<number>();

evt.enableTrace("myEvent", n => n.toString(), str => console.assert(str === "(myEvent) 1 handler => 666"));

evt.attachOnce(n => console.assert(n === 666));

evt.post(666);

const n: UnpackEvt<typeof evt> = 666;

n;

const n_: UnpackEvt_<typeof evt> = 666;

n_;

console.log("PASS".green);
