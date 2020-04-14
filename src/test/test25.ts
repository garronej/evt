import { Evt, EvtError } from "../lib";

let evt = new Evt<string>();

let success= 0;

(async () => {

    try {

        await evt.waitFor(0);

        console.assert(false);

    } catch (error) {

        console.assert(error instanceof EvtError.Detached);

        success++;

    }


})();

(async () => {

    try {

        await evt.attach(0,()=>{});

        console.assert(false);

    } catch (error) {

        console.assert(error instanceof EvtError.Detached);

        success++;

    }


})();

(async () => {

    try {

        await evt.attachOnce(0,()=>{});

        console.assert(false);

    } catch (error) {

        console.assert(error instanceof EvtError.Detached);

        success++;

    }


})();

evt.detach();

evt.post("foo");

setTimeout(()=>{

    console.assert(success === 3);

    console.log("PASS");

},2000);



