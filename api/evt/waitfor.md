# evt.waitFor(...)

Method that returns a promise that will resolve when the next matched event is posted.

## Without timeout

By default the promise returned by `waitFor` will never reject.

```typescript
import { Evt } from "evt";

const evtText = Evt.create<string>();

setTimeout(()=> evtText.post("Hi!"), 1500);

(async ()=>{

    //waitFor return a promise that will resolve next time 
    //post() is invoked on evtText.
    const text = await evtText.waitFor();

    console.log(text);

})();
```

[**Run the example**](https://stackblitz.com/edit/evt-cazqyr?embed=1\&file=index.ts\&hideExplorer=1)

## With timeout

As with `attach*`, it is possible to set what is the maximum amount of time we are willing to wait for the event before the promise rejects.

```typescript
import { Evt, TimeoutEvtError } from "evt";

const evtText = Evt.create<string>();

(async ()=>{

    try{

        const text = await evtText.waitFor(500);

        console.log(text);

    }catch(error){

        console.assert(error instanceof TimeoutEvtError);
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

[**Run the example**](https://stackblitz.com/edit/evt-wqh856?embed=1\&file=index.ts\&hideExplorer=1)

## Subtilities of `evt.waitFor(...)`&#x20;

```typescript
import { Evt } from "evt";

const evtText = Evt.create<string>();

(async ()=>{

    //const firstLetter = await new Promise(resolve=> evtText.attachOnce(resolve));
    const firstLetter = await evtText.waitFor();
    //const secondLetter = await new Promise(resolve=> evtText.attachOnce(resolve));
    const secondLetter = await evtText.waitFor();


    console.log(`${firstLetter} ${secondLetter}`);

})();

evtText.post("A");
evtText.post("B");

//"A B" is printed to the console.  
// Now, if you comment out the implementation using .attachOnce you'll see that
// the second letter is lost, we never reach the console.log
```

[Playground](https://stackblitz.com/edit/evt-playground-34zdzv?file=index.ts)
