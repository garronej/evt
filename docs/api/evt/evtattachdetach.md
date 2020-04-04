# evt.evt\[Attach\|Detach\]

`evt.evtAttach` and `evt.evtDetach` are accessors for `Evt<Handler<T, any>>` that posts every time a new handler is attached to/detached from the `Evt<T>`.

```typescript
import { Evt } from "evt";

const evtText= new Evt<string>();

function myCallback(text: string){};

evtText.getEvtAttach().attach(
    handler=> console.log(`${handler.callback.name} attached`)
);

evtText.getEvtDetach().attach(
    handler=> console.log(`${handler.callback.name} detached`)
);

//"myCallback attached" is printed to the console.
evtText.attach(callback);

//"myCallback detached" is printed to the console.
evtText.detach();
```

[**Run the example**](https://stackblitz.com/edit/evt-xwe67h?embed=1&file=index.ts&hideExplorer=1)

