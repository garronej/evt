
import { Evt, UnpackEvt } from "../lib";
import { UnpackPromise } from "../tools/typeSafety";

import { assert } from "../tools/typeSafety/assert";
import { same } from "../tools/inDepth";


{

    const evtText = new Evt<string>();
    const evtAge = new Evt<number>();

    const pr = Promise.resolve(null);

    type T = UnpackPromise<typeof pr> | UnpackEvt<typeof evtText> | UnpackEvt<typeof evtAge>;

    const arr: [T | undefined, { isFirst: true } | { isFirst: false, data: T }, number][] = [];


    const ctx = Evt.newCtx();

    Evt.useEffect(
        (...args) => arr.push(args),
        Evt.merge(
            ctx,
            [
                evtText,
                evtAge,
                Evt.from(pr)
            ]
        )
    );

    (async () => {

        await pr;

        const text = "Hello world";

        evtText.post(text);

        const age = 99;

        evtAge.post(age);

        ctx.done();

        evtAge.post(4444);

        assert(same(
            arr,
            [
                [undefined, { "isFirst": true }, 0],
                [null, { "isFirst": false, "data": null }, 1],
                [text, { "isFirst": false, "data": text }, 2],
                [age, { "isFirst": false, "data": age }, 3]
            ]
        ));

    })();

}

{

    const evtText = new Evt<string>();
    const evtAge = new Evt<number>();

    const pr = Promise.resolve(null);

    type T = UnpackPromise<typeof pr> | UnpackEvt<typeof evtText> | UnpackEvt<typeof evtAge>;

    const arr: [T, { isFirst: true } | { isFirst: false, data: T }, number][] = [];


    const ctx = Evt.newCtx();

    const initData = "foo bar";

    Evt.useEffect(
        (...args) => arr.push(args),
        Evt.merge(
            ctx,
            [
                evtText,
                evtAge,
                Evt.from(pr)
            ]
        ),
        [initData]
    );

    (async () => {

        await pr;

        const text = "Hello world";

        evtText.post(text);

        const age = 99;

        evtAge.post(age);

        ctx.done();

        evtAge.post(4444);

        assert(same(
            arr,
            [
                [initData, { "isFirst": true }, 0],
                [null, { "isFirst": false, "data": null }, 1],
                [text, { "isFirst": false, "data": text }, 2],
                [age, { "isFirst": false, "data": age }, 3]
            ]
        ));

    })();

}

setTimeout(() => console.log("PASS"), 0);

