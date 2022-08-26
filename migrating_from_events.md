---
description: >-
  If you need to transition from EventEmitter to Evt without too much
  refactorying.
---

# 🔩 From EventEmitter to Evt

### All events in a single bus

In EventEmitter you had a single instance for many event types. In EVT, on the other hand, the recommended approach is to have an EVT for every event type.

That said, it's possible to use EVT just like EventEmitter.

```diff
-const EventEmitter = require("events");
+import { Evt, to } from "evt";

-const eeBus = new EventEmitter();
+const evtBus = new Evt<
+    | ["connect", void]
+    | ["disconnect", { cause: "remote" | "local" } ]
+    | ["error", Error]
+>();

-eeBus.on("disconnect", ({ cause })=> /* ... */);
+evtBus.attach(to("disconnect", ({ cause })=> /* ... */);

-eeBus.emit("disconnect", { cause: "remote" });
+evtBus.post([ "disconnect", { cause: "remote" }):

-eeBus.once("error", error => /* ... */);
+evtBus.attachOnce(to("error"), error => /* ... */);

-eeBus.removeAllListeners();
+evtBus.detach();

-const count = eeBus.listenerCount("disconnect");
+const count = evtBus.getHandlers()
+    .filter(handler => handler.op === to("disconnect"))
+    .length;

-eeBus.removeAllListeners("disconnect");
+evtText.getHandlers()
+    .filter(handler => handler.op === to("disconnect"))
+    .forEach(({ detach })=> detach());

const callback = ()=> { /* ... */ };

-eeBus.removeListener("connect", callback);
+evtText.getHandlers()
+    .filter(handler => handler.callback === callback)
+    .forEach(({detach})=> detach());

```

In EVT you can use `Ctx` to detach many handlers at once. It's much more convenient than using the callback ref.

```typescript
const ctx = Evt.newCtx();  

evtText.attach(to("connect"), ctx, ()=> { /* ... */ });
evtText.attach(to("disconnect"), ctx, error => { /* ... */ });

// Detach all handlers that have been attached using the ctx.
ctx.done();
```

### Extending/composing Evt

#### Inheritence (not recommended)

It is common practice to create classes that extends `EventEmitter` .&#x20;

As a general rule of thumb, we tend to avoid inheritance in favor of composition but if you want to do it there is how.

```typescript
import { Evt, to } from "evt";

class MySocket extends Evt<
    | ["connect", void]
    | ["disconnect", { cause: "remote" | "local" } ]
    | ["error", Error]
> {

    public readonly address: string;

    constructor(
        params: { 
            address: string; 
        }
    ) {

        super();

        const { address } = params;

        this.address = address;

        setTimeout(
            () => this.post(["connect", undefined]),
            300
        );

        setTimeout(
            () => this.post(["disconnect", { "cause": "local" }]),
            2000
        );

    }

}



const socket = new MySocket({ 
    "address": "wss://example.com"
});

(async ()=> {

  await socket.waitFor(to("connect"));

  console.log("Socket connected");

})();

socket.$attach(to("error"), error => { throw error });

socket.$attach(
    data=> data[0] === "disconnect" ? [ data[1] ] : null, //Just so you know this is what the to() operator do
    ({ cause })=> console.log(`socket disconnect (${cause})`)
);
```

****[**Run the browser**](https://stackblitz.com/edit/evt-inheritence-pdzywu?file=index.ts)****

#### Composition ( recommended approach )

Now we encourage favoring composition over inheritance and having one EVT instance for each events type. &#x20;

```typescript
import { Evt } from "evt";

class MySocket {

    public readonly address: string;
    
    /*
    We expose a NonPostableEvt copy of the Evt and not the Evt itself so we make 
    sure that the connect, disconnect and error events are not posted by the 
    user of the class and only internally.
    */
    #evtConnect = Evt.create();
    readonly evtConnect = Evt.asNonPostable(this.#evtConnect.pipe());
    
    #evtDisconnect = Evt.create<{ cause: "local" | "remote" }>();
    readonly evtDisconnect = Evt.asNonPostable(this.#evtDisconnect.pipe());
    
    #evtError = Evt.create<Error>();
    readonly evtError = Evt.asNonPostable(this.#evtError);

    constructor(
        params: { 
            address: string; 
        }
    ) {

        const { address } = params;

        this.address = address;


        setTimeout(
            () => this.#evtConnect.post(),
            300
        );

        setTimeout(
            () => this.#evtDisconnect.post({ "cause": "local" }),
            2000
        );

    }

}

const socket = new MySocket({ 
    "address": "wss://example.com"
});

(async ()=> {

  await socket.evtConnect.waitFor();

  console.log("socket connected [bis]");

})();

socket.evtError.attach(error => { throw error });

socket.evtDisconnect.attach(
    ({ cause }) => console.log(`socket disconnect (${cause})`)
);
```

[**Run in the browser**](https://stackblitz.com/edit/evt-inheritence-mnhwcs?file=index.ts)****
