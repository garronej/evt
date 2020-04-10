# Ctx&lt;T&gt;

`Ctx` helps detach all `Handler`s that were attached in the goal of acompishing a certain task once the said task is done or aborted.

{% hint style="info" %}
Get Ctx instance using[`Evt.newCtx<T>()`](https://docs.evt.land/api/evt/newctx) or [`Evt.getCtx(obj)`](https://docs.evt.land/api/evt/getctx)\`\`
{% endhint %}

{% hint style="info" %}
The only difference between `CtxVoid` and `Ctx<Void>` is that `ctxVoid.done()` can be called without argument when `ctx<void>.done()`must be called with an argument \(`null` or `undefined`\).
{% endhint %}

## `ctx.done([result])`

Detach, from the `Evt` instances they are attached to, all Handlers bound to the context.

Calling this method causes the `Evt` returned by `ctx.getEvtDone()` to be posted.

{% hint style="info" %}
When an fλ operator return `{ "DETACH": ctx }`, `ctx.done()` is invoked.

When it returns `{ "DETACH": ctx, "res": result }`, `ctx.done(result)` is invoked.
{% endhint %}

{% hint style="info" %}
To test if ctx.done\(\) have been invoked already you can use:`ctx.getEvtDone().postCount !== 0`
{% endhint %}

#### Returns

`ReturnType<ctx.getHandlers()>` All the [Handler](https://docs.ts-evt.dev/api/handler)s that were bound to the context. They are now detached, calling `ctx.getHandler()` just after `ctx.done()` returns an empty array.

#### Parameter

* `T` for `Ctx<T>`
* none for `VoidCtx`

## `ctx.abort(error)`

Equivalent of `ctx.done()` to use when the task did not go through.

{% hint style="info" %}
When a fλ operator returns `{ "DETACH": ctx, "err": error }`, `ctx.abort(error)` is invoked.
{% endhint %}

#### Returns

`ReturnType<ctx.done()>` \(cf `ctx.done` \)

#### Parameter

`Error` an error that describes what went wrong.

## `ctx.evtDoneOrAborted`

Tracks when ctx.done or ctx.abort are invoked.

{% hint style="info" %}
For most use cases, it is more convenient to use `ctx.waitFor([timeout])`
{% endhint %}

#### Returns

* For VoidCtx an Evt that posts:
  * `{ handlers: Handler.WithEvt[] }` when `ctx.done()` is called.
  * `{ error: Error, handlers: Handler.WithEvt[] }` when `ctx.abort(error)` is called.
* For `Ctx<T>`, an `Evt` that post:
  * `{ result: Result; handlers: Handler.WithEvt[]; }` when `ctx.done(result)` is called.
  * `{ error: Error, handlers: Handlers.WithEvt[]; }` when `ctx.abort(error)` is called.

`Handler.WithEvt<T>` is just a type alias for an object that wraps a handler and the `Evt` it is attached to: `{ handler: Handler<T, any>, evt: Evt<T> }`

#### Example

```typescript
import { Evt } from "evt";
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

ctx.evtDoneOrAborted.attachOnce(
    ({handlers})=> {

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

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-niwafz?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

## `ctx.waitFor([timeout])`

Tracks via a Promise that resolves when `ctx.done()` or `ctx.abort()` is invoked.

#### Returns

`Promise<T>` \(`T` is the type argument of `Ctx<T>` \) A promise that resolve when ctx.done\(\[result\]\) is invoked.

If `ctx.abort(error)` is invoked before `ctx.done()` the promise rejects with `error`.

If timeout was specified the promise rejects if `ctx.done()` was not invoked within `timeout` milliseconds. If it happens `ctx.abort(timeoutError)` is internally invoked `timeoutError` being an instance of `EvtError.Timeout`.

#### Parameter

`number` Optional, number of milliseconds before the promise reject if it hasn't fulfilled within this delay.

## `ctx.getHandlers()`

#### Returns

`Handler.WithEvt[]` The [`Handler`](https://docs.ts-evt.dev/api/handler)s that are bound to the context alongside with the `Evt` instance each one is attached to. The Handlers that are bound to the context but no longer attached to an Evt are not listed \( they are usually freed from memory anyway as there should be nor reference left of them as soon as they are detached \).

#### Example

```typescript
//NOTE: Equivalent to evt.detach(ctx);
ctx
    .getHandlers()
    .filter(({ evt }))=> evt === evtString)
    .forEach(({ handler })=> handler.detach())
    ;
```

## `ctx.evtAttach`

#### Returns

`Evt<Handler.WithEvt<any>>` An Evt that posts every time a new handler bound to the context is attached.  

```typescript
import { Evt } from "evt";

const evtText = new Evt<string>();

const ctx= Evt.newCtx();

ctx.evtAttach.attach(handler => console.log(handler.timeout));

const timeout = 43;

evtText.attach(timeout, ()=>{}); //Prints "43"
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-t17qsy?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

## `ctx.evtDetach`

Same as `ctx.getEvtAttach()` but post when handlers are detached. Note that a handler being detached does not mean that it has been explicitly detached. One-time handlers and handlers that have timed out are automatically detached.

## Comprehensive example

Let us consider a practical use case of `Ctx`. The task is to download a file, we know the size of the file to download, we have an `Evt<Uint8Array>` that emits chunks of data, we want to accumulate them until we reach the expected file size. Multiple things can go wrong during the download:

* The user can cancel the download.
* The download can take too long.
* Socket may disconnect .
* The socket may send more data than expected.

Our expected output is a `Promise<Uint8Array>` that resolves with the downloaded file or reject if anything went wrong.

This is a possible implementation using `Ctx<Uint8Array>`:

```typescript
import { Evt, VoidEvt } from "evt";

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
        () => ctxDl.abort(new Error("Download canceled"))
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
        .pipe(({ byteLength, chunks }) => byteLength !== fileSize ?
            { "DETACH": ctxDl, "err": new Error("File is larger than expected") } :
            [chunks]
        )
        .pipe(chunks => [concatTypedArray(chunks, fileSize)])
        .attach(rawFile => ctxDl.done(rawFile))
        ;

    return ctxDl.waitFor(timeout);

}
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-qpke6h?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

Whether the download is successful or not this use of Ctx enforce that there is no left over handlers on the Evt passed as input once the download attempt has completed.

