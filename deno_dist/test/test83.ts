
import { Evt } from "../lib/index.ts";
import { assert } from "https://deno.land/x/tsafe@v1.4.1/assert.ts";

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











