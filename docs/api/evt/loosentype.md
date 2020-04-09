# Evt.loosenType\(evt\)

{% hint style="info" %}
This is the identity function with special type annotations.
{% endhint %}

Swipe the type argument with a superset without giving up type safety.  Indeed if `A` is assignable to `B` ⇒ `Evt<A>` is assignable to `Evt<B>`; e.g:`Evt<1|2|3>` is assignable to `Evt<number>`It is true but typescript does not realise it.

Consider the example: 

```typescript
import { Evt } from "evt";

declare const evFooBar: Evt<"FOO" | "BAR">; 
declare function myFunc(evtText: Evt<string>): void;

myFunc(evtFooBar); //Gives a type error; 
myFunc(Evt.loosenType(evtFooBar)); //OK
```

