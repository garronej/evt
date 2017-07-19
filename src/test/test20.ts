import {
    SyncEvent
} from "../lib/index";

require("colors");

let evt = new SyncEvent<string>();

let output= "";

evt.attach(str => {

    output+= str;

})

evt.attach(str=>{

    output+= str;

    return SyncEvent.stopPropagation;

});

evt.attach(str=>{

    output+= str;

    console.log("third", str);


});

evt.post("a");

console.assert(output="aaa");

console.log("PASS");
