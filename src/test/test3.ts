import {
    SyncEvent
} from "../lib/index";

require("colors");

type T= string;

let evt = new SyncEvent<T>();

//evt.enableTrace("evt");

let evtProxy= new SyncEvent<T>();

//evtProxy.enableTrace("evtProxy");

evt.attach(evtProxy);

let success= false;

evtProxy.attach(data => {

    console.assert(data === "ok", "m1");

    success= true;


});

evt.post("ok");

console.assert(success, "m2");

console.log("PASS".green);

