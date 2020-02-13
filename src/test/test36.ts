
import { VoidEvt } from "../lib";

const evt= new VoidEvt();

evt.waitFor(0);

evt.post();

evt.post();

evt.waitFor(0)
    .then(
        ()=> console.assert(false),
        ()=> {}
    )
    ;

setTimeout(()=> console.log("PASS".green), 100);

