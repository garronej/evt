import {
    SyncEvent
} from "../lib/index";

require("colors");

let evt = new SyncEvent<string>();


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

    console.log("PASS".green);


});


evt.post("foo");
evt.post("bar");
evt.post("baz");
evt.post("done");





