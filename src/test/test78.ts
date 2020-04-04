
import { Observable } from "../lib";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi";

const { mustResolve } = getPromiseAssertionApi();

(async () => {

    const obsText = new Observable("");

    {

        const pr = mustResolve({
            "promise": obsText.evt.waitFor(text => text === ""),
            "expectedData": ""
        });

        obsText.forceUpdate();

        await pr;

    }
    {

        const pr = mustResolve({
            "promise": obsText.evt.waitFor(text => text === ""),
            "expectedData": ""
        });

        obsText.forceUpdate([""]);

        await pr;

    }

    console.log("PASS".green);


})();
