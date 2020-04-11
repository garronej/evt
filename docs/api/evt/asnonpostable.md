# Evt.asNonPostable\(evt\)

{% hint style="info" %}
Evt.asNonPostable\(\) is the identity function with special type annotation
{% endhint %}

Return the passed evt typed as an object that can't be posted.

#### Usecase: 

Take [this example](https://docs.evt.land/api/statefulevt#make-a-statefulevt-readonly).

You could use this function to enforce that the return type by inferred and save you the trouble of having to import the `StatefulReadonlyEvt` interface:

```typescript
import { Evt } from "evt";

//Return an event that post every second.
function generateEvtTick(delay: number) {
    
    const evtTick= Evt.create(0);
    
    setInterval(()=> evtTick.state++, delay);
    
    retrun Evt.asNonPostable(evtTick);
    
}

const evtTick= generateTick(1000);


evtTick.state++; // TS ERROR
evtTick.post(2); // TS ERROR
```

