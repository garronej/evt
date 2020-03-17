# evt.getHandlers\(\)

List all handlers attached to the `Evt`. Returns an array of [`Handler<T,any>`](https://docs.ts-evt.dev/api/handler).

Here a use case detaching all handlers that uses a given matcher:

```typescript
import { Evt } from "evt";

const evtShape = new Evt<Shape>();

evtShape.attach(
    matchCircle,
    circle => console.log("1:", circle)
);

evtShape.attachOnce(
    matchCircle,
    circle => console.log("2:", circle)
);

evtShape.waitFor(matchCircle)
    .then(circle => console.log("3:", circle))
    ;

//Only handler that does not use matchCircle as operator.
evtShape.attach(circle => console.log("4:", circle))


evtShape.getHandlers()
    .filter(({ op }) => op === matchCircle)
    .forEach(({ detach }) => detach())
    ;

//Prints only "4: ..." other handlers are detached.
evtShape.post({ "type": "CIRCLE", "radius": 300 });
```

[**Run the example**](https://stackblitz.com/edit/evt-zufivp?embed=1&file=index.ts&hideExplorer=1)

`handler.detach(callback)`

To detach all the handlers using a given callback function as we do with `EventEmitter`:

```typescript
import { Evt } from "evt";

const evtText = new Evt<string>();

const callback = (text: string) => console.log(text);

evtText.attach(callback);

evtText.post("Foo"); //Prints "Foo"

evtText.getHandlers()
    .filter(handler => handler.callback === callback)
    .forEach(({detach})=> detach())
    ;

evtText.post("Foo"); //Prints nothing
```

[**Run the example**](https://stackblitz.com/edit/evt-wrqoct?embed=1&file=index.ts&hideExplorer=1)

