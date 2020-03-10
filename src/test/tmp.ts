
import { Evt, to, compose } from "../lib";

//import { Operator } from "../lib/types/Operator";

{

    const evt = new Evt<
        ["text", string] |
        ["time", number]
    >();

    evt.$attach(to("text"), text => console.log(text));

    evt.$attachOnce(to("time"), time => console.log(time));

    evt.post(["text", "hi!"]);
    evt.post(["time", 123]);
    evt.post(["time", 1234]);

}

{

    const evt = new Evt<
        ["text", string] |
        ["time", number]
    >();

    evt.$attach(
        compose(
            to("text"),
            text => [text.toUpperCase()]
        ),
        text => console.log(text)
    );

    evt.$attachOnce(
        to("time"),
        time => console.log(time)
    );

    evt.post(["text", "hi!"]);
    evt.post(["time", 123]);
    evt.post(["time", 1234]);

}

{

    const evtText = new Evt<string>();

    evtText.$attach(
        (() => {

            let acc = "START:";

            return (data: string) => [acc += ` ${data}`] as const;

        })(),
        sentence => console.log(sentence)
    );

    const text = "Foo bar";

    if (evtText.isHandled(text)) {

        evtText.post(text);

    }

}


{

    const evtBtnClick = new Evt<"OK" | "QUIT">();

    const evtMessage = new Evt<string>();
    const evtNotification = new Evt<string>();

    const ctx = Evt.newCtx();

    evtMessage.attach(
        ctx,
        message => console.log(`message: ${message}`)
    );

    evtNotification.attach(
        ctx,
        notification => console.log(`notification: ${notification}`)
    );

    evtBtnClick.$attach(
        type => [
            type,
            type !== "QUIT" ? null : { "DETACH": ctx }
        ],
        type => console.log(`Button clicked: ${type}`)
    );

    evtBtnClick.post("OK"); //Prints "Button clicked: OK"
    evtMessage.post("Hello World"); //Prints "Message: Hello World"
    evtNotification.post("Poke"); //Prints "Notification: Poke"
    evtBtnClick.post("QUIT"); //Prints "Button clicked: QUIT", handler are detached...
    evtMessage.post("Hello World 2"); //Prints nothing
    evtNotification.post("Poke 2"); //Prints nothing
    evtBtnClick.post("OK"); //Prints "OK", evtBtnClick handler hasn't been detached as it was not bound to ctx.

}




type Circle = {
    type: "CIRCLE";
    radius: number;
};

type Square = {
    type: "SQUARE";
    sideLength: number;
};

type Shape = Circle | Square;


const evt = new Evt<
    ["text", string] |
    ["time", number]
>();

evt.$attach(
    t => t[0] !== "text" ? null : [t[1]],
    text => console.log(text)
);

evt.$attachOnce(
    t => t[0] !== "time" ? null : [t[1]],
    time => console.log(time)
);

evt.post(["text", "hi!"]);
evt.post(["time", 123]);
evt.post(["time", 1234]);



const matchCircle = (shape: Shape): shape is Circle =>
    shape.type === "CIRCLE";

{

    const evtShape = new Evt<Shape>();

    /*
     * Only circle event are handled.
     * AND
     * to be handled circle must have a radius greater than 100
     * 
     * Pass the radius of such circle to the callback.
     */
    evtShape.$attach(
        shape => shape.type === "CIRCLE" && shape.radius > 100 ?
            [shape.radius] : null,
        radius => console.log(`radius: ${radius}`)
        //NOTE: The radius argument is inferred as being of type number!
    );

    //Nothing will be printed to the console, it's not a circle
    evtShape.post({
        "type": "SQUARE",
        "sideLength": 3
    });

    //Nothing will be printed to the console, The circle is too small.
    evtShape.post({
        "type": "CIRCLE",
        "radius": 3
    });

    //"radius 200" Will be printed to the console.
    evtShape.post({
        "type": "CIRCLE",
        "radius": 200
    });

}

