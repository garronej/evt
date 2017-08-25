import {
    SyncEvent
} from "../lib/index";

require("colors");

let evt = new SyncEvent<string>();

let output= "";

evt.attachOnce(str => {

    output+= str;

})


evt.attachOnce(str=>{

    output+= str;

});

evt.attachOncePrepend(str=> {

    output+= str;

    return SyncEvent.stopPropagation;

});

evt.post("a");
evt.post("b");

console.assert(output="a");

console.log("PASS".green);
