---
description: >-
  If you need to transition from EventEmitter to Evt without too much
  refactorying.
---

# 🔩 Migrating from EventEmitter

### All events in a single bus

In EventEmitter you had a single instance for many event types. In EVT on the other hand the recommended approach is to have an EVT for every event type. &#x20;

That say it's possible to use EVT just like EventEmitter. &#x20;

```diff
-import { EventEmitter } from "events";
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

-eeBus.detach();
+evtBus.detach();

-eeBus.detach("disconnect");
+evtText.getHandlers()
+    .filter(handler => handler.op === to("disconnect"))
+    .forEach(({ detach })=> detach())
+    ;

const callback = ()=> { /* ... */ };

-eeBus.on("connect", callback);
+evtText.getHandlers()
+    .filter(handler => handler.callback === callback)
+    .forEach(({detach})=> detach())
+    ;

 
```



### Extending Evt

It is common practice to create classes that extends `EventEmitter` .&#x20;

As a general rule of thumb, we tend to avoid inheritance in favor of other patterns but if you want to do it there is how.

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

Now we encourage favoring composition over inheritance and having one EVT instance for each events type.&#x20;

{% hint style="info" %}
In the following example MySocket exposes evtConnect, evtDisconnect and evtError as NonPostableEvt. &#x20;

This is to ensure that the user of the socket do no do something like `socket.evtConnect.post()` as it shouldn't be allowed. Those evt should be listenable from the outside but only post from the inside.
{% endhint %}

```typescript
import { Evt } from "evt";
import type { NonPostableEvt } from "evt";

class MySocket {

    public readonly address: string;
    
    /*
    We use NonPostableEvt instead of Evt so we make clear that
    the connect disconnect and error events are not supposed to
    be posted from outside the class implementation.
    */

    public readonly evtConnect: NonPostableEvt<void> = new Evt();
    
    //Equivalent of the line above but it prevent you from having to import the ToNonPostable helper type
    public readonly evtDisconnect = Evt.asNonPostable(
        Evt.create<{ 
            cause: "local" | "remote" 
        }>()
    ); 
    
    public readonly evtError= Evt.asNonPostable(
        Evt.create<Error>()
    );

    constructor(
        params: { 
            address: string; 
        }
    ) {

        const { address } = params;

        this.address = address;


        setTimeout(
            () => Evt.asPostable(this.evtConnect).post(),
            300
        );

        setTimeout(
            () => Evt.asPostable(this.evtDisconnect).post({ "cause": "local" }),
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
