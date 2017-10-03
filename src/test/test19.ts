import {
    SyncEvent
} from "../lib/index";

require("colors");

let evt = new SyncEvent<{ init: boolean}>();

evt.evtAttach.attachOnce(handler=> console.assert( !handler.once && handler.boundTo ==="foo"));


evt.attach("foo",({ init })=> {

    console.assert(init);

    console.log("PASS".green);

})

evt.evtAttach.attachOnce(handler=> console.assert( handler.once && handler.prepend && !!handler.callback ));

evt.attachOncePrepend( wrap => wrap.init = true );

evt.post({ "init": false });