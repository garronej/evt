
import { Evt, VoidEvt, matchVoid } from "../lib";
import { assert } from "../tools/typeSafety";

const voidEvt = Evt.create();

const evt: Evt<string> | VoidEvt = voidEvt as any;

let count = 0;

Evt.factorize(evt).attach(data => {

    if (matchVoid(data)) {

        count++;
        return;

    }

    data.toUpperCase();


});

voidEvt.post();
voidEvt.postAsyncOnceHandled();

assert(count === 2);

console.log("PASS");











