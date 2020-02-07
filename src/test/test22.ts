import {
    Evt
} from "../lib/index";

let evt = new Evt<string>();

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

console.assert(output==="abb");

console.log("PASS".green);
