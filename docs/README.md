# Why EVT ?

![](https://img.shields.io/bundlephobia/min/ts-evt) ![](https://img.shields.io/bundlephobia/minzip/ts-evt) ![](https://img.shields.io/david/garronej/ts-evt) ![](https://img.shields.io/npm/l/ts-evt)

`'evt'` is intended to be a replacement for Node's `'events'` and  a lighter alternative to `'rxjs'`.  
It enable and encourage **functional programming** and makes heavy use of **typescript**'s type inference features to provide **type safety** while keeping things **concise and elegant** 🍸.

It's main target is [**Deno**](https://github.com/denoland/deno)**\***  but is cross compatible with **Node** and will run just about anywhere from **React Native** to the **web browser** of your grama.

\*The deno package hasn't been published yet but it will be verry soon.

**Browserify friendly:**

* No polyfills needed ✅  
* Transpiled down to ES3 ✅  
* Light-weight, no third party dependencies ✅   

Can be imported in TypeScript projects using version &gt;= **2.8** \(Mar 2018\) and in any plain JS project.

## Motivation

There is a lot of things that can't easily be done with `EventEmitter`:

* Enforcing type safety. 
* Removing a particular listener when the callback is an anonymous function.
* Adding a one-time listener for the next event that meet a condition.
* Waiting \(via a Promise\) for one thing or another to happen.

  _Example: waiting at most one second for the next message, stop waiting if the socket disconnects._

RxJS have it's issues as well:

* When chaining operators the type is often lost along the way as TypeScript struggle to keep track of the mutation / filtering being applied to the event flow.
* Introduce _\(too\)_ many abstractions/operators, combining them right can be challenging, even for seemingly straights forward control flows.

EVT is an attempt to solve all this issues while trying to remain as accesible as`EventEmitter`.

Let's jump right in by considering [side by side examples comparing EVT with it's peers](https://docs.ts-evt.dev/overview).

![](https://ts-evt.dev/assets/img/gun-vs-sword.gif)

