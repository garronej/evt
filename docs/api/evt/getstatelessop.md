# evt.getStatelessOp\(op\)

{% hint style="warning" %}
This is an advanced feature, it you are new to EVT you can skip this for now.
{% endhint %}

It is not always possible to manually invoke an operator attached to an Handler that you got using `evt.getHandlers()`. Indeed if the operator is stateful you can't provide the `prev` value. This function gives access to this state.

Because it is such an advanced feature we just provide an example as documentation:

```typescript
//invokeOperator allow calling any type of stateless operator and 
//get a return as if the operator was a fλ
import { Evt, invokeOperator } from “evt”;


{

    const evtPoint = new Evt<number>();

    evtPoint.$attach(
        [(point, sum) => [point + sum], 0],
        sum => console.log(`sum: ${sum}`)
    );

    evtPoint.post(2); // Prints "sum: 2"

    console.log(
        invokeOperator(
            evtPoint.getStatelessOp(
                evtPoint.getHandlers()[0].op
            ),
            2
        )
    ); // Prints "[ 4 ]" ( 2 + 2 )

    evtPoint.post(3); // Prints "sum: 5" ( the state was not affected )

}

{

    const evtPoint = new Evt<number>();

    evtPoint.attach(
        point => point > 10,
        point => { } 
    );

    console.log(
        invokeOperator(
            evtPoint.getStatelessOp(
                evtPoint.getHandlers()[0].op
            ),
            5
        )
    ); // Prints "null" ( 5 < 10 )

    console.log(
        invokeOperator(
            evtPoint.getStatelessOp(
                evtPoint.getHandlers()[0].op
            ),
            15
        )
    ); // Prints "[ 15 ]" ( 15 > 10 )

}
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-yljxhq?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

