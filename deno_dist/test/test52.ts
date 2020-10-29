
import { Evt, throttleTime } from "../lib/index.ts";
import { assert } from "../tools/typeSafety/index.ts";

const evtCount = new Evt<number>();

let internalCount= 0;

evtCount
    .pipe(throttleTime(900))
    .attach(count => { 
        internalCount++;
        assert(count % 3 === 0); 
    })
    ;

(async () => {

    let count = 0;

    while (true) {

        evtCount.post(count);

        await new Promise(resolve => setTimeout(resolve, 300));

        count++;

        if( count === 7 ){
            break;
        }

    }

    assert(internalCount === 3 );

    console.log("PASS");

})();