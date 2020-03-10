---
description: Comparison with the other library that address the same consern.
---

# Overview

## `EventEmitter` comparison

Let us consider this example use of `EventEmitter`:

```typescript
import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

eventEmitter.on("text", text => console.log(text));
eventEmitter.once("time", time => console.log(time));

eventEmitter.emit("text", "hi!"); //Prints "hi!"
eventEmitter.emit("time", 123); //Prints "123"
eventEmitter.emit("time", 1234); //Prints nothing ( once )
```

The recommended way to translate this using `ts-evt` is the following. Every event type has it's own instance of `Evt`.

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

However, the traditional approach that consist in gathering all the events in a single bus is also an option.

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

## `RxJS` comparison

### "get started" examples.

Here are direct translations of examples [provided as overview on the RxJS website](https://rxjs-dev.firebaseapp.com/guide/overview). You will have to put on you 👓 to notice the differences, on surface the API of the two library are very simillar.

#### First example

```typescript
import { fromEvent } from "rxjs";

fromEvent(document, "click").subscribe(() => console.log("Clicked!"));

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

### What differientiate the two lib

The approach of RxJS is to provide a large library of elementary operator that can be combined one another to cover virtually every posible usecases.

TS-EVT distant itself from this approach for two reasons:

* This approach make it hard to enforce seamless type safety.
* Every new elementary operator constitute a new abstraction, there is 103 operators availible in RxJS, a lot of concept to digest before beeing able to use the library at it's full potential. 

The approach of `ts-evt` is to provide a way to define custom operators on the fly.

Introducing **fλ** operators one abstraction to remove the need of countless others.  
fλ operators are **functions \(f\)** that are meant to be **anonymous \(**[**λ**](https://en.wikipedia.org/wiki/Anonymous_function)**\)**. They are designed in such a way that make them:

* Easy to write.  
* Easy to reason about for **humans**, they are self explanatory for anyone familiar with how they works.
* Easy to reason about for the compiler, no type annotation have to be introduced, TypeScript can infer what they are doing.
* Very concise, a single **fλ** operator can replace the combination of multiple elementary operators such as `map()`, `filter()`, `takeWhile()`, `scan()`...
* Modular, if a single operator is not enough they can be composed to achieve more complex behavior.

### Composition vs **fλ**

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
        //...So we have to cast, it's unsafe and verbose. 
        //It may silently break on refactoring 🚨...
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

The key idea being that by gathering the `filter` and `map` operation into a single function we give the ability to TypeScript to follow our control flow: `data.type` is `"TEXT"` so `data` has a `text` property.

An other example involving state encaptulation, here we want to accumulate all texts events until `"STOP"`

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

Here, on top of the improved type safety.

It's important to note that on both of this examples fλ operator are enforcing type safery without the need of any type annotation by levraging TypeScript type inference features . It is almost imposible to make a mistake writing a fλ operator as the code will either not compile or you will get a type that is not the one that you expected.

[Run thoses examples and others](https://stackblitz.com/edit/ts-evt-vs-rxjs?embed=1&file=index.ts) in your browser, see for yourself the full extends of the type inference.

## Where do I start ?

The API reference documentation is full of interactive examples that should get you started in no time.

