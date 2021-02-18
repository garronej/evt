# Extending Evt

It is common practice to create classes that extends `EventEmitter` . 

As a general rule of thumb, we tend to avoid inheritance in favor of other patterns but if you want to do it there is how.

```typescript
import { Evt, to } from "evt";

class MySocket extends Evt<
    ["connect", void] |
    ["disconnect", { cause: "remote" | "local" } ] |
    ["error", Error]
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

\*\*\*\*[**Run the browser**](https://stackblitz.com/edit/evt-inheritence-pdzywu?file=index.ts)\*\*\*\*

Now we encourage favoring composition over inheritance and having one EVT instance for each events type.

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

[**Run in the browser**](https://stackblitz.com/edit/evt-inheritence-mnhwcs?file=index.ts)\*\*\*\*

