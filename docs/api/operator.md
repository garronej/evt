---
description: >-
  Operator provide a way to transform events data before they are passed to the
  callback.
---

# Operator&lt;T, U&gt; \(type\)

Operators can be of three types:

* **Filter**: `(data: T)=> boolean`.

  Only the matched event data will be passed to the callback.

* **Type guard**: `<U extends T>(data: T)=> data is U`

  Functionally equivalent to filter but restrict the event data type.

* **fλ**

  Filter / transform / stipulate when to detach the handler \( or a group of handler \)

  * **Stateless fλ**: `<U>(data: T)=> [U]|null|"DETACH"|{DETACH:`[`Ctx`](https://docs.ts-evt.dev/api/ctx)`}|...`  
  * **Stateful fλ**: `[ <U>(data: T, prev: U)=> ..., U ]`

    Uses the previous matched event data transformation as input à la `Array.prototype.reduce`

Operators do not have to be pure, but they **must not have any side effect**.

## Operator - Filter

Let us consider the example use of an operator that filter out everey word that does not start with the letter 'H'.

```typescript
import { Evt } from "ts-evt";

const evtText= new Evt<string>();

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

It is important to be sure that your filters always returns a `boolean`, typewise you will be warned it it is not the case but you must be sure that it is actually the case at runtime.  
If in doubts use 'bang bang' \( `!!returnedValue` \). This note also apply for Type Gard operators.

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-matcher-return-boolean?embed=1&file=index.ts)

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
import { Evt } from "ts-evt";

const evtShape = new Evt<Shape>();

evtShape.attach(
    matchCircle,
    shape => console.log(shape.radius)
);

//Nothing will be printed to the console, a Square is not a Circle.
evtShape.post({ "type": "SQUARE", "sideLength": 3 });

//"33" Will be printed to the console.
evtShape.post({ "type": "CIRCLE", "radius": 33 });
```

The type of the Shape object is narrowed down to `Circle`  
![Screenshot 2020-02-08 at 19 17 46](https://user-images.githubusercontent.com/6702424/74090059-baab3e00-4aa7-11ea-9c75-97f1fb99666d.png)

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-matcher-type-guard?embed=1&file=index.ts)

## Operator - fλ

Anonymous functions to simultaniously filter, transform the data and control the event flow.

**fλ Returns**

The value that a fλ operator can return are:

* `null` If the event should be ignored and nothing passed to the callback.
* `[ U ]` or `[ U, null ]` When the event should be handled, wrapped into the singleton is the value will be passed to the callback.
* `"DETACH"` If the event should be ignored and the handler detached from the `Evt`
* `{ DETACH: Ctx }` If the event should be ignored and a group of handler bound to a certain context must be detached. See [`Ctx`](https://docs.ts-evt.dev/api-doc/ctx)
* `[ U, "DETACH" ]` / `[ U, {DETACH:Ref} ]` If the event should be handler AND the handler detached.

### **Stateless fλ**

#### Stateless fλ operator only takes the event data as argument.

```typescript
import { Evt } from "ts-evt";

const evtShape = new Evt<Shape>();

/*
 * Filter: 
 *  Only circle event are handled.
 *  AND
 *  to be handled circles must have a radius greater than 100
 * 
 * Transform:
 *  Pass the radius of such circle to the callback.
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

#### Other example using `"DETACH"`

```typescript
import { Evt } from "ts-evt";

const evtText= new Evt<"TICK" | "END">();

/*
 * Only handle events that are not "END".
 * If the event is "END", detach the handler.
 * Pass the event data string in lower cace to the callback.
 */
evtText.$attach(
    text => text !== "END" ? [ text.toLowerCase() ] : "DETACH",
    text => console.log(text) 
);

evtText.post("TICK"); //"tick" is printed to the console
evtText.post("END"); //Nothing is printed to the console, the handler is detached
evtText.post("TICK"); //Nothing is printed to the console.
```

#### Example use of `[U,null|"DETACH"]`, handling the event that cause the handler to be detached.

```typescript
const evtText= new Evt<"TICK" | "END">();

evtText.$attach(
    text => [ text, text === "END" ? "DETACH" : null ],
    text => console.log(text) 
);

evtText.post("TICK"); //"TICK" is printed to the console
evtText.post("END"); //"END" is printed to the console, the handler is detached.
evtText.post("TICK"); //Nothing is printed to the console the handler have been detached.
```

#### Example use of `{ DETACH:`[`Ctx`](https://docs.ts-evt.dev/api-doc/ctx)`}`, detaching a group of handler bound to a given context.

```typescript
const evtBtnClick = new Evt<"OK" | "QUIT">();

const evtMessage = new Evt<string>();
const evtNotification = new Evt<string>();

const ctx= Evt.newCtx();

evtMessage.attach(
    ctx,
    message => console.log(`message: ${message}`)
);

evtNotification.attach(
    ctx,
    notification => console.log(`notification: ${notification}`)
);

evtBtnClick.$attach(
    type => [ 
        type, 
        type !== "QUIT" ? null : { "DETACH": ctx } 
    ],
    type => console.log(`Button clicked: ${type}`)
);

evtBtnClick.post("OK"); //Prints "Button clicked: OK"
evtMessage.post("Hello World"); //Prints "Message: Hello World"
evtNotification.post("Poke"); //Prints "Notification: Poke"
evtBtnClick.post("QUIT"); //Prints "Button clicked: QUIT", handler are detached...
evtMessage.post("Hello World 2"); //Prints nothing
evtNotification.post("Poke 2"); //Prints nothing
evtBtnClick.post("OK"); //Prints "OK", evtBtnClick handler hasn't been detached as it was not bound to ctx.
```

[**Run examples**](https://stackblitz.com/edit/ts-evt-demo-transformative-matcher?embed=1&file=index.ts)

### **Stateful fλ**

The result of the previously matched event is passed as argument to the operator.

```typescript
import { Evt } from "ts-evt";

const evtText= new Evt<string>();

evtText.$attach(
    [ 
        (str, prev)=> [`${prev} ${str}`], 
        "START: "  //<== Initial value
    ],
    sentence => console.log(sentence)
);

evtText.post("Hello"); //Prints "START: Hello"
evtText.post("World"); //Prints "START: Hello World"
```

Keep in mind that operator are not supposed to produce side effect.  
You should not make assumption on where and when operator are called.  
The following example seems equivalent from the previous one but it is not.

```typescript
const evtText= new Evt<string>();

//🚨 Do NOT do that 🚨...
evtText.$attach(
    (()=> {

        let acc= "START:";

        return (data: string) => [acc += ` ${data}`] as const;

    })(),
    sentence => console.log(sentence)
);

const text= "Foo bar";

if( evtText.isHandled(text) ){
    //Prints "START: Foo Bar Foo bar", probably not what you wanted...
    evtText.post(text); 
}
```

[**Run example**](https://stackblitz.com/edit/ts-evt-demo-stateful?embed=1&file=index.ts)

## `compose(op1, op2, ...)`

Operators can be composed to achieve more complex behavior.

Example composing Type guard with fλ:

```typescript
import { Evt, compose } from "ts-evt";

const evtShape= new Evt<Shape>();

evtShape.$attach(
    compose(
        matchCircle,
        ({ radius })=> [ radius ]
    ),
    radius => console.log(radius)
);

//Prints nothing, Square does not matchCircle
evtShape.post({ "type": "SQUARE", "sideLength": 10 }); 
//Prints "12"
evtShape.post({ "type": "CIRCLE", "radius": 12 });
```

Example with the "on" operator used to use `Evt`s as `EventEmitter`s.

```typescript
import { Evt, to, compose } from "../lib";

const evt = new Evt<
    ["text", string] |
    ["time", number]
>();

evt.$attach(
    compose(
        to("text"), 
        text => [ text.toUpperCase() ]
    )
    text => console.log(text)
);

evt.post(["text", "hi!"]); //Prints "HI!" ( uppercase )
```

Example composing tre fλ to count the number of different word in a sentence:

```typescript
import { Evt, compose } from "ts-evt";

const evtSentence = new Evt<string>();

evtSentence.$attach(
    compose(
        str=> [ str.toLowerCase().split(" ") ],
        arr=> [ new Set(arr) ],
        set=> [ set.size ]
    ),
    numberOfUniqWordInSentence => console.log(numberOfUniqWordInSentence)
);

evtSentence.post("Hello World"); //Prints "2"
evtSentence.post("Boys will be boys"); //Prints "3", "boys" appears two times.
```

Using stateful fλ operators to implement `throttleTime(duration)`, an operator that let through at most one event every \[duration\] milliseconds.

```typescript
const throttleTime = <T>(duration: number) =>
    compose<T, { data: T; lastClick: number; }, T>(
        [
            (data, { lastClick }) => 
                 Date.now() - lastClick < duration ?
                    null :
                    [{ data, "lastClick": Date.now() }],
            { "lastClick": 0, "data": null as any }
        ],
        ({ data }) => [data]
    )
    ;

const evtText = new Evt<string>();

evtText.$attach(
    throttleTime(1000), //<= At most one event per second is handled.
    text => console.log(text)
);

setTimeout(()=>evtText.post("A"), 0); //Prints "A"
//Prints nothing, the previous event was handled less than 1 second ago.
setTimeout(()=>evtText.post("B"), 500);
//Prints nothing, the previous event was handled less than 1 second ago.
setTimeout(()=>evtText.post("B"), 750); 
setTimeout(()=>evtText.post("C"), 1001); //Prints "C"
setTimeout(()=>evtText.post("D"), 2500); //Prints "D"
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-compose?embed=1&file=index.ts)

## Explicitly using the type alias

In `Operator<T, U>` `T` design the type of the event data and `U` design the type of the data spitted out by the operator to be passed to the callback. For filters operator `U=T`.

```typescript
import { Operator } from "ts-evt";

const myFilterOp: Operator<string,string> = 
    data => data.startsWith("H");

const myTypeGuardOp: Operator<Shape,Circle> = 
    (data): data is Circle => data.type ==="CIRCLE";
    
const myStatelessFλOp: Operator.fλ.Stateless<Shape, number> = 
    shape => shape.type !== "CIRCLE" ? null : [ circle.radius ];
  
const myStatefulFλOp: Operator.fλ.Stateful<string, number> =
    [
        (data, prev)=> [ prev + data.length ],
        0 
    ];
 
//Operator.fλ.Stateless<T, U> and Operator.fλ.Stateful<T, U>
//are a subtypes of Operator.fλ<T,U> which is in turn subtype
//of Operator<T,U>

declare function f1<T,U>(op: Operator.fλ<T,U>): void;
declare function f2<T,U>(op: Operator<T,U>): void;

f1(myStatelessFλOp); //OK
f1(myStatefulFλOp);  //OK
f2(myStatelessFλOp); //OK
f2(myStatefulFλOp);  //OK
```

## Where to use operators

Operators functions can be used with:

* All the [`evt.attach*(...)`](https://docs.ts-evt.dev/api-doc/evt#evt-usd-attach-methods) methods, [to prefix with `$` when used with fλ](https://docs.ts-evt.dev/api/evt/evt.-usd-attach-...-methods#the-usd-prefix).
* The [`evt.waitFor(...)`](https://docs.ts-evt.dev/api-doc/evt#evt-waitfor)   method
* The [`evt.pipe(...)`](https://docs.ts-evt.dev/api-doc/evt#evt-pipe) method.

