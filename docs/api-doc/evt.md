# Evt&lt;T&gt; \(class\)

`Evt<T>` is the Class that is the equivalent of `EventEmitter` in `"events"` and `Subject<T>` in `"rxjs"`

//Combining Once, Prepend, matcher, timeout and boundTo

Large number of methods combining Once, Prepend are exposed.

![Screenshot 2020-02-08 at 19 25 44](https://user-images.githubusercontent.com/6702424/74090178-d4995080-4aa8-11ea-815f-5ae66a761812.png)

For each of those methods a large number of overload are defined so that you can combine matchers, timeout or boundTo.

![Screenshot 2020-02-08 at 19 27 56](https://user-images.githubusercontent.com/6702424/74090245-6c973a00-4aa9-11ea-8e48-90d49a0ed20b.png)

All the attach methods returns Promises that resolve when an event is matched for the first time and reject in the same way `waitFor` does. This explains why it is possible to combine `attach` `attachOnce`, `attachPrepend` ect... with the timeout parameter.

## `evt.[$]attach*(...)` methods

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

`evt.attachPrepend(...)` and `evt.attachOncePrepend(...)`

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

**evt.\[$\]attach\[Once\]Extract\(...\)**

`evt.attachExtract(...)` and `evt.attachOnceExtract(...)`

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

#### `evt.post*(data)` methods

**evt.post\(data\)**

**evtPostCount: number**

//`evt.postCount`

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

**evt.postAsyncOnceMatched\(data\)**

**evt.postSyncOnceMatched\(data\)**

`evt.postAsyncOnceHandled(data)` and `evt.postSyncOnceHandled(data)`

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

## The `Handler<T,U>` type

## `evt.getHandlers()`

`evt.getHandlers()`

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

## `evt.getEvt[Attach|Detach]()`

//`evt.evtAttach` and `evt.evtDetach`

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

## `evt.isHandled(data)`

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

## `evt.waitFor(...)`

Method that returns a promise that will resolve when the next event is posted.

### Without timeout

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

### With timeout

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

### Difference between `evt.waitFor(...)` and `evt.attachOnce(...)`

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

## `evt.pipe(...)`

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

## `Evt.merge([evt1, evt2, ...])`

## Detaching handlers.

**evt.detach\(\[boundTo\]\)**

**handler.detach\(\)**

**ctx.detach\(\[evt\]\)**

`evt.detach(...)`

Multiple ways of detaching handlers are provided.

`evt.detach()` all handlers.

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

`handler.detach(callback)`

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

## `evt.enableTrace(...)`

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

