---
description: Cast the passed event as portable.
---

# Evt.asPostable\(evt\)

To invoke post\(\) on a NonPostableEvt or a StatefullReadonlyEvt. 

This is unsafe and is to use only if you know you are allowed to do it:

Usecase:

Without this method this would be the way for a class to expose Evt that are posted internally and exposed to be listened. 

```typescript
import { Evt } from "evt";

class Socket2 {

    private readonly _evtIsConnected= Evt.create(false);
    private readonly _evtMessage= Evt.create<Uint8Array>();

    readonly evtIsConnected= Evt.asNonPostable(this._evtIsConnected);
    readonly evtMessage= Evt.asNonPostable(this._evtMessage);

    /* 
        OR, more explicit but require to repeat the types and to
        import type { StatefulReadonlyEvt, NonPostableEvt } from "evt";

    readonly evtIsConnected: StatefulReadonlyEvt<boolean>= this._evtIsConnected;
    readonly evtMessage: NonPostableEvt<Uint8Array> = this._evtMessage;
    */

    constructor(){

        this._evtIsConnected.state = true;
        this._evtMessage.post(new Uint8Array(111));

    }

}
```

Now it can be frustrating to have to store a private property only to call post on a object that we know is postable. Here is were this method come in handy: 

```typescript
class Socket {

    readonly evtIsConnected= Evt.asNonPostable(Evt.create(false));
    readonly evtMessage= Evt.asNonPostable(Evt.create<Uint8Array>());

    constructor(){

        Evt.asPostable(this.evtIsConnected).state = true;
        Evt.asPostable(this.evtMessage).post(new Uint8Array(111));

    }


}
```

