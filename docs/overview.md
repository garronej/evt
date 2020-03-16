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

const evtText = new Evt<string>();
const evtTime = new Evt<number>();

evtText.attach(text => console.log(text));
evtTime.attachOnce(time => console.log(time));

evtText.post("hi!");
evtTime.post(123);
evtTime.post(1234);
```

However, the traditional approach that consists of gathering all the events in a single bus is also an option.

```typescript
import { Evt, to } from "evt";

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

[**Run the example**](https://stackblitz.com/edit/evt-honvv3?embed=1&file=index.ts&hideExplorer=1)

## RxJS comparison

### "Get started" examples.

Here is a direct translations of [the examples provided as an overview](https://rxjs-dev.firebaseapp.com/guide/overview#values) on the RxJS website.  
  
Ironically enough the very example chosen to showcase the library give a type error. RxJS, unlike EVT, fail to infer that event is of type `MouseEvent`.

```typescript
import { fromEvent } from "rxjs";
import { throttleTime, map, scan } from "rxjs/operators";

fromEvent(document, "click")
  .pipe(
      throttleTime(1000),
      map(event => event.clientX), //<= type error
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
****  
As you can see it is possible to do things à la RxJS with EVT but hold on here come the interesting part.

### What differentiates the two libs

Essentially, how they implement operators.

The approach of RxJS is to provide a large library of elementary operators that can be combined with one another to cover virtually every possible use cases.

EVT distant itself from this approach for two reasons:

* Composition is hard to counsel with seamless type safety.
* Every new elementary operator constitutes a new abstraction, there are [more than 100 operators](https://rxjs-dev.firebaseapp.com/api?query=operators) available in RxJS and it is not obvious which of them are "must know" and which are more accessory.

The approach of EVT is to provide a way to define **powerful** operators on the fly using only **native language features**.

Introducing fλ operators, one abstraction to remove the need for many others.

Unlike [RxJS operators](https://rxjs-dev.firebaseapp.com/guide/operators) that return `Observable` EVT operators do not depend on anything, they are not constructed by composing other pre-existing operators or instantiating any particular class.

fλ operators are **functions \(f\)** that are meant to be **anonymous \(**[**λ**](https://en.wikipedia.org/wiki/Anonymous_function)**\)**. They are designed in such a way that makes them:

* **Easy to reason about for humans**, they are self-explanatory for anyone familiar with how they work.
* **Easy to reason about for the compiler**, no type annotation has to be introduced, TypeScript can infer what they are doing.
* **Easy to write**. You get wavy underlines until you get it right.
* **Easy on the eye.** A single expression fλ operator can replace the combination of multiple elementary operators such as `map()`, `filter()`, `takeWhile()`, `scan()`...
* **Easy to compose.** If, yet, a single operator is not enough they can be composed \(aka piped\) to achieve more complex behavior.

### RxJS operators vs **fλ**

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
    //^ fλ operator
);
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-795plc?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

By gathering the `filter` and `map` operation into a single function, we enable TypeScript to infer that `data` has a `text` property because `data.type` is `"TEXT"`. Using `filter`s, on the other hand, we have to explicitly tell TypeScript that we filter out all `shapes` that are not `circle` using a [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards). Type guards are powerful but they increase verbosity and it's possible to get them wrong, TypeScript trust you to perform the right checks.

Also, for the sake of not misrepresenting RxJS, we make use of advanced TypeScript features \(Extract and type guards\) to enforce type safety but it is common for programmers not to bother and just use `as Foo` which is a severe liability as it cause the code to silently break on refactor.

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

On top of the increased type safety, we remove the need for the `takeWhile` abstraction by simply returning `"DETACH"` once we no longer need to listen. We also get rid of `scan`, fλ working like`Array.prototype.reduce`.

It is almost impossible to make a mistake writing a fλ operator as the code will either not compile or the output type will make it obvious that something is wrong.

## Where to start

The API reference documentation is full of runnable examples that should get you started in no time.

