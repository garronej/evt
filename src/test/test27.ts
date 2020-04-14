
import { Evt } from "../lib";

let evt = new Evt<string>();

(async () => {

    {

        const letter = await evt.waitFor();

        console.assert(letter === "a");

    }


    evt.post("never");

    {

        let letter: string;

        try {

            letter = await evt.waitFor(1000);

            throw new Error(`fail ${letter}`);

        } catch{
            console.log("PASS");
        }


    }




})();

evt.post("a");






