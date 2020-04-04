# Why EVT ?

![](https://img.shields.io/bundlephobia/min/ts-evt) ![](https://img.shields.io/bundlephobia/minzip/ts-evt) ![](https://img.shields.io/david/garronej/ts-evt) ![](https://img.shields.io/npm/l/ts-evt)

`'evt'` is intended to be a replacement for Node's `'events'`.  
It enable and encourage **functional programming** and makes heavy use of **typescript**'s type inference features to provide **type safety** while keeping things **concise and elegant** 🍸.

Its main target is [**Deno**](https://github.com/denoland/deno)**\*** but it is cross compatible with **Node** and will run just about anywhere from **React Native** to the **web browser** of your grama.

_\*The deno package hasn't been published yet but it will be soon._

**Browserify friendly:**

* No polyfills needed ✅  
* Transpiled down to ES5 ✅  
* Light-weight, no dependencies ✅   

Can be imported in TypeScript projects using version &gt;= **3.4** \(Mar 2019\) and in any plain JS projects.

## Motivation

There are a lot of things that can't easily be done with `EventEmitter`:

* Enforcing type safety. 
* Removing a particular listener when the callback is an anonymous function.
* Adding a one-time listener for the next event that meets a condition.
* Waiting \(via a Promise\) for one thing or another to happen.

  _Example: waiting at most one second for the next message, stop waiting if the socket disconnects._

Concerning RxJS:

* It introduce lot of abstractions. It is a big jump from `EventEmitter`.
* [The filter operator breaks the type inference](https://stackblitz.com/edit/evt-795plc?embed=1&file=index.ts&hideExplorer=1).

EVT is an attempt to sove these issues while trying to remain as accessible as `EventEmitter`.

