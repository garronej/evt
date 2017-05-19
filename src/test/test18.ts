import {
    VoidSyncEvent
} from "../lib/index";

require("colors");

/*
Edge case when post can be async:

1) An other event have been posted in the same tick.

1) This event is matched by a waitFor handler

*/

let count= 0;

let evt= new VoidSyncEvent();

process.nextTick(()=> console.assert(++count ===4));


evt.waitFor().then(str=> console.assert(++count===5));


console.assert(++count === 1);

evt.attachOnce(str=> console.assert(++count===2));
evt.post();

console.assert(++count === 3);

evt.attachOnce(str=> {
    console.assert(++count === 6);

    console.log("PASS".green);

});
evt.post();








