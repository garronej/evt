import {
    VoidSyncEvent
} from "../lib/index";

require("colors");

let count= 0;

let evt= new VoidSyncEvent();

//evt.enableTrace("evt");

process.nextTick(()=> console.assert(++count ===5, "m1"));


evt.waitFor().then(str=> console.assert(++count===6, "m2"));


console.assert(++count === 1, "m3");

evt.attachOnce(str=> console.assert(++count===2, "m4"));
evt.post();

console.assert(++count === 3, "m5");

evt.attachOnce(str=> {
    console.assert(++count === 4, "m6");

    console.log("PASS".green);

});
evt.post();








