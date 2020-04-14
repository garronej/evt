
import { Evt } from "../lib/index.ts";
import { EventEmitter } from "events DENOIFY: DEPENDENCY UNMET (STANDARD)";
import { getPromiseAssertionApi } from "../tools/testing/index.ts";
import { assert } from "../tools/typeSafety/index.ts";

(async () => {

    {

        const { mustResolve } = getPromiseAssertionApi();

        const ee = new EventEmitter();

        const ctx = Evt.newCtx();

        const evtText = Evt.from<string>(ctx, ee, "text");

        const text = "ok";

        for( const _ of [ 0, 1, 2 ] ) {

            const pr = mustResolve({
                "promise": evtText.waitFor(),
                "expectedData": text
            });

            ee.emit("text", text);

            await pr;

        }

        assert(ctx.getHandlers().length === 0 );

        assert(ee.listenerCount("text") === 1);

        ctx.done();

        assert(ee.listenerCount("text") === 0);

    }

    {

        const { mustResolve } = getPromiseAssertionApi();

        const ee = new EventEmitter();

        const evtText = Evt.from<string>(ee, "text");

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

    console.log("PASS");

})();
