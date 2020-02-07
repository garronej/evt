
import { EvtBase as Evt } from "../lib/EvtBase";


let evt = new Evt<string>();


(async () => {

    {

        const letter = await evt.waitFor();

        console.assert(letter === "a");

    }

    {

        const letter = await evt.waitFor();

        console.assert(letter === "b");

    }

    evt.post("never");

    {

        let letter: string;

        try {

            letter = await evt.waitFor(1000);

            throw new Error(`fail ${letter}`);

        } catch{
            console.log("PASS".green);
        }


    }




})();

evt.post("a");
evt.post("b");





