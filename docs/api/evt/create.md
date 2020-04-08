# Evt.create\(initalState?\)

Static method to instanciate an `Evt` or a `StatefulEvt`.

```typescript
import { Evt } from "evt";

const evtText = Evt.create<string>(); //Return Evt<string>
const evtIsConnected = Evt.create(false); //Return StatefulEvt<boolean>
```

