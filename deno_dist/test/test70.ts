import { Evt, UnpackCtx, UnpackEvt, Ctx } from "../lib/index.ts";

const aNumber: UnpackCtx<Ctx<number> | undefined>= 3; aNumber;
const anOtherNumber : UnpackEvt<Evt<number> | null> = 4; anOtherNumber;
const aVoid: UnpackCtx<Ctx>= null as any;aVoid;
const anOtherVoid: UnpackEvt<Evt<void>>= null as any;anOtherVoid;

console.log("PASS");






