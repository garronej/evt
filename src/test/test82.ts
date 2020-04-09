//NOTE: Test type only
import { Evt, StatefulEvt, StatefulReadonlyEvt, NonPostableEvt, SwapEvtType, Void, VoidEvt } from "../lib";

type A = SwapEvtType<Evt<number>, Void>;
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

type G = SwapEvtType<Evt<number | Date>, Void>;
const g: VoidEvt = null as any as G; g;

type H = SwapEvtType<StatefulEvt<number>, Void>;
const h: VoidEvt= null as any as H; h;

type I = SwapEvtType<StatefulReadonlyEvt<number>, Void>;
const i: StatefulReadonlyEvt<Void> = null as any as I; i;

type J = SwapEvtType<NonPostableEvt<number>, Void>;
const j: NonPostableEvt<Void>= null as any as J;j;

type K = SwapEvtType<Evt<undefined | number>, Void>;
const k : VoidEvt = null as any as K; k;

type L = SwapEvtType<Evt<any>, Void | number>;
const l : Evt<number | Void> = null as any as L; l;

console.log("PASS".green);