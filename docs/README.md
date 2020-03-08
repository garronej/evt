# Introduction

![](https://user-images.githubusercontent.com/6702424/74597663-160a9c80-5063-11ea-9542-4437de0b7c66.png)

 💧Type safe replacement for Node's EventEmitter embracing functional programming💧  
  
 ![](https://img.shields.io/bundlephobia/min/ts-evt) ![](https://img.shields.io/bundlephobia/minzip/ts-evt) ![](https://img.shields.io/david/garronej/ts-evt) ![](https://img.shields.io/npm/l/ts-evt)

**WARNING**: If you happen to read this message note that the doc is in a temporary state as it is being migrated to git book. Everything will be fixed soon. \( Sun 8 march 2020 \)

`ts-evt` is intended to be a replacement for Node's `events` and alternative to `RxJS`.  
It enable and encourage **functional programming** and makes heavy use of **typescript**'s type inference features to provide **type safety** while keeping things **concise and elegant** 🍸.

TS-EVT run everywhere Node, **Deno**\(\*soon\), React Native and the web browser of your grand mother.

**Browserify friendly:**

* No polyfills needed ✅  
* Transpiled down to ES3 ✅  
* Light-weight, no third party dependencies ✅   

...Will be cross compatible with **Deno** very soon.

## Motivation

There is a lot of things that can't easily be done with `EventEmitter`:

* Enforcing type safety.
* Removing a particular listener when the callback is an anonymous function.
* Adding a one-time listener for the next event that meet a condition.
* Waiting \(via a Promise\) for one thing or another to happen.  

  Example: waiting at most one second for the next message, stop waiting if the socket disconnects.

`RxJS` have it's issues as well:

* When chaining operators the type is often lost along the way as

  Typescript struggle to keep track of the mutation / filtering being applied

  to the event flow.

* Combining the right abstractions/operators can be challenging, even for  seemingly straights forward control flows.

## Try it

![](https://ts-evt.dev/assets/img/try-in-browser.gif)

 [**Run hello world**](https://stackblitz.com/edit/ts-evt-demo-hello-world?embed=1&file=index.ts)

## Side by side comparison with `EventEmitter`

### Reference example

```typescript
import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

eventEmitter.on("text", text => console.log(text));
eventEmitter.once("time", time => console.log(time));

eventEmitter.emit("text", "hi!"); //Prints "hi!"
eventEmitter.emit("time", 123); //Prints "123"
eventEmitter.emit("time", 1234); //Prints nothing ( once )
```

### Equivalent, the recommended approach:

In `ts-evt` the recommended approach is to have a different `Evt` for each event type.

```typescript
import { Evt } from "ts-evt";

const evtText = new Evt<string>();
const evtTime = new Evt<number>();

evtText.attach(text => console.log(text));
evtTime.attachOnce(time => console.log(time));

evtText.post("hi!");
evtTime.post(123);
evtTime.post(1234);
```

### Equivalent, traditional approach:

But the traditional approach of gathering all the events in a single bus is still an option.

```typescript
import { evt, to } from "ts-evt";

const evt = new Evt<
    [ "text",  string ] | 
    [ "time",  number ]
>();

evt.$attach(to("text"), text => console.log(text));

evt.$attachOnce(to("time"), time => console.log(time));

evt.post(["text", "hi!"]);
evt.post(["time", 123]);
evt.post(["time", 1234]);
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-compared-with-events?embed=1&file=index.ts)

## Side by side comparison with `RxJS`

### Transcription of the _"get started"_ examples from the `RxJS` documentation.

You will have to put on you 👓 to notice any difference...

#### First example

```typescript
import { fromEvent } from 'rxjs';

fromEvent(document, 'click').subscribe(() => console.log('Clicked!'));

/* ------------------------------ */

import { Evt } from "ts-evt";

Evt.fromEvent(document, "click").attach(()=> console.log("Clicked!"));
```

#### Values

```typescript
import { fromEvent } from "rxjs";
import { throttleTime, map, scan } from "rxjs/operators"j;

fromEvent(document, "click")
  .pipe(
      throttleTime(1000),
      map(event => event.clientX),
      scan((count, clientX) => count + clientX, 0)
  )
  .subscribe(count => console.log(count))
  ;

/* ------------------------------ */

import { Evt, throttleTime, scan } from "ts-evt";

Evt.fromEvent(document, "click")
    .pipe(
        throttleTime(1000),
        event => [ event.clientX ],
        scan((count, clientX) => count + clientX, 0)
    )
    .attach(count => console.log(count))
    ;
```

### Transcription of examples that where not specifically designed to make `RxJS` looks good.

Instead of providing a ton of elementary operator `ts-evt` provide a way to define custom operator on the fly.

Introducing **fλ** operators.  
**fλ** are functions that are meant to be **anonymous**. They are designed in such a way that make them:

* Easy to write.  
* Easy to reason about for **humans**, they are self explanatory.
* Easy to reason about for the compiler, no type annotation are needed TypeScript can infer what they are doing.
* Very concise, a single **fλ** operator can replace the combination of multiple elementary operators such as `map()`, `filter()`, `takeWhile()`, `scan()`...
* Modular, if a single operator is not enough they can be composed to achieve more complex behavior.

#### Waiting for the next event of a certain type

Consider that we have an emitter for this data type:

```typescript
type Data = {
    type: "TEXT";
    text: string;
} | {
    type: "AGE";
    age: number;
};
```

We want to get a `Promise<string>` that resolves with the next text event.

```typescript
import { Subject } from "rxjs";
import { filter, first, map } from "rxjs/operators";

const subject = new Subject<Data>();

const prText = subject
    .pipe(
        filter(data => data.type === "TEXT"), 
        //From now on data can only be text event but TypeScript is unaware...
        first(),
        //...So we have to cast, it's unsafe and verbose. It may silently break on refactoring 🚨...
        map(data => (data as Extract<Data, { type: "TEXT" }>).text) 
    )
    .toPromise()
    ;

/* ---------------------------------------------------------------- */

import { Evt } from "ts-evt";

const evt = new Evt<Data>();

const prText = evt.waitFor(
    data => data.type !== "TEXT" ? null : [data.text] 
    //^ Single fλ operator replacing 'filter', 'first' and 'map'
);
```

### Example involving states encapsulation

We want to accumulate all texts event until `"STOP"`.

```typescript
import { Subject } from "rxjs";
import { map, filter, takeWhile, scan } from "rxjs/operators";

const subject = new Subject<Data>();

subject
    .pipe(
        filter(data => data.type === "TEXT"), 
        map((data => (data as Extract<Data, { type: "TEXT" }>).text),
        takeWhile(text => text !== "STOP"),
        scan((prev, text) => `${prev} ${text}`, "=>")
    )
    .subscribe(str => console.log(str))
    ;

/* ---------------------------------------------------------------- */

import { Evt } from "ts-evt";

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
    ], //<= Stateful fλ operator 
    str => console.log(str)
);
```

 [**Run the examples**](https://stackblitz.com/edit/ts-evt-vs-rxjs?embed=1&file=index.ts)  
  
 

![](https://user-images.githubusercontent.com/6702424/76122716-01cd1600-5ff7-11ea-8751-daf7b689e1b7.gif)

## Dependency requirement

Minimum version of typescript your project needs to be using is:

typescript &gt;= **2.8** \( Mar 2018 \)

Exposed api use typescript keywords that were added in this version.

## Table of content

* [Motivation](./#motivation)
* [Try it](./#try-it)
* [Side by side comparison with `EventEmitter`](./#side-by-side-comparison-with-eventemitter)
  * [Reference example](./#reference-example)
  * [Equivalent, the recommended approach:](./#equivalent-the-recommended-approach)
  * [Equivalent, traditional approach:](./#equivalent-traditional-approach)
* [Side by side comparison with `RxJS`](./#side-by-side-comparison-with-rxjs)
  * [Transcription of the _"get started"_ examples from the `RxJS` documentation.](./#transcription-of-the-get-started-examples-from-the-rxjs-documentation)
    * [First example](./#first-example)
    * [Values](./#values)
  * [Transcription of examples that where not specifically designed to make `RxJS` looks good.](./#transcription-of-examples-that-where-not-specifically-designed-to-make-rxjs-looks-good)
    * [Waiting for the next event of a certain type](./#waiting-for-the-next-event-of-a-certain-type)
  * [Example involving states encapsulation](./#example-involving-states-encapsulation)
* [Dependency requirement](./#dependency-requirement)
* [Table of content](./#table-of-content)
* [Api Documentation](./#api-documentation)
  * [Operator](./#operator)
    * [Operator - Filter](./#operator---filter)
    * [Operator - Type guard](./#operator---type-guard)
    * [Operator - fλ](./#operator---fλ)
      * [fλ Returns](./#fλ-returns)
      * [Stateless fλ](./#stateless-fλ)
      * [Stateful fλ](./#stateful-fλ)
    * [`compose(op1, op2, ...)`](./#composeop1-op2-)
  * [`Evt<T>`](./#evtt)
    * [`evt.[$]attach*(...)` methods](./#evtattach-methods)
      * [Arguments](./#arguments)
        * [Operator](./#operator-1)
        * [Timeout](./#timeout)
        * [BoundTo \( context \)](./#boundto--context-)
        * [Callback](./#callback)
      * [Returned value](./#returned-value)
      * [The `$` prefix](./#the--prefix)
      * [`evt.[$]attach(...)`](./#evtattach)
      * [`evt.[$]attachOnce*(...)`](./#evtattachonce)
      * [`evt.[$]attach[Once]Prepend(...)`](./#evtattachonceprepend)
      * [`evt.[$]attach[Once]Extract(...)`](./#evtattachonceextract)
    * [`evt.post*(data)` methods](./#evtpostdata-methods)
      * [`evt.post(data)`](./#evtpostdata)
      * [`evtPostCount: number`](./#evtpostcount-number)
      * [`evt.postAsyncOnceMatched(data)`](./#evtpostasynconcematcheddata)
      * [`evt.postSyncOnceMatched(data)`](./#evtpostsynconcematcheddata)
    * [The `Handler<T,U>` type](./#the-handlertu-type)
    * [`evt.getHandlers()`](./#evtgethandlers)
    * [`evt.evt[Attach|Detach]: Evt<Handler>` properties](./#evtevtattachdetach-evthandler-properties)
    * [`evt.isHandled(data)`](./#evtishandleddata)
    * [`evt.waitFor(...)`](./#evtwaitfor)
    * [`evt.pipe(...)`](./#evtpipe)
    * [`Evt.merge([evt1, evt2, ...])`](./#evtmergeevt1-evt2-)
    * [Detaching handlers.](./#detaching-handlers)
      * [`evt.detach([boundTo])`](./#evtdetachboundto)
      * [`handler.detach()`](./#handlerdetach)
      * [`ctx.detach([evt])`](./#ctxdetachevt)
  * [`Ctx`](./#ctx)
    * [`ctx.getHandlers()`](./#ctxgethandlers)
    * [`ctx.evtDetach: Evt<Handler[]>`](./#ctxevtdetach-evthandler)
    * [\`\`ctx.detach\(\[evt\]\)](./#ctxdetachevt-1)
  * [`VoidEvt`](./#voidevt)
  * [`Observable<T>`](./#observablet)
* [Difference between `evt.waitFor(...)` and `evt.attachOnce(...)`](./#difference-between-evtwaitfor-and-evtattachonce)
* [Credits](./#credits)
  * [Operators](./#operators)
    * [Operator - Filter](./#operator---filter-1)
    * [Operator - Type guard](./#operator---type-guard-1)
    * [Operator - fλ](./#operator---fλ-1)
      * [fλ returns](./#fλ-returns-1)
      * [Operator - Stateless fλ](./#operator---stateless-fλ)
      * [Operator - Stateful fλ](./#operator---stateful-fλ)
    * [Operator - Composition](./#operator---composition)
    * [Matcher - Compatible methods](./#matcher---compatible-methods)
  * [`evt.waitFor(...)`](./#evtwaitfor-1)
    * [Without timeout](./#without-timeout)
    * [With timeout](./#with-timeout)
  * [`VoidEvt`](./#voidevt-1)
  * [`evt.attachPrepend(...)` and  `evt.attachOncePrepend(...)`](./#evtattachprepend-and-evtattachonceprepend)
  * [`evt.attachExtract(...)` and `evt.attachOnceExtract(...)`](./#evtattachextract-and-evtattachonceextract)
  * [`evt.detach(...)`](./#evtdetach)
    * [`evt.detach()` all handlers.](./#evtdetach-all-handlers)
    * [`evt.handler(boundTo)` - bound to a given context](./#evthandlerboundto---bound-to-a-given-context)
    * [`handler.detach(callback)`](./#handlerdetachcallback)
  * [`evt.getHandlers()`](./#evtgethandlers-1)
  * [Combining Once, Prepend, matcher, timeout and boundTo](./#combining-once-prepend-matcher-timeout-and-boundto)
  * [`evt.createDelegate(...)`](./#evtcreatedelegate)
  * [`evt.postCount`](./#evtpostcount)
  * [`evt.evtAttach` and `evt.evtDetach`](./#evtevtattach-and-evtevtdetach)
  * [`evt.isHandled(data)`](./#evtishandleddata-1)
  * [`evt.postAsyncOnceHandled(data)` and `evt.postSyncOnceHandled(data)`](./#evtpostasynconcehandleddata-and-evtpostsynconcehandleddata)
  * [`evtUtil.race([...])`](./#evtutilrace)
  * [`NonPostable<Evt<T>>`](./#nonpostableevtt)
  * [`UnpackEvt<typeof evt>`.](./#unpackevttypeof-evt)
  * [`evt.enableTrace(...)`](./#evtenabletrace)
* [`Observable<T>` documentation](./#observablet-documentation)
* [Appendix: `evt.waitFor(...)` used in `async` procedure or loop](./#appendix-evtwaitfor-used-in-async-procedure-or-loop)
* [History of the project](./#history-of-the-project)

## Api Documentation

### Operator

Operator provide a way to transform events data before they are passed to the callback.

Operators can be of three types:

* **Filter**: `(data: T)=> boolean`.  

  Only the matched event data will be passed to the callback.

* **Type guard**: `<Q extends T>(data: T)=> data is Q`  

  Functionally equivalent to filter but restrict the event data type.  

* **fλ**  

  Filter / transform / stipulate when to detach the handler \( or a group of handler \)

  * **Stateless fλ**: `<U>(data: T)=> [U]|null|"DETACH"|{DETACH:Ref}|...`  
  * **Stateful fλ**: `[ <U>(data:T,prev:U)=> ..., U(initial value) ]`  

    Uses the previous result to perform the computation

Operators should not produce any side effect.

#### Operator - Filter

```typescript
import { Evt } from "ts-evt";

const evtText= new Evt<string>();

evtText.attach(
    text=> text.startsWith("H"), 
    text=> {
        console.assert( text.startsWith("H") );
        console.log(text);
    }
);

//Nothing will be printed to the console.
evtText.post("Bonjour");

//"Hi!" will be printed to the console.
evtText.post("Hi!");
```

NOTE: Make sure that your filters always returns a `boolean` at runtime.  
If in doubts use 'bang bang' \( `!!returnedValue` \).  
True as well for type guard operators.

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-matcher-return-boolean?embed=1&file=index.ts)

#### Operator - Type guard

If the operator is a type guard, the type of the callback argument will be narrowed down.

Let us define a straight forward type hierarchy to illustrate this feature.

```typescript
type Circle = {
    type: "CIRCLE";
    radius: number;
};

type Square = {
    type: "SQUARE";
    sideLength: number;
};

type Shape = Circle | Square;

const matchCircle = (shape: Shape): shape is Circle =>
    shape.type === "CIRCLE";
```

The `matchCircle` type guard enables to attach a callback to an `Evt<Shape>` that will only be called against circles.

```typescript
import { Evt } from "ts-evt";

const evtShape = new Evt<Shape>();

evtShape.attach(
    matchCircle,
    shape => console.log(shape.radius)
);

//Nothing will be printed to the console, a Square is not a Circle.
evtShape.post({ "type": "SQUARE", "sideLength": 3 });

//"33" Will be printed to the console.
evtShape.post({ "type": "CIRCLE", "radius": 33 });
```

The type of the Shape object is narrowed down to `Circle`  
![Screenshot 2020-02-08 at 19 17 46](https://user-images.githubusercontent.com/6702424/74090059-baab3e00-4aa7-11ea-9c75-97f1fb99666d.png)

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-matcher-type-guard?embed=1&file=index.ts)

#### Operator - fλ

Filter - Transform - Detach.

**fλ Returns**

The value that a fλ operator can return are:

* `null` If the event should be ignored and nothing passed to the callback.
* `[ U ]` or `[ U, null ]` When the event should be handled, wrapped into a singleton is the value to pass to the callback.
* `"DETACH"` When the event should be ignored and the handler detached from the `Evt`
* `{ DETACH: Ctx }` When the event should be ignored and a group of handler bound to a certain context must be detached. See [`Ctx`](./#Ctx)
* `[ U, "DETACH" ]` / `[ U, {DETACH:Ref} ]` To handle the event AND detach.

**Stateless fλ**

Stateless fλ operator only takes the event data as argument.

```typescript
import { Evt } from "ts-evt";

const evtShape = new Evt<Shape>();

/*
 * Filter: 
 *  Only circle event are handled.
 *  AND
 *  to be handled circles must have a radius greater than 100
 * 
 * Transform:
 *  Pass the radius of such circle to the callback.
 */
evtShape.$attach(
    shape => shape.type === "CIRCLE" && shape.radius > 100 ? 
        [ shape.radius ] : null,
    radius => console.log(`radius: ${radius}`) 
    //NOTE: The radius argument is inferred as being of type number!
);

evtShape.post({ "type": "SQUARE", "sideLength": 3 }); //Nothing will be printed to the console, it's not a circle
evtShape.post({ "type": "CIRCLE", "radius": 3 }); //Nothing will be printed to the console, The circle is too small.
evtShape.post({ "type": "CIRCLE", "radius": 200 }); //"radius 200" Will be printed to the console.
```

Other example using `"DETACH"`

```typescript
import { Evt } from "ts-evt";

const evtText= new Evt<"TICK" | "END">();

/*
 * Only handle events that are not "END".
 * If the event is "END", detach the handler.
 * Pass the event data string in lower cace to the callback.
 */
evtText.$attach(
    text => text !== "END" ? [ text.toLowerCase() ] : "DETACH",
    text => console.log(text) 
);

evtText.post("TICK"); //"tick" is printed to the console
evtText.post("END"); //Nothing is printed to the console, the handler is detached
evtText.post("TICK"); //Nothing is printed to the console the handler have been detached.
```

Example use of `[U,null|"DETACH"]`, handling the event that cause the handler to be detached.

```typescript
const evtText= new Evt<"TICK" | "END">();

evtText.$attach(
    text => [ text, text === "END" ? "DETACH" : null ],
    text => console.log(text) 
);

evtText.post("TICK"); //"TICK" is printed to the console
evtText.post("END"); //"END" is printed to the console, the handler is detached.
evtText.post("TICK"); //Nothing is printed to the console the handler have been detached.
```

Example use of `{ DETACH: Ctx }`, detaching a group of handler bound to a given context.

```typescript
const evtBtnClick = new Evt<"OK" | "QUIT">();

const evtMessage = new Evt<string>();
const evtNotification = new Evt<string>();

const ctx= Evt.newCtx();

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
```

[**Run examples**](https://stackblitz.com/edit/ts-evt-demo-transformative-matcher?embed=1&file=index.ts)

**Stateful fλ**

The result of the previously matched event is passed as argument to the operator.

```typescript
import { Evt } from "ts-evt";

const evtText= new Evt<string>();

evtText.$attach(
    [ 
        (str, prev)=> [`${prev} ${str}`], 
        "START: "  //<== Initial value
    ],
    sentence => console.log(sentence)
);

evtText.post("Hello"); //Prints "START: Hello"
evtText.post("World"); //Prints "START: Hello World"
```

Keep in mind that operator are not supposed to produce side effect.  
You should not make assumption on where and when operator are called.  
The following example seems equivalent from the previous one but it is not.

```typescript
const evtText= new Evt<string>();

//🚨 Do NOT do that 🚨...
evtText.$attach(
    (()=> {

        let acc= "START:";

        return (data: string) => [acc += ` ${data}`] as const;

    })(),
    sentence => console.log(sentence)
);

const text= "Foo bar";

if( evtText.isHandled(text) ){
    evtText.post(text); //Prints "START: Foo Bar Foo bar", probably not what you wanted.
}
```

[**Run example**](https://stackblitz.com/edit/ts-evt-demo-stateful?embed=1&file=index.ts)

#### `compose(op1, op2, ...)`

Operators can be composed to achieve more complex behavior.

Example composing Type guard with fλ:

```typescript
import { Evt, compose } from "ts-evt";

const evtShape= new Evt<Shape>();

evtShape.$attach(
    compose(
        matchCircle,
        ({ radius })=> [ radius ]
    ),
    radius => console.log(radius)
);

evtShape.post({ "type": "SQUARE", "sideLength": 10 }); //Prints nothing, Square does not matchCircle
evtShape.post({ "type": "CIRCLE", "radius": 12 }); //Prints "12"
```

Example with the "on" opérator.

```typescript
import { Evt, to, compose } from "../lib";

const evt = new Evt<
    ["text", string] |
    ["time", number]
>();

evt.$attach(
    compose(
        to("text"), 
        text => [ text.toUpperCase() ]
    )
    text => console.log(text)
);

evt.post(["text", "hi!"]); //Prints "HI!"
```

Example composing tre fλ to count the number of different word in a sentence:

```typescript
import { Evt, compose } from "ts-evt";

const evtSentence = new Evt<string>();

evtSentence.$attach(
    compose(
        str=> [ str.toLowerCase().split(" ") ],
        arr=> [ new Set(arr) ],
        set=> [ set.size ]
    ),
    numberOfUniqWordInSentence => console.log(numberOfUniqWordInSentence)
);

evtSentence.post("Hello World"); //Prints "2"
evtSentence.post("Boys will be boys"); //Prints "3", "boys" appears two times.
```

Using stateful fλ operators to implement `throttleTime(duration)`, an operator that let through at most one event every \[duration\] milliseconds.

```typescript
const throttleTime = <T>(duration: number) =>
    compose<T, { data: T; lastClick: number; }, T>(
        [
            (data, { lastClick }) => 
                 Date.now() - lastClick < duration ?
                    null :
                    [{ data, "lastClick": Date.now() }],
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

setTimeout(()=>evtText.post("A"), 0); //Prints "A"
setTimeout(()=>evtText.post("B"), 500); //Prints nothing, the previous event was handled less than 1 second ago.
setTimeout(()=>evtText.post("B"), 750); //Prints nothing, the previous event was handled less than 1 second ago.
setTimeout(()=>evtText.post("C"), 1001); //Prints "C"
setTimeout(()=>evtText.post("D"), 2500); //Prints "D"
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-compose?embed=1&file=index.ts)

### `Evt<T>`

Class that is the equivalent of `EventEmitter` in `"events"` and `Subject<T>` in `"rxjs"`

#### `evt.[$]attach*(...)` methods

**Arguments**

**Operator**

**Timeout**

**BoundTo \( context \)**

**Callback**

**Returned value**

**The $ prefix**

**evt.\[$\]attach\(...\)**

**evt.\[$\]attachOnce\*\(...\)**

**evt.\[$\]attach\[Once\]Prepend\(...\)**

**evt.\[$\]attach\[Once\]Extract\(...\)**

#### `evt.post*(data)` methods

**evt.post\(data\)**

**evtPostCount: number**

**evt.postAsyncOnceMatched\(data\)**

**evt.postSyncOnceMatched\(data\)**

#### The `Handler<T,U>` type

#### `evt.getHandlers()`

#### `evt.evt[Attach|Detach]: Evt<Handler>` properties

#### `evt.isHandled(data)`

#### `evt.waitFor(...)`

#### `evt.pipe(...)`

#### `Evt.merge([evt1, evt2, ...])`

#### Detaching handlers.

**evt.detach\(\[boundTo\]\)**

**handler.detach\(\)**

**ctx.detach\(\[evt\]\)**

### `Ctx`

#### `ctx.getHandlers()`

#### `ctx.evtDetach: Evt<Handler[]>`

#### \`\`ctx.detach\(\[evt\]\)

### `VoidEvt`

### `Observable<T>`

## Difference between `evt.waitFor(...)` and `evt.attachOnce(...)`

## Credits

### Operators

#### Operator - Filter

#### Operator - Type guard

#### Operator - fλ

**fλ returns**

**Operator - Stateless fλ**

**Operator - Stateful fλ**

#### Operator - Composition

#### Matcher - Compatible methods

Operators functions can be used with:

* All the `attach*(...)` methods  
* `waitFor(...)`   
* `pipe(...)`   

Due to current [TypeScript limitation](https://github.com/microsoft/TypeScript/issues/36735) the `.attach*()` methods need to be prefixed with `$` when used with `fλ` operator.  
`evt.$attach*()` are actually just aliases to the corresponding `evt.attach*()` methods but the `$` is currently required for the type inference to work.

`waitFor(...)` and `attachOnce(...)` combined with matcher address the main shortcoming of EventEmitter allowing us to asynchronously wait for the next shape that is a circle, for example.

```typescript
import { Evt } from "ts-evt";

const evtShape = new Evt<Shape>();

evtShape.waitFor(matchCircle)
    .then(circle => console.log(`radius: ${circle.radius}`))
    ;

evtShape.$attachOnce(
    shape => shape.type === "SQUARE" && shape.sideLength > 100 ? 
        [ shape.sideLength ] : null,
    sideLength => console.log(`length: ${sideLength}`)
);


const circle: Circle = {
    "type": "CIRCLE",
    "radius": 33
};

//"radius: 33" will be printed to the console.
evtShape.post(circle);

//Nothing will be printed on the console, the promise returned by waitFor has already resolved.
evtShape.post(circle);

//Nothing will be printed, the side length is too short
evtShape.post({
    "type": "SQUARE",
    "sideLength": 12
});

evtShape.post({
    "type": "SQUARE",
    "sideLength": 21
});
//"length: 21" have been  printed to the console.

//Noting will be printed, attachOnce's callback function has already been invoked.
evtShape.post({
    "type": "SQUARE",
    "sideLength": 44
});
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-matcher-and-waitfor?embed=1&file=index.ts)

### `evt.waitFor(...)`

Method that returns a promise that will resolve when the next event is posted.

#### Without timeout

By default the promise returned by `waitFor` will never reject.

```typescript
import { Evt } from "ts-evt";

const evtText = new Evt<string>();

setTimeout(()=> evtText.post("Hi!"), 1500);

(async ()=>{

    //waitFor return a promise that will resolve next time 
    //post() is invoked on evtText.
    const text = await evtText.waitFor();

    console.log(text);

})();
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-waitfor?embed=1&file=index.ts)

#### With timeout

It is possible to set what is the maximum amount of time we are willing to wait for the event before the promise rejects.

```typescript
import { Evt, EvtError } from "ts-evt";

const evtText = new Evt<string>();

(async ()=>{

    try{

        const text = await evtText.waitFor(500);

        console.log(text);

    }catch(error){

        console.assert(error instanceof EvtError.Timeout);
        //Error can be of two type:
        //  -EvtError.Timeout if the timeout delay was reached.
        //  -EvtError.Detached if the handler was detached before 
        //  the promise returned by waitFor have resolved. 

        console.log("TIMEOUT!");

    }

})();

//A random integer between 0 and 1000
const timeout= ~~(Math.random() * 1000);

//There is a fifty-fifty chance "Hi!" is printed else it will be "TIMEOUT!".
setTimeout(
    ()=> evtText.post("Hi!"), 
    timeout
);
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-waitfor-timeout?embed=1&file=index.ts)

### `VoidEvt`

When you create an Evt with a void argument, TypeScript forces you to pass `undefined` to `post()`.  
Instead use `VoidEvt`

```typescript
import { VoidEvt } from "ts-evt";

const evtSocketConnect = new VoidEvt();

evtSocketConnect.attach(() => console.log("SOCKET CONNECTED"));

evtSocketConnect.post();
//"SOCKET CONNECTED" have been printed to the console.
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-voidevt?embed=1&file=index.ts)

### `evt.attachPrepend(...)` and  `evt.attachOncePrepend(...)`

Similar to Node's `emitter.prependListener(...)` and `emitter.prependOnceListener(...)`

```typescript
import { VoidEvt } from "ts-evt";

const evtConnect = new VoidEvt();

evtConnect.attach(() => console.log("B"));
evtConnect.attach(() => console.log("C"));

evtConnect.attachPrepend(() => console.log("A"));

evtConnect.post();
//"A", "B", "C" is printed to the console.
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-prepend?embed=1&file=index.ts)

### `evt.attachExtract(...)` and `evt.attachOnceExtract(...)`

To handle edge cases that haven't been anticipated without having to rethink the model as a whole we provide a way to extract particular types of events.

```typescript
import { Evt } from "ts-evt";

const evtCircle = new Evt<Circle>();

evtCircle.attachExtract(
    ({ radius }) => radius <= 0,
    ({ radius }) => console.log(`malformed circle with radius: ${radius} extracted`)
);

evtCircle.attach(
    circle => {
        //We can assume that the circle has a positive radius.
        console.assert(circle.radius > 0);
    }
);

//Extract have priority over prepend
evtCircle.attachPrepend(
    circle => {
        console.assert(circle.radius > 0);
    }
);
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-extract?embed=1&file=index.ts)

### `evt.detach(...)`

Multiple ways of detaching handlers are provided.

#### `evt.detach()` all handlers.

To detach all handlers at once:

```typescript
const evtText = new Evt<string>();
//detach with no argument will detach all handlers (attach, attachOnce, waitFor... )
evtText.detach();
```

#### `evt.handler(boundTo)` - bound to a given context

The preferred way of detaching an handler is by using "boundTo" context.

```typescript
import { Evt } from "ts-evt";

const evtText = new Evt<string>();

evtText.attachOnce(text=> console.log(`Hello ${text}`));

//boundTo can be anything but a number undefined, null or
//a callable function (you can't use a constructor).
const boundTo = [];

evtText.attach(
    boundTo,
    _text => console.assert(false,"never")
);

evtText.attachOnce(
    boundTo,
    _text => console.assert(false,"never")
);

evtText.detach(boundTo);

//"Hello World" will be printed
evtText.post("World");
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-detach-with-contex?embed=1&file=index.ts)

#### `handler.detach(callback)`

To detach all the handlers using a given callback function as we do with EventEmitter:

```typescript
const evtText = new Evt<string>();

const callback = (_text: string) => { };

evtText.attach(callback);

evtText.getHandlers()
    .filter(handler => handler.callback === callback)
    .forEach(({detach})=> detach())
    ;
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-detach-classic?embed=1&file=index.ts)

### `evt.getHandlers()`

List all handlers attached to the `Evt`.  
Returns an array of `Handler<T>`.  
A `Handler[]` is an object that contains all the information needed to identify a handler and a `detach()` method.

Here a use case detaching all handlers that uses a given matcher:

```typescript
import { Evt } from "ts-evt";

const evtShape = new Evt<Shape>();

evtShape.attach(
    matchCircle,
    _circle => { }
);
evtShape.attachOnce(
    matchCircle,
    _circle => { }
);

evtShape.waitFor(matchCircle)
    .then(_circle => { })
    ;

//waitFor will not reject once detached as no timeout have been specified.
evtShape.getHandlers()
    .filter(({ matcher }) => matcher === matchCircle)
    .forEach(({ detach }) => detach())
    ;
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-detach-matcher?embed=1&file=index.ts)

### Combining Once, Prepend, matcher, timeout and boundTo

Large number of methods combining Once, Prepend are exposed.

![Screenshot 2020-02-08 at 19 25 44](https://user-images.githubusercontent.com/6702424/74090178-d4995080-4aa8-11ea-815f-5ae66a761812.png)

For each of those methods a large number of overload are defined so that you can combine matchers, timeout or boundTo.

![Screenshot 2020-02-08 at 19 27 56](https://user-images.githubusercontent.com/6702424/74090245-6c973a00-4aa9-11ea-8e48-90d49a0ed20b.png)

All the attach methods returns Promises that resolve when an event is matched for the first time and reject in the same way `waitFor` does. This explains why it is possible to combine `attach` `attachOnce`, `attachPrepend` ect... with the timeout parameter.

### `evt.createDelegate(...)`

Create a new instance of Evt toward which will be forwarded all the events matched by the matcher function.

```typescript
import { Evt } from "ts-evt";

const evtShape = new Evt<Shape>();

//evtCircle is of type Evt<Circle> because matchCircle is a type guard.
const evtCircle = evtShape.createDelegate(matchCircle);

//evtLargeShape is of type Evt<Shape>
const evtLargeShape = evtShape.createDelegate(shape => {
  switch (shape.type) {
    case "CIRCLE":
      return shape.radius > 5;
    case "SQUARE":
      return shape.sideLength > 3;
  }
});

evtCircle.attach(({ radius }) =>
  console.log(`Got a circle, radius: ${radius}`)
);

evtLargeShape.attach(
    shape => console.log(`Got a large ${shape.type}`)
);

//"Got a circle, radius: 66" and "Got a large CIRCLE" will be printed.
evtShape.post({
  "type": "CIRCLE",
  "radius": 66
});

//Only "Got a circle, radius: 3" will be printed
evtShape.post({
  "type": "CIRCLE",
  "radius": 3
});

//Only "Got a large SQUARE" will be printed
evtShape.post({
  "type": "SQUARE",
  "sideLength": 30
});

//Nothing will be printed
evtShape.post({
  "type": "SQUARE",
  "sideLength": 1
});
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-delegate?embed=1&file=index.ts)

