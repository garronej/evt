---
description: Stuffs I don't know yet where to put in the documentation.
---

# \_\_TMP

`waitFor(...)` and `attachOnce(...)` combined with matcher address the main shortcoming of EventEmitter allowing us to asynchronously wait for the next shape that is a circle, for example.

```typescript
import { Evt } from "ts-evt";

const evtShape = new Evt<Shape>();

evtShape.waitFor(matchCircle)
    .then(circle => console.log(`radius: ${circle.radius}`))
    ;

evtShape.$attachOnce(
    shape => shape.type === "SQUARE" && shape.sideLength > 100 ? 
        [ shape.sideLength ] : null,
    sideLength => console.log(`length: ${sideLength}`)
);


const circle: Circle = {
    "type": "CIRCLE",
    "radius": 33
};

//"radius: 33" will be printed to the console.
evtShape.post(circle);

//Nothing will be printed on the console, the promise returned by waitFor has already resolved.
evtShape.post(circle);

//Nothing will be printed, the side length is too short
evtShape.post({
    "type": "SQUARE",
    "sideLength": 12
});

evtShape.post({
    "type": "SQUARE",
    "sideLength": 21
});
//"length: 21" have been  printed to the console.

//Noting will be printed, attachOnce's callback function has already been invoked.
evtShape.post({
    "type": "SQUARE",
    "sideLength": 44
});
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-matcher-and-waitfor?embed=1&file=index.ts)





//Combining Once, Prepend, matcher, timeout and boundTo

Large number of methods combining Once, Prepend are exposed.

![Screenshot 2020-02-08 at 19 25 44](https://user-images.githubusercontent.com/6702424/74090178-d4995080-4aa8-11ea-815f-5ae66a761812.png)

For each of those methods a large number of overload are defined so that you can combine matchers, timeout or boundTo.

![Screenshot 2020-02-08 at 19 27 56](https://user-images.githubusercontent.com/6702424/74090245-6c973a00-4aa9-11ea-8e48-90d49a0ed20b.png)

All the attach methods returns Promises that resolve when an event is matched for the first time and reject in the same way `waitFor` does. This explains why it is possible to combine `attach` `attachOnce`, `attachPrepend` ect... with the timeout parameter.

