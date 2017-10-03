import { SyncEvent } from "../lib";
import "colors";

let evt= new SyncEvent<string>();

evt.attach(()=>{});

evt.attachOnce(()=>{});

evt.waitFor();

evt.attachPrepend({},()=>{});

let detachedHandlers= evt.detach();

console.assert( detachedHandlers.length === 4, "m1" );

console.assert( !evt.getHandlers().length ,"m2");

console.log("PASS".green);
