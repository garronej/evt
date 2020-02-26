import * as utilEvt from "../lib/util/race";
import { Evt } from "../lib";

const evtArr = new Evt<number[]>();
const evtObj = new Evt<{}>();
const evtNumber = new Evt<number>();

const map= new Map();

const prMap = new Promise<Map<any, any>>(resolve => setTimeout(() => resolve(map), 800));

function mustResolve<T>(params: { p: Promise<T>, expectedResolvedValue?: T, delay: number }) {

    const timer = setTimeout(() => console.assert(false, "did not resolve"), params.delay);

    params.p.then(resolvedValue => {
        if ("expectedResolvedValue" in params) {
            console.assert(resolvedValue === params.expectedResolvedValue);
        }
        clearTimeout(timer);
    });

}



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

let haveCallbackBeenInvoked = false;

mustResolve({
    "p": evtRace.attachOnce(
        ({ data }) => {
            console.assert(!haveCallbackBeenInvoked);
            return data instanceof Map;
        },
        raceResult_ => {
            haveCallbackBeenInvoked = true;
            console.assert(raceResult_.data === map);
            console.assert(raceResult_.i === 4);
            console.assert(raceResult_.racer === prMap);
        }
    ),
    "delay": 900
});



setTimeout(() => {

    evtNumber.post(333);

    evtArr.post([33,33,33]);

    setTimeout(() => {

        evtObj.post({ "foo": "bar baz" });


    }, 500);


}, 500);

setTimeout(() => console.log("PASS".green), 1000);

