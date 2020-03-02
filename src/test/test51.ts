
//import { id } from "../tools/typeSafety"
import { Evt } from "../lib";
import { scan, throttleTime } from "../lib/util";


const hg = Evt.createHandlerGroup();

const evtText = new Evt<string>();

/*



evtText
    .pipe(
        hg,
        str => [str.toUpperCase()],
        str => str.startsWith("H") ? [str] : null,
        scan((charCount, str: string) => charCount + str.length, 0),
        ([str, charCount, index]) => [`${str} ${charCount}`, charCount > 30 || index === 10 ? "DETACH" : null]
    )
    .attach(str => console.log("1 " + str))


*/

//TODO: Detach from matcher
evtText
    .pipe(hg)
    .pipe(str => [str.toUpperCase()])
    .pipe(str => str.startsWith("H"))
    .pipe(scan((charCount, str) => charCount + str.length, 0))
    .pipe( count=> count < 33 ? [ `${count}` ] : "DETACH" )
    .attach(str => console.log("2 " + str))
    ;


evtText.post("hello world");
evtText.post("hello world");
evtText.post("hello world");
evtText.post("hello world");

const evtStr = new Evt<string>();

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
