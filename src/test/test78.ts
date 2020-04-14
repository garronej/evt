
import { Evt } from "../lib";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi";

const { mustResolve, mustStayPending } = getPromiseAssertionApi();

(async () => {


    {

        const sevText = Evt.create("");

        const pr1 = mustResolve({
            "promise": sevText.waitFor(),
            "expectedData": ""
        });

        const pr2 = mustResolve({
            "promise": sevText.evtDiff.waitFor(({ newState }) => newState === "" ? [newState] : null),
            "expectedData": ""
        });

        mustStayPending(sevText.evtChange.waitFor());
        mustStayPending(sevText.evtChangeDiff.waitFor());


        sevText.post(sevText.state);

        await Promise.all([pr1, pr2]);

    }

    {

        const sevText = Evt.create("");

        const pr1 = mustResolve({
            "promise": sevText.waitFor(),
            "expectedData": ""
        });

        const pr2 = mustResolve({
            "promise": sevText.evtDiff.waitFor(({ newState }) => newState === "" ? [newState] : null),
            "expectedData": ""
        });

        mustStayPending(sevText.evtChange.waitFor());
        mustStayPending(sevText.evtChangeDiff.waitFor());

        sevText.state = sevText.state;

        await Promise.all([pr1, pr2]);

    }

    console.log("PASS");

})();
