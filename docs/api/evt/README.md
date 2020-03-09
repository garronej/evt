---
description: >-
  Evt<T> is the Class that is the equivalent of EventEmitter in "events" and
  Subject<T> in "rxjs"
---

# Evt&lt;T&gt; \(class\)

## `evt.getEvt[Attach|Detach]()`

## \`\`

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

