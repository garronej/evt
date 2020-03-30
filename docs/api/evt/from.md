# Evt.from&lt;T&gt;\(...\)

Creates an Evt that post events of a specific type coming from other API that emmits events.

## Returns

Evt&lt;T&gt; will post every time the emitter emits

## Parameters

Ctx Optional, Allows detaching the handlers attached to the source emitter.

`emitter`: Any of the following,

* DOM EventTarget
* Node.js EventEmitter
* JQuery-like event target
* RxJS Subject
* An Array, NodeList or HTMLCollection of many of these.
* A promise

Depending of the API the type argument will be inferred or not.

`name`: The event name of interest, being emitted by the `target`.

## Example

### From `EventEmitter`

```typescript
import { Evt } from "evt";
import { EventEmitter } from "events";

const ctx= Evt.newCtx();

const ee= new EventEmitter();
const evtText= Evt.from<string>(ctx, ee, "text");
evtText.attach(text=> console.log(text));

evtText.post("Foo bar");//Prints "Foo bar";

ctx.done();

console.log(ee.listenerCount("text"));//Prints "0"
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-qyk2ny?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

### With RxJS Subject

```typescript
import { Evt } from "evt";
import { Subject } from "rxjs";

const ctx= Evt.newCtx();

const subject = new Subject<string>();

const evtText = Evt.from(ctx, subject); //The type argument is inferred.

evtText.attach(text=> console.log(text));

subject.next("Foo bar"); //Prints "Foo bar"

ctx.done();

subject.next("Foo bar"); //Prints nothing
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-t14cot?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

### With DOM EventTarget

```typescript
import { Evt } from "evt";

Evt.from(document, "click").attach(()=> console.log("Clicked!"));
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-whhtbw?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

### With JQuery-like event target

```typescript
import { Evt } from "evt";

Evt.from([
    $("#btnA"),
    $("#btnB"),
    $("#btnC")
], "click").attach(()=> console.log("Clicked!"));
```

