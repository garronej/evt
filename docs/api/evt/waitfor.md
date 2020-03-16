# evt.waitFor\(...\)

Method that returns a promise that will resolve when the next matched event is posted.

waitFor is essentially evt.attachOnce\(...\) but you don’t provide a callback. It accepts the same arguments and return the same promise.

_Essentialy_ the same but [not exactly the same](https://docs.ts-evt.dev/api/evt/evt.waitfor-...#difference-between-evt-waitfor-and-evt-attachonce), there is a key difference between a handler attached via `waitFor` and a handler attached with `attach*` as explained below.

## Without timeout

By default the promise returned by `waitFor` will never reject.

```typescript
import { Evt } from "evt";

const evtText = new Evt<string>();

setTimeout(()=> evtText.post("Hi!"), 1500);

(async ()=>{

    //waitFor return a promise that will resolve next time 
    //post() is invoked on evtText.
    const text = await evtText.waitFor();

    console.log(text);

})();
```

[**Run the example**](https://stackblitz.com/edit/evt-cazqyr?embed=1&file=index.ts&hideExplorer=1)

## With timeout

As with `attach*`, it is possible to set what is the maximum amount of time we are willing to wait for the event before the promise rejects.

```typescript
import { Evt, EvtError } from "evt";

const evtText = new Evt<string>();

(async ()=>{

    try{

        const text = await evtText.waitFor(500);

        console.log(text);

    }catch(error){

        console.assert(error instanceof EvtError.Timeout);
        //Error can be of two type:
        //  -EvtError.Timeout if the timeout delay was reached.
        //  -EvtError.Detached if the handler was detached before 
        //  the promise returned by waitFor have resolved. 

        console.log("TIMEOUT!");

    }

})();

//A random integer between 0 and 1000
const timeout= ~~(Math.random() * 1000);

//There is a fifty-fifty chance "Hi!" is printed else it will be "TIMEOUT!".
setTimeout(
    ()=> evtText.post("Hi!"), 
    timeout
);
```

[**Run the example**](https://stackblitz.com/edit/evt-wqh856?embed=1&file=index.ts&hideExplorer=1)

## Difference between `evt.waitFor(...)` and `evt.attachOnce(...)`

`const pr= evt.waitFor()` is **NOT** equivalent to const `pr= evt.attachOnce(()=>{})`

`evt.waitFor()` is designed in a way that makes it safe to use `async` procedures.

Basically it means that the following example prints `A B` on the console instead of waiting forever for the secondLetter.

```typescript
import { Evt } from "evt";

const evtText = new Evt<string>();

(async ()=>{

    const firstLetter = await evtText.waitFor();
    const secondLetter = await evtText.waitFor();

    console.log(`${firstLetter} ${secondLetter}`);

})();

evtText.post("A");
evtText.post("B");

//"A B" is printed to the console.
```

Run this [**more practical example**](https://stackblitz.com/edit/evt-v4q4s2?embed=1&file=index.ts&hideExplorer=1) if you want to understand how this behavior prevent from some hard to figure out bugs.

