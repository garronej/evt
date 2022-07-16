---
description: A way to avoid having to create a ctx variable.
---

# Evt.getCtx(object)

`Evt.getCtx(obj)` return an instance of `Ctx<void>`, always the same instance for a given object. Iternally it's a `WeakMap<any, Ctx>`.

No strong reference to the object is created when the object is no longer referenced it's associated Ctx will be freed from memory.
