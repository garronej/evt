
<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/74260343-acecf700-4cf9-11ea-8890-9dd81fb2d251.png">  
</p>
<p align="center">
    <i> 💫 Type safe replacement for node's EventEmitter embracing function programing 💫 </i>
    <br>
    <br>
    <img src="https://img.shields.io/bundlephobia/min/ts-evt">
    <img src="https://img.shields.io/bundlephobia/minzip/ts-evt">
    <img src="https://img.shields.io/david/garronej/ts-evt">
    <img src="https://img.shields.io/npm/l/ts-evt">
</p>

---

``ts-evt`` is intended to be a replacement for node's ``events``.  
It enable and encourage __functional programing__ and make heavy use of __typescript__'s 
type inference features to provide __type safety__ while keeping things __concise and elegant__ 🍸.

 <b>Browserify friendly:</b>

- No polyfills needed ✅  
- Transpiled down to ES3 ✅  
- Very light-weight ✅   





# Motivation

Addressing the common problems faced with EventEmitter:
- Hard to type.
- Removing a particular listener is a pain, it require to keep the listener.
- Can't easily add a one-time listener for the next event satisfying a given conditions.
- Promise support was added as an afterthought.

# Try it in your browser right now

Thanks to Stackblitz you can start experimenting right now in your browser.