### `evt.postCount`

The number of times `post()` has been called can be tracked by the `postCount` property.

```typescript
import { Evt } from "ts-evt";

const evtText= new Evt<string>();

//prints 0
console.log(evtText.postCount);

evtText.post("foo");
evtText.post("bar");
evtText.post("baz");

//prints 3
console.log(evtText.postCount);
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-postcount?embed=1&file=index.ts)

### `evt.evtAttach` and `evt.evtDetach`

`.evtAttach` and `.evtDetach` are `Evt<Handler<T, any>>`that track in the handler as they are being attached/detached from the `evt`.

```typescript
import * as console from "./consoleToPage";

import { Evt } from "ts-evt";

const evtText= new Evt<string>();

const callback = (text: string)=> {};

evtText.evtAttach.attachOnce(handler => 
  console.log(handler.callback === callback)
);

evtText.attach(callback);
//"true" is printed to the console.
```

TODO: Update the example to includes `evtDetach`

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-evtattach?embed=1&file=index.ts)

### `evt.isHandled(data)`

Test if posting event data will have an effect.

Return true if:

-There is at least one handler matching this event data \( at least one handler's callback function will be invoked if the data is posted. \)

-There is at least one handler that will be detached if the event data is posted.

```typescript
const evtText = new Evt<string>();

