# Why EVT ?

![](https://img.shields.io/bundlephobia/minzip/evt) ![](https://img.shields.io/npm/dw/evt) ![](https://img.shields.io/github/commit-activity/w/garronej/evt) ![](https://img.shields.io/npm/l/evt)

`'evt'` is intended to be a replacement for `'events'`.  
It enables and encourages **functional programming** and makes heavy use of **typescript**'s type inference features to provide **type safety** while keeping things **concise and elegant** 🍸.

**Suitable for any JS runtime env \(deno, node, old browser, react-native ...\)**

* ✅ It is both a [Deno](https://deno.land/x/evt) and an [NPM](https://www.npmjs.com/evt) module. 
* ✅ Lightweight, no dependency.
* ✅ No polyfills needed, the NPM module is transpiled down to ES3   

Can be imported in TypeScript projects using version &gt;= **3.4** \(Mar 2019\) and in any plain JS projects.

## Motivation

There are a lot of things that can't easily be done with `EventEmitter`:

* Enforcing **type safety**.
* Removing a particular listener \( if the callback is an anonymous function \).
* Adding a one-time listener for the next event that meets a condition.
* Waiting \(via a Promise\) for one thing or another to happen.  

  _Example: waiting at most one second for the next message, stop waiting if the socket disconnects._

Concerning RxJS:

* It introduces a lot of abstractions. It's a big jump from `EventEmitter`.
* It is often needed to resort to custom [type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards), the filter operator [breaks the type inference.](https://stackblitz.com/edit/evt-795plc?embed=1&file=index.ts&hideExplorer=1)
* Tend to be quite verbose.
* It could be months before it eventually supports Deno.

EVT is an attempt to address all these points while trying to remain as accessible as `EventEmitter`.

