
import * as utilEvt from "../lib/util/race";
import { Evt } from "../lib";

const evtArr = new Evt<number[]>();
const evtObj = new Evt<{}>();
const evtNumber = new Evt<number>();


const prMap = new Promise<Map<any, any>>(resolve => setTimeout(() => resolve(new Map()), 22));

function mustReject<T>(p: Promise<T>, delay: number) {

    const timer = setTimeout(() => console.assert(false, "did not reject"), delay);

    p.then(
        () => console.assert(false, "resolved"),
        () => clearTimeout(timer)
    );

}

function mustResolve<T>(params: { p: Promise<T>, expectedResolvedValue?: T, delay: number }) {

    const timer = setTimeout(() => console.assert(false, "did not resolve"), params.delay);

    params.p.then(resolvedValue => {
        if ("expectedResolvedValue" in params) {
            console.assert(resolvedValue === params.expectedResolvedValue);
        }
        clearTimeout(timer);
    });

}


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



mustReject(
    evtRace.waitFor(
        ({ data }) => data instanceof Array,
        200
    ),
    300
);

mustResolve({
    "p": evtRace.attachOnce(
        ({ data }) => data instanceof Array ,
        raceResult =>
            console.assert(
                raceResult.i === 2 &&
                raceResult.data === arr &&
                raceResult.racer === evtArr
            )
    ),
    "delay": 600
});

mustResolve({
    "p": evtRace.$attachOnce(
        ({ data }) => data instanceof Array ? [data] : null,
        arr_ => console.assert(arr_ == arr, "xxx")
    ),
    "delay": 600,
    "expectedResolvedValue": arr
});


setTimeout(() => {

    evtNumber.post(333);

    evtArr.post(arr);

    console.assert(evtObj.getHandlers().length === 0);
    console.assert(evtArr.getHandlers().length === 0);

    setTimeout(() => {

        evtObj.post({ "foo": "bar baz" });

    }, 500);


}, 500);

setTimeout(() => console.log("PASS".green), 1000);

