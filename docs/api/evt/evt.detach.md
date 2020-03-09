# evt.detach\(\[boundTo\]\)

See getHandler\(\) for mor ways to detach...

Detaching handlers.

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