/*
Handle the text starting with 'h'.
Ignore all other text, when a text starting with 'g'
is posted the handler is detached
*/
evtText.$attach(
    text=> text.startsWith("h") ? 
        [ text ] : 
        text.startsWith("g") ? "DETACH" : null
    text=> {/* do something with the text */}
);

//"true", start with 'h'
console.log(
    evtText.isHandled("hello world")
);

//"false", do not start with 'h' or 'g'
console.log(
    evtText.isHandled("hello world")
);

//"true", not matched but will cause the handler to be detached if posted
console.log(
    evtText.isHandled("goodby world")
);
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-is-hadled?embed=1&file=index.ts)

### `evt.postAsyncOnceHandled(data)` and `evt.postSyncOnceHandled(data)`

When `isHandled(data)` return `true`, `postAsyncOnceHandled(data)` is a proxy for `post(data)`.

When `postAsyncOnceHandled(data)` is invoked at a time where `isHandled(data)` returns `false`, the `data` will be hold and posted only once `isHandler(data)` would return `true`.  
`post(data)` is scheduled to be invoked in a micro task once a candidate handler is attached \(not synchronously\).

When the call to post is delayed `postAsyncOnceHandled(data)` returns a promise that resolve with the new post count when `post(data)` is invoked. Else returns the new post count synchronously.

