import { Evt } from "../lib";


const evtText= new Evt<string>();


evtText.$attach(
    str=> [ str, { "DETACH": Evt.newCtx() }],
    str=> str.toLowerCase()
);

evtText.$attach(
    str=> str.startsWith("a") ? [str] : { "DETACH": Evt.newCtx() },
    str=> str.toLowerCase()
);

evtText.$attach(
    str=> [ str, { "DETACH": Evt.newCtx(), "err": new Error() }],
    str=> str.toLowerCase()
);

evtText.$attach(
    str=> str.startsWith("a") ? [str] : { "DETACH": Evt.newCtx(), "err": new Error() },
    str=> str.toLowerCase()
);

evtText.$attach(
    str=> [ str, { "DETACH": Evt.newCtx<boolean>(), "res": true }],
    str=> str.toLowerCase()
);

evtText.$attach(
    str=> [ str, { "DETACH": Evt.newCtx<boolean>(), "err": new Error() }],
    str=> str.toLowerCase()
);

evtText.$attach(
    str=> str.startsWith("a") ? [str] : { "DETACH": Evt.newCtx<boolean>(), "res": true },
    str=> str.toLowerCase()
);

evtText.$attach(
    str=> str.startsWith("a") ? [str] : { "DETACH": Evt.newCtx<boolean>(), "err": new Error() },
    str=> str.toLowerCase()
);

console.log("PASS".green);






