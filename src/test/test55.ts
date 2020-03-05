
import { Evt } from "../lib";
import { assert } from "../tools/typeSafety";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi";

(async () => {

    {

        const { mustResolve } = getPromiseAssertionApi();

        const evtText = new Evt<string>();

        const evtAge = new Evt<number>();

        const ctx = Evt.newCtx();

        const evtUnion = Evt.merge(ctx, [evtText, evtAge]);


        const text = "ok";

        const age = 88;

        {

            const pr = mustResolve({
                "promise": evtUnion.waitFor(),
                "expectedData": text
            });

            evtText.post(text);

            await pr;

        }

        {

            const pr = mustResolve({
                "promise": evtUnion.waitFor(),
                "expectedData": age
            });

            evtAge.post(age);

            await pr;

        }

        assert(evtText.getHandlers().length === 1);
        assert(evtAge.getHandlers().length === 1);


        ctx.detach(evtText);

        assert(evtText.getHandlers().length === 0);
        assert(evtAge.getHandlers().length === 1);

        ctx.detach(evtAge);

        assert(evtAge.getHandlers().length === 0);

    }

    {

        const { mustResolve } = getPromiseAssertionApi();

        const evtText = new Evt<string>();

        const evtAge = new Evt<number>();


        const evtUnion = Evt.merge([evtText, evtAge]);

        const text = "ok";

        const age = 88;

        {

            const pr = mustResolve({
                "promise": evtUnion.waitFor(),
                "expectedData": text
            });

            evtText.post(text);

            await pr;

        }

        {

            const pr = mustResolve({
                "promise": evtUnion.waitFor(),
                "expectedData": age
            });

            evtAge.post(age);

            await pr;

        }

        assert(evtText.getHandlers().length === 1);
        assert(evtAge.getHandlers().length === 1);

    }

    console.log("PASS".green);

})();
