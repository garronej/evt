import {
    SyncEvent,
    AsyncEvent,
    VoidSyncEvent,
    VoidAsyncEvent
} from "../lib/index";

require("colors");


let evt = new VoidAsyncEvent();

let i = 0;

evt.attach(() => { i++; });

let success= false;
evt.attachOnce(() => {

    console.assert(!success);
    success= true;
    
});

console.assert(evt.postCount === 0);

evt.post();
evt.post();
evt.post();

console.assert(evt.postCount === 3);

console.assert(i === 0);

process.nextTick(()=> console.assert(i === 0));

setImmediate(()=> {
    console.assert(i === 3);
    console.assert(success);
    console.log("PASS".green);
});
