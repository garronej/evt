import {
    SyncEvent
} from "../lib/index";

require("colors");


let evt = new SyncEvent<string>();

let i = 0;

evt.attach(data => {

    if (i === 0) console.assert(data === "tick");
    else console.assert(data === "tack");

    i++;

});

evt.attachOnce(data => {

    console.assert(data === "tick")
});

console.assert(evt.postCount === 0);

evt.post("tick");
evt.post("tack");
evt.post("tack");

console.assert(evt.postCount === 3);

console.assert(i === 3);

console.log("PASS".green);