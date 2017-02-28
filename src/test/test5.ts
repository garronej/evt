import {
    SyncEvent,
    AsyncEvent,
    VoidSyncEvent,
    VoidAsyncEvent
} from "../lib/index";

require("colors");

type T= string;

let evt = new SyncEvent<T>();

let evtProxy= new SyncEvent<T>();

evt.attach(data=>{

    if( !evtProxy.evtAttach.postCount )
        evtProxy.evtAttach.attachOnce(()=> evtProxy.post(data));
    else
        evtProxy.post(data);

});

for( let char of [ "a", "b", "c", "d", "e" ])
    evt.post(char);

let alphabet= "";

evtProxy.attach(data => {

    alphabet+= data;

});


for( let char of [ "f", "g", "h" ])
    evt.post(char);

//cSpell: disable
console.assert(alphabet=== "abcdefgh");
//cSpell: enable

console.log("PASS".green);







