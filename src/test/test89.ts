
import { Evt } from "../lib";
import { assert } from "../tools/typeSafety";


const evtText= Evt.create("foo");


let std_out="";

const ctx = Evt.newCtx();

Evt.useEffect(
    text => std_out+= text.toString(),
    evtText.evtChange.pipe(ctx)
);

assert( std_out === "foo" as string);

evtText.state= "foo";

assert( std_out === "foo" as string);

evtText.state= "bar";

assert( std_out === "foobar" as string);

ctx.done();

evtText.state= "baz";

assert( std_out === "foobar" as string);


console.log("PASS");

