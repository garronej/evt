import {
    SyncEvent
} from "../lib/index";

let evt = new SyncEvent<string>();

let output= "";

evt.attach(str => {

    output+= str;

})

let pr= evt.attach(str=>{

    output+= str;

});

evt.getHandlers().find(({ promise })=> promise === pr )!.extract= true;

evt.attach(str=>{

    throw new Error("never");


});

evt.post("a");

console.assert(output==="aa");

console.log("PASS".green);
