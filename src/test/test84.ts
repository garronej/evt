//NOTE: type only

import { UnpackEvt, Evt } from "../lib";

type A= UnpackEvt<Evt<void | number>>;
const a: number | void = null as any as A; a;
const aa: A= null as any as number | void; aa;

type B = UnpackEvt<Evt<number> | Evt<void>>;
const b: void | number = null as any as B; b;
const bb: B = null as any as void | number; bb;

console.log("PASS");


