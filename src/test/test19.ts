import {
    SyncEvent
} from "../lib/index";

require("colors");

let evt = new SyncEvent<{ init: boolean}>();

evt.evtAttach.attachOnce(evtType=> console.assert(evtType === "attach"));

evt.attach(({ init })=> {

    console.assert(init);

    console.log("PASS".green);

})

evt.evtAttach.attachOnce(evtType=> console.assert(evtType === "attachOncePrepend"));

evt.attachOncePrepend( wrap => wrap.init = true );

evt.post({ "init": false });