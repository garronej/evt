# Handler&lt;T, U&gt; \(type\)

Every time [`attach*`](https://docs.ts-evt.dev/api/evt/evt.attach), `waitFor` or `pipe` is invoked a new `Handler<T, U>` is attached to the `Evt<T>`.

The list of the handler can be accesed using the evt.getHandler\(\) method. 

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
    
    //Default: Instance of Evt<T> the handler is attached to.
    boundTo: Bindable; 
    
    //Default: Undefined.
    timeout?: number;
    
    //Undefined only when the handler was attached using evt.waitFor()
    callback?: (transformedData: U)=> void;
    
};
```

#### Glossary relative to handers: 

* An event is said to be **matched** by an handler if posting the event will cause the callback to be invoked. In practice this is the case whe the handler's operator returns true or \[ value, \].
* An event is said to be **handled** by an handler if the if the event data is matched or if posting it will cause the handler and/or potential others handler to be detached. In practice this is the case when the handler's operator returns `"DETACH"` or `{DETACH: Ctx}.` It is possible to test if a given evend data is mated by at least one of the handler attached to an Evt&lt;T&gt; by using the [`evt.isHandled(data)`](https://docs.ts-evt.dev/api/evt/evt.ishandled) method.

