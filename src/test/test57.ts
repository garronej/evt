import { Evt } from "../lib";
import { Subject } from "rxjs";
import { getPromiseAssertionApi } from "../tools/testing";

(async () => {

    {

        const { mustResolve, mustStayPending } = getPromiseAssertionApi();

        const subject = new Subject<string>();

        const ctx = Evt.newCtx();

        const evtText = Evt.fromEvent<string>(ctx, subject);

        const text = "ok";

        for (const _ of [0, 1, 2]) {

            const pr = mustResolve({
                "promise": evtText.waitFor(),
                "expectedData": text
            });

            subject.next(text);

            await pr;

        }

        ctx.detach();

        mustStayPending(evtText.waitFor());

        subject.next(text);


    }

    {

        const { mustResolve } = getPromiseAssertionApi();

        const subject = new Subject<string>();

        const evtText = Evt.fromEvent<string>(subject);

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

    console.log("PASS".green);

})();