---
description: Get a new instance of Ctx
---

# Evt.newCtx&lt;T&gt;\(\)

The recommended way to get a new [`Ctx`](https://docs.ts-evt.dev/api/ctx) instance. The type argument is optional, default is void.

## Returns

* [`Ctx<T>`](https://docs.ts-evt.dev/api/ctx) if a type argument was specified
* [`VoidCtx`](https://docs.ts-evt.dev/api/ctx) if no type argument was speficied.

## Example

```typescript
import { Evt } from "evt";

const ctx = Evt.newCtx();

ctx.getPrDone().then(()=> console.log("DONE"));

ctx.done(); //Prints "DONE"

//----------------------------

const ctxData = Evt.newCtx<Uint8Array>();

ctxText.getPrDone().then(
    data=> console.log(`DONE: ${data.byteLength} bytes`)
);

ctxText.done(new Uint8Array([1,2,3])); //Prints "DONE: 3 bytes"
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-5xs5rr?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