`postSyncOnceHandled(data)` on the other hand will post synchronously as soon as a candidate handler is attached.

```typescript
import { Evt } from "ts-evt";

function createPreloadedEvtText(): Evt<string>{

    const evtText = new Evt<string>();

    (async ()=>{

        await evtText.postAsyncOnceHandled("Foo");
        evtText.post("bar");


    })();


    return evtText;

}

const evtText = createPreloadedEvtText();

evtText.attach(text => console.log("1 " + text));
evtText.attach(text => console.log("2 " + text));

console.log("BEFORE");

//"BEFORE" then (next micro task) "1 foo" "2 foo" "1 bar" "2 bar"
//If we use postSyncOnceHandled in place of postAsyncOnceHandled
//we get "1 Foo" "BEFORE" "1 Bar" "2 Bar"
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-postoncematched?embed=1&file=index.ts)

### `evtUtil.race([...])`

`evtUtil.race([...])` is a generalization of `Promise.race([...])` that accept `Evt` as well as `Promise` and direct value.

The `evtUtil.race([...])` function returns an `OneShot<Evt>` that post or as soon as one of the evt/promises in the array post/fulfill.

TODO: Provide real documentation and usecase.

### `NonPostable<Evt<T>>`

A non postable `Evt` is an `Evt` that does not expose the methods `post()`, `postAsyncOnceHandled()` and `postSyncOnceHandled()`. It is useful for exposing `Evt`s to parts of the code that are in charge of reacting to the events but are not supposed to post.

Note that `NonPostable<>` is not a class or an interface it's just an helper type that says: "You are not allowed to post with this `Evt`"

```typescript
import { Evt } from "ts-evt";
import { NonPostable } from "ts-evt/dist/lib/helperTypes";

