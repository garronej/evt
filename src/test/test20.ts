import {
    SyncEvent
} from "../lib/index";

require("colors");

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

    output+= str;

    //console.log("third", str);


});

evt.post("a");

console.assert(output="aaa");

console.log("PASS".green);
