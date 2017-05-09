import {
    SyncEvent
} from "../lib/index";

require("colors");

let evt = new SyncEvent<string | number>();

let evtNumber= evt.createProxy((data): data is number => typeof(data) === "number");

let evtString= evt.createProxy(data => typeof(data) === "string");

let evtSatan= evt.createProxy(data => data === 666);

(async ()=> {

    await evtSatan.waitFor();

    throw new Error("Satan came");

})();


(async ()=> {

    let expectQueue = [ 1, "2", 3, "4", 5, "6", -1, "" ];

    while( true ){

        let data= await evt.waitFor();

        console.assert(expectQueue.shift()===data);

        if( data === "" ) break;

    }

    evtSatan.stopWaiting();

})();


(async ()=> {

    let expectQueue = [1, 3, 5, -1];

    while( true ){

        let num= await evtNumber.waitFor();

        console.assert(expectQueue.shift() === num);

        if( num === -1 ) break;

    }

})();

(async ()=> {

    let expectQueue = ["2", "4", "6", "" ];

    while( true ){

        let str= await evtString.waitFor();

        console.assert(expectQueue.shift()===str);

        if( str === "" ) break;

    }

})();



(async ()=> {

    for( let data of [ 1, "2", 3, "4", 5, "6", -1, "", 666 ]){

        evt.post(data);

        await new Promise<void>(resolve=> setTimeout(resolve,40));

    }

    console.log("PASS".green);

})();











