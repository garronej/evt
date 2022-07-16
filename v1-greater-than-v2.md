---
description: New features and breaking changes
---

# ⬆ v1 -> v2

{% hint style="success" %}
If you are only using the more commun features of `Evt` you can upgrade to v2 without facing any breaking change. &#x20;

Most of the breaking changes are related to [`StatefulEvt`](api/statefulevt.md) and `React` integration.  &#x20;
{% endhint %}

{% hint style="warning" %}
Dropped backward compatibility with typescript 3.4.&#x20;

EVT now requires a version of TypeScript >= 3.8 (February 20th, 2020)
{% endhint %}

* [x] fλ Operators return type is `[U] | null (in v1: [U] | null | "DETACH" | {DETACH: Ctx} |...`&#x20;
* [x] `StatefulEvt`: When attaching the handler should immediately be triggered with the state value. (except with attachExtract, and other \*extract\* methods)
* [x] `StatefulEvt` evt.state= x only triggers evt.post(x) if x !== evt.state
* [x] Support DOM observable like [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) like `Evt.from(ctx, ResizeObserver, htmlElement).attach(...)`
* [x] `Ctx` All handler added with a `.done()` `Ctx` should are immediately detached.
* [x] Get read of `VoidEvt` and `VoidCtx` now that we can just use `Evt<void>` and `Ctx<void>`
* [x] Clean way for performing side effect in operators. [See example](https://stackblitz.com/edit/evt-playground-kisk2h?file=index.ts).
* [x] Easy way to test if an event data is handled by a particular operator `Evt.prototype.isHandledByOp()` (`Evt.prototype.getStatelesOp()` replaced by `Evt.prototype.getInvocableOp()`)
* [x] `evt/hooks/useStatefullEvt` renamed `useRerenderOnStateChange`
* [x] Export `evt/tools/typeSafety` into a separate module `tsafe`
