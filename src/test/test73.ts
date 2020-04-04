
import { Tracked, VoidCtx, Evt } from "../lib";
import { assert } from "../tools/typeSafety/assert";

{

    const trkText = new Tracked("foo");

    const obsCharCount = Tracked.from(
        trkText,
        text => text.length
    );

    assert(obsCharCount.val === trkText.val.length);

    trkText.val ="foo bar";

    assert(obsCharCount.val === trkText.val.length);

}

{

    const ctx = new VoidCtx();

    const trkText = new Tracked("foo");

    const obsCharCount = Tracked.from(
        ctx,
        trkText,
        text => text.length
    );



    assert(obsCharCount.val === trkText.val.length);

    trkText.val = "foo bar";

    assert(obsCharCount.val === trkText.val.length);

    const { val } = obsCharCount;

    ctx.done();

    trkText.val= "foo bar baz";

    assert(val === obsCharCount.val);

}

{

    const evtText = new Evt<string>();

    const trkText = Tracked.from(evtText, "foo bar");

    assert(trkText.val === "foo bar" as string);

    evtText.post("baz");

    assert(trkText.evt.postCount === 1);
    assert(trkText.evtDiff.postCount === 1);

    assert(trkText.val === "baz");

}

{

    const ctx = new VoidCtx();

    const evtText = new Evt<string>();

    const trkText = Tracked.from(evtText.pipe(ctx), "foo bar");

    assert(trkText.val === "foo bar" as string);

    evtText.post("baz");

    assert(trkText.val === "baz" as string);

    ctx.done();

    evtText.post("Hello");

    assert(trkText.val !== "Hello");

}

console.log("PASS".green);
