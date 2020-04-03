# Observable&lt;T&gt; \(class\)

`Observable` in RxJS and in TS-EVT are **not** the same abstraction.

In EVT `Observable` is a class of object that enclose an observed value and post `.evtChange` whenever this value is changed.

```typescript
import { Observable, IObservable } from "evt";
import { assert } from "evt/dist/tools/typeSafety";

const obsText= new Observable("foo");

console.assert(obsText.val === "foo");

obsText.evt.attachOnce(
    text=> {
        assert(text === obsText.val);
        console.log(`currVal: ${text}`);
    }
);

obsText.evtDiff.attachOnce(
    ({ prevVal, currVal })=> {

        assert(currVal === obsText.value);

        console.log(`currVal: ${currVal}, prveVal ${prevVal}`);

    }
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
import { representsSameDataFactory } from "evt/dist/tools/inDepthComparison";


const { representsSameData } = representsSameDataFactory({ "takeIntoAccountArraysOrdering": false });

type Circle= { radius: number; color: "RED" | "WHITE" };

const obsCircle= new Observable<Circle>(
    {"radius": 3, color: "RED"},
    representsSameData
);

//Observable<"RED"|"WHITE"> 
const obsCircleColor = Observable.from(
    obsCircle, 
    circle=> circle.color
);

obsCircleColor.evtChange.attach(color => console.log(color));


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

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-2ak7kh?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

