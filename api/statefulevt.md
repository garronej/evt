# StatefulEvt\<T>

A `StatefulEvt` is an Evt stat keep a reference to the last value posted.

You can think of it as way to observe when a value is changed.

{% embed url="https://stackblitz.com/edit/evt-playground-wsa3je?file=index.ts" %}

{% hint style="info" %}
`When you attach to a` StatefulEvt `the callback is immediately called with the current value (except with` attachExtract `and` attachOnceExtract`).`
{% endhint %}

## `.state`

Property type: `T`

reading the property gives the last event data posted. Setting the property (`evt.state = data`) is equivalent to calling `.post(data)`.

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

## `.pipe(...)`

Same as [`evt.pipe(...)`](https://docs.evt.land/api/evt/pipe) but return a `StatefulEvt`. Be aware that the current state of the `StatefulEvt` must be matched by the operator ( if any ) when invoking `.pipe()`, elst an exception will be thrown.

```typescript
import { Evt } from "evt";

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

Basic example: &#x20;

```typescript
import { Evt } from "evt";

const evtSrc = Evt.create<string>();

const evtFoo = evtSrc.toStatefull("initial value");

console.log(evtFoo.state === "initial value");

evtStr.post("new value");

console.log(evtFoo.state === "new value");
```

Concrete example:

```typescript
import { Evt } from "evt";

// Evt that post whenever the window is resized window.addEventListener("resize", ...)
const evtResize = Evt.from(window, "resize");

// A statefulle evt with evtInnerWith state which is always the current value of
// window.innerSize.
const evtInnerWidth = evtResize
    .toStatefull() // convert into a statefull evt with initial value set to unefined
    .pipe(()=> [window.innerWidth]);

```

## onlyIfChanged operator

When using stetefull Evt is often usefull to have event posted only when the state value has changed. For that purpose you can pipe with the onlyIfChanged operator. &#x20;

{% embed url="https://stackblitz.com/edit/evt-playground-rgyith?embed=1&file=index.ts" %}

Concrete example: &#x20;

If we take the previous example: &#x20;

```typescript
import { Evt } from "evt";


const evtInnerWidth = Evt.from(window, "resize")
    .toStatefull() 
    .pipe(()=> [window.innerWidth]);
    
evtInnerWith.attach(innerWidth => {

    // This callback will be called whenever the screen is resized 
    // including if only if the height has changed because
    // window.addEventListener("resize", ()=> ... 
    // is the source event emitter.  

});
```

Now if we put the `onlyIfChanged` operator intor the mix: &#x20;

```typescript
import { Evt, onlyIfChanged } from "evt";

const evtInnerWidth = Evt.from(window, "resize")
    .toStatefull() 
    .pipe(()=> [window.innerWidth])
    // By default it compare object structure so { foo: 3 } is considered equal to 
    // an other object that would also be { foo: 3 }
    .pipe(onlyIfChanged());
    
evtInnerWith.attach(innerWidth => {

    // This callback will only be called whenever window.innerWidth
    // actually changes.  

});
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

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-22pavm?embed=1\&file=index.ts\&hideExplorer=1)\*\*\*\*

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

## `.toStateless([ctx])`

Return a stateless copy of the `Evt.`

```typescript
import { Evt } from "evt";

const evtText= Evt.create("foo");

//x is Evt<string>
const x= evtText.toStateless();
```

`evt.toStateless()` is equivalent to `Evt.prototype.pipe.call(evt)`
