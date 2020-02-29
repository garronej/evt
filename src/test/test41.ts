
import * as utilEvt from "../lib/util/race";
import { Evt } from "../lib";
import { getPromiseAssertionApi } from "../tools/testing";
import { assert } from "../tools/typeSafety";
const { mustResolve, mustReject } = getPromiseAssertionApi();

const evtArr = new Evt<number[]>();
const evtObj = new Evt<{}>();
const evtNumber = new Evt<number>();


const prMap = new Promise<Map<any, any>>(resolve => setTimeout(() => resolve(new Map()), 22));




const arr = [77, 77, 77];

const evtRace = utilEvt.race([
    33,
    "FOO",
    evtArr,
    "BAR",
    prMap,
    evtObj,
    33,
    evtNumber
]);



mustReject({
    "promise": evtRace.waitFor(
        ({ data }) => data instanceof Array,
        200
    ),
    "delay": 300
});

mustResolve({
    "promise": evtRace.attachOnce(
        ({ data }) => data instanceof Array,
        raceResult =>
            assert(
                raceResult.i === 2 &&
                raceResult.data === arr &&
                raceResult.racer === evtArr
            )
    ),
    "delay": 600
});

mustResolve({
    "promise": evtRace.$attachOnce(
        ({ data }) => data instanceof Array ? [data] : null,
        arr_ => assert(arr_ == arr, "xxx")
    ),
    "delay": 600,
    "expectedData": arr
});


setTimeout(() => {

    evtNumber.post(333);

    evtArr.post(arr);

    assert(evtObj.getHandlers().length === 0);
    assert(evtArr.getHandlers().length === 0);

    setTimeout(() => {

        evtObj.post({ "foo": "bar baz" });

    }, 500);


}, 500);

setTimeout(() => console.log("PASS".green), 1000);

