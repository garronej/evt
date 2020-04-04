---
description: A way to avoid having to create a ctx variable.
---

# Evt.getCtx\(object\)

`Evt.weakCtx(obj)` always return the same instance of `VoidCtx` for a given object.

No strong reference to the object is created when the object is no longer referenced it's associated Ctx will be freed from memory.



