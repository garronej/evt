# Evt.from&lt;T&gt;\(...\)

Creates an Evt that post events of a specific type coming from other API that emmits events.

## Returns

Evt&lt;T&gt; will post every time the emitter emits

## Parameters

Ctx Optional, Allows to detach the handlers attached to the source emitter.

`emitter`: Any of the following,

* DOM EventTarget
* Node.js EventEmitter
* JQuery-like event target
* RxJS Subject
* An Array, NodeList or HTMLCollection of many of these.

Depending of the API the type argument will be inffered or not.

`name`: The event name of interest, being emitted by the `target`.

## Example

### With nodez EventEmitter

```typescript
import { Evt } from "ts-evt";
import { EventEmitter } from "events";

const ctx= Evt.newCtx();

const ee= new EventEmitter();
const evtText= Evt.from<string>(ctx, ee, "text");
evtText.attach(text=> console.log(text));

evtText.post("Foo bar");//Prints "Foo bar";

ctx.done();

console.log(ee.listenerCount("text"));//Prints "0"
```

### With RxJS Subject

```typescript
import { Evt } from "ts-evt";
import { Subject } from "rxjs";

const ctx= Evt.newCtx();

const subject = new Subject<string>();

const evtText = Evt.from(subject); //The type argument is inffered

evtText.attach(text=> console.log(text));

subject.next("Foo bar"); //Prints "Foo bar"

ctx.done();

subject.next("Foo bar"); //Prints nothing
```

### With DOM EventTarget

```typescript
import { Evt } from "ts-evt";

Evt.from(document, "click").attach(()=> console.log("Clicked!"));
```

### With JQuery-like event target

```typescript
import { Evt } from "ts-evt";

Evt.from([
    $("#btnA"),
    $("#btnB"),
    $("#btnC")
], "click").attach(()=> console.log("Clicked!"));
```

