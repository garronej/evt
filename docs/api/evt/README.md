---
description: >-
  Evt<T> is the Class that is the equivalent of EventEmitter in "events" and
  Subject<T> in "rxjs"
---

# Evt&lt;T&gt; \(class\)

The Evt&lt;T&gt; class implements the NonpostableEvt&lt;T&gt; and the Postable&lt;T&gt; interfaces.

#### Note the existance of `VoidEvt`

When you create an Evt with a void argument, TypeScript forces you to pass `undefined` to `post()`.  
Instead use `VoidEvt`

```typescript
import { VoidEvt } from "evt";

const evtSocketConnect = new VoidEvt();

evtSocketConnect.attach(() => console.log("SOCKET CONNECTED"));

evtSocketConnect.post();
//"SOCKET CONNECTED" have been printed on the console.
```

[**Run the example**](https://stackblitz.com/edit/evt-bcu8ba?embed=1&file=index.ts&hideExplorer=1)

