import * as utilEvt from "../lib/util/race";
import { Evt } from "../lib";

import { getPromiseAssertionApi } from "../tools/testing";
const { mustResolve } = getPromiseAssertionApi();

const evtArr = new Evt<number[]>();
const evtObj = new Evt<{}>();
const evtNumber = new Evt<number>();



const arr = [77, 77, 77];

const evtRace = utilEvt.race([
    33,
    "FOO",
    evtArr,
    "BAR",
    evtObj,
    33,
    evtNumber
]);

let haveCallbackBeenInvoked = false;

mustResolve({
    "promise": evtRace.attachOnce(
        ({ data }) => {
            console.assert(!haveCallbackBeenInvoked);
            return data instanceof Array;
        },
        raceResult_ => {
            haveCallbackBeenInvoked = true;
        }
    ),
    "delay": 600
});



setTimeout(() => {

    evtNumber.post(333);

    evtArr.post(arr);

    setTimeout(() => {

        evtObj.post({ "foo": "bar baz" });

    }, 500);


}, 500);

setTimeout(() => console.log("PASS".green), 1000);