const evtText= new Evt<string>();

//Api to expose.
export const api:{ evtText: NonPostable<Evt<string>>; } = { evtText };

//evtText exposed by the api cannot be posted.
api.evtText.post //<=== TS error 
api.evtText.postOnceMatched //<===== TS error

//But we can post internally.
evtText.post("good");
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-non-postable?embed=1&file=index.ts)

### `UnpackEvt<typeof evt>`.

UnpackEvt is a helper type to infer the type argument of an Evt instance.

```typescript
import { Evt } from "ts-evt";
import { UnpackEvt, NonPostable } from "ts-evt/dist/lib/helperTypes";

const evtHuman = new Evt<{
    name: string;
    age: number;
    gender: "MALE" | "FEMALE"
}>();

{

    type Human = UnpackEvt<typeof evtHuman>;

    const human: Human = {
        "name": "bob",
        "age": 89,
        "gender": "MALE"
    };

    evtHuman.post(human);

}

//It is also possible to extract the type from a NonPostable
{

    const evtHumanExposed: NonPostable<typeof evtHuman> = evtHuman;

    type Human = UnpackEvt<typeof evtHumanExposed>;

    const human: Human = {
        "name": "bob",
        "age": 89,
        "gender": "MALE"
    };

    evtHuman.post(human);

}
```

