import {
    Evt
} from "../lib/index";

let evt = new Evt<string>();

let output= "";

evt.attachOnce(str => {

    output+= str;

})

evt.attachOnce("m", str=>{

    output+= str;

});

evt.getHandlers().find(({ boundTo })=> boundTo === "m")!.extract= true;

evt.attachOnce(str=>{

    output+= str;

    //console.log("third", str);


});

evt.post("a");
evt.post("b");

console.assert(output==="aab");

console.log("PASS".green);
