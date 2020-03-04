
<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/74597663-160a9c80-5063-11ea-9542-4437de0b7c66.png">  
</p>
<p align="center">
    💧<i>Type safe replacement for Node's EventEmitter embracing functional programming</i>💧
    <br>
    <br>
    <img src="https://img.shields.io/bundlephobia/min/ts-evt">
    <img src="https://img.shields.io/bundlephobia/minzip/ts-evt">
    <img src="https://img.shields.io/david/garronej/ts-evt">
    <img src="https://img.shields.io/npm/l/ts-evt">
</p>

---

``ts-evt`` is intended to be a replacement for Node's ``events``.  
It enable and encourage __functional programming__ and makes heavy use of __typescript__'s 
type inference features to provide __type safety__ while keeping things __concise and elegant__ 🍸.


 <b>Browserify friendly:</b>

- No polyfills needed ✅  
- Transpiled down to ES3 ✅  
- Light-weight, no third party dependencies ✅   

# Motivation

There is a lot of things that can't easily be done with ``EventEmitter``: 
- Enforcing type safety.
- Removing a particular listener when the callback is an anonymous function.
- Adding a one-time listener for the next event that meet a condition.
- Waiting (via a Promise) for one thing or another to happen. <i>Example: waiting at most one second for the next message, stop waiting if the socket disconnect.</i>

``RxJS`` have it's issues as well:
- When chaining operators the type is often lost along the way as
  Typescript struggle to keep track of the mutation / filtering being applied
  to the event flow. In consequence we are often forced to arbitrate between readability, type safety and performance, achieving both tree being impossible.
- Combining the right abstractions/operators can be challenging, even for  seemingly straights forward control flows.

``ts-evt`` introduce the concept of λ operator, a singe function to filter, transform, unsubscribe and encapsulate states.  
λ operators are easy to write, easy to reason about, inline 
and most importantly enable TypeScript to infer what is happening.  
As with ``RxJS`` operators, λ operators can be composed and chained.


<p align="center">
<b><a href="https://stackblitz.com/edit/ts-evt-vs-rxjs?embed=1&file=index.ts">See in action how ts-evt compare to RxJs</a></b>
</br>
</br>
    <img src="https://user-images.githubusercontent.com/6702424/75049459-82a1f300-54ca-11ea-9b09-66ae107ceb8f.gif">  
</p>




# Try it in your browser right now

<p align="center">
    <img src="
    https://user-images.githubusercontent.com/6702424/74102835-7a9b9800-4b47-11ea-854d-062fe1f42bba.gif
    ">  
</p>


<p align="center">
<b><a href="https://stackblitz.com/edit/ts-evt-demo-hello-world?embed=1&file=index.ts">Run hello world</a></b>
</p>


# Table of content

