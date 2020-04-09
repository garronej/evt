# Evt.loosenType\(evt\)

{% hint style="info" %}
This is the identity function with special type annotations.
{% endhint %}

Swipe the type argument with a superset without giving up type safety.

If `A` is assignable to `B` ⇒ `Evt<A>` is assignable to `Evt<B>`

e.g:`Evt<1|2|3>` is assignable to `Evt<number>` however typescript wont let you do this assignation. This is where `Evt.loosenType` come in handy. 

```typescript
import { Evt } from "evt";

declare const evFooBar: Evt<"FOO" | "BAR">; 
declare function myFunc(evtText: Evt<string>): void;

myFunc(evtFooBar); //Gives a type error; 
myFunc(Evt.loosenType(evtFooBar)); //OK
```

