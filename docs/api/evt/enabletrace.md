# evt.enableTrace\(...\)

If you need help to track down a bug, you can use `enableTrace` to log what's going on with an Evt.  
Use `evt.disableTrace()` to stop logging.

```typescript
import { Evt } from "evt";

{
    const evtCircle = new Evt<Circle>();

    evtCircle.enableTrace({ "id": "evtCircle n°1" });

    evtCircle.post(circle1);

    evtCircle.attachOnce(circle => {});

    evtCircle.post(circle2);

}

console.log("\n");

//Optional arguments 
{

    const evtCircle = new Evt<Circle>();

    evtCircle.enableTrace({
        "id": "evtCircle n°2",
        "formatter": circle => `CIRCLE(${circle.radius})`,
        "log": (...args)=> console.log(...["[myPrefix]",...args]) 
        // ^Log function default console log
    );

    evtCircle.attach(
        ({ radius }) => radius > 15, 
        circle => {}
    );

    evtCircle.post(circle1);
    evtCircle.post(circle2);

}
```

This will print:

```text
(evtCircle n°1) 0 handler, { "type": "CIRCLE", "radius": 12 }
(evtCircle n°1) 1 handler, { "type": "CIRCLE", "radius": 33 }

[myPrefix] (evtCircle n°2) 0 handler, CIRCLE(12)
[myPrefix] (evtCircle n°2) 1 handler, CIRCLE(33)
```

[**Run the example**](https://stackblitz.com/edit/evt-vfjvfs?embed=1&file=index.ts&hideExplorer=1)

