# Ctx&lt;T&gt; \(class\)

Ctx helps you detach all the Handles that where attached for a certain pupose once the task is done or aborted.



{% hint style="info" %}
Get Ctx instance using `Evt.newCtx<T>()` or `Evt.getCtx(obj)`
{% endhint %}

## `ctx.done(result)`

Detach all Handlers bound to the context from the Evt instances they are attached to then post the done event.

{% hint style="info" %}
When an fλ operator return `{ "DETACH": ctx }`, `ctx.done()` is invoked. cf
{% endhint %}

{% hint style="info" %}
To test if ctx.done\(\) have been invoked already you can use:`ctx.getEvtDone().postCount !== 0`
{% endhint %}

### Returns 

`ReturnType<ctx.getHandlers()>` All the [Handler](https://docs.ts-evt.dev/api/handler)s that where bound to the context. They are now detached, calling `ctx.getHandler()` just after `ctx.done()` returns an empty array.

### Example

```typescript
import { Evt } from "../lib";
import { EventEmitter } from "events";

const ctx= Evt.newCtx();

const evtText = new Evt<string>();
const evtTime = new Evt<number>();

evtText.$attach(
    text=> [ text.length ],
    ctx, 
    count => console.log("1: " + count)
);

evtTime.waitFor(
    time => time < 0,
    ctx,
).then(time=> console.log("2: " +  time));

evtText
    .pipe(ctx)
    .pipe(text => [text.toUpperCase()])
    .attach(upperCaseText=> console.log("3: " + upperCaseText))
    ;

Evt.merge(ctx, [ evtText, evtTime ])
    .attach(textOrTime => console.log("4: " + textOrTime))
    ;

const ee= new EventEmitter();

Evt.from<string>(ctx, ee, "text")
    .attach(text=> console.log("5: " + text))
    ;


evtText.post("foo"); //Prints "1: 3" "3: FOO" "4: foo"
ee.emit("text", "bar"); //Prints "5: bar"

console.log(evtText.getHandlers().length); //Prints "3"
console.log(evtTime.getHandlers().length); //Prints "2"

console.log(ee.listenerCount("text")); //Print "1"

ctx.getEvtDone().attachOnce(
    ([,,handlers])=> {
    
        console.log(
            handlers.filter(({ evt })=> evt === evtText).length +
            " handlers detached from evtText"
        );
        
        console.log(
            handlers.filter(({ evt })=> evt === evtTime).length +
            " handlers detached from evtTime"
        );
        
        console.log(
            handlers.length + " handlers detached total"
        );
        
    }
);

//Prints:
//"3 handlers detached from evtText"
//"2 handlers detached from evtTime"
//"5 handlers detached total"
ctx.done();

console.log(evtText.getHandlers().length); //Prints "0"
console.log(evtTime.getHandlers().length); //Prints "0"
console.log(ee.listenerCount("text")); //Print "0"

evtText.post("foo"); //Prints nothing
ee.emit("text", "bar"); //Prints nothing
```

## `ctx.getHandlers()`

### Returns

`{ handlers: Handler<any,any>; evt: Evt<any>; }[]` The [`Handler`](https://docs.ts-evt.dev/api/handler)s that are bount to the context alongside with the `Evt` instance each one is attached to to. The Handlers that are bound to the context but no longer attached to an Evt are not listed.

### Example

```typescript
//NOTE: Equivalent to evt.detach(ctx);
ctx
    .getHandlers()
    .filter(({ evt }))=> evt === evtString)
    .forEach(({ handler })=> handler.detach())
    ;

```

## `ctx.getEvtAttach()`

### Returns

`Evt<{ handler: Handler<any, any>; evt: Evt<any> }>` An Evt that posts every time a new handler bound to the context is attached.  Every time `ctx.getEvtDetach()` is invoked it returns the same Evt instance. The Evt is lazyly initialized the first time ctx.getEvtAttach\(\) is invoked but `ctx.getEvtDetach().postCount` is not affected.

### Example

```typescript
import { Evt } from "ts-evt";

const evtText= new Evt<string>();

const ctx = Evt.newCtx();

evt.textAttach(ctx, ()=> {});
evt.textAttach(ctx, ()=> {});

console.log(ctx.getEvtAttach().postCount); //Prints "2"
```

```typescript
import { Evt } from "ts-evt";

const evtText = new Evt<string>();

const ctx= Evt.newCtx();

ctx.getEvtAttach.attach(handler => console.log(handler.timeout));

evtText.attach(43, ()=>{}); //Prints "43"
```

## `ctx.getEvtDetach()`

Same as `ctx.getEvtAttach()` but post when handler are detached. Note that an handler beeing detached does not mean that it has been explicitely detached. Once Handlers and Handler that have timed out are automatically detached.



## Comprehensive example



Let us consider a practical usecase of Ctx. The task is to download a file, we know the size of the file to download, we have an Evt&lt;Uint8Array&gt; that emmits chuncks of data, we want to accumulate them util we reach the expected file size. Multiple things can go wrong during the download:

* The user cancel the download.
* The download take too much time.
* We run through a socket error.
* We receive more bytes than expected

Our expected output is a Promise&lt;Uint8Array&gt; that resolve with the downloaded file data or reject if anything went wrong. 

This is how you can use Cxt to implement this task: 

```typescript
import { Evt, VoidEvt } from "ts-evt";

function downloadFile(
    { fileSize, evtChunk, evtBtnCancelClick, evtSocketError, timeout }: {
        fileSize: number;
        evtChunk: Evt<Uint8Array>;
        evtBtnCancelClick: VoidEvt;
        evtSocketError: Evt<Error>;
        timeout: number;
    }
): Promise<Uint8Array> {

    const ctxDl = Evt.newCtx<Uint8Array>();

    evtSocketError.attachOnce(
        ctxDl,
        error => ctxDl.abort(error)
    );

    evtBtnCancelClick.attachOnce(
        ctxDl,
        () => ctxDl.abort(new Error(MESSAGE_CANCEL))
    );

    evtChunk
        .pipe(ctxDl)
        .pipe([
            (chunk, { byteLength, chunks }) => [{
                "byteLength": byteLength + chunk.length,
                "chunks": [...chunks, chunk]
            }],
            {
                "byteLength": 0,
                "chunks": id<Uint8Array[]>([])
            }
        ])
        .pipe(({ byteLength }) => byteLength >= fileSize)
        .pipe(({ byteLength, chunks }) => byteLength > fileSize ?
            { "DETACH": ctxDl, "err": new Error(MESSAGE_TOO_MUCH_BYTES) } :
            [chunks]
        )
        .pipe(chunks => [concatTypedArray(chunks, fileSize)])
        .attach(rawFile => ctxDl.done(rawFile))
        ;

    return ctxDl.getPrDone(timeout);

}
```

Run the example

