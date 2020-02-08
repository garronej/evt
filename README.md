
<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/74091145-b89bac00-4ab4-11ea-9a2f-f53463d56009.png">  
</p>
<p align="center">
    <i> 💫 Type safe, feature rich, replacement for node's EventEmitter 💫 </i>
    <br>
    <br>
    <img src="https://img.shields.io/bundlephobia/min/ts-evt">
    <img src="https://img.shields.io/bundlephobia/minzip/ts-evt">
    <img src="https://img.shields.io/david/garronej/ts-evt">
    <img src="https://img.shields.io/npm/l/ts-evt">
</p>

---

``ts-evt`` is a library intended to be a replacement for node's ``events`` featuring type safety and making extensive use promises.

Similar to Qt signal/slot or C# events. 

 <b>Browserify friendly:</b>

- No polyfills needed ✅  
- Transpiled down to ES3 ✅  
- Very light-weight ✅

# Motivation

Overcoming those EventEmitter's common problems:
- Hard to type.
- Removing a particular listener is a pain because it forces us to keep a reference of the cb function.
- It is a headreach to add a one-time listener for the next event satisfying a given conditions.
- Promises where an afterthought.

# Usage

## TLDR


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

## Waiting for the next event.

````typescript

import { Evt } from "ts-evt";

const evtText = new Evt<string>();

(async ()=>{

    //waitFor return a promise that will resolve next time 
    //post() is invoked on evtText.
    const text = await evtText.waitFor();

    console.log(text);

})();

evtText.post("Hi");

````

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

## Filtering events, introducing matcher function

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


![Screenshot 2020-02-08 at 19 17 46](https://user-images.githubusercontent.com/6702424/74090059-baab3e00-4aa7-11ea-9c75-97f1fb99666d.png)





## Combining Matcher and waitFor or attachOnce.

``waitFor`` and ``attachOnce`` combined with matcher address the main shortcoming of EventEmitter
allowing us for example to asynchronously wait for the next shape that is a circle.

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

## No arguments

When you create an Evt with a void argument, TypeScript forces you to pass ``undefined`` to post(). 
To address this, we added the VoidEvt class.

```typescript
import { VoidEvt } from "ts-evt";

const evtSocketConnect = new VoidEvt();

evtSocketConnect.attach(() => console.log("SOCKET CONNECTED"));

evtSocketConnect.post();
//"SOCKET CONNECTED" have been printed to the console.
```

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

## Extracting events.

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

## Combining Once, Prepend, matcher, timeout and boundTo

Large number of methods combining Once, Prepend are exposed.

![Screenshot 2020-02-08 at 19 25 44](https://user-images.githubusercontent.com/6702424/74090178-d4995080-4aa8-11ea-815f-5ae66a761812.png)

For each of those methods a large number of overload are defined
so that you can combine matcher, timeout or boundTo.

![Screenshot 2020-02-08 at 19 27 56](https://user-images.githubusercontent.com/6702424/74090245-6c973a00-4aa9-11ea-8e48-90d49a0ed20b.png)

## Asynchronously handling events posted synchronously (Edge cases):

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

//"FOO BAR" is printed to the console ( Voodoo involved )

```

If you think about it, in a more straightforward implementation
text2 would not be grabbed as ``post("BAR")`` is executed 
after the second ``waitFor()`` but we got you covered.

## Miscellaneous features

### postCount

The number of times ``post()`` have been called can be tracked by the ``postCount`` property.

```typescript
evtText.postCount;
```

### evtAttach

``.evtAttach`` is an ``Evt<Handler<T>>``that let track in realtime the handler that are attached
to the Evt.

```typescript
evtText.evtAttach;
```

### postOnceMatched


when using ``postOnceMatched()`` in place of ``post()`` the event data will be stored and posted only once there will be a handler candidate for it.

```typescript

    const evtText = new Evt<string>();

    evtText.postOnceMatched("Foo Bar");

    //"before" then "Foo Bar" will be printed to the console.
    evtText.attachOnce(text=> console.log(text));

    console.log("before");

```

# The Observer class

``ObservableImpl`` is a class that leverage ``Evt`` to enable mutation tracking.

```typescript

import { Observable, ObservableImpl } from "Observable";

const obsText= new ObservableImpl<string>("foo");

console.assert(obsText.value === "foo");

obsText.evtChange.attach(
    newValue=> {

        console.assert(newValue === obsText.value);

        console.log(`newValue: ${newValue}`);

    }
);

//Nothing will be printed to the console as the value did not change.
obsText.onPotentialChange("foo");


obsText.onPotentialChange("bar");
//"newValue: bar" have been printed to the console.

console.assert(obsText.value === "bar");


//ObservableImpl is assignable to Observable but
//Observable is missing the onPotentialChange method.
//the Observable interface is used to expose an observable that should not be
//modified by the user.
const exposedObsText: Observable<string> = obsText;

```

![Screenshot 2020-02-08 at 19 42 19](https://user-images.githubusercontent.com/6702424/74090395-2642da80-4aab-11ea-82b3-ccf61bc1f794.png)





# History

This project was originally a fork aimed to add features to ``rogierschouten/ts-events``.  
Along the way it has been re-implemented from scratch keeping only the 
core API design. AsyncEvent and QueuedEvent have been scraped out 
focusing only on the SyncEvent class.
