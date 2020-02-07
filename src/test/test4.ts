import { Evt } from "../lib/index";

type T= string;

let evt = new Evt<T>();

let evtProxy= new Evt<T>();

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

