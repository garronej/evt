
import { Evt } from "../lib";
import { assert } from "tsafe/assert";

const voidEvt = Evt.create();

const evt: Evt<string> | Evt<void> = voidEvt as any;

let count = 0;

Evt.factorize(evt).attach(data => {

    if (data === undefined) {

        count++;
        return;

    }

    data.toUpperCase();


});

voidEvt.post();
voidEvt.postAsyncOnceHandled();

assert(count === 2);

console.log("PASS");











