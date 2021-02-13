import { Evt, VoidEvt, UnpackCtx, UnpackEvt, Ctx, VoidCtx } from "../lib";

const aNumber: UnpackCtx<Ctx<number>>= 3; aNumber;
const anOtherNumber : UnpackEvt<Evt<number>> = 4; anOtherNumber;
const aVoid: UnpackCtx<VoidCtx>= null as any;aVoid;
const anOtherVoid: UnpackEvt<VoidEvt>= null as any;anOtherVoid;

console.log("PASS");






