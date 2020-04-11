# Helper types

## ToNonPostableEvt&lt;E&gt;

{% hint style="info" %}
`NonPostableEvt<T>` and `StatefulReadonlyEvt<T>` are interfaces implemented respectively by the classes `Evt<T>` and `StatefulEvt<T>`. They contains all the methods but the ones used to post events, namely: `.post(), .postOnceHandled()` and the `.state` setter for `StatefulReadonlyEvt`
{% endhint %}

```typescript
import { ToNonPostableEvt } from "evt";

ToNonPostableEvt<Evt<T>>         → NonPostableEvt<T>
ToNonPostableEvt<SatefulEvt<T>>  → StatefulReadonlyEvt<T>
ToNonPostable<VoidEvt>           → NonPostable<Void>
ToNonPostable<NonpostableEvt<T>> → NonPostableEvt<T>

ToNonPostableEvt<{ 
    evtText: Evt<string>; 
    evtCount: StatefulEvt<number>; 
    type: "FOO" 
}> 
 → 
{ 
    evtText: NonPostableEvt<string>; 
    evtCount: StatefulNonpostableEvt<number>; 
    type: "FOO"
}

```

Example use of the `NonPostableEvt` interface:

```typescript
import { Evt, NonPostableEvt } from "evt";

const evtText= new Evt<string>();

//Api to expose.
export const api:{ evtText: NonPostableEvt<string>; } = { evtText };

//evtText exposed by the api cannot be posted…
api.evtText.post //<=== TS error 
api.evtText.postOnceMatched //<===== TS error

//…but we can post internally.
evtText.post("good");
```

[**Run the example**](https://stackblitz.com/edit/evt-xc2eqj?embed=1&file=index.ts&hideExplorer=1)

## **ToPostableEvt&lt;E&gt;**

Invert of `ToNonPostableEvt`

```typescript
import { 
    ToPostableEvt, 
    NonPostableEvt, 
    StatefulReadonlyEvt
} from "evt";

ToPostableEvt<NonPostableEvt<T>>         → Evt<T>
ToPostableEvt<StatefulReadonlyEvt<T>>    → StatefulEvt<T>
ToPostable<NonPostable<void>>            → VoidEvt
ToPostable<Evt<T>>                       → Evt<T>

ToPostableEvt<{ 
    evtText: NonPostableEvt<string>; 
    evtCount: StatefulReadonlyEvt<number>; 
    type: "FOO" 
}> 
 → 
{ 
    evtText: Evt<string>; 
    evtCount: StatefulEvt<number>; 
    type: "FOO"
}
```

## UnpackEvt&lt;E&gt;

Extract the type argument of an Evt 

```typescript
import { UnpackEvt } from "evt";

UnpackEvt<Evt<number>>            → number
UnpackEvt<StatefulEvt<number>>    → number
UnpackEvt<NonpostableEvt<number>> → number

UnpackEvt<{ 
    evtText: Evt<string>; 
    evtCount: StatefulEvt<number>; 
    type: "FOO" 
}> 
 → 
{ 
    evtText: string; 
    evtCount: number; 
    type: "FOO"
}
```

#### Example:

UnpackEvt is a helper type to infer the type argument of an Evt instance.

```typescript
import { Evt, UnpackEvt } from "evt";

const evtHuman = new Evt<{
    name: string;
    age: number;
    gender: "MALE" | "FEMALE"
}>();


type Human = UnpackEvt<typeof evtHuman>;

const human: Human = {
    "name": "bob",
    "age": 89,
    "gender": "MALE"
};

evtHuman.post(human);
```

[**Run the example**](https://stackblitz.com/edit/evt-ykjacd?embed=1&file=index.ts&hideExplorer=1)

## SwapEvtType&lt;E, T&gt;

```typescript
import { SwapEvtType } from "evt";

SwapEvtType<Evt<string>, number>          → Evt<number>
SwapEvtType<SatefulEvt<string>, number>   → SatefulEvt<number>
SwapEvtType<Evt<number>, void>            → VoidEvt
SwapEvtType<StatefulEvt<number>, void>    → VoidEvt
```

## FactorizeEvt&lt;E&gt;

```typescript
import { FactorizeEvt } from "evt";

FactorizeEvt<Evt<string> | Evt<number>>     → Evt<string | number>
//...Work as well with StatefulEvt, NonPostable ect
```



