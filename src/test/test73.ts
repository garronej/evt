
import { Observable, VoidCtx, Evt } from "../lib";
import { assert } from "../tools/typeSafety/assert";

{

    const obsText = new Observable("foo");

    const obsCharCount = Observable.from(
        obsText,
        text => text.length
    );

    assert(obsCharCount.val === obsText.val.length);

    obsText.update("foo bar");

    assert(obsCharCount.val === obsText.val.length);

}

{

    const ctx = new VoidCtx();

    const obsText = new Observable("foo");

    let count= 0;

    const obsCharCount = Observable.from(
        ctx,
        obsText,
        text => text.length,
        (a,b)=> { count++; return a===b; }
    );

    assert(obsCharCount.val === obsText.val.length);

    obsText.update("foo bar");

    assert(count===1 as number);

    assert(obsCharCount.val === obsText.val.length);

    const { val } = obsCharCount;

    ctx.done();

    obsText.update("foo bar baz");

    assert(count===1);

    assert(val === obsCharCount.val);

}

{

    const evtText = new Evt<string>();

    const obsText = Observable.from(evtText, "foo bar");

    assert(obsText.val === "foo bar" as string);

    evtText.post("baz");

    assert(obsText.evt.postCount === 1);
    assert(obsText.evtDiff.postCount === 1);

    assert(obsText.val === "baz");

}

{

    const ctx = new VoidCtx();

    const evtText = new Evt<string>();

    const obsText = Observable.from(evtText.pipe(ctx), "foo bar");

    assert(obsText.val === "foo bar" as string);

    evtText.post("baz");

    assert(obsText.val === "baz" as string);

    ctx.done();

    evtText.post("Hello");

    assert(obsText.val !== "Hello");

}

console.log("PASS".green);
