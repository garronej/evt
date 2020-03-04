import { Evt } from "../lib";
import { Subject } from "rxjs";
import { getPromiseAssertionApi } from "../tools/testing";

(async () => {

    {

        const { mustResolve, mustStayPending } = getPromiseAssertionApi();

        const subject = new Subject<string>();

        const ref = Evt.newRef();

        const evtText = Evt.fromEvent<string>(ref, subject);

        const text = "ok";

        for (const _ of [0, 1, 2]) {

            const pr = mustResolve({
                "promise": evtText.waitFor(),
                "expectedData": text
            });

            subject.next(text);

            await pr;

        }

        ref.detach();

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