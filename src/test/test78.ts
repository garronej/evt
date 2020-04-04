
import { Tracked } from "../lib";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi";

const { mustResolve } = getPromiseAssertionApi();

(async () => {

    const trkText = new Tracked("");

    {

        const pr = mustResolve({
            "promise": trkText.evt.waitFor(text => text === ""),
            "expectedData": ""
        });

        trkText.forceUpdate(trkText.val);

        await pr;

    }
    {

        const pr = mustResolve({
            "promise": trkText.evt.waitFor(text => text === ""),
            "expectedData": ""
        });

        trkText.forceUpdate(trkText.val);

        await pr;

    }

    console.log("PASS".green);


})();
