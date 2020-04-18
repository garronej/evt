---
description: >-
  Operators provide a way to transform events data before they are passed to the
  callback.
---

# Operator&lt;T, U&gt; \(type\)

EVT Operators can be of three types:

* **Filter**: `(data: T)=> boolean`.

  Only the matched event data will be passed to the callback.

* **Type guard**: `<U extends T>(data: T)=> data is U`

  Functionally equivalent to filter but restrict the event data type.

* **fλ**

  Filter / transform / detach handlers

  * **Stateless fλ**: `<U>(data: T)=> [U] | null | "DETACH" | {DETACH:`[`Ctx`](https://docs.ts-evt.dev/api/ctx)`} |...`  
  * **Stateful fλ**: `[ <U>(data: T, prev: U)=> ..., U ]`

    Uses the previous matched event data transformation as input à la `Array.prototype.reduce`

{% hint style="warning" %}
Operators do not have to be [pure](https://en.wikipedia.org/wiki/Pure_function), they can use variables available in scope and involve time `(Date.now())`, but they **must not have any side effect**. In particular they cannot modify their input.
{% endhint %}

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

[**Run the example**](https://stackblitz.com/edit/evt-38z5nd?embed=1&file=index.ts&hideExplorer=1)

It is important to be sure that your filter always return a `boolean`, typewise you will be warned it is not the case but you must be sure that it is actually the case at runtime.  
If in doubts use 'bang bang' \( `!!returnedValue` \). This note also applies for [Type Gard operators](https://docs.evt.land/api/operator#operator-type-guard).

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

The type of the Shape object is narrowed down to `Circle`  
![Screenshot 2020-02-08 at 19 17 46](https://user-images.githubusercontent.com/6702424/74090059-baab3e00-4aa7-11ea-9c75-97f1fb99666d.png)

[**Run the example**](https://stackblitz.com/edit/evt-nn29kf?embed=1&file=index.ts&hideExplorer=1)

## Operator - fλ

Anonymous functions to simultaneously filter, transform the data and control the event flow.

**fλ Returns**

The type of values that a fλ operator sole determine what it does:

* `null` If the event should be ignored and nothing passed to the callback.
* `[ U ]` or `[ U, null ]` When the event should be handled, wrapped into the singleton is the value will be passed to the callback.
* `"DETACH"` If the event should be ignored and the handler detached from the `Evt`
* `{ DETACH: Ctx<void> }` If the event should be ignored and a group of handlers bound to a certain context be detached. See [`Ctx<T>`](https://docs.ts-evt.dev/api/ctx)
* `{ DETACH: Ctx<V>, res: V }`  See [`Ctx<T>`](https://docs.ts-evt.dev/api/ctx)\`\`
* `{ DETACH: Ctx; err: Error }`  See [`Ctx<T>`](https://docs.ts-evt.dev/api/ctx)\`\`
* `[ U, "DETACH" ]` / `[ U, {DETACH:Ctx, ...} ]` If the event should be handled AND some detach be performed.

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

Other example using `"DETACH"`

```typescript
import { Evt } from "evt";

const evtText= Evt.create<"TICK" | "END">();

/*
 * Only handle events that are not "END".
 * If the event is "END", detach the handler.
 * Pass the event data string in lower case to the callback.
 */
evtText.$attach(
    text => text !== "END" ? [ text.toLowerCase() ] : "DETACH",
    text => console.log(text) 
);

evtText.post("TICK"); //"tick" is printed to the console
evtText.post("END"); //Nothing is printed on the console, the handler is detached
evtText.post("TICK"); //Nothing is printed to the console.
```

Example use of `[U,null|"DETACH"]`, handling the event that causes the handler to be detached.

```typescript
const evtText= Evt.create<"TICK" | "END">();

evtText.$attach(
    text => [ text, text === "END" ? "DETACH" : null ],
    text => console.log(text) 
);

evtText.post("TICK"); //"TICK" is printed to the console
evtText.post("END"); //"END" is printed on the console, the handler is detached.
evtText.post("TICK"); //Nothing is printed to the console the handler has been detached.
```

Example use of `{ DETACH:`[`Ctx`](https://docs.ts-evt.dev/api-doc/ctx)`}`, detaching a group of handlers bound to a given context.

```typescript
const evtBtnClick = Evt.create<"OK" | "QUIT">();

const evtMessage = Evt.create<string>();
const evtNotification = Evt.create<string>();

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
evtBtnClick.post("QUIT"); //Prints "Button clicked: QUIT", handlers are detached...
evtMessage.post("Hello World 2"); //Prints nothing
evtNotification.post("Poke 2"); //Prints nothing
evtBtnClick.post("OK"); //Prints "Button clicked: OK", evtBtnClick handler hasn't been detached as it was not bound to ctx.
```

[**Run examples**](https://stackblitz.com/edit/evt-mf3nzt?embed=1&file=index.ts&hideExplorer=1)

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

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-stateful-qs1nsh?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

### Dos and don'ts

Operators cannot have any side effect \(they cannot modify anything\). No assumption should be made on when and how they are called.

#### Don't encapsulate state, do use stateful **fλ**

The first thing that you might be tempted to do is to use a variable available in the operator's scope as an accumulator.

The following example **seems equivalent from the previous one** but it is **not**.

```typescript
const evtText= Evt.create<string>();

//🚨 DO NOT do that 🚨...
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

When evt.isHandled\(data\) is invoked the operator of every handler is invoked. The operator is invoked again when the event is actually posted.

In the example every time the operator is invoked the encapsulated variable acc is updated. This result in "Foo bar" being accumulated twice when the event is posted only once.

`evt.postAsyncOnceHandled(data)` will also cause dry invokations of the operators.

If state is needed stat full fλ have to be used.

#### Don't modify input, do return a copy.

```typescript
import { Evt } from "evt";

const evtText= Evt.create<string>();

//Do not modify the accumulator value.
evtText.$attach(
    [
        (text, arr: string[])=> {
            arr.push(text);
            return [arr];
        },
        []
    ],
    arr=> { /*...*/ }
);

/* ----------------------------- */

//Do Return a new array
evtText.$attach(
    [
        (text, arr: string[]) => [[...arr, text]],
        []
    ],
    arr=> { /*...*/ }
);
```

#### Do use const assertions \( `as const` \)

The TypeScript [const assertion features](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) come in handy if you introduce closures, for example. The following example does not compile without the use of `as const`.

```typescript
const evtShapeOrUndefined = Evt.create<Shape | undefined>();

evtShapeOrUndefined.$attach(
    shape => !shape ?
        null :
        (() => {
            switch (shape.type) {
                case "CIRCLE": return [shape.radius] as const;
                case "SQUARE": return [shape.sideLength] as const;
            }
        })(),
    radiusOrSide => { /* ... */ }
);
```

Generally const assertions can help you narrow down the return type of your operator. In the following example without the const assertions `data` is inferred as being `string | number` , with the const assertions it is `"TOO LARGE" | number`

```typescript
import { Evt } from "evt";

const evtN = Evt.create<number>();

evtN.$attach(
    n => [ n>43 ? "TOO LARGE" as const : n ], 
    data=> { /* ... */ }
);
```

#### Do write single instruction function, try to avoid explicit return.

This is more a guideline than a requirement but you should favor `data => expression` over `data=> { ...return x; }` wherever possible for multiple reasons:

1. It is much less likely to inadvertently produce a side effect writing a single expression function than it is writing a function with explicit returns.
2. Operators are meant to be easily readable. If you think the operator you need is too complex to be clearly expressed by a single instruction, you should consider splitting it in multiple operators and using the compose function introduced in the next section.
3. It is easier for TypeScript to infer the return type of single expression functions.

Here is the previous example using explicit returns just to show you that the return type has to be explicitly specified, this code does not copy without it.

```typescript
import { Evt } from "evt";

const evtN = Evt.create<number>();

//🚨 This is NOT recomanded 🚨...
evtN.$attach(
    (n): [ "TOO LARGE" | number ] => {
        if( n > 43 ){
            return [ "TOO LARGE" ];
        }
        return [n];
    }, 
    data=> { /* ... */ }
);.
```

## `compose(op1, op2, ..., opn)`

$$
op_n \circ... \circ op_2 \circ op_1
$$

Operators can be composed \( aka piped \) to achieve more complex behaviour.

Example composing type guards with fλ:

```typescript
import { Evt, compose } from "evt";

const evtShape= Evt.create<Shape>();

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

Example with [`on`](https://docs.evt.land/overview#eventemitter-comparison) \( operator used to do things à la `EventEmitter`\)

```typescript
import { Evt, to, compose } from "evt";

const evt = Evt.create<
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

Example composing three fλ to count the number of different words in a sentence:

```typescript
import { Evt, compose } from "evt";

const evtSentence = Evt.create<string>();

evtSentence.$attach(
    compose(
        str=> [ str.toLowerCase().split(" ") ],
        arr=> [ new Set(arr) ],
        set=> [ set.size ]
    ),
    numberOfUniqWordInSentence => console.log(numberOfUniqWordInSentence)
);

evtSentence.post("Hello World"); //Prints "2"
evtSentence.post("Boys will be boys"); //Prints "3", "boys" appears twice.
```

Using stateful fλ operators to implement `throttleTime(duration)`, an operator that let through at most one event every `duration` milliseconds.

```typescript
import { Evt, compose } from "evt";

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

const evtText = Evt.create<string>();

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

[**Run the example**](https://stackblitz.com/edit/evt-dkx3kn?embed=1&file=index.ts&hideExplorer=1)

{% hint style="warning" %}
Unless all the operators passed as arguments are stateless the operator returned by `compose` is **not** reusable.
{% endhint %}

```typescript
import { Evt, compose } from "evt";

//Never do that: 
{

const op= compose<string,string, number>(
    [(str, acc)=>[`${acc} ${str}`], ""],
    str=> [str.length]
);

const evtText= Evt.create<string>();

evtText.$attach(op, n=> console.log(n));
evtText.$attach(op, n=> console.log(n));

evtText.post("Hello World"); //Prints "12 24" ❌

}

console.log("");

//Do that instead: 
{

const getOp= ()=> compose<string,string, number>(
    [(str, acc)=>[`${acc} ${str}`], ""],
    str=> [str.length]
);

const evtText= Evt.create<string>();

evtText.$attach(getOp(), n=> console.log(n));
evtText.$attach(getOp(), n=> console.log(n));

evtText.post("Hello World"); //Prints "12 12" ✅

}
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-gmzzzx?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

## Explicitly using the type alias

The `Operator` type alias defines what functions qualify as a valid EVT operaor. The type can be used as a scaffolder to write fλ.

In `Operator<T, U>` , `T` design the type of the event data and `U` design the type of the data spitted out by the operator. For filters operator `U=T`.

```typescript
import { Operator } from "evt";

//A function that take an EVT operator as argument.
declare function f<T, U>(op: Operator<T, U>): void;

//Les's say you know you want to create an operator that take string
//and spit out number you can use the type alias as scaffolding.
const myStatelessFλOp: Operator.fλ<string, number> =
    str => str.startsWith("H")? null : [ str.length ];
//The shape argument is inferred as being a string and TS control that you
//are returning a number (str.length) as you should.

f(myStatelessFλOp); //OK, f<Shape,number> Operator.fλ is assignable to Operator.

//An other example creating an stateful operator
const myStatefulFλOp: Operator.fλ<string, number> =
    [
        (data, prev) => [prev + data.length],
        0
    ];

f(myStatefulFλOp); //OK, f<string, number>

//Filter and TypeGuard don't need scaffolding but they are valid Operator

f((data: string) => data.startsWith("H")); // OK, TS infer f<string, string>
f((n: number): n is 0 | 1 => n === 0 || n === 1); // OK, TS infer f<number, 0 | 1>
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-agatnh?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

## Generic operators built in

{% hint style="warning" %}
Generic operators such as `bufferTime` `debounceTime`, `skip`, `take`, `switchMap`, `mergeMap` and `reduce`Will be added later on alongside creators. To implement those we need a third type of operator called `AutonomousOperators` that will ship in the next major release.
{% endhint %}

Some generic operators are provided in `"evt/dist/lib/util/genericOperators"` such as `scan`, `throttleTime` or `to` but that's about it.

```typescript
//Importing custom operator chunksOf that is not exported by default.
import { chuncksOf } from "evt/dist/lib/util/genericOperators";
```

## Where to use operators

Operators functions can be used with:

* All the [`evt.attach*(...)`](https://docs.ts-evt.dev/api-doc/evt#evt-usd-attach-methods) methods. [They have to be prefixed with `$` when used with fλ](https://docs.ts-evt.dev/api/evt/evt.-usd-attach-...-methods#the-usd-prefix).
* The [`evt.waitFor(...)`](https://docs.ts-evt.dev/api-doc/evt#evt-waitfor)   method
* The [`evt.pipe(...)`](https://docs.ts-evt.dev/api-doc/evt#evt-pipe) method.

