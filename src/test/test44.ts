import { Evt } from "../lib";


const evtText = new Evt<"TICK" | "END" >();

let acc= "";

evtText.$attach(
    text => [text, text === "END" ? "DETACH" : null],
    text=> acc += " " + text
);

evtText.post("TICK");
evtText.post("TICK");
evtText.post("END");
evtText.post("TICK");

console.assert(acc === " TICK TICK END");

console.log("PASS");
