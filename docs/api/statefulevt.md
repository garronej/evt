# StatefulEvt&lt;T&gt;

A `StatefulEvt` is an Evt stat keep a reference to the last value posted. 

You can think of it as way to observe when a value is changed.

## `.state`

Property type: `T`

reading the property gives the last event data posted. Setting the property \(`evt.state = data`\) is equivalent of calling invoking  `.post(data)`.

```typescript
import { Evt } from "evt";

const evtCount = Evt.create(0); // Equivalent wit new StatefulEvt<number>(0)

evtCount.attach(console.log);

console.log(evtCount.state); //Pints "state: 0"

evtIsConnected.post(1); //Pints "1" 

console.log(evtCount.state); //Prints "1";

evtCount.state++; //Prints "2"

console.log(evtCount.state); //Pints "2";
```

## `.evtChange`

Property type: `ReadonlyStatefulEvt<T>`

The `.evtChange` property is an `Evt` that post only when the `.state` has changed. \( or when post is made via `.postForceChange()` \)

```typescript
import { Evt } from "evt";

const evtIsConnected = Evt.create(false);

evtIsConnected.attach(console.log);

evtIsConnected.state = false; //Prints nothing .state was already false.
evtIsConnected.state = true; //Prints "true";
```

## `.evtDiff`

Property type: `NonPostableEvt<{prevState:T; newState: T}>`

Posted every time the Evt is posted. Used to compare the previous state with the new state.

```typescript
import { Evt } from "evt";

const evtColor = Evt.create<"BLUE"|"RED"|"WHITE">("BLUE");
evtColor.evtDiff.attach(
    ({ prevState, newState})=> console.log(`${prevState}=>${newState}`)
);

evtColor.state= "BLUE"; //Prints "BLUE=>BLUE"
evtColor.state= "WHITE"; //Prints "BLUE=>WHITE"
```

## `.evtChangeDiff`

Property type: `NonPostableEvt<{prevState:T; newState: T}>`

Same than .evtDiff but post only when .evtChang post.

```typescript
import { Evt } from "evt";

const evtColor = Evt.create<"BLUE"|"RED"|"WHITE">("BLUE");
evtColor.evtChangeDiff.attach(
    ({ prevState, newState})=> console.log(`${prevState}=>${newState}`)
);

evtColor.state= "BLUE"; //Prints nothing
evtColor.state= "WHITE"; //Prints "BLUE=>WHITE"
```

## `.pipe(...)`

Same as [`evt.pipe(...)`](https://docs.evt.land/api/evt/pipe) but return a `StatefulEvt`. Be aware that the current state of the `StatefulEvt` must be matched by the operator \( if any \) when invoking `.pipe()`, elst an exception will be thrown.

```typescript
import { Evt } from "evt";

type Circle = { 
    color: "WHITE" | "RED";
    radius: number;
};

const evtSelectedCircle = Evt.create<Circle>({ "color": "RED", "radius": 3 });

const evtSelectedCricleColor = 
    evtSelectedCircle.pipe(circle=> [ cicle.color ]);

evtSelectedCircleColor.attach(console.log);
```

## Converting an `Evt` into a `StatefulEvt`

Use the method method .toStateful\(initialState\) of Evt. Example:

```typescript
import { Evt } from "evt";


const evtClickCount= Evt.from(document,"click")
    .pipe([(...[,count])=>[count+1],0])
    .toStateful(0);
    
//...user click 3 times on the page

console.log(evtClickCount.state); //Prints "3"
```

## Merging multiple `StatefulEvt`s

```typescript
import { Evt } from "evt";

const evtIsBlue= Evt.create(false);
const evtIsBig= Evt.create(false);

const evtIsBigAndBlue = Evt.merge([
    evtIsBlue.evtChange,
    evtIsBig.evtChange
])
    .toStateful()
    .pipe(()=> [ evtIsBlue.state && evtIsBig.state ])
    ;
    
console.log(evtIsBigAndBlue.state); // Prints "false"

evtIsBlue.state= true;

console.log(evtIsBigAndBlue.state); // Prints "false"

evtIsBig.state= true;

console.log(evtIsBigAndBlue.state); // Prints "true"
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-22pavm?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

## Make a `StatefulEvt` readonly

To prevent a StatefulEvt to be posted by parts of the code that is not supposed to StatefulEvt can be exposed as `StatefulReadonlyEvt`.

```typescript
import { StatefulEvt, StatefulReadonlyEvt } from "evt";

//Return an event that post every second.
function generateEvtTick(delay: number): StatefulReadonlyEvt<number> {
    
    const evtTick= new StatefulEvt(0);
    
    setInterval(()=> evtTick.state++, delay);
    
    retrun evtTick;
    
}

const evtTick= generateTick(1000);


evtTick.state++; // TS ERROR
evtTick.post(2); // TS ERROR
```

## `.postFoceChange()`

```typescript
 /** 
  * Post and enforce that .evtChange and .evtChangeDiff 
  * be posted even if the state has not changed.
  * 
  * If no argument is passed the post is performed with the current state.
  * 
  * Returns post count 
  **/
  postForceChange(wData?: readonly [T]): number;
```

## `.toStateless([ctx])`

Return a stateless copy of the `Evt.`

```typescript
import { Evt } from "evt";

const evtText= Evt.create("foo");

//x is Evt<string>
const x= evtText.toStateless();
```

`evt.toStateless()` is equivalent to `Evt.prototype.pipe.call(evt)` 

