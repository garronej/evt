import { Evt } from "../lib/index.ts";
import { Subject } from "rxjs DENOIFY: DEPENDENCY UNMET (DEV DEPENDENCY)";
import { getPromiseAssertionApi } from "../tools/testing/index.ts";
import { assert } from "../tools/typeSafety/index.ts";

(async () => {

    {

        const { mustResolve, mustStayPending } = getPromiseAssertionApi();

        const subject = new Subject<string>();

        const ctx = Evt.newCtx();

        const evtText = Evt.from(ctx, subject);

        const text = "ok";

        for (const _ of [0, 1, 2]) {


            const pr = mustResolve({
                "promise": evtText.waitFor(),
                "expectedData": text
            });

            subject.next(text);

            await pr;

        }

        assert(ctx.getHandlers().length === 0);

        ctx.done();

        mustStayPending(evtText.waitFor());

        subject.next(text);

    }

    {

        const { mustResolve } = getPromiseAssertionApi();

        const subject = new Subject<string>();

        const evtText = Evt.from<string>(subject);

        const text = "ok";

        for (const _ of [0, 1, 2]) {

            const pr = mustResolve({
                "promise": evtText.waitFor(),
                "expectedData": text
            });

            subject.next(text);

            await pr;

        }

    }

    console.log("PASS");

})();