Note that if you try unpacking the type of an evt instantiated by a module that use a different version of `ts-evt` that the one you included in the your project the inference will fail.

Note also that the `UnpackEvt<>` is not included in the default export of the module because doing so would restrict `ts-evt` to be used in projects  
using typescript version before 2.8 \( version when the infer keyword was introduced \).

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-unpack-type-argument?embed=1&file=index.ts)

### `evt.enableTrace(...)`

If you need help to track down a bug, you can use `enableTrace` to log what's going on with an Evt.  
Use `evt.disableTrace()` to stop logging.

```typescript
import { Evt } from "ts-evt";

{
    const evtCircle = new Evt<Circle>();

    evtCircle.enableTrace("evtCircle n°1");

    evtCircle.post(circle1);

    evtCircle.attachOnce(circle => {});

    evtCircle.post(circle2);

}

console.log("\n");

//Optional arguments 
{

    const evtCircle = new Evt<Circle>();

    evtCircle.enableTrace(
        "evtCircle n°2",
        circle => `CIRCLE(${circle.radius})`, //Formatter
        (...args)=> console.log(...["[myPrefix]",...args]) // Log function ( default console.log )
    );

    evtCircle.attach(
        ({ radius }) => radius > 15, 
        circle => {}
    );

    evtCircle.post(circle1);
    evtCircle.post(circle2);

}
```

