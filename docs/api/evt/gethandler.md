# evt.getHandlers\(\)

List all handlers attached to the `Evt`. Returns an array of [`Handler<T,any>`](https://docs.ts-evt.dev/api/handler).

Here a use case detaching all handlers that uses a given matcher:

```typescript
import { Evt } from "ts-evt";

const evtShape = new Evt<Shape>();

evtShape.attach(
    matchCircle,
    _circle => { }
);
evtShape.attachOnce(
    matchCircle,
    _circle => { }
);

evtShape.waitFor(matchCircle)
    .then(_circle => { })
    ;

evtShape.getHandlers()
    .filter(({ matcher }) => matcher === matchCircle)
    .forEach(({ detach }) => detach())
    ;
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-detach-matcher?embed=1&file=index.ts)



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

