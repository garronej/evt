---
description: Attach an Handler provided with a callback function to the Evt
---

# evt.\[$\]attach\*\(...\)

There is multiple flavor of the attach method: attachOnce, atachPrepend, attachExtract... All this methods have in common to accept the same parameters and to return the same type of value.

## Returned value

A `Promise<U>` that resolves with the first event data matched by the operator. By default of operator, every events are matched. 

The returned promise can reject **only** if a timeout parameter was passed to the `attach*` method.

 If no event have been matched within the specified timeout the promise will reject with a `EvtError.Timeout.` If the event is detached before the first event is matched the promise will reject with a `EvtError.Detached`.

If you have no use of the callback function and just want the promise, [`evt.waitFor(...)`](https://docs.ts-evt.dev/api-doc/evt#evt-waitfor)  should be used in place of `evt.attach*(...)`.

## Parameters

1. `operator:` [`Operator`](https://docs.ts-evt.dev/api-doc/operator)`<T,U>`
2. `timeout: number` Amount of time, in milliseconds before the returned promise rejects if no event have been matched within the specified dellay.
3. `boundTo: Bindable` A context that can be used as a reference to detach the handler later on. A Bindable is anything, but a function, an array, `undefined` or `null`. The boundTo object is generaly an instance of [`Ctx`](https://docs.ts-evt.dev/api-doc/ctx).
4. `callback: (data: U)=> void` Function that will be invoked every time the matcher match an event emited by the `Evt`.

A large number or overloard are provided to cover all the possible combinaison of arguments. The ordering in which the params are listed above must be respected but every parameter other than the callback can be omited.

![](https://user-images.githubusercontent.com/6702424/74090245-6c973a00-4aa9-11ea-8e48-90d49a0ed20b.png)

Examples:

* Only specifying a timeout: `evt.attach(timeout, callback)`
* Specifying an operato and a context: `evt.attach(op, boundTo, callback)`
* ...

## The `$` prefix

Due to a current [TypeScript limitation](https://github.com/microsoft/TypeScript/issues/36735) the `.attach*()` methods need to be prefixed with `$` when used with fλ operators but `evt.$attach*()` are actually just aliases to the corresponding `evt.attach*()` methods.

## **`evt.[$]attach(...)`**

Adds the a new [Handler](https://docs.ts-evt.dev/api/handler) to the end of the handlers array. No checks are made to see if the hanlder has already been added. Multiple calls passing the same combination of parameters will result in the `handler` being added, and called, multiple times.

## **`evt.[$]attachOnce*(...)`**

When the  method contains the keyword "**once**": Adds a **one-time** [Handler](https://docs.ts-evt.dev/api/handler). The next time an event is matched this handler is detached and then it's callback is invoked.

## `evt.[$]attach[Once]Prepend(...)`

When the method contain the keyword "**prepend**":  Same as .attach\(\) but the [`Handler`](https://docs.ts-evt.dev/api/handler) is added to the _beginning_ of the handler array. 

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

## **`evt.[$]attach[Once]Extract(...)`**

When the method contains the  "**extract**" keyword every event that the [`handler`](https://docs.ts-evt.dev/api/handler) matches will be swallowed and no other handler will be have the opportunity to handle it, even the other "extract"' handlers. It behave like a trap.

"**extract**" handler have priority even over "**prepend**" [`Handler`](https://docs.ts-evt.dev/api/handler)s. 

If multiples "extractes" handlers are candidate to extract an event the handler that have been added first have the priority. 

```typescript
import { Evt } from "ts-evt";

const evtCircle = new Evt<Circle>();

evtCircle.attachExtract(
    ({ radius }) => radius <= 0,
    ({ radius }) => console.log(`Circle with radius: ${radius} extracted`)
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

