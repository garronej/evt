import {
    VoidEvt
} from "../lib/index";

let count= 0;

let evt= new VoidEvt();

//evt.enableTrace("evt");

evt.waitFor().then(str=> console.assert(++count===5, "m2"));


console.assert(++count === 1, "m3");

evt.attachOnce(str=> console.assert(++count===2, "m4"));
evt.post();

console.assert(++count === 3, "m5");

let success= false;

evt.attachOnce(str=> {
    console.assert(++count === 4, "m6");

    success= true;

});
evt.post();

setTimeout(()=>{

    console.assert(success);

    console.log("PASS".green);

}, 2000);