This will print:

```text
(evtCircle n°1) 0 handler => { "type": "CIRCLE", "radius": 12 }
(evtCircle n°1) 1 handler => { "type": "CIRCLE", "radius": 33 }

[myPrefix] (evtCircle n°2) 0 handler => CIRCLE(12)
[myPrefix] (evtCircle n°2) 1 handler => CIRCLE(33)
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-trace?embed=1&file=index.ts)

## `Observable<T>` documentation

`Observable` in `RxJS` and `ts-evt` are **not** the same abstraction.

`Observable<T>` in `ts-evt` provide a way to react to an object mutation.

A `Observable<T>` encapsulate a value of type `T` when this value get changed `.evtChange` is posted.

```typescript
import { Observable, IObservable } from "ts-evt";
import { assert } from "ts-evt/dist/tools/typeSafety";

const obsText= new Observable<string>("foo");

console.assert(obsText.value === "foo");

obsText.evtChange.attachOnce(
    newText=> {
        assert(newText === obsText.value);
        console.log(`newValue: ${newText}`);
    }
);

obsText.evtChangeDiff.attachOnce(
    ({ newValue, previousValue })=> {

        assert(newValue === obsText.value);

        console.log(`newValue: ${newValue}, previousValue ${previousValue}`);

    }
);

