# UnpackEvt&lt;typeof evt&gt; \(type\)

UnpackEvt is a helper type to infer the type argument of an Evt instance.

```typescript
import { Evt, UnpackEvt, NonPostable } from "evt";

const evtHuman = new Evt<{
    name: string;
    age: number;
    gender: "MALE" | "FEMALE"
}>();

{

    type Human = UnpackEvt<typeof evtHuman>;

    const human: Human = {
        "name": "bob",
        "age": 89,
        "gender": "MALE"
    };

    evtHuman.post(human);

}

//It is also possible to extract the type from a NonPostable
{

    const evtHumanExposed: NonPostable<typeof evtHuman> = evtHuman;

    type Human = UnpackEvt<typeof evtHumanExposed>;

    const human: Human = {
        "name": "bob",
        "age": 89,
        "gender": "MALE"
    };

    evtHuman.post(human);

}
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-unpack-type-argument?embed=1&file=index.ts)

