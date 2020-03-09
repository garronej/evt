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

* Combining the right abstractions/operators can be challenging, even for seemingly straights forward control flows.

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

## CONTRIBUTORS

* [`u/rogierschouten`](https://github.com/rogierschouten) Creator of `ts-events`, library form which `ts-evt` was heavily inspired.

  Infarct `ts-evt` was originally a fork aimed to add features to `rogierschouten/ts-events`.  

  Along the way it has been re-implemented from scratch keeping only the core API design.  

  AsyncEvent and QueuedEvent have been scraped out focusing only on the SyncEvent class.  

* [`u/garronej`](https://github.com/garronej) Creator of `ts-evt`.  

