
### `UnpackEvt<typeof evt>`.

UnpackEvt is a helper type to infer the type argument of an Evt instance.

```typescript
import { Evt } from "ts-evt";
import { UnpackEvt, NonPostable } from "ts-evt/dist/lib/helperTypes";

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

Note that if you try unpacking the type of an evt instantiated by a module that use a different version of `ts-evt` that the one you included in the your project the inference will fail.

Note also that the `UnpackEvt<>` is not included in the default export of the module because doing so would restrict `ts-evt` to be used in projects  
using typescript version before 2.8 \( version when the infer keyword was introduced \).

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-unpack-type-argument?embed=1&file=index.ts)