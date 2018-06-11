import {
    SyncEvent
} from "../lib/index";

let success= false;

let evt = new SyncEvent<string>();


//evt.enableTrace("evt");

let expectQueue= [
    "foo",
    "bar",
    "baz"
];


evt.attachOnce(async str=> {

    while( true ){

        if( str === "done" ) break;

        console.assert(expectQueue.shift() === str);
    
        str = await evt.waitFor();

    }

    success= true;



});


evt.post("foo");
evt.post("bar");
evt.post("baz");
evt.post("done");


setTimeout(()=>{

    console.assert(success);

    console.log("PASS".green);

}, 2000);