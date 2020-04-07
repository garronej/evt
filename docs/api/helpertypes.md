# Helper types

## ToNonPostableEvt&lt;E&gt;

{% hint style="info" %}
NonPostableEvt&lt;T&gt; and StatefulNonPostableEvt&lt;T&gt; are interfaces implemented respectively by the classes `Evt<T>` and `StatefulEvt<T>`. They contains all the methods but the ones used to post events, namely: `.post()` and`.postOnceHandled()`
{% endhint %}

```typescript
import { ToNonPostableEvt } from "evt";

ToNonPostableEvt<Evt<T>>         → NonPostableEvt<T>
ToNonPostableEvt<SatefulEvt<T>>  → StatefulNonpostableEvt<T>
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

const evt= new Evt<{ p1: string; p2: number; }>();
const evtReadonly: ToNonPostable<typeof evt> = evt;
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

## SwapEvtType&lt;E, T&gt;

```typescript
SwapEvtType<Evt<string>, number>          → Evt<number>
SwapEvtType<SatefulEvt<string>, number>   → SatefulEvt<number>
```



