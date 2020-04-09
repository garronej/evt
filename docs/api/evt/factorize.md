# Evt.factorize\(evt\)

{% hint style="info" %}
This is the identity function with special type annotations. 
{% endhint %}

If you have an event that post `A` or an `Evt` that post `B` you have an event that post `A or B`.

In other words `Evt<A> | Evt<B>` is assignable to `Evt<A | B >`

```typescript
import { Evt, VoidEvt } from "evt";

declare evt: Evt<string> | Evt<number> | VoidEvt = Evt.create<any>();

evt.attach(data=> { }); // TS ERROR

Evt.factorize(evt) // OK return Evt<string | number | Void>
    .attach(data=> {
    
        //To test if data is Void
        if( Evt.isVoid(data) ){
            return;
        }
        
        //Here data is string or number.
    
    })
    ;
```

See also `FactorizeEvt<E>`, helper type that this method levrage.

