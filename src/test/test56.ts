
import { Evt } from "../lib";
import { EventEmitter } from "events";
import { getPromiseAssertionApi } from "../tools/testing";
import { assert } from "../tools/typeSafety";

(async () => {

    {

        const { mustResolve } = getPromiseAssertionApi();

        const ee = new EventEmitter();

        const ctx = Evt.newCtx();

        const evtText = Evt.fromEvent<string>(ctx, ee, "text");

        const text = "ok";

        for( const _ of [ 0, 1, 2 ] ) {

            const pr = mustResolve({
                "promise": evtText.waitFor(),
                "expectedData": text
            });

            ee.emit("text", text);

            await pr;

        }

        assert(ee.listenerCount("text") === 1);

        ctx.detach();

        assert(ee.listenerCount("text") === 0);

    }

    {

        const { mustResolve } = getPromiseAssertionApi();

        const ee = new EventEmitter();

        const evtText = Evt.fromEvent<string>(ee, "text");

        const text = "ok";

        for( const _ of [ 0, 1, 2 ] ) {

            const pr = mustResolve({
                "promise": evtText.waitFor(),
                "expectedData": text
            });

            ee.emit("text", text);

            await pr;

        }


        assert(ee.listenerCount("text") === 1);

    }

    console.log("PASS".green);

})();
