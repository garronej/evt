//NOTE: type only

import { UnpackEvt, Evt, Void } from "../lib";

type A= UnpackEvt<Evt<Void | number>>;
const a: number | Void = null as any as A; a;
const aa: A= null as any as number | Void; aa;

type B = UnpackEvt<Evt<number> | Evt<Void>>;
const b: Void | number = null as any as B; b;
const bb: B = null as any as Void | number; bb;

console.log("PASS".green);


