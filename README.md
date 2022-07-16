<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/76674598-91ebfc00-65b1-11ea-88df-eb43f04f3cce.png">
</p>
<p align="center">
    💧<i>EventEmitter's typesafe replacement</i>💧
    <br>
    <br>
    <a href="https://github.com/garronej/evt/actions">
      <img src="https://github.com/garronej/evt/workflows/ci/badge.svg?branch=develop">
    </a>
    <a href="https://deno.land/x/evt">
        <img src="https://img.shields.io/badge/deno-module-informational?logo=deno">
    </a>
    <a href="https://bundlephobia.com/package/evt">
      <img src="https://img.shields.io/bundlephobia/minzip/evt">
    </a>
    <a href="https://www.npmjs.com/package/evt">
      <img src="https://img.shields.io/npm/dm/evt">
    </a>
    <a href="https://github.com/garronej/evt/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/evt">
    </a>
</p>

</p>
<p align="center">
  <a href="https://www.evt.land">Home</a>
  -
  <a href="https://docs.evt.land">Documentation</a>
</p>

---

`'evt'` is intended to be a replacement for `'events'`.  
It enables and encourages **functional programming** and makes heavy use of **typescript**'s type inference features to provide **type safety** while keeping things **concise and elegant** 🍸.

<b>Suitable for any JS runtime env (deno, node, old browsers, react-native ...)</b>
- ✅ It is both a [Deno](https://deno.land/x/evt) and an [NPM](https://www.npmjs.com/evt) module. ( Achieved with [Denoify](https://github.com/garronej/denoify) ) 
- ✅ Lightweight, no dependency.
- ✅ Can be imported with `require` (CJS) or `import` (ESM).
- ✅ [React Hooks integration](https://stackblitz.com/edit/evt-react-hooks-todo-list?file=index.tsx)

Can be imported in TypeScript projects using version &gt;= **3.4** \(Mar 2019\) and in any plain JS projects.

# Who is using it

<p align="center">
    <a href="https://connext.network">
        <img src="https://user-images.githubusercontent.com/6702424/84102640-4e1e5c80-aa11-11ea-9d13-df0a65c8cdaf.png">
    </a>
    <a href="https://www.semasim.com">
        <img src="https://user-images.githubusercontent.com/6702424/84102785-aead9980-aa11-11ea-915b-5c4a5282c44e.png"> 
    </a>
    <br>
    <a href="https://thegraph.com">
        <img src="https://user-images.githubusercontent.com/6702424/179356567-19e2ca0a-9797-4c82-8a45-7e1d0de896a9.png"> 
    </a>
    <a href="https://insee.fr">
        <img src="https://user-images.githubusercontent.com/6702424/117936881-a9358f00-b305-11eb-84b9-e61593632bdd.png"> 
    </a>
    <a href="https://www.etalab.gouv.fr/">
        <img src="https://user-images.githubusercontent.com/6702424/179345089-3aee6170-e7aa-4b38-adf1-f7d132aa7be4.png"> 
    </a>
</p>

# Install / Import

## In Deno:
```typescript
import { Evt } from "https://deno.land/x/evt/mod.ts";
```
## Anywhere else:
```bash
$ npm install --save evt
```
```typescript
import { Evt } from "evt"; 
```

# Try it

[Run some examples](https://stackblitz.com/edit/evt-playground?embed=1&file=index.ts&hideExplorer=1)

<p align="center"> 
    <img src="https://www.evt.land/assets/img/try-in-browser.gif">  
</p>

# Motivations

There are a lot of things that can't easily be done with `EventEmitter`:

* Enforcing **type safety**.
* Removing a particular listener ( if the callback is an anonymous function ).
* Adding a one-time listener for the next event that meets a condition.
* Waiting \(via a Promise\) for one thing or another to happen.  
_Example: waiting at most one second for the next message, stop waiting if the socket disconnects._

Why would someone pick EVT over RxJS:  

* EVT's learning curve is not as steep as RxJS's. 
* Generates code that is easier to grasp for people not familiar with reactive programming.

EVT is an attempt to address all these points while trying to remain as accessible as `EventEmitter`.  
  
</br>

[Get started](https://evt.land)

# The sticker

<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/179363007-582acf54-8f83-42ac-a062-562f8de40d14.gif">  
    <a href="https://stackblitz.com/edit/evt-playground-gfnidx?file=index.ts">Playground</a>
</p>

