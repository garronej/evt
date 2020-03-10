import { Evt } from "../lib";

let evt = new Evt<{ init: boolean}>();

const ctx= Evt.newCtx();

evt.getEvtAttach().attachOnce(handler=> console.assert( !handler.once && handler.ctx === ctx));


evt.attach(ctx,({ init })=> {

    console.assert(init);

    console.log("PASS".green);

})

evt.getEvtAttach().attachOnce(handler=> console.assert( handler.once && handler.prepend && !!handler.callback ));

evt.attachOncePrepend( wrap => wrap.init = true );

evt.post({ "init": false });