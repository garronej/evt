---
description: Similar to EventEmitter.prototype.removeListener()
---

# evt.detach\(\[ctx\]\)

Detach all handlers from the Evt or all Evt's handler that are bound to a given context.

{% hint style="info" %}
The prefered way of detaching handler in TS-EVT is via [`Ctx<T>`](https://docs.ts-evt.dev/api/ctx) .
{% endhint %}

{% hint style="warning" %}
Calling this method without passing a context argument is almost never a good idea. An Evt instance should be sharable by modules that are isolated one another. If a module take the liberty to call evt.detach\(\) it can brek the code elswhere.
{% endhint %}

{% hint style="info" %}
To chery pick the handlers to detach use [`evt.getHandlers()`](https://docs.ts-evt.dev/api/evt/evt.gethandler) or [`ctx.getHandlers()`](https://docs.ts-evt.dev/api/ctx#ctx-gethandlers)\`\`
{% endhint %}

## Returns

`Handler<T,any>[]` array of Handler that have been detached.

## Parameters

`ctx?: Ctx` If [`Ctx`](https://docs.ts-evt.dev/api/ctx) is provided only Handler bound to the given context will be removed.



## Examples

To detach all handlers at once:

```typescript
const evtText = new Evt<string>();
//detach with no argument will detach all handlers (attach, attachOnce, waitFor... )
evtText.detach();
```

Using a context argument

```typescript
import { Evt } from "evt";

const evtText = new Evt<string>();

evtText.attachOnce(text=> console.log(`Hello ${text}`));

const ctx = Evt.newCtx();

evtText.attach(
    ctx,
    _text => console.assert(false,"never")
);

evtText.attachOnce(
    ctx,
    _text => console.assert(false,"never")
);

evtText.detach(ctx);

//"Hello World" will be printed
evtText.post("World");
```

[**Run the example**](https://stackblitz.com/edit/evt-bhxla6?embed=1&file=index.ts&hideExplorer=1)