- [Motivation](#motivation)
- [Try it in your browser right now](#try-it-in-your-browser-right-now)
- [Table of content](#table-of-content)
- [Dependency requirement](#dependency-requirement)
- [``Evt<T>`` documentation](#evtt-documentation)
  - [``evt.attach(...)``, ``evt.attachOnce(...)`` and ``evt.post(data)``](#evtattach-evtattachonce-and-evtpostdata)
  - [``evt.waitFor(...)``](#evtwaitfor)
    - [Without timeout](#without-timeout)
    - [With timeout](#with-timeout)
  - [Matcher functions](#matcher-functions)
    - [Matcher - Filter only](#matcher---filter-only)
    - [Matcher - Type guard](#matcher---type-guard)
    - [Matcher - Transformative](#matcher---transformative)
    - [Matcher - Compatible methods](#matcher---compatible-methods)
  - [``VoidEvt``](#voidevt)
  - [``evt.attachPrepend(...)`` and  ``evt.attachOncePrepend(...)``](#evtattachprepend-and-evtattachonceprepend)
  - [``evt.attachExtract(...)`` and ``evt.attachOnceExtract(...)``](#evtattachextract-and-evtattachonceextract)
  - [``evt.detach(...)``](#evtdetach)
    - [``evt.detach()`` all handlers.](#evtdetach-all-handlers)
    - [``evt.handler(boundTo)`` - bound to a given context](#evthandlerboundto---bound-to-a-given-context)
    - [``handler.detach(callback)``](#handlerdetachcallback)
  - [``evt.getHandlers()``](#evtgethandlers)
  - [Combining Once, Prepend, matcher, timeout and boundTo](#combining-once-prepend-matcher-timeout-and-boundto)
  - [``evt.createDelegate(...)``](#evtcreatedelegate)
  - [``evt.postCount``](#evtpostcount)
  - [``evt.evtAttach`` and ``evt.evtDetach``](#evtevtattach-and-evtevtdetach)
  - [``evt.isHandled(data)``](#evtishandleddata)
  - [``evt.postAsyncOnceHandled(data)`` and ``evt.postSyncOnceHandled(data)``](#evtpostasynconcehandleddata-and-evtpostsynconcehandleddata)
  - [``evtUtil.race([...])``](#evtutilrace)
  - [``NonPostable<Evt<T>>``](#nonpostableevtt)
  - [``UnpackEvt<typeof evt>``.](#unpackevttypeof-evt)
  - [``evt.enableTrace(...)``](#evtenabletrace)
- [``Observable<T>`` documentation](#observablet-documentation)
- [``evt.waitFor(...)`` used in ``async`` procedure or loop](#evtwaitfor-used-in-async-procedure-or-loop)
- [History of the project](#history-of-the-project)

# Dependency requirement

Minimum version of typescript your project needs to be using is:

typescript >= __2.8__ ( Mar 2018 )

Exposed api use typescript keywords that were added in this version.

# ``Evt<T>`` documentation

## ``evt.attach(...)``, ``evt.attachOnce(...)`` and ``evt.post(data)``

````typescript
import { Evt } from "ts-evt";

const evtText = new Evt<string>();
//Unlike in node's events we use a different instance of emitter for every event type.
const evtTime = new Evt<number>();

evtText.attach(text => console.log(text));

//Attach one time only handler
evtTime.attachOnce(time => console.log(time));

evtText.post("hi!");
// At this point, "hi!" have been printed to the console.

evtTime.post(123);
// At this point, "123" have been printed to the console.

evtTime.post(1234);
//Nothing was printed to the console. ( attachOnce )
````

Exact equivalent with  ``EventEmitter`` from the *"events"* node module.

````typescript
import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

eventEmitter.on("text", text => console.log(text));
eventEmitter.once("time", time => console.log(time));

eventEmitter.emit("text", "hi!");
eventEmitter.emit("time", 123);
eventEmitter.emit("time", 1234);

````

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-compared-with-events?embed=1&file=index.ts)

## ``evt.waitFor(...)``

Method that returns a promise that will resolve when the next event is posted.

### Without timeout

By default the promise returned by ``waitFor`` will never reject.

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

It is possible to set what is the maximum amount of time we are willing
to wait for the event before the promise rejects.

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

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-waitfor-timeout?embed=1&file=index.ts)

## Matcher functions

Matcher functions are used to attach handlers that should only be called against events data
satisfying certain conditions.

Matcher function can be of three types:  
    - __Filter only__: ``(data: T)=> boolean``. Filter the events that should be passed to the callback.  
    - __Type guard__: ``<Q extends T>(data: T)=> data is Q``. Filters and restrict the type of the event data to a subtype of T.  
    - __Transformative__: ``<U>(data: T)=> [U]|[U,"DETACH"]|null|"DETACH"``. Filters and transform the event data before it is passed to the handler function; Controls when the handler should be detached.

__NOTE: A matcher function should be pure__  
It should be invocable without producing side effects.  

### Matcher - Filter only

```typescript
import { Evt } from "ts-evt";

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

NOTE: Make sure that your matcher function always returns a ``boolean`` at runtime.  
When in doubts use 'bang bang' ( ``!!returnedValue`` ). 
If the value returned happens to be an array with one element, your matcher will be
considered as a transformative matcher and you will run into a runtime error.

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-matcher-return-boolean?embed=1&file=index.ts)

### Matcher - Type guard

If the matcher function is a type guard, the type of the event data  will be narrowed down
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
The type of the Shape object is narrowed down to ``Circle``  
![Screenshot 2020-02-08 at 19 17 46](https://user-images.githubusercontent.com/6702424/74090059-baab3e00-4aa7-11ea-9c75-97f1fb99666d.png)

NOTE: Make sure that your matcher function always returns a ``boolean`` at runtime.  
When in doubts use 'bang bang' ( ``!!returnedValue`` )
If the value returned happens to be an array with one element, your matcher will be  
considered as a transformative matcher and you will run into a runtime error.

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-matcher-type-guard?embed=1&file=index.ts)

### Matcher - Transformative

To filter, transform the data that should be passed to the callback and optionally detach
the handler.

The matcher should return the value that is to be passed to the callback wrapped into a singleton ``[val]``.  
If should return ``null`` when the callback should not be invoked for the event.

If the matcher return ``[val, "DETACH"]`` the handler is detached from the ``Evt`` and
callback is invoked a last time with ``val``.  

If the matcher return ``"DETACH"`` the callback is not invoked and the handler is detached.

__When you wish to use a transformative matcher, you need to prefix the method name by ``$``.__

NOTE: Make sure when you return a singleton that it is an array with one or two element.

```typescript

import { Evt } from "ts-evt";

{

const evtShape = new Evt<Shape>();

evtShape.$attach(
    shape => shape.type === "CIRCLE" && shape.radius > 100 ? 
        [ shape.radius ] : null,
    radius => console.log(`radius: ${radius}`) //NOTE: radius is inferred as being of type numbers !
);

//Nothing will be printed on the console, it's a SQUARE
evtShape.post({
    "type": "SQUARE",
    "sideLength": 3
});

//Nothing will be printed on the console, The circle is too small.
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

const evtText= new Evt<"TICK" | "END">();

evtText.attach(
    text => [ text, text === "END" ? "DETACH" : null ],
    text => console.log(text) 
);

//"TICK" is printed to the console
evtText.post("TICK");
//"END" is printed to the console
evtText.post("END");

//Nothing is printed to the console the handler have been detached.
evtText.post("TICK");

}
```

[__Run example__](https://stackblitz.com/edit/ts-evt-demo-transformative-matcher?embed=1&file=index.ts)

### Matcher - Compatible methods

Matcher functions can be used with:  
    -``attach()``  
    -``attachOnce()``  
    -``waitFor()``   
    -``createDelegate()``   
    -``attachExtract()``  
    -``attachOnceExtract``  
    -``attachPrepend``  
    -``attachOncePrepend``  

Except for ``waitFor(...)`` and ``createDelegate(...)`` prepend ``$`` to the method  
name to use a transformative matcher.

``waitFor(...)`` and ``attachOnce(...)`` combined with matcher address the main shortcoming of EventEmitter
allowing us to asynchronously wait for the next shape that is a circle, for example.

```typescript
import { Evt } from "ts-evt";

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

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-matcher-and-waitfor?embed=1&file=index.ts)

## ``VoidEvt``

When you create an Evt with a void argument, TypeScript forces you to pass ``undefined`` to ``post()``.  
Instead use ``VoidEvt``

```typescript
import { VoidEvt } from "ts-evt";

const evtSocketConnect = new VoidEvt();

evtSocketConnect.attach(() => console.log("SOCKET CONNECTED"));

evtSocketConnect.post();
//"SOCKET CONNECTED" have been printed to the console.
```

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-voidevt?embed=1&file=index.ts)

## ``evt.attachPrepend(...)`` and  ``evt.attachOncePrepend(...)``

Similar to Node's ``emitter.prependListener(...)`` and ``emitter.prependOnceListener(...)``

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


## ``evt.attachExtract(...)`` and ``evt.attachOnceExtract(...)``

To handle edge cases that haven't been anticipated without having to rethink the model as a whole
we provide a way to extract particular types of events.

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

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-extract?embed=1&file=index.ts)

## ``evt.detach(...)``

Multiple ways of detaching handlers are provided. 

### ``evt.detach()`` all handlers.

To detach all handlers at once:

```typescript
const evtText = new Evt<string>();
//detach with no argument will detach all handlers (attach, attachOnce, waitFor... )
evtText.detach();
```

### ``evt.handler(boundTo)`` - bound to a given context

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

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-detach-with-contex?embed=1&file=index.ts)

### ``handler.detach(callback)``

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

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-detach-classic?embed=1&file=index.ts)

## ``evt.getHandlers()``

List all handlers attached to the ``Evt``.   
Returns an array of ``Handler<T>``.  
A ``Handler[]`` is an object that contains all the information
needed to identify a handler and a ``detach()`` method.

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

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-detach-matcher?embed=1&file=index.ts)

## Combining Once, Prepend, matcher, timeout and boundTo

Large number of methods combining Once, Prepend are exposed.

![Screenshot 2020-02-08 at 19 25 44](https://user-images.githubusercontent.com/6702424/74090178-d4995080-4aa8-11ea-815f-5ae66a761812.png)

For each of those methods a large number of overload are defined
so that you can combine matchers, timeout or boundTo.

![Screenshot 2020-02-08 at 19 27 56](https://user-images.githubusercontent.com/6702424/74090245-6c973a00-4aa9-11ea-8e48-90d49a0ed20b.png)  

All the attach methods returns Promises that resolve when an event is matched for the first time and reject in the same way ``waitFor``
does. This explains why it is possible to combine ``attach`` ``attachOnce``, ``attachPrepend`` ect... with the timeout parameter. 


## ``evt.createDelegate(...)``

Create a new instance of Evt toward which will be forwarded
all the events matched by the matcher function.

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

## ``evt.postCount``

The number of times ``post()`` has been called can be tracked by the ``postCount`` property.

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

## ``evt.evtAttach`` and ``evt.evtDetach``

``.evtAttach`` and ``.evtDetach`` are ``Evt<Handler<T, any>>``that track in the handler as they are being attached/detached from the ``evt``.

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

TODO: Update the example to includes ``evtDetach``

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-evtattach?embed=1&file=index.ts)

## ``evt.isHandled(data)``
    
Test if posting event data will have an effect.

Return true if:  

-There is at least one handler matching this event data 
( at least one handler's callback function
will be invoked if the data is posted. )  

-There is at least one handler that will be detached
if the event data is posted.

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
[__Run the example__](https://stackblitz.com/edit/ts-evt-is-hadled?embed=1&file=index.ts)

## ``evt.postAsyncOnceHandled(data)`` and ``evt.postSyncOnceHandled(data)``



When ``isHandled(data)`` return ``true``, ``postAsyncOnceHandled(data)`` is a proxy for ``post(data)``.

When ``postAsyncOnceHandled(data)`` is invoked at a time where ``isHandled(data)`` returns ``false``,
the ``data`` will be hold and posted only once ``isHandler(data)`` would return ``true``.  
``post(data)`` is scheduled to be invoked in a micro task once a candidate handler is attached (not synchronously).

When the call to post is delayed ``postAsyncOnceHandled(data)`` returns a promise
that resolve with the new post count when ``post(data)`` is invoked. Else returns the new post count synchronously.

``postSyncOnceHandled(data)`` on the other hand will post synchronously as soon
as a candidate handler is attached.


```typescript
import { Evt } from "ts-evt";

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

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-postoncematched?embed=1&file=index.ts)

## ``evtUtil.race([...])``

``evtUtil.race([...])`` is a generalization of ``Promise.race([...])`` that
accept ``Evt`` as well as ``Promise`` and direct value.

The ``evtUtil.race([...])`` function returns an ``OneShot<Evt>`` that post or as soon as one of the evt/promises in the array post/fulfill.

TODO: Provide real documentation and usecase.

## ``NonPostable<Evt<T>>``  

A non postable ``Evt`` is an ``Evt`` that does not expose the methods ``post()``, ``postAsyncOnceHandled()`` and ``postSyncOnceHandled()``.
It is useful for exposing ``Evt``s to parts of the code that are in charge 
of reacting to the events but are not supposed to post.

Note that ``NonPostable<>`` is not a class or an interface it's just an helper
type that says: "You are not allowed to post with this ``Evt``"

```typescript
import { Evt } from "ts-evt";
import { NonPostable } from "ts-evt/dist/lib/helperTypes";

const evtText= new Evt<string>();

//Api to expose.
export const api:{ evtText: NonPostable<Evt<string>>; } = { evtText };

//evtText exposed by the api cannot be posted.
api.evtText.post //<=== TS error 
api.evtText.postOnceMatched //<===== TS error

//But we can post internally.
evtText.post("good");
```
[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-non-postable?embed=1&file=index.ts)

## ``UnpackEvt<typeof evt>``.

UnpackEvt is a helper type to infer the type argument of an Evt instance.  

```typescript
import { Evt } from "ts-evt";
import { UnpackEvt, NonPostable } from "ts-evt/dist/lib/helperTypes";

const evtHuman = new Evt<{
    name: string;
    age: number;
    gender: "MALE" | "FEMALE"
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
Note that if you try unpacking the type of an evt instantiated
by a module that use a different version of ``ts-evt`` that the one you 
included in the your project the inference will fail.

Note also that the ``UnpackEvt<>`` is not included in the default export
of the module because doing so would restrict ``ts-evt`` to be used in projects  
using typescript version before 2.8 ( version when the infer keyword was introduced ).

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-unpack-type-argument?embed=1&file=index.ts)


## ``evt.enableTrace(...)``

If you need help to track down a bug, you can use ``enableTrace`` to log what's going on with an Evt.  
Use ``evt.disableTrace()`` to stop logging.

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


# ``Observable<T>`` documentation

``Observable`` in ``RxJS`` and ``ts-evt`` are **not** a different implementation
 of the same abstraction.

 In ``ts-evt`` an ``Observable<T>`` represent a variable that can be observed,j
 meaning that if the value change an event is posted.

```typescript

import { Observable, IObservable } from "ts-evth";

const obsText= new Observable<string>("foo");

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
const exposedObsText: IObservable<string> = obsText;

```

Impossible to unintentionally misuse:

![Screenshot 2020-02-10 at 08 50 14](https://user-images.githubusercontent.com/6702424/74130842-568d9480-4be3-11ea-851a-dc3cc0c83034.png)


The TSC won’t let the value to be set directly.

![Screenshot 2020-02-10 at 09 00 49](https://user-images.githubusercontent.com/6702424/74131123-f0554180-4be3-11ea-96e1-a235ec46e20f.png)


It won’t allow either the ``evtChange`` or ``evtChangeDiff`` to be posted manually, ``post()``  
and ``postOnceMatched()`` are not exposed.

![Screenshot 2020-02-10 at 10 45 10](https://user-images.githubusercontent.com/6702424/74138812-8bedae80-4bf2-11ea-9ce3-0f31eb22df1a.png)


[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-observer?embed=1&file=index.ts)

It is also possible to define the criteria upon which the value will be deemed
changed.

TODO: Demo with representSameData. 

```typescript
import { Observable } from "ts-evt/dist/lib/Observable";

const obsNames = new Observable<string[]>(
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
            console.log("Fewer names");
            return;
        }

        if (previousNames.length < obsNames.value.length) {
            console.log("More names");
            return;
        }

        console.log("same number of names");

    });

//Same set of names in a different order, nothing will be printed.
obsNames.onPotentialChange(["bob", "louis", "alice"]);

//"Fewer names" will be printed
obsNames.onPotentialChange(["bob", "louis"]);
```

[__Run the example__](https://stackblitz.com/edit/ts-evt-demo-observable-change-condition?embed=1&file=index.ts)

# ``evt.waitFor(...)`` used in ``async`` procedure or loop

``evt.waitFor()`` is <b>NOT</b> equivalent to ``new Promise(resolve=> evt.attachOnce(resolve))``

``.waitFor()`` is designed in a way that makes it safe to use ``async`` procedures.  

Basically it means that the following example prints `A B` on the console instead
of waiting forever for the secondLetter.

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

Run this [__more practical example__](https://stackblitz.com/edit/ts-evt-demo-edge-case?embed=1&file=index.ts)
to understand how this behavior prevent from some hard to figure out bugs.

Enforcing this behavior does involve some voodoo. This is the explanation as to why the
source code of ``ts-evt`` appears very cryptic for an event bus implementation.

# History of the project

This project was originally a fork aimed to add features to ``rogierschouten/ts-events``.  
Along the way it has been re-implemented from scratch keeping only the 
core API design.   
AsyncEvent and QueuedEvent have been scraped out 
focusing only on the SyncEvent class.