//Nothing will be printed as the value did not change.
let hasChanged = obsText.onPotentialChange("foo");

assert( hasChanged === false );

hasChanged = obsText.onPotentialChange("bar");
//"newValue: bar" have been printed to the console.
//"newValue: bar, previousValue foo" have been printed to the console.

assert(hasChanged === true);

assert(obsText.value === "bar");

//Instance of Observable are assignable to IObservable but
//the IObservable interface does not expose onPotentialChange().
//The IObservable interface is used to expose an observable as readonly.
const exposedObsText: IObservable<string> = obsText;
```

Is is possible to define what qualify as a change.

```typescript
import { Observable } from "ts-evt";
import { representsSameDataFactory } from "ts-evt/dist/tools/inDepthObjectComparison";
import { diff } from "ts-evt/dist/tools/reducers";

const { representsSameData } = representsSameDataFactory(
    { "takeIntoAccountArraysOrdering": false }
);

const obsUsers = new Observable<string[]>(
    ["Bob", "Alice"],
    representsSameData
);

obsUsers.evtChangeDiff.attach(
    ({ newValue, previousValue }) => {

        const { added, removed } = previousValue.reduce(...diff(newValue))

        console.log(`${added.join(", ")} joined the chat`);
        console.log(`${removed.join(", ")} left the chat`);

    }
);

//New array, "Bob" has been removed and "Louis" has been added.
const updatedUsers = [
    ...obsUsers.value.filter(name => name !== "Bob"),
    "Louis"
];

//Prints "Louis joined the chat" "Bob left the chat"
obsUsers.onPotentialChange(updatedUsers);
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-observable-change-condition?embed=1&file=index.ts)

## Appendix: `evt.waitFor(...)` used in `async` procedure or loop

`evt.waitFor()` is **NOT** equivalent to `new Promise(resolve=> evt.attachOnce(resolve))`

`.waitFor()` is designed in a way that makes it safe to use `async` procedures.

Basically it means that the following example prints `A B` on the console instead of waiting forever for the secondLetter.

```typescript
import { Evt } from "ts-evt";

const evtText = new Evt<string>();

(async ()=>{

    const firstLetter = await evtText.waitFor();
    const secondLetter = await evtText.waitFor();

    console.log(`${firstLetter} ${secondLetter}`);

})();

evtText.post("A");
evtText.post("B");

//"A B" is printed to the console.
```

Run this [**more practical example**](https://stackblitz.com/edit/ts-evt-demo-edge-case?embed=1&file=index.ts) to understand how this behavior prevent from some hard to figure out bugs.

Enforcing this behavior does involve some voodoo. This is the explanation as to why the source code of `ts-evt` appears very cryptic for an event bus implementation.

## History of the project

This project was originally a fork aimed to add features to `rogierschouten/ts-events`.  
Along the way it has been re-implemented from scratch keeping only the core API design.  
AsyncEvent and QueuedEvent have been scraped out focusing only on the SyncEvent class.

