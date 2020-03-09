# evt.pipe\(...\)

Create a new instance of Evt toward which will be forwarded all the events matched by the matcher function.

```typescript
import { Evt } from "ts-evt";

const evtShape = new Evt<Shape>();

//evtCircle is of type Evt<Circle> because matchCircle is a type guard.
const evtCircle = evtShape.createDelegate(matchCircle);

//evtLargeShape is of type Evt<Shape>
const evtLargeShape = evtShape.createDelegate(shape => {
  switch (shape.type) {
    case "CIRCLE":
      return shape.radius > 5;
    case "SQUARE":
      return shape.sideLength > 3;
  }
});

evtCircle.attach(({ radius }) =>
  console.log(`Got a circle, radius: ${radius}`)
);

evtLargeShape.attach(
    shape => console.log(`Got a large ${shape.type}`)
);

//"Got a circle, radius: 66" and "Got a large CIRCLE" will be printed.
evtShape.post({
  "type": "CIRCLE",
  "radius": 66
});

//Only "Got a circle, radius: 3" will be printed
evtShape.post({
  "type": "CIRCLE",
  "radius": 3
});

//Only "Got a large SQUARE" will be printed
evtShape.post({
  "type": "SQUARE",
  "sideLength": 30
});

//Nothing will be printed
evtShape.post({
  "type": "SQUARE",
  "sideLength": 1
});
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-delegate?embed=1&file=index.ts)

