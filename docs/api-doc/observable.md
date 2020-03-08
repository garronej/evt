# Observable&lt;T&gt; \(class\)

`Observable` in `RxJS` and `ts-evt` are **not** the same abstraction.

`Observable<T>` in `ts-evt` provide a way to react to an object mutation.

A `Observable<T>` encapsulate a value of type `T` when this value get changed `.evtChange` is posted.

```typescript
import { Observable, IObservable } from "ts-evt";
import { assert } from "ts-evt/dist/tools/typeSafety";

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
//The IObservable interface is used to expose an observable as readonly.
const exposedObsText: IObservable<string> = obsText;
```

Is is possible to define what qualify as a change.

```typescript
import { Observable } from "ts-evt";
import { representsSameDataFactory } from "ts-evt/dist/tools/inDepthObjectComparison";
import { diff } from "ts-evt/dist/tools/reducers";

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

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-observable-change-condition?embed=1&file=index.ts)

