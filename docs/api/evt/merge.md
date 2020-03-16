# Evt.merge\(\[ evt1, evt2, ... \]\)

Returns a new `Evt` instance which concurrently post all event data from every given input `Evt`.

## Return

A new Evt that has for type arguments the union of the type arguments of the inputs Evt.

## Parameters

Ctx&lt;any&gt; Optional, Ctx that will be used to detach the handler that has been attached to the input Evts.

Evt&lt;any&gt;\[\] Evts to be merged.

## Example

```typescript
import { Evt } from "evt";

const ctx= Evt.newCtx();

const evtText = new Evt<string>();
const evtTime = new Evt<number>();

//evtTextOrTime is Evt<string | number>
const evtTextOrTime= Evt.merge(ctx, [evtText, evtTime]);

evtTextOrTime.attach(console.log);

evtText.post("Foo bar"); //Prints "Foo bar"

ctx.done();

evtText.post("Foo bar"); //Prints nothing
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-nbshnc?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

