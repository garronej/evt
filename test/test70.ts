import { Evt, VoidEvt, UnpackCtx, UnpackEvt, Ctx, VoidCtx } from "../lib/index.ts";

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

const aNumber: UnpackCtx<Ctx<number>>= 3; aNumber;
const anOtherNumber : UnpackEvt<Evt<number>> = 4; anOtherNumber;
const aVoid: UnpackCtx<VoidCtx>= null as any;aVoid;
const anOtherVoid: UnpackEvt<VoidEvt>= null as any;anOtherVoid;

console.log("PASS");






