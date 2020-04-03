# Observable&lt;T&gt; \(class\)

`Observable` in RxJS and in TS-EVT are **not** the same abstraction.

In EVT `Observable` is a class of object that enclose an observed value and post  whenever the value is mutated.  
  
Basic example enclosing a `string`: 

```typescript
import { Observable, IObservable } from "evt";
import { assert } from "evt/dist/tools/typeSafety";

const obsText= new Observable("foo");

console.assert(obsText.val === "foo");

obsText.evt.attachOnce(
    text=> console.log(`currVal: ${text}`);
);

obsText.evtDiff.attachOnce(
    ({ prevVal, currVal })=>
        console.log(`currVal: ${currVal}, prveVal ${prevVal}`);
);

//Nothing will be printed as the value did not change.
let hasChanged = obsText.update("foo");

assert( hasChanged === false );

hasChanged = obsText.udate("bar");
//"currVal: bar" have been printed to the console.
//"currVal: bar, prevVal: foo" have been printed to the console.

assert(hasChanged === true);

assert(obsText.val === "bar");

//Instance of Observable are assignable to IObservable but
//the IObservable interface does not expose update().
//The IObservable interface is used to expose an observable that can't be
//updated()
const exposedObsText: IObservable<string> = obsText;
```

[**Run the example**](https://stackblitz.com/edit/evt-yffb9r?embed=1&file=index.ts&hideExplorer=1)  
****

The object passed to the constructor and to the .update\(\) method are copied in depth and freezed before being assigned to .val. 

{% hint style="success" %}
The only way to mutate .val is to call `.update()`. Consequently any mutation on `.val` will trigger an event.
{% endhint %}

{% hint style="success" %}
It is possible to observe `Array`, `Set`, `Map`, `Date` and Object with circular references.
{% endhint %}

```typescript
import { Observable } from "evt";

type Circle= { radius: number; color: "RED" | "WHITE" };

const circle: Circle = {
    "radius": 33,
    "color": "RED"
};

const obsCircle = new Observable<Circle>(circle);

console.log(circle === obsCircle.val ); 
//^ Prints "false", circle have been copied.

circle.radius = 0;

console.log(obsCircle.val.radius);
//^ Prints "33"

//Prints "ok", Assigning radius throw an error, .val is freezed.
try{ obsCircle.val.radius = 0; }catch{ console.log("ok"); }

obsCircle.evt.attach(circle=> console.log(circle.radius));

obsCircle.update(circle); //Prints "0"

```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-rdvyvv?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

  
It is possible to define what qualifies as a change. By default an in depth sameness check is performed.  
In this example for example we provide a same\(o1,o2\) that treat `Array`s as `Set`s \( ignoring ordering \)

```typescript
import { Observable, inDepth } from "evt";
import { diff } from "evt/dist/tools/reducers";

const { representsSameData } = representsSameDataFactory(
    { "takeIntoAccountArraysOrdering": false }
);

const obsUsers = new Observable<string[]>(
    ["Bob", "Alice"],
    inDepth.sameFactory({ "takeIntoAccountArraysOrdering": false }).same
);

obsUsers.evtChangeDiff.attach(
    ({ currVal, prevVal }) => {

        const { added, removed } = previousValue.reduce(...diff(currVal))

        console.log(`${added.join(", ")} joined the chat`);
        console.log(`${removed.join(", ")} left the chat`);

    }
);


//Prints "Louis joined the chat" "Bob left the chat"
obsUsers.onPotentialChange(["Alice", "Louis"]);
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-ydvtrf?embed=1&file=index.ts&hideExplorer=1)  
****

## **Observable.from\(...\)**

The static method `Observable.from` allows to create a new observable from an Evt instance or from an other Observable.  


### From an other observable

```typescript
import { Observable } from "evt";

type Circle= { radius: number; color: "RED" | "WHITE" };

const obsCircle= new Observable<Circle>(
    {"radius": 3, color: "RED"}
);

//Observable<"RED"|"WHITE"> 
const obsCircleColor = Observable.from(
    obsCircle, 
    circle=> circle.color
);

obsCircleColor.evt.attach(color => console.log(color));


//Prints nothing the color of the circle has not changed.
obsCircle.onPotentialChange({
    ...obsCircle.value,
    "color": "RED"
});

//Prints "WHITE"
obsCircle.onPotentialChange({
    ...obsCircle.value,
    "color": "WHITE"
});
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-ptfvd6?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

### From an `Evt`

Usefull for example to save the last event data posted

```typescript
import { Observable, Evt } from "evt";

const evtText= new Evt<string>();
const ctx= Evt.newCtx();

const obsCharCount = Observable.from(
    evtText.pipe(ctx,text=> [ text.length ]),
    0
);

console.log(obsCharCount.val); //Prints "0"

evtText.post("Foo");

console.log(obsCharCount.val); //Prints "3"

ctx.done();

evtText.post("Goodbye");

console.log(obsCharCount.val); //Prints "3" ( unchanged )
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-2ak7kh?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

