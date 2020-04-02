# Observable&lt;T&gt; \(class\)

`Observable` in RxJS and in TS-EVT are **not** the same abstraction.

In EVT `Observable` is a class of object that enclose an observed value and post `.evtChange` whenever this value is changed.

```typescript
import { Observable, IObservable } from "evt";
import { assert } from "evt/dist/tools/typeSafety";

const obsText= new Observable<string>("foo");

console.assert(obsText.value === "foo");

obsText.evtChange.attachOnce(
    newText=> {
        assert(newText === obsText.value);
        console.log(`newValue: ${newText}`);
    }
);

obsText.evtChangeDiff.attachOnce(
    ({ newValue, previousValue })=> {

        assert(newValue === obsText.value);

        console.log(`newValue: ${newValue}, previousValue ${previousValue}`);

    }
);

//Nothing will be printed as the value did not change.
let hasChanged = obsText.onPotentialChange("foo");

assert( hasChanged === false );

hasChanged = obsText.onPotentialChange("bar");
//"newValue: bar" have been printed to the console.
//"newValue: bar, previousValue foo" have been printed to the console.

assert(hasChanged === true);

assert(obsText.value === "bar");

//Instance of Observable are assignable to IObservable but
//the IObservable interface does not expose onPotentialChange().
//The IObservable interface is used to expose an observable as read only.
const exposedObsText: IObservable<string> = obsText;
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-yffb9r?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

It is possible to define what qualifies as a change. Here for example we observe an array of names to see what values are being added and removed in real time.

```typescript
import { Observable } from "evt";
import { representsSameDataFactory } from "evt/dist/tools/inDepthObjectComparison";
import { diff } from "evt/dist/tools/reducers";

const { representsSameData } = representsSameDataFactory(
    { "takeIntoAccountArraysOrdering": false }
);

const obsUsers = new Observable<string[]>(
    ["Bob", "Alice"],
    representsSameData
);

obsUsers.evtChangeDiff.attach(
    ({ newValue, previousValue }) => {

        const { added, removed } = previousValue.reduce(...diff(newValue))

        console.log(`${added.join(", ")} joined the chat`);
        console.log(`${removed.join(", ")} left the chat`);

    }
);

//New array, "Bob" has been removed and "Louis" has been added.
const updatedUsers = [
    ...obsUsers.value.filter(name => name !== "Bob"),
    "Louis"
];

//Prints "Louis joined the chat" "Bob left the chat"
obsUsers.onPotentialChange(updatedUsers);
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-ydvtrf?embed=1&file=index.ts&hideExplorer=1)  
****

## **Observable.from\(...\)**

The static method `Observable.from` allows to create a new observable from an Evt instance or from an other Observable.  


### From an other observable

```typescript
import { Observable } from "evt";
import { representsSameDataFactory } from "evt/dist/tools/inDepthObjectComparison";

const { representsSameData } = representsSameDataFactory();

type Circle= { radius: number; color: "RED" | "WHITE" };

const obsCircle= new Observable<Circle>(
    {"radius": 3, color: "RED"},
    representSameData
);

//Observable<"RED"|"WHITE"> 
const obsCircleColor = Observable.from(
    obsCricle, 
    circle=> circle.color
);

obsCricleColor.evtChange.attach(color => console.log(color));


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

### From an `Evt`

```typescript
import { Observable, Evt } from "evt";

const evtText= new Evt<string>();
const ctx= Evt.newCtx();

const obsCharCount = Observable.from(
    evtText.pipe(ctx,text=> [ text.length ]),
    0
);

console.log(obsCharCount.value); //Prints "0"

evtText.post("Foo");

console.log(obsCharCount.value); //Prints "3"

ctx.done();

evtText.post("Goodbye");

console.log(obsCharCount.value); //Prints "3" ( unchanged )
    
    
```

