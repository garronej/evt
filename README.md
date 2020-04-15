
<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/76674598-91ebfc00-65b1-11ea-88df-eb43f04f3cce.png">  
</p>
<p align="center">
    💧<i>A type safe replacement for Node's EventEmitter</i>💧
    <br>
    <br>
    <img src="https://img.shields.io/bundlephobia/minzip/evt">
    <img src="https://img.shields.io/npm/dw/evt">
    <img src="https://img.shields.io/github/commit-activity/w/garronej/evt">
    <img src="https://img.shields.io/npm/l/evt">
</p>
<p align="center">
  <a href="https://www.evt.land">Home</a>
  -
  <a href="https://docs.evt.land/api">Documentation</a>
  -
  <a href="https://gitter.im/evtland/">Chat</a>
</p>

---

`'evt'` is intended to be a replacement for `'events'`.  
It enables and encourages **functional programming** and makes heavy use of **typescript**'s type inference features to provide **type safety** while keeping things **concise and elegant** 🍸.

<b>Suitable for any JS runtime env (deno, node, old browser, react-native ...)</b>
- ✅ It is both a [Deno](https://deno.land/x/evt) and an [NPM](https://www.npmjs.com/evt) module. 
- ✅ Lightweight, no dependency.
- ✅ No polyfills needed, the NPM module is transpile down to ES3   

Can be imported in TypeScript projects using version &gt;= **3.4** \(Mar 2019\) and in any plain JS projects.

# Install / Import

## In Deno:
```typescript
import { Evt } from "https://deno.land/x/evt/mod.ts";
```
## Anywhere else:
```bash
> npm install --save evt
```
```typescript
import { Evt } from "evt"; 
```

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

* Enforcing **type safety**.
* Removing a particular listener ( if the callback is an anonymous function ).
* Adding a one-time listener for the next event that meets a condition.
* Waiting \(via a Promise\) for one thing or another to happen.  
_Example: waiting at most one second for the next message, stop waiting if the socket disconnects._

Concerning RxJS:

* It introduces a lot of abstractions. It's a big jump from ``EventEmitter``.
* It is often needed to resort to custom [type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards), the filter operator [breaks the type inference.](https://stackblitz.com/edit/evt-795plc?embed=1&file=index.ts&hideExplorer=1)
* Tend to be quite verbose.
* It could be months before it eventually supports Deno.

EVT is an attempt to address all these points while trying to remain as accessible as `EventEmitter`.  
  
</br>

<p align="center">
    <b><a href="https://docs.evt.land/overview#rxjs-comparison">Get started</a></b>
</p>

