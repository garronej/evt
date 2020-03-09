# Introduction

![](https://user-images.githubusercontent.com/6702424/74597663-160a9c80-5063-11ea-9542-4437de0b7c66.png)

💧Type safe replacement for Node's EventEmitter embracing functional programming💧

![](https://img.shields.io/bundlephobia/min/ts-evt) ![](https://img.shields.io/bundlephobia/minzip/ts-evt) ![](https://img.shields.io/david/garronej/ts-evt) ![](https://img.shields.io/npm/l/ts-evt)

`ts-evt` is intended to be a replacement for Node's `events` and alternative to `RxJS`.  
It enable and encourage **functional programming** and makes heavy use of **typescript**'s type inference features to provide **type safety** while keeping things **concise and elegant** 🍸.

TS-EVT runs everywhere, Node, **Deno**\(\*soon\), React Native and the web browser of your grand mother.

**Browserify friendly:**

* No polyfills needed ✅  
* Transpiled down to ES3 ✅  
* Light-weight, no third party dependencies ✅   

Can be used in TypeScript projects using version &gt;= **2.8** \(Mar 2018\) and in any plain JS project.

## Motivation

There is a lot of things that can't easily be done with `EventEmitter`:

* Enforcing type safety. 
* Removing a particular listener when the callback is an anonymous function.
* Adding a one-time listener for the next event that meet a condition.
* Waiting \(via a Promise\) for one thing or another to happen.

  _Example: waiting at most one second for the next message, stop waiting if the socket disconnects._

`RxJS` have it's issues as well:

* When chaining operators the type is often lost along the way as Typescript struggle to keep track of the mutation / filtering being applied to the event flow.
* Combining the right abstractions/operators can be challenging, even for seemingly straights forward control flows.

## Try it

![](https://ts-evt.dev/assets/img/try-in-browser.gif)

[**Run hello world**](https://stackblitz.com/edit/ts-evt-demo-hello-world?embed=1&file=index.ts)

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

The approach of `ts-evt` is to provide a way to define custom, functional, operator on the fly. 

Introducing **fλ** operators one abstraction to remove the need of countless others.  
**fλ** operators are **functions \(f\)** that are meant to be **anonymous \(**[**λ**](https://en.wikipedia.org/wiki/Anonymous_function)**\)**. They are designed in such a way that make them:

* Easy to write.  
* Easy to reason about for **humans**, they are self explanatory for anyone familiar with them.
* Easy to reason about for the compiler, no type annotation are needed TypeScript can infer what they are doing.
* Very concise, a single **fλ** operator can replace the combination of multiple elementary operators such as `map()`, `filter()`, `takeWhile()`, `scan()`...
* Modular, if a single operator is not enough they can be composed to achieve more complex behavior.

### Composition vs **fλ;** examples

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

It's important to note that on both of this examples **fλ** operator are enforcing type safery without the need of any type annotation by levraging TypeScript type inference features . It is almost imposible to make a mistake writing a **fλ** operator as the code will either not compile or you will get a type that is not the one that you expected. 

[Run thoses examples and others](https://stackblitz.com/edit/ts-evt-vs-rxjs?embed=1&file=index.ts) in your browser, see for yourself the full extends of the type inference.

![](https://ts-evt.dev/assets/img/gun-vs-sword.gif)


## CONTRIBUTORS

* [`u/rogierschouten`](https://github.com/rogierschouten) Creator of `ts-events`, library form which `ts-evt` was heavily inspired.

  Infarct `ts-evt` was originally a fork aimed to add features to `rogierschouten/ts-events`.  

  Along the way it has been re-implemented from scratch keeping only the core API design.  

  AsyncEvent and QueuedEvent have been scraped out focusing only on the SyncEvent class.  

* [`u/garronej`](https://github.com/garronej) Creator of `ts-evt`.  



## Where do I start ?

The API reference documentation is full of interactive examples that should get you started in no time.

