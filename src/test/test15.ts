import {
    SyncEvent,
    AsyncEvent,
    VoidSyncEvent,
    VoidAsyncEvent
} from "../lib/index";

require("colors");

let evt = new SyncEvent<string>();

setTimeout(()=>{

    evt.post("aaa");
    evt.post("bbb");
    evt.post("ccc");

}, 250);


setTimeout(()=>{

    evt.post("ddd");
    evt.post("eee");
    evt.post("fff");

}, 320);

setTimeout(()=>{

    evt.post("ggg");
    evt.post("stop");
    evt.post("hhh");

}, 500);

(async ()=> {


    let iterator= evt.asyncLoop();

    /*
    for( let promise of iterator ){

        let data = await promise;

        console.log(data);

        if( data === "stop" ){
            iterator.next(true);
            break;
        }


    }

    console.log("done");
    */

    let arr= [ "aaa", "bbb", "ccc", "ddd", "eee", "fff", "ggg" ];

    let i=0;

    while( true ){

        let data= await iterator.next().value;

        await new Promise<void>( resolve => setTimeout(resolve, 100));

        if( data === "stop" ){
            iterator.next("STOP");
            break;
        }

        console.assert(data === arr[i++]);

    }

    console.log("PASS".green);


})();
