# Evt.useEffect\(...\)

Invoke a callback now and every time an event is posted. If the event passed is statefull the effect callback is only invoked when `evtChange` is posted.

```typescript
import { Evt } from "evt";

const evtText = new Evt<string>();
const evtAge = new Evt<number>();

const ctx = Evt.newCtx();

//Prints [ undefined, { "isFirst": true }, 0]
Evt.useEffect(
    (...args) => console.log(args),
    Evt.merge(
        ctx,
        [
            evtText,
            evtAge
        ]
    )
);

//Prints [ "Foo Bar", { "isFirst": false, data: "Foo Bar" }, 1]
evtText.post("Foo Bar");

//Prints [ 99, { "isFirst": false, data: 99 }, 2 ]
evtAge.post(99);

ctx.done();

//Prints nothing, Evt detached.
evtAge.pose(1);
```

Used with [`StatefulEvt`](https://docs.evt.land/api/statefulevt)s:

```typescript
import { Evt } from "evt";

const evtText = Evt.create("foo");


Evt.useEffect(
    text=> console.log(text),
    evtText.evtChange.pipe(ctx)
); // Pints "foo"

evtText.state= "bar"; // Prints "bar"
evtText.state= "bar"; // Prints nothing

ctx.done();

evtText.state= "baz"; // Prints nothing

```

