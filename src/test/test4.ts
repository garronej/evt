import {
    SyncEvent
} from "../lib/index";

require("colors");

type T= string;

let evt = new SyncEvent<T>();

let evtProxy= new SyncEvent<T>();

evt.attachOnce(evtProxy);

let success= false;

evtProxy.attach(data => {

    console.assert(data === "ok");

    success= true;


});

evt.post("ok");
evt.post("ko");


console.assert(success);

console.log("PASS".green);

