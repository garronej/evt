---
description: Attach a Handler provided with a callback function to the Evt
---

# evt.\[$\]attach\*\(...\)

There is multiple flavor of the attach method: `attachOnce`, `atachPrepend`, `attachExtract`... All this methods have in common to accept the same parameters and to return the same promise.

## Returned Value

It no timeout argument have been passed all attach methods return `this`.

If a timeout arguement was passed a `Promise<U>` that resolves with the first event data matched by the operator. By default of operator, all the events are matched.

The returned promise can reject **only** if a timeout parameter was passed to the `attach*` method.

If no event has been matched within the specified timeout, the promise will reject with a `EvtError.Timeout.` If the event is detached before the first event is matched, the promise will reject with an `EvtError.Detached`.

If you have no use of the callback function and just want the promise, [`evt.waitFor(...)`](https://docs.ts-evt.dev/api-doc/evt#evt-waitfor) should be used in place of `evt.attach*(...)`.

## Parameters

1. `operator:` [`Operator`](https://docs.ts-evt.dev/api-doc/operator)`<T,U>`
2. `timeout: number` Amount of time, in milliseconds before the returned promise rejects if no event has been matched within the specified delay.
3. `ctx:` [`Ctx`](https://docs.ts-evt.dev/api/ctx)A context that can be used as a reference to detach the handler later on. 
4. `callback: (data: U)=> void` Function that will be invoked every time the matcher match an event emitted by the `Evt`.

A large number of overload is provided to cover all the possible combination of arguments. The ordering in which the parameters are listed above must be respected but every parameter other than the callback can be omitted.

![](../../.gitbook/assets/screenshot-2020-03-16-at-06.28.38.png)

Examples:

* Only specifying a timeout: `evt.attach(timeout, callback)`
* Specifying an operator and a context: `evt.attach(op, boundTo, callback)`
* ...

## The `$` prefix

Due to a current [TypeScript limitation](https://github.com/microsoft/TypeScript/issues/36735) the `.attach*()` methods need to be prefixed with `$` when used with fλ operators but `evt.$attach*()` are actually just aliases to the corresponding `evt.attach*()` methods.

## **`evt.[$]attach(...)`**

Adds a new [handler](https://docs.ts-evt.dev/api/handler) to the end of the handlers array. No checks are made to see if the holder has already been added. Multiple calls passing the same combination of parameters will result in the `handler` being added, and called, multiple times.

## **`evt.[$]attachOnce*(...)`**

When the method contains the keyword "**once**": Adds a **one-time** [handler](https://docs.ts-evt.dev/api/handler). The next time an event is matched this handler is detached and then it's callback is invoked.

## `evt.[$]attach[Once]Prepend(...)`

When the method contains the keyword "**prepend**": Same as .attach\(\) but the [`handler`](https://docs.ts-evt.dev/api/handler) is added at the _beginning_ of the handler array.

```typescript
import { Evt } from "evt";

const evtLetter = Evt.create();

evtLetter
  .attach(() => console.log("B"))
  .attach(() => console.log("C"))
  .attachPrepend(() => console.log("A"))
  ;

evtLetter.post();
//"A", "B", "C" is printed to the console.
```

[**Run the example**](https://stackblitz.com/edit/evt-qshmkh?embed=1&file=index.ts&hideExplorer=1)

## **`evt.[$]attach[Once]Extract(...)`**

When the method contains the "**extract**" keyword, every event that the [`handler`](https://docs.ts-evt.dev/api/handler) matches will be swallowed and no other handler will have the opportunity to handle it, even the other "extract"' handlers. It acts as a trap.

"**extract**" handler has priority even over "**prepend**" [`Handler`](https://docs.ts-evt.dev/api/handler)s.

If multiples "extractes" handlers are candidates to extract an event the handler that has been added first have priority.

```typescript
import { Evt } from "evt";

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
    circle => console.assert(circle.radius > 0)
);
```

[**Run the example**](https://stackblitz.com/edit/evt-bwkprd?embed=1&file=index.ts&hideExplorer=1)

