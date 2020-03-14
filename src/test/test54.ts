import { Evt, invokeOperator, Operator } from "../lib";
import { assert } from "../tools/typeSafety";


const evtText = new Evt<string>();

const text = "ok";

evtText.getEvtAttach().$attach(
    ({ op }) => Operator.fλ.Stateful.match(op) ?
        null : !invokeOperator(op, text) ?
            null : [void 0],
    () => evtText.post(text)
);

let str = "";

evtText.attachOnce(str_ => str = str_);

assert(str === "ok");

console.log("PASS".green);