{

    const evtText = new Evt<"TICK" | "END">();

    /*
     * Only handle events that are not "END".
     * If the event is "END", detach the handler.
     * Pass the event data string in lower cace to the callback.
     */
    evtText.$attach(
        text => text !== "END" ? [text.toLowerCase()] : "DETACH",
        text => console.log(text)
    );

    //"tick" is printed to the console
    evtText.post("TICK");

    //Nothing is printed to the console, the handler is detached
    evtText.post("END");

    //Nothing is printed to the console the handler have been detached.
    evtText.post("TICK");

}

console.log("============");

{

    const evtText = new Evt<"TICK" | "END">();

    evtText.$attach(
        text => [text, text === "END" ? "DETACH" : null],
        text => console.log(text)
    );

    //"TICK" is printed to the console
    evtText.post("TICK");
    //"END" is printed to the console, the handler is detached.
    evtText.post("END");

    //Nothing is printed to the console the handler have been detached.
    evtText.post("TICK");


}

{

    const evtText = new Evt<string>();

    evtText.$attach(
        [
            (str, prev) => [`${prev} ${str}`],
            "START: "  //<== Initial value
        ],
        sentence => console.log(sentence)
    );

    //Prints "START: Hello"
    evtText.post("Hello");

    //Prints "START: Hello World"
    evtText.post("World");

}



import { of, MonoTypeOperatorFunction } from 'rxjs';
import { first } from 'rxjs/operators';

//reusable custom operator
function firstTruthy<T>(): MonoTypeOperatorFunction<T> {
    return input$ => input$.pipe(first())
}

const source$ = of(0, '', 'foo', 69);

const result$ = source$.pipe(
    firstTruthy()
);

result$.subscribe(console.log);

//console output
// 'foo'

console.log("=======");

//Composing type guard with fλ
{

    const evtShape = new Evt<Shape>();


    evtShape.$attach(
        compose(
            matchCircle,
            ({ radius }) => [radius]
        ),
        radius => console.log(radius)
    );

    //Prints nothing
    evtShape.post({ "type": "SQUARE", "sideLength": 10 });

    //Prints "12"
    evtShape.post({ "type": "CIRCLE", "radius": 12 });

}

//Example composing tree fλ to count the number of different word in a sentence.
{

    const evtSentence = new Evt<string>();

    evtSentence.$attach(
        compose(
            str => [str.toLowerCase().split(" ")],
            arr => [new Set(arr)],
            set => [set.size]
        ),
        numberOfUniqWordInSentence => console.log(numberOfUniqWordInSentence)
    );

    //Prints "2"
    evtSentence.post("Hello World");
    //Prints "3"
    evtSentence.post("Boys will be boys");

}

//Using stateful fλ to implement throttleTime, an operator that let through 
//at most one event per [duration]
{

    const throttleTime = <T>(duration: number) =>
        compose<T, { data: T; lastClick: number; }, T>(
            [
                (data, { lastClick }) => {

                    const now = Date.now();

                    return now - lastClick < duration ?
                        null :
                        [{ data, "lastClick": now }]
                        ;

                },
                { "lastClick": 0, "data": null as any }
            ],
            ({ data }) => [data]
        )
        ;

    const evtText = new Evt<string>();

    evtText.$attach(
        throttleTime(1000), //<= At most one event per second is handled.
        text => console.log(text)
    );

    //Prints "A"
    setTimeout(() => evtText.post("A"), 0);
    //Prints nothing the previous event was handled less than 1 second ago.
    setTimeout(() => evtText.post("B"), 500);
    //Prints nothing the previous event was handled less than 1 second ago.
    setTimeout(() => evtText.post("B"), 750);
    //Prints "C"
    setTimeout(() => evtText.post("C"), 1001);
    //Prints "D"
    setTimeout(() => evtText.post("D"), 2500);

}

