
import { Evt } from "../lib";
import { assert } from "../tools/typeSafety/assert";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi";

const { mustResolve, mustStayPending } = getPromiseAssertionApi();

(async () => {

    {

        let stdout= "";

        const sevText = Evt.create("foo");

        sevText.evtChange.attach(text => {

            stdout+= text;

        });

        sevText.state = "foo";
        sevText.state = " bar";

        assert(stdout === "foo bar");


    }

    {

        let stdout= "";

        const sevText = Evt.create("foo");

        sevText.evtChangeDiff.attach(({ newState }) => {

            stdout+= newState;

        });

        sevText.state = " bar";

        assert(stdout === " bar");


    }

    {

        let stdout= "";

        const sevText = Evt.create("foo");

        sevText.evtDiff.attach(({ newState }) => {

            stdout+= newState;

        });

        sevText.state = "foo";
        sevText.state = " bar";

        assert(stdout === "foo bar");


    }


    {

        const sevText = Evt.create("");

        const pr1 = mustResolve({
            "promise": sevText.waitFor(),
            "expectedData": ""
        });

        mustStayPending(
            sevText.evtDiff.waitFor(({ newState }) => [newState])
        );

        mustResolve({
            "promise": sevText.evtChange.waitFor(),
            "expectedData": ""
        });
        mustStayPending(sevText.evtChangeDiff.waitFor());

        await pr1;

    }

    console.log("PASS");

})();
