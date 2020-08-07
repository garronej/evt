//NOTE: Test type only
import { Evt, StatefulEvt, StatefulReadonlyEvt, NonPostableEvt, SwapEvtType, VoidEvt } from "../lib/index.ts";

type A = SwapEvtType<Evt<number>, void>;
const a: VoidEvt = null as any as A;a;

type B = SwapEvtType<Evt<number>, string | number>;
const b: Evt<string | number> = null as any as B; b;

type C = SwapEvtType<StatefulEvt<number>, string | number>;
const c: StatefulEvt<string | number>= null as any as C; c;

type D = SwapEvtType<StatefulReadonlyEvt<number>, string | Date>;
const d: StatefulReadonlyEvt<string | Date>= null as any as D; d;

type E = SwapEvtType<NonPostableEvt<number>, string | Date>;
const e: NonPostableEvt<string | Date> = null as any as E;e;

type F = SwapEvtType<Evt<undefined | number>, string | Date>;
const f: Evt<string | Date>= null as any as F;f

type G = SwapEvtType<Evt<number | Date>, void>;
const g: VoidEvt = null as any as G; g;

type H = SwapEvtType<StatefulEvt<number>, void>;
const h: VoidEvt= null as any as H; h;

type I = SwapEvtType<StatefulReadonlyEvt<number>, void>;
const i: StatefulReadonlyEvt<void> = null as any as I; i;

type J = SwapEvtType<NonPostableEvt<number>, void>;
const j: NonPostableEvt<void>= null as any as J;j;

type K = SwapEvtType<Evt<undefined | number>, void>;
const k : VoidEvt = null as any as K; k;

type L = SwapEvtType<Evt<any>, void | number>;
const l : Evt<number | void> = null as any as L; l;

console.log("PASS");