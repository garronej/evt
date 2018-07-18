
import { SyncEvent } from "../lib";

let evt = new SyncEvent<number>();

evt.enableTrace("myEvent", n => n.toString(), str => console.assert(str === "(myEvent) 1 handler => 666" ));

evt.attachOnce(n => console.assert(n === 666));

evt.post(666);

const n: SyncEvent.Type<typeof evt>= 666;

n;

console.log("PASS".green);