![demo_ts-evt_fixed_4](https://user-images.githubusercontent.com/6702424/74102835-7a9b9800-4b47-11ea-854d-062fe1f42bba.gif)

[__Run Hello World__](https://stackblitz.com/edit/ts-evt-demo-hello-world?embed=1&file=index.ts)

# Table of content

- [Motivation](#motivation)
- [Try it in your browser right now](#try-it-in-your-browser-right-now)
- [Table of content](#table-of-content)
- [Dependency requirement](#dependency-requirement)
- [Usage](#usage)
  - [ts-evt Evt vs events EventEmitter](#ts-evt-evt-vs-events-eventemitter)
  - [Waiting for the next event.](#waiting-for-the-next-event)
    - [Without timeout](#without-timeout)
    - [With timeout](#with-timeout)
  - [Filtering events with matcher function](#filtering-events-with-matcher-function)
  - [Combining Matcher and waitFor or attachOnce.](#combining-matcher-and-waitfor-or-attachonce)
  - [No type arguments](#no-type-arguments)
  - [Handler priority](#handler-priority)
  - [Extracting events](#extracting-events)
  - [Detaching events](#detaching-events)
  - [Combining Once, Prepend, matcher, timeout and boundTo](#combining-once-prepend-matcher-timeout-and-boundto)
  - [Creating delegate](#creating-delegate)
  - [postCount](#postcount)
  - [evtAttach](#evtattach)
  - [postOnceMatched](#postoncematched)
  - [Unpacking the type argument.](#unpacking-the-type-argument)
  - [Enable trace ( for debugging purpose )](#enable-trace--for-debugging-purpose-)
- [The Observer class](#the-observer-class)
- [Asynchronously handling events posted synchronously (Edge case):](#asynchronously-handling-events-posted-synchronously-edge-case)
- [History of the project](#history-of-the-project)

# Dependency requirement

Minimum version of typescript your project need to be using.

- For importing ``Evt``:  typescript >= __2.2__ ( Feb 2017 )
- For importing ``Observable``:  typescript >= __2.8__ ( Mar 2018 )

Exposed interfaces use typescript keywords that where added in specified version.

# Usage


## ts-evt Evt vs events EventEmitter

````typescript
import { Evt } from "ts-evt";

const evtText = new Evt<string>();
//Unlike in node's events we use a different instance of emitter for every event type.
const evtTime = new Evt<number>();

evtText.attach(text => console.log(text));
evtTime.attachOnce(time => console.log(time));

evtText.post("hi!");
// At this point, "hi!" have been printed to the console.

evtTime.post(123);
// At this point, "123" have been printed to the console.

evtTime.post(1234);
//Nothing was printed to the console. ( attachOnce )

````

Exact equivalent with node's EventEmitter:

````typescript
import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

eventEmitter.on("text", text => console.log(text));
eventEmitter.on("time", time => console.log(time));

eventEmitter.emit("text", "hi!");
eventEmitter.emit("time", 123);

````

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-compared-with-events?embed=1&file=index.ts)

## Waiting for the next event.

### Without timeout

````typescript
import { Evt } from "ts-evt";

const evtText = new Evt<string>();

setTimeout(()=> evtText.post("Hi!"), 1500);

(async ()=>{

    //waitFor return a promise that will resolve next time 
    //post() is invoked on evtText.
    const text = await evtText.waitFor();

    console.log(text);

})();
````
[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-waitfor?embed=1&file=index.ts)

### With timeout

It is possible to set how long we wait for the next event before
the promise returned by waitFor rejects.

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
        //  -EvtError.Timeout if the timeout delay way reached.
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

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-waitfor-timeout?embed=1&file=index.ts)

## Filtering events with matcher function

Matcher functions are used to attach handlers that should only be called against events data
satisfying certain conditions.

```typescript
import { Evt } from "ts-evt";

const evtText= new Evt<string>();

evtText.attach(
    //A matcher function take an argument of generic type T ( here string ) and returns a boolean.
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

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-matcher-return-boolean?embed=1&file=index.ts)

If the the matcher function is a type guard the type of the event data  will be narrowed down
to the subtype the matcher function is matching.  
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

Now we can easily attach an handler that will only handle circles on our shape emitter.

```typescript

import { Evt } from "ts-evt";

const evtShape = new Evt<Shape>();

evtShape.attach(
    matchCircle,
    shape => console.log(shape.radius)
);

//Nothing will be printed to the console.
evtShape.post({
    "type": "SQUARE",
    "sideLength": 3
});

//"33" Will be printed to the console.
evtShape.post({
    "type": "CIRCLE",
    "radius": 33
});

```
The type of the shape object is narrowed down to ``Circle``  
![Screenshot 2020-02-08 at 19 17 46](https://user-images.githubusercontent.com/6702424/74090059-baab3e00-4aa7-11ea-9c75-97f1fb99666d.png)

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-matcher-type-guard?embed=1&file=index.ts)

## Combining Matcher and waitFor or attachOnce.

``waitFor`` and ``attachOnce`` combined with matcher address the main shortcoming of EventEmitter
allowing us to asynchronously wait for the next shape that is a circle for example.

```typescript
import { Evt } from "ts-evt";

const evtShape = new Evt<Shape>();

evtShape.waitFor(matchCircle)
    .then(circle => console.log(`radius: ${circle.radius}`))
    ;

evtShape.attachOnce(
    (shape): shape is Square => (
        shape.type === "SQUARE" &&
        shape.sideLength > 20
    ),
    //We can deconstruct the shape extracting sideLength as we know it will be a square
    ({ sideLength })=> console.log(`length: ${sideLength}`)
);

const circle: Circle = {
    "type": "CIRCLE",
    "radius": 33
};

//"radius: 33" will be printed to the console.
evtShape.post(circle);

//Nothing will be printed to the console, the promise returned by waitFor has already resolved.
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

//Noting will be printed, attachOnce's callback function have already been invoked.
evtShape.post({
    "type": "SQUARE",
    "sideLength": 44
});

```

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-matcher-and-waitfor?embed=1&file=index.ts)

## No type arguments

When you create an Evt with a void argument, TypeScript forces you to pass ``undefined`` to post(). 
To address this, we added the VoidEvt class.

```typescript
import { VoidEvt } from "ts-evt";

const evtSocketConnect = new VoidEvt();

evtSocketConnect.attach(() => console.log("SOCKET CONNECTED"));

evtSocketConnect.post();
//"SOCKET CONNECTED" have been printed to the console.
```

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-hello-world-vgzzgk?embed=1&file=index.ts)

## Handler priority

Similar to node's ``emitter.prependListener()`` 

```typescript
import { VoidEvt } from "ts-evt";

const evtConnect = new VoidEvt();

evtConnect.attach(() => console.log("B"));
evtConnect.attach(() => console.log("C"));

evtConnect.attachPrepend(() => console.log("A"));

evtConnect.post();
//"A", "B", "C" is printed to the console.

```

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-prepend?embed=1&file=index.ts)


## Extracting events

To handle edge cases that haven't been anticipated without having to rethink the all model
we provide a way to extract particular type of events.

```typescript

import { Evt } from "ts-evt";

const evtCircle = new Evt<Circle>();

evtCircle.attachExtract(
    ({ radius }) => radius <= 0,
    ({ radius }) => console.log(`malformed circle with radius: ${radius} extracted`)
);

evtCircle.attach(
    circle => {
        //We can assume that the circle have a positive radius.
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

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-extract?embed=1&file=index.ts)

## Detaching events

Multiple ways of detaching handlers are provided. 

To detach all handlers at once:

```typescript
const evtText = new Evt<string>();
//detach with no argument will detach all handlers (attach, attachOnce, waitFor... )
evtText.detach();
```

The preferred way of detaching an handler is by using "boundTo" context.

```typescript
import { Evt } from "ts-evt";

const evtText = new Evt<string>();

//boundTo can be anything but a number undefined, null or
//a callable function (you can't use a constructor).
const boundTo = [];

evtText.attach(
    boundTo,
    _text => { }
);

evtText.attachOnce(
    boundTo,
    _text => { }
);

evtText.detach(boundTo);
```

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-detach-with-contex?embed=1&file=index.ts)

To detach a particular handler for which we have the reference of the callback function
as we do in node's EventEmitter: 

```typescript

const evtText = new Evt<string>();

const callback = (_text: string) => { };

evtText.attach(callback);

evtText.getHandlers()
    .find(handler => handler.callback === callback)?
    .detach()
;

```

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-detach-classic?embed=1&file=index.ts)

A more advanced example here detaching all handler that have a given matcher:

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

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-detach-matcher?embed=1&file=index.ts)

## Combining Once, Prepend, matcher, timeout and boundTo

Large number of methods combining Once, Prepend are exposed.

![Screenshot 2020-02-08 at 19 25 44](https://user-images.githubusercontent.com/6702424/74090178-d4995080-4aa8-11ea-815f-5ae66a761812.png)

For each of those methods a large number of overload are defined
so that you can combine matcher, timeout or boundTo.

![Screenshot 2020-02-08 at 19 27 56](https://user-images.githubusercontent.com/6702424/74090245-6c973a00-4aa9-11ea-8e48-90d49a0ed20b.png)


## Creating delegate

Using ``createDelegate(matcher)`` you can create a new instance of Evt on which will be  
posted all the events matched by the matcher function.

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

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-delegate?embed=1&file=index.ts)

## postCount

The number of times ``post()`` have been called can be tracked by the ``postCount`` property.

```typescript
import { Evt } from "ts-evt";

const evtText= new Evt<string>();

//prints 0
console.log(evtText.postCount);

evtText.post("foo");
evtText.post("bar");
evtText.post("baz");

//prints 3
console.log(evtText.postCount);

```

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-postcount?embed=1&file=index.ts)

## evtAttach

``.evtAttach`` is an ``Evt<Handler<T>>``that let track in realtime the handler that are being attached
to the Evt.

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

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-evtattach?embed=1&file=index.ts)

## postOnceMatched

When using ``postOnceMatched()`` in place of ``post()`` the event data will be stored and posted only once there will be a handler candidate for it.

```typescript
const evtText = new Evt<string>();

evtText.postOnceMatched("Foo Bar");

evtText.attachOnce(text=> console.log(text));

console.log("before");

//"before" then "Foo Bar" will be printed to the console.
```

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-postoncematched?embed=1&file=index.ts)

## Unpacking the type argument.

UnpackEvt is an helper type to infer the type argument of an Evt instance.  

```typescript
import * as console from "./consoleToPage";

import { Evt } from "ts-evt";
import { UnpackEvt } from "ts-evt/dist/lib/UnpackEvt";

const evtHuman = new Evt<{
    name: string;
    age: number;
    gender: "MALE" | "FEMALE"
}>();

type Human = UnpackEvt<typeof evtHuman>;

const human1: Human = {
    "name": "bob",
    "age": 89,
    "gender": "MALE"
};

evtHuman.post(human1);

//To avoid having to import the module if it isn't needed
type UnpackEvt_<T> = import("ts-evt/dist/lib/UnpackEvt").UnpackEvt<T>;

const human2: UnpackEvt_<typeof evtHuman> = {
      "name": "alice",
    "age": 3,
    "gender": "FEMALE"
};

evtHuman.post(human2);
```
Note that if you try unpacking the type of an evt instantiated ``ts-evt``
by a module that use a different version of ``ts-evt`` that the one you 
included in the your project dependency the inference will fail.

Note also that we do not directly included the UnpackEvt in the default export
of the module because doing so would restrict ``ts-evt`` to be used in projects  
using typescript version before 2.8 ( version when the infer keyword was introduced ).

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-unpack-type-argument?embed=1&file=index.ts)


## Enable trace ( for debugging purpose )

If you need help to track down a bug you can use ``enableTrace`` to log what's going on with an Evt.

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

```log
(evtCircle n°1) 0 handler => { "type": "CIRCLE", "radius": 12 }
(evtCircle n°1) 1 handler => { "type": "CIRCLE", "radius": 33 }

[myPrefix] (evtCircle n°2) 0 handler => CIRCLE(12)
[myPrefix] (evtCircle n°2) 1 handler => CIRCLE(33)
```


[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-trace?embed=1&file=index.ts)


# The Observer class

``ObservableImpl`` is a class that leverage ``Evt`` to enable mutation tracking.

```typescript

import { Observable, ObservableImpl } from "ts-evt/dist/lib/Observable";

const obsText= new ObservableImpl<string>("foo");

console.assert(obsText.value === "foo");

obsText.evtChange.attachOnce(
    newText=> {
        console.assert(newText === obsText.value);
        console.log(`newValue: ${newText}`);
    }
);

obsText.evtChangeDiff.attachOnce(
    ({ newValue, previousValue })=> {

        console.assert(newValue === obsText.value);

        console.log(`newValue: ${newValue}, previousValue ${previousValue}`);

    }
);

//Nothing will be printed as the value did not change.
let hasChanged = obsText.onPotentialChange("foo");

console.assert( hasChanged === false );

hasChanged = obsText.onPotentialChange("bar");
//"newValue: bar" have been printed to the console.
//"newValue: bar, previousValue foo" have been printed to the console.

console.assert(hasChanged === true);

console.assert(obsText.value === "bar");

//ObservableImpl is assignable to Observable but
//Observable is missing the onPotentialChange method.
//the Observable interface is used to expose an observable that should not be
//modified by the user.
const exposedObsText: Observable<string> = obsText;

```

Impossible to unintentionally misuse:

![Screenshot 2020-02-10 at 08 50 14](https://user-images.githubusercontent.com/6702424/74130842-568d9480-4be3-11ea-851a-dc3cc0c83034.png)


The TSC wont let the value to be set directly.

![Screenshot 2020-02-10 at 09 00 49](https://user-images.githubusercontent.com/6702424/74131123-f0554180-4be3-11ea-96e1-a235ec46e20f.png)


It wont allow either the ``evtChange`` or ``evtChangeDiff`` to be posted manually, ``post()``  
and ``postOnceMatched()`` are not exposed.

![Screenshot 2020-02-10 at 10 45 10](https://user-images.githubusercontent.com/6702424/74138812-8bedae80-4bf2-11ea-9ce3-0f31eb22df1a.png)


[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-observer?embed=1&file=index.ts)

It is also possible to define the criteria upon witch the value will be deemed
changed.

```typescript
import { ObservableImpl } from "ts-evt/dist/lib/Observable";

const obsNames = new ObservableImpl<string[]>(
    [
        "alice",
        "bob",
        "louis"
    ],
    //areSame function, optional parameter to determine if the new candidate 
    //value should be considered a change from the previous one
    //default (value, newValue)=> value === newValue
    //Here we tell that two array of name are considered same if they represent 
    //the same set of names, we don't care about order.
    (names, newNames) => {

        if (names.length !== newNames.length) {
            return false;
        }

        return names.every(name => newNames.indexOf(name) >= 0);

    }
);

obsNames.evtChangeDiff.attach(
    ({ previousValue: previousNames }) => {

        if (previousNames.length > obsNames.value.length) {
            console.log("Less names");
            return;
        }

        if (previousNames.length < obsNames.value.length) {
            console.log("More names");
            return;
        }

        console.log("Same amount of names");

    });

//Same set of names in a different order, nothing will be printed.
obsNames.onPotentialChange(["bob", "louis", "alice"]);

//"Less names" will be printed
obsNames.onPotentialChange(["bob", "louis"]);
```

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-observable-change-condition?embed=1&file=index.ts)

# Asynchronously handling events posted synchronously (Edge case):

Consider this example.

```typescript
import { Evt } from "ts-evt";

const evtText = new Evt<string>();

(async ()=>{

    const text1 = await evtText.waitFor();
    const text2 = await evtText.waitFor();

    console.log(`${text1} ${text2}`);

})();

evtText.post("FOO");
evtText.post("BAR");

//"FOO BAR" is printed to the console.
```

If you think about it, in a more straightforward implementation
text2 would not be grabbed as ``post("BAR")`` is executed
after the second ``waitFor()``.
However we work some voodoo behind the scene to achieve this behavior 
so that you don't have to wonder if it is possible for two events to be 
posted in the same tick in the same tick.

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-edge-case?embed=1&file=index.ts)

# History of the project

This project was originally a fork aimed to add features to ``rogierschouten/ts-events``.  
Along the way it has been re-implemented from scratch keeping only the 
core API design. AsyncEvent and QueuedEvent have been scraped out 
focusing only on the SyncEvent class.
