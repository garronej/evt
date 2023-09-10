---
description: >-
  Operators provide a way to transform events data before they are passed to the
  callback.
---

# Operator\<T, U> (type)

EVT Operators can be of three types:

*   **Filter**: `(data: T)=> boolean`.

    Only the matched event data will be passed to the callback.
*   **Type guard**: `<U extends T>(data: T)=> data is U`

    Functionally equivalent to filter but restrict the event data type.
*   **fλ**

    Filter / transform

    * **Stateless fλ**: `<U>(data: T)=> [U] | null`  Map the input type T to an output type U.
    *   **Stateful fλ**: `[ <U>(data: T, prev: U)=> [U] | null, U /*initial value*/ ]`

        Same, but with a memory of the previous data.

## Where to use operators

Operators functions can be used with:

* All the [`evt.attach*(...)`](https://docs.ts-evt.dev/api-doc/evt#evt-usd-attach-methods) methods. [They have to be prefixed with `$` when used with fλ](https://docs.ts-evt.dev/api/evt/evt.-usd-attach-...-methods#the-usd-prefix).
* The [`evt.waitFor(...)`](https://docs.ts-evt.dev/api-doc/evt#evt-waitfor)   method
* The [`evt.pipe(...)`](https://docs.ts-evt.dev/api-doc/evt#evt-pipe) method.

```typescript
type Circle = {
    color: string;
    radius: number;
};

// Operator that ignore all non blue circle and return the radius of all blue circles.
const blueRadius = (circle: Circle)=> circle.color !== "blue" ? null : [circle.radius];

const evtCircle = Evt.create<Circle>();

// Usage with attach, ($) because it's a fλ
evtCircle.$attach(
    blueRadius,
    radius => { /* ... */}
);

const radius= await evtCircle.waitFor(blueRadius);

evtCircle
    .pipe(blueRadius)
    .attach(radius=> { /* ... */ });
```

## Operator - Filter

Let us consider the example use of an operator that filters out every word that does not start with 'H'.

```typescript
import { Evt } from "evt";

const evtText= Evt.create<string>();

evtText.attach(
    text=> text.startsWith("H"), 
    text=> {
        console.assert( text.startsWith("H") );
        console.log(text);
    }
);

//Nothing will be printed to the console.
evtText.post("Bonjour");

//"Hi!" will be printed to the console.
evtText.post("Hi!");
```

[**Run the example**](https://stackblitz.com/edit/evt-38z5nd?embed=1\&file=index.ts\&hideExplorer=1)

It is important to be sure that your filter always return a `boolean`, typewise you will be warned it is not the case but you must be sure that it is actually the case at runtime.\
If in doubts use 'bang bang' ( `!!returnedValue` ). This note also applies for [Type Gard operators](https://docs.evt.land/api/operator#operator-type-guard).

## Operator - Type guard

If you use a filter that is also a [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards), the type of the callback argument will be narrowed down to the matched type.

Let us define a straight forward type hierarchy to illustrate this feature.

```typescript
type Circle = {
    type: "CIRCLE";
    radius: number;
};

type Square = {
    type: "SQUARE";
    sideLength: number;
};

type Shape = Circle | Square;

//Type Guard for Circle:
const matchCircle = (shape: Shape): shape is Circle =>
    shape.type === "CIRCLE";
```

The `matchCircle` type guard can be used to attach a callback to an `Evt<Shape>` that will only be called against circles.

```typescript
import { Evt } from "evt";

const evtShape = Evt.create<Shape>();

evtShape.attach(
    matchCircle,
    shape => console.log(shape.radius)
);

//Nothing will be printed on the console, a Square is not a Circle.
evtShape.post({ "type": "SQUARE", "sideLength": 3 });

//"33" Will be printed to the console.
evtShape.post({ "type": "CIRCLE", "radius": 33 });
```

The type of the Shape object is narrowed down to `Circle`\
![Screenshot 2020-02-08 at 19 17 46](https://user-images.githubusercontent.com/6702424/74090059-baab3e00-4aa7-11ea-9c75-97f1fb99666d.png)

[**Run the example**](https://stackblitz.com/edit/evt-nn29kf?embed=1\&file=index.ts\&hideExplorer=1)

## Operator - fλ

Anonymous functions to simultaneously filter, transform the data and control the event flow.

**fλ Returns**

The type of values that a fλ operator sole determine what it does:

* `null` If the event should be ignored and nothing passed to the callback.
* `[ U ]`  When the event should be handled, wrapped into the singleton is the value will be passed to the callback.

### **Stateless fλ**

Stateless fλ operator only takes the event data as arguments.

```typescript
import { Evt } from "evt";

const evtShape = Evt.create<Shape>();

/*
 * Filter: 
 *  Only circle events are handled.
 *  AND
 *  to be handled circles must have a radius greater than 100
 * 
 * Transform:
 *  Pass the radius of such circles to the callback.
 */
evtShape.$attach(
    shape => shape.type === "CIRCLE" && shape.radius > 100 ? 
        [ shape.radius ] : null,
    radiusOfBigCircle => console.log(`radius: ${radius}`) 
    //NOTE: The radius argument is inferred as being of type number!
);

//Nothing will be printed to the console, it's not a circle
evtShape.post({ "type": "SQUARE", "sideLength": 3 }); 

//Nothing will be printed to the console, The circle is too small.
evtShape.post({ "type": "CIRCLE", "radius": 3 }); 

//"radius 200" Will be printed to the console.
evtShape.post({ "type": "CIRCLE", "radius": 200 });
```

### **Stateful fλ**

The result of the previously matched event is passed as argument to the operator.

```typescript
import { Evt } from "evt";

const evtText= Evt.create<string>();

evtText.$attach(
    [ 
        (str, prev)=> [`${prev} ${str}`], 
        "START: "  //<= seed
    ],
    sentence => console.log(sentence)
);

evtText.post("Hello"); //Prints "START: Hello"
evtText.post("World"); //Prints "START: Hello World"
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-stateful-qs1nsh?embed=1\&file=index.ts\&hideExplorer=1)\*\*\*\*

###

## Generic operators

Some generic operators are provided in `"evt/operators"` such as `scan`, `throttleTime` or `to` but that's about it.

```typescript
//Importing custom operator chunksOf that is not exported by default.
export { chunksOf } from "evt/operators/chunksOf";
export { distinct } from "evt/operators/distinct";
export { nonNullable } from "evt/operator/nonNullable";
export { onlyIfChanged } from "evt/operators/onlyIfChanged";
export { scan } from "evt/operator/scan";
export { throttleTime } from "evt/operator/throttleTime";
export { to } from "evt/operator/to";
```

##
