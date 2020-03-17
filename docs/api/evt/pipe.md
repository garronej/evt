---
description: An alternative to compose for chaining operaors.
---

# evt.pipe\(...\)

{% hint style="warning" %}
Being familiar with [`Ctx`](https://docs.evt.land/api/ctx) and [`Operator`](https://docs.evt.land/api/operator)is a prerequisite for properly using pipe.
{% endhint %}

## Return

A new Evt instance toward which are forwarded the transformed events matched by the operator\(s\).

## Parameters

`Ctx`: Optional, the context to which will be bound the handler responsible for forwarding events to the returned Evt.

`...Operator[]`: One or many operators composable with one another.

## Examples

There are two ways of using pipe, the first is to call pipe only once and passing it all the operators to chain, the second is to chain the `pipe` calls providing each time a single operator. Depending on the situation, you should favor one approach over the other.

Let us consider a case where the two approaches are equally valid.

Using a single call to `pipe`:

```typescript
import { Evt } from "evt";

type Circle = { type: "CIRCLE"; radius: number; };
type Square = { type: "SQUARE"; sideLength: number; };
type Shape = Circle | Square;

const evtShape = new Evt<Shape | undefined>();

evtShape.pipe(
    shape => !shape ? null : [ shape ], // Filter out undefined
    shape => shape.type !== "CIRCLE" ? null : [ shape ], // Filter Circle
    ({ radius }) => [ radius ], // Extract radius
    radius => radius > 200 ? "DETACH": [ radius ] //Detach if radius too large 
).attach(radius=> { /* ... */ });
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-jx2nnm?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

Same thing chaining `pipe`:

```typescript
const evtShape = new Evt<Shape | undefined>();

const ctx= Evt.newCtx();

evtShape
    .pipe(ctx)
    .pipe(shape => !shape ? null : [ shape ])
    .pipe(shape => shape.type !== "CIRCLE" ? null : [ shape ])
    .pipe(({ radius }) => [ radius ])
    .pipe(radius => radius > 200 ? { "DETACH": ctx } : [radius])
    .attach(radius => { /* ... */ });
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-yb4gzb?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

{% hint style="danger" %}
When chaining `pipe` if one operator in the midle of the chain returns `"DETACH"` all the handler upstream will stay attached. You must always detach the first link of the chain using a [`Ctx`](https://docs.evt.land/api/ctx).
{% endhint %}

The first approach \(calling pipe only once\) is preferable as it is slightly less verbose but in some cases you will reach the limits of TypeScript inference capabilities especially if you throw filters and generic operators into the mix. Bottom point is: try the first method, see how TypeScript infer the types, if detection fails fallback to chainging `pipe()`.

### Creating delegates

Pipe can also be used to create proxies to a source `Evt`.

```typescript
import { Evt } from "evt";

const evtShape = new Evt<Shape>();

//evtCircle is of type Evt<Circle> because matchCircle is a type guard.
const evtCircle = evtShape.pipe(matchCircle);

//evtLargeShape is of type Evt<Shape>
const evtLargeShape = evtShape.pipe(shape => {
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

[**Run the example**](https://stackblitz.com/edit/evt-e9zjnq?embed=1&file=index.ts&hideExplorer=1)

