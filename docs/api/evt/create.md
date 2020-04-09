---
description: Static method to instanciate an Evt or a StatefulEvt.
---

# Evt.create\(initalState?\)

### Usage 

```typescript
import { Evt, VoidEvt, StatefulEvt } from "evt";

Evt.create<string>()     ⇔     new Evt<string>()
Evt.create()             ⇔     /* An object that implement VoidEvt */
Evt.create(false)        ⇔     new StatefulEvt<boolean>(false)
```

### Why `VoidEvt` and not `Evt<void>` ?

When you instantiate an `Evt` with a void argument \( `new Evt<void>()` \), TypeScript forces you to pass `undefined` or `null` to  the post method \( it does not allows to call `evt.post()` \).  
`VoidEvt` \( and respectively `VoidCtx` \) is a workaround for this annoyance.

`VoidEvt` object are instances of `Evt<Void>` that you can post without passing argument.

```typescript
import { Evt } from "evt";

const evtSocketConnect = Evt.create();

evtSocketConnect.attach(() => console.log("SOCKET CONNECTED"));

evtSocketConnect.post();
//"SOCKET CONNECTED" have been printed on the console.
```

