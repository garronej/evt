
import { Evt } from "../lib";
//import { TransformativeMatcher } from "../lib/defs"
//import { id } from "../tools/typeSafety"
import { scan, throttleTime } from "../lib/util/composeMatcher";


//const hg: IHandlerGroup = Evt.createHandlerGroup();
const hg = Evt.createHandlerGroup();

const evtText = new Evt<string>();


/*
evtText
    .createDelegate(str => [str.toUpperCase()], hg)
    .createDelegate(str => [str.split("-")])
    .createDelegate(arr => [arr.filter(str => str.startsWith("A"))])
    .createDelegate(arr => [arr.join("-"), { "DETACH": hg }])
    .attachOnce(str => console.log(str))
    ;


evtText.post("abc-bce-add");

hg.detach();

console.log(evtText.getHandlers());
*/




evtText
    .pipe(
        hg,
        str => [str.toUpperCase()],
        str => str.startsWith("H") ? [str] : null,
        scan((charCount, str: string) => charCount + str.length, 0),
        ([str, charCount, index]) => [`${str} ${charCount}`, charCount > 30 || index === 10 ? "DETACH" : null]
    )
    .attach(str => console.log("1 " + str))



evtText
    .pipe(hg)
    .pipe(str => [str.toUpperCase()])
    .pipe(str => str.startsWith("H") ? [str] : null)
    .pipe(scan((charCount, str) => charCount + str.length, 0))
    .pipe(([str, charCount, index]) => [`${str} ${charCount}`, charCount > 30 || index === 10 ? "DETACH" : null])
    .attach(str => console.log("2 " + str))
    ;




evtText
    .createDelegate(hg)
    .createDelegate(str => [str.toUpperCase()])
    .createDelegate(str => str.startsWith("H") ? [str] : null)
    .createDelegate(scan((charCount, str) => charCount + str.length, 0))
    .createDelegate(([str, charCount, index]) => [`${str} ${charCount}`, charCount > 30 || index === 10 ? "DETACH" : null])
    .attach(str => console.log("3 " + str))
    ;


evtText.post("hello world");
evtText.post("hello world");
evtText.post("hello world");
evtText.post("hello world");


const evtStr = new Evt<string>();

evtStr
    .createDelegate(throttleTime(1000))
    .attach(str => console.log("1", { str }))
    ;

evtStr
    .pipe(throttleTime(1000))
    .attach(str => console.log("2", { str }))
    ;


(async () => {

    let count = 0;

    while (true) {

        count++;

        evtStr.post(`===>${count}`);

        await new Promise(resolve => setTimeout(resolve, 100));

    }


})();
