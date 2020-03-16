# Handler&lt;T, U&gt; \(type\)

Every time [`attach*`](https://docs.ts-evt.dev/api/evt/evt.attach), [`waitFor`](https://docs.evt.land/api/evt/waitfor) or [`pipe`](https://docs.evt.land/api/evt/pipe) is invoked a new [`Handler<T, U>`](https://docs.evt.land/api/handler) is attached to the [`Evt<T>`](https://docs.evt.land/api/evt).

Handlers can be listed using the [`evt.getHandler()`](https://docs.evt.land/api/evt/evt.gethandler) method.

```typescript
type Handler<T,U> = {

    //Method for detaching the handler from the Evt, returns false if 
    //if invoked when the handler is no longer attached.
    detach(): boolean;

    //The promise returned by the attach*() and waitFor() method.
    promise: Promise<U>;


    /* Properties that depends on the method used to attach the handler */

    //true if the handler was attached using a method containing "prepend"
    //in it's name. Example: evt.$attachOncePrepend(...)
    prepend: boolean;

    //... if the method contained "extract"
    extract: boolean;

    //... if the method contained "once"
    once: boolean;

    //if the method was waitFor()
    async: boolean;



    /* Properties passed as argument to the method used to attach the handler */

    //Default: ()=> true, a filter that matches all events.
    op: Operator<T,U>; 

    //Default: undefined
    ctx?: Ctx; 

    //Default: undefined.
    timeout?: number;

    //Undefined only when the handler was attached using evt.waitFor()
    callback?: (transformedData: U)=> void;

};
```

## Glossary relative to handers:

* An event is said to be **matched** by a handler if posting it causes the callback to be invoked. In practice this is the case when the handler's operator returns true or \[ value, \].
* An event is said to be **handled** by a handler if the event data is matched or if posting it causes the handler and/or other potential handlers to be detached. In practice this is the case when the handler's operator returns `"DETACH"` or `{DETACH: Ctx}.` It is possible to test if a given event data is handled by at least one of the handlers attached to an Evt&lt;T&gt; by using the [`evt.isHandled(data)`](https://docs.ts-evt.dev/api/evt/evt.ishandled) method.

