
//The event have this form: 
type Data = {
    type: "TEXT";
    text: string;
} | {
    type: "AGE";
    age: number;
};

(async () => {

    const { Subject } = await import("rxjs");
    const { map, filter, takeWhile, scan, first } = await import("rxjs/operators");

    //With RxJS, Get a promise that resolve with the next "TEXT" event...
    {
        const subject = new Subject<Data>();

        const prText = subject
            .pipe(
                filter(data => data.type === "TEXT"), //Typescript does not restrict to TextEvent
                first(),
                //We have to cast, it's unsafe and verbose...
                map(data => (data as Extract<Data, { type: "TEXT" }>).text)
            )
            .toPromise();

        prText.then(console.log);

        //Prints "Hello World RxJS"
        subject.next({ "type": "TEXT", "text": "Hello World RxJS" });
    }

    await new Promise(resolve => setTimeout(resolve, 0));
    console.log("===================");

    //..Safer but more cryptic and less performant way of doing the same thing.
    {
        const subject = new Subject<Data>();

        const prText = subject
            .pipe(
                map(data => (data.type === "TEXT" ? [data.text] : null)),
                first((data): data is NonNullable<typeof data> => !!data), //Explicitly tell that we filler out null
                map(([text]) => text)
            )
            .toPromise();

        prText.then(console.log);

        //Prints "Hello World RxJS 2"
        subject.next({ "type": "TEXT", "text": "Hello World RxJS 2" });
    }

    await new Promise(resolve => setTimeout(resolve, 0));
    console.log("===================");

    const { Evt } = await import("../lib");

    //Equivalent with ts-evt
    {
        const evtData = new Evt<Data>();

        const prText = evtData.waitFor(
            data => data.type !== "TEXT" ?
                null :
                [data.text]
        );

        prText.then(console.log);

        evtData.post({
            type: "TEXT",
            text: "Hello World ts-evt"
        });
    }

    await new Promise(resolve => setTimeout(resolve, 0));
    console.log("===================");


    //An other example, accumulating all text event until "STOP"
    {


        const subject = new Subject<Data>();

        subject
            .pipe(
                map(data => (data.type === "TEXT" ? [data.text] : null)),
                filter((data): data is NonNullable<typeof data> => !!data),
                map(([text]) => text),
                takeWhile(text => text !== "STOP"),
                scan((prev, text) => `${prev} ${text}`, "=>")
            )
            .subscribe(str => console.log(str))
            ;

        //Prints "TICK"
        subject.next({ "type": "TEXT", "text": "TICK" });
        //Prints "TICK TACK"
        subject.next({ "type": "TEXT", "text": "TACK" });
        //Prints nothing
        subject.next({ "type": "TEXT", "text": "STOP" });
        //Prints nothing
        subject.next({ "type": "TEXT", "text": "TICK" });

    }

    console.log("===================");

    //Same thing with ts-evt and a single λ function operator...
    {
        const evtData = new Evt<Data>();

        evtData.$attach(
            [
                (data, prev) =>
                    data.type !== "TEXT" ?
                        null :
                        data.text === "STOP" ?
                            "DETACH" :
                            [`${prev} ${data.text}`]
                ,
                "=>"
            ],
            str => console.log(str)
        );

        //Prints "TICK"
        evtData.post({ "type": "TEXT", "text": "TICK" });
        //Prints "TICK TACK"
        evtData.post({ "type": "TEXT", "text": "TACK" });
        //Prints nothing
        evtData.post({ "type": "TEXT", "text": "STOP" });
        //Prints nothing
        evtData.post({ "type": "TEXT", "text": "TICK" });

    }

    console.log("===================");

    //...But it does not mean that we can't pipe as we do with RxJS
    {

        const evtData = new Evt<Data>();

        //Operators does not HAVE to be anonymous...
        const takeWhileNot = (stopStr: string): import("../lib").Operator.fλ<string, string> =>
            text => text !== stopStr ? [text] : "DETACH";

        //...Some standard ones are provided...
        const { scan } = await import("../lib");

        //...But you could define it yourself
        /*
        const { composeOperators } = await import("../lib");
        const myScan = <T, U>(
            accumulator: (acc: U, value: T, index: number) => U, 
            seed: U
        ) => composeOperators<T, [T, U, number], U>(
            [
                (data, [, acc, index]) =>
                    [[data, accumulator(acc, data, index), index + 1]],
                [null as any, seed, 0]
            ],
            ([, acc]) => [acc]
        );
        */

        evtData
            .pipe(
                data => data.type === "TEXT" ? [data.text] : null,
                takeWhileNot("STOP"),
                scan((prev, text) => `${prev} ${text}`, "=>")
            )
            .attach((str) => console.log(str))
            ;

        //Prints "TICK"
        evtData.post({ "type": "TEXT", "text": "TICK" });
        //Prints "TICK TACK"
        evtData.post({ "type": "TEXT", "text": "TACK" });
        //Prints nothing
        evtData.post({ "type": "TEXT", "text": "STOP" });
        //Prints nothing
        evtData.post({ "type": "TEXT", "text": "TICK" });

    }


})();


