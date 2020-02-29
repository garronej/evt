

import * as utilEvt from "../lib/util";
import { assert } from "../tools/typeSafety";
import { getPromiseAssertionApi } from "../tools/testing";

const { mustResolve } = getPromiseAssertionApi({ "takeIntoAccountArraysOrdering": false });

const error = new Error("my error");

const prMessage: Promise<string> = new Promise((...[, reject]) => setTimeout(()=>reject(error), 200));

const prOk= new Promise<string>(resolve => setTimeout(() => resolve("OK"), 100))

mustResolve({
    "promise": utilEvt.race([
        prMessage,
        prOk
    ]).attachOnce(
        data => assert(data.data === "OK")
    ),
    "expectedData": { "i": 1, "data": "OK", "racer": prOk },
    "delay": 150
});

setTimeout(()=> console.log("PASS".green), 250);

