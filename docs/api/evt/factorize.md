# Evt.factorize\(evt\)

{% hint style="info" %}
This is the identity function with special type annotations. 
{% endhint %}

If you have a variable that is either an `Evt` that post `A` or an `Evt` that post `B` you have an event that post `A or B`.

In other words `Evt<A> | Evt<B>` is assignable to `Evt<A | B >.` This method implement this proerty.

```typescript
import { Evt, VoidEvt, matchVoid } from "evt";

declare evt: Evt<string> | Evt<number> | VoidEvt = Evt.create<any>();

evt.attach(data=> { }); // TS ERROR

Evt.factorize(evt) // OK return Evt<string | number | Void>
    .attach(data=> {
    
        //To test if data is Void
        if( matchVoid(data) ){
            return;
        }
        
        //Here data is string or number.
    
    })
    ;
```

See also [`FactorizeEvt<E>`](https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than), helper type that this method levrage.

