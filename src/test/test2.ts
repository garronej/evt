import { Evt } from "../lib/index";

type T= string;

let evt = new Evt<T>();

//evt.enableTrace("evt");

let evtProxy= new Evt<T>();

//evtProxy.enableTrace("evtProxy");

evt.attach(data=>{

    if( !evtProxy.evtAttach.postCount ){
        evtProxy.evtAttach.attachOnce(data,()=> evtProxy.post(data));
    }else{
        evtProxy.post(data);
    }

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
