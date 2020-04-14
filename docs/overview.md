---
Description: Comparison with the other library that addresses the same concern.
---

# Overview

## `EventEmitter` comparison

Let us consider this example, use of `EventEmitter`:

```typescript
import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

eventEmitter.on("text", text => console.log(text));
eventEmitter.once("time", time => console.log(time));

eventEmitter.emit("text", "hi!"); //Prints "hi!"
eventEmitter.emit("time", 123); //Prints "123"
eventEmitter.emit("time", 1234); //Prints nothing ( once )
```

In EVT the recommended approach is to give every event it's `Evt` instance. Translation of the example:

```typescript
import { Evt } from "evt";
//Or import { Evt } from "https://evt.land/x/evt/mod.ts" on deno

const evtText = Evt.create<string>();
const evtTime = Evt.create<number>();

evtText.attach(text => console.log(text));
evtTime.attachOnce(time => console.log(time));

evtText.post("hi!");
evtTime.post(123);
evtTime.post(1234);
```

However, the traditional approach that consists of gathering all the events in a single bus is also an option.

```typescript
import { Evt, to } from "evt";

const evt = Evt.create<
    [ "text",  string ] | 
    [ "time",  number ]
>();

evt.$attach(to("text"), text => console.log(text));
evt.$attachOnce(to("time"), time => console.log(time));

evt.post(["text", "hi!"]);
evt.post(["time", 123]);
evt.post(["time", 1234]);
```

[**Run the example**](https://stackblitz.com/edit/evt-honvv3?embed=1&file=index.ts&hideExplorer=1)

## RxJS comparison

### "Get started" examples.

Here is a translations of [the examples provided as an overview](https://rxjs-dev.firebaseapp.com/guide/overview#values) on the RxJS website.

```typescript
import { fromEvent } from "rxjs";
import { throttleTime, map, scan } from "rxjs/operators";

fromEvent(document, "click")
  .pipe(
      throttleTime(1000),
      map(event => event.clientX), // (TS: clientX does not exsist on type Event)
      scan((count, clientX) => count + clientX, 0)
  )
  .subscribe(count => console.log(count))
  ;

/* ------------------------------ */

import { Evt, throttleTime } from "evt";

Evt.from(document, "click")
    .pipe(
        throttleTime(1000),
        event => [ event.clientX ],
        [(clientX, count) => [ count + clientX ], 0]
    )
    .attach(count => console.log(count))
    ;
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-q772em?embed=1&file=index.ts&hideExplorer=1)

### RxJS operators vs EVT operator

Unlike [RxJS operators](https://rxjs-dev.firebaseapp.com/guide/operators) that return `Observable` EVT operators are function build using native language features, no by composing other pre-existing operators or instantiating any particular class. 

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
        filter(
            (data): data is Extract<Data, { type: "TEXT" }> => 
                data.type === "TEXT"
        ),
        first(),
        map(data => data.text) 
    )
    .toPromise()
    ;

/* ---------------------------------------------------------------- */

import { Evt } from "evt";

const evt = new Evt<Data>();

const prText = evt.waitFor(
    data => data.type !== "TEXT" ? 
        null : [data.text] 
);
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-795plc?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

Let us consider another example involving state encapsulation. Here we want to accumulate all texts events until `"STOP"`

```typescript
import { Subject } from "rxjs";
import { map, filter, takeWhile, scan } from "rxjs/operators";

const subject = new Subject<Data>();

subject
    .pipe(
        filter(
            (data): data is Extract<Data, { type: "TEXT" }> => 
                data.type === "TEXT"
        ), 
        map(data=> data.text),
        takeWhile(text => text !== "STOP"),
        scan((prev, text) => `${prev} ${text}`, "=>")
    )
    .subscribe(str => console.log(str))
    ;

/* ---------------------------------------------------------------- */

import { Evt } from "evt";

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

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-xuutfw?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

## Where to start

The API reference documentation is full of runnable examples that should get you started in no time.

