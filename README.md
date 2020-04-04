
<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/76674598-91ebfc00-65b1-11ea-88df-eb43f04f3cce.png">  
</p>
<p align="center">
    💧<i>Type safe replacement for Node's EventEmitter</i>💧
    <br>
    <br>
    <img src="https://img.shields.io/bundlephobia/min/evt">
    <img src="https://img.shields.io/bundlephobia/minzip/evt">
    <img src="https://img.shields.io/david/garronej/evt">
    <img src="https://img.shields.io/npm/l/evt">
</p>
<p align="center">
  <a href="https://www.evt.land">Home</a>
  -
  <a href="https://docs.evt.land/api">Documentation</a>
</p>

---

`'evt'` is intended to be a replacement for `'events'`.  
It enable and encourage **functional programming** and makes heavy use of **typescript**'s type inference features to provide **type safety** while keeping things **concise and elegant** 🍸.

**Browserify friendly:**

* No polyfills needed ✅  
* Transpiled down to ES5 ✅  
* Light-weight, no dependencies ✅   

# TL;DR*

```typescript
import { Evt } from "evt";

const evtText = new Evt<string>();
const evtTime = new Evt<number>();

evtText.attach(text => console.log(text));
evtTime.attachOnce(time => console.log(time));

evtText.post("hi!"); //Prints "hi!"
evtTime.post(123);   //Prints "123"
evtTime.post(1234);  //Prints nothing
```
OR
```typescript
import { Evt, to } from "evt";

const evt = new Evt<
    [ "text",  string ] | 
    [ "time",  number ]
>();

evt.$attach(to("text"), text => console.log(text));
evt.$attachOnce(to("time"), time => console.log(time));

evt.post(["text", "hi!"]);
evt.post(["time", 123]);
evt.post(["time", 1234]);
```

_*Those are introductory examples, EVT can do much more than this._

# Try it

<p align="center"> 
    <img src="https://www.evt.land/assets/img/try-in-browser.gif">  
</p>

<p align="center">
<b><a href="https://stackblitz.com/edit/evt-playground?embed=1&file=index.ts&hideExplorer=1">Run some examples</a></b>
</p>

# Motivation

There are a lot of things that can't easily be done with `EventEmitter`:

* Enforcing type safety.
* Removing a particular listener when the callback is an anonymous function.
* Adding a one-time listener for the next event that meets a condition.
* Waiting \(via a Promise\) for one thing or another to happen.  
_Example: waiting at most one second for the next message, stop waiting if the socket disconnects._

Concerning RxJS:

* It introduce lot of abstractions. It is a big jump from ``EventEmitter``.
* [The filter operator breaks the type inference](https://stackblitz.com/edit/evt-795plc?embed=1&file=index.ts&hideExplorer=1).

EVT is an attempt to solve all these issues while trying to remain as accessible as `EventEmitter`.  
  
</br>

<p align="center">
    <b><a href="https://docs.evt.land/overview#rxjs-comparison">Get started</a></b>
</p>
