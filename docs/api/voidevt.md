# VoidEvt \(class\)

When you create an Evt with a void argument, TypeScript forces you to pass `undefined` to `post()`.  
Instead use `VoidEvt`

```typescript
import { VoidEvt } from "ts-evt";

const evtSocketConnect = new VoidEvt();

evtSocketConnect.attach(() => console.log("SOCKET CONNECTED"));

evtSocketConnect.post();
//"SOCKET CONNECTED" have been printed to the console.
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-voidevt?embed=1&file=index.ts)

