
import { Observable, VoidCtx, Evt } from "../lib";
import { assert } from "../tools/typeSafety/assert";

{

    const obsText = new Observable("foo");

    const obsCharCount = Observable.from(
        obsText,
        text => text.length
    );

    assert(obsCharCount.value === obsText.value.length);

    obsText.onPotentialChange("foo bar");

    assert(obsCharCount.value === obsText.value.length);

}

{

    const ctx = new VoidCtx();

    const obsText = new Observable("foo");

    const obsCharCount = Observable.from(
        ctx,
        obsText,
        text => text.length
    );

    assert(obsCharCount.value === obsText.value.length);

    obsText.onPotentialChange("foo bar");

    assert(obsCharCount.value === obsText.value.length);

    const { value } = obsCharCount;

    ctx.done();

    obsText.onPotentialChange("foo bar baz");

    assert(value === obsCharCount.value);

}

{

    const evtText = new Evt<string>();

    const obsText = Observable.from(evtText, "foo bar");

    assert(obsText.value === "foo bar" as string);

    evtText.post("baz");

    assert(obsText.evtChange.postCount === 1);
    assert(obsText.evtChangeDiff.postCount === 1);

    assert(obsText.value === "baz");

}

{

    const ctx = new VoidCtx();

    const evtText = new Evt<string>();

    const obsText = Observable.from(ctx, evtText, "foo bar");

    assert(obsText.value === "foo bar" as string);

    evtText.post("baz");

    assert(obsText.value === "baz" as string);

    ctx.done();

    evtText.post("Hello");

    assert(obsText.value !== "Hello");

}

console.log("PASS".green);
