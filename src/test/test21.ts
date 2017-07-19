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

    return SyncEvent.stopPropagation;

});

evt.attachOnce(str=>{

    output+= str;

    console.log("third", str);


});

evt.post("a");
evt.post("b");

console.assert(output="aaa");

console.log("PASS");
