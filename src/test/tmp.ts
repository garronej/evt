
/*

import { Evt } from "../lib/Evt";
import { id } from "../tools/typeSafety";


id<Evt<number>>(new Evt<number>());


const x: Evt<boolean> = (new Evt<number>()).toBroader(); x;

import { Evt } from "../../Evt";

const evtText = new Evt<string>();

type Ok = NonPostable<typeof evtText>;


import { StatefulEvt } from "../../StatefulEvt";

const evtIsConnection = new StatefulEvt(false);

type Okk = NonPostable<typeof evtIsConnection>;

type Okkk = NonPostable<{ p1: number, p2: Evt<string> }>;


const x: SwapEvtType<Evt<string>, number> = null as any; x;
const y: SwapEvtType<StatefulEvt<string>, number> = null as any; y;
const z: SwapEvtType<StatefulNonPostableEvt<string>, number> = null as any; z;

*/

/*
const evtIsConnected: StatefulEvt<boolean> = null as any;

evtIsConnected.state = true;

const evtIsBlue: StatefulNonPostableEvt<boolean> = null as any;

evtIsBlue.state= false
*/