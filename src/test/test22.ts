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

});

evt.getHandlers().find(({ prepend })=> prepend )!.extract= true;

evt.post("a");
evt.post("b");

console.assert(output="a");

console.log("PASS".green);
