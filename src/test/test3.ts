import {
    SyncEvent
} from "../lib/index";

require("colors");

type T= string;

let evt = new SyncEvent<T>();

let evtProxy= new SyncEvent<T>();

evt.attach(evtProxy);

let success= false;

evtProxy.attach(data => {

    console.assert(data === "ok");

    success= true;


});

evt.post("ok");


console.assert(success);

console.log("PASS".green);

