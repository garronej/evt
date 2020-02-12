
import { Evt } from "../lib";

let evt = new Evt<number>();

evt.enableTrace("myEvent", n => n.toString(), str => console.assert(str === "(myEvent) 1 handler => 666" ));

evt.attachOnce(n => console.assert(n === 666));

evt.post(666);

const n: Evt.Unpack<typeof evt>= 666;

n;

console.log("PASS".green);
