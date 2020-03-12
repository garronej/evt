# Ctx \(class\)

Help detaching a group of handler that have been attached for a certain pupose / in a certain context.

Let us say for example that the task is to download a file, you have an evtPacket that post every time a packet is received, an evtSocketError that post if there is a connection problem and a evtBtnCancelClick that post when the user click cancel.

```typescript
import { Evt, VoidEvt } from "ts-evt";

const evtPacket<Uint8tArray>();
const evtBtnCancelClick= new VoidEvt();
const evtSocketError= new Evt<Error>();

const FILE_SIZE= 300 000;

const ctxFileDownload= Evt.newCtx();

evtPacket
    .pipe(ctxFileDownload)
    .pipe([
        (data,prev)=> [prev.concat(data)], 
        new Uint8Array(FILE_SIZE)
    ])
    .$attachOnce(
        data => data.lengh !== FILE_SIZE ? 
            null: 
            [ data, {"DETACH": ctxFileDownload}],
        data => console.log(`File downloaded: ${data.toString()}`);
    )
    ;
    
evtSocketError.$attachOnce(
    ()=> { "DETACH": ctxFileDownlad },
    error=> console.log(`Dowload error: ${error.message}`)
);

evtBtnCancelClick.attachOnce(
    ()=> {
        ctx.done(); //Calling done manually or via { "DETACH": ctx } is the same
        console.log(`Download canceled`);
    }
);
```

When the task is complete, no matter the reason we detach all the handler that have been attached to accomplish the task. It is much safer and much more convienient than individually detaching every Haldlers as we do wi EventEmitter.prototypr.removeListener\(...\)

{% hint style="info" %}
Get Ctx instance using `Evt.newCtx()` or `Evt.getCtx(obj)`
{% endhint %}

## `ctx.done()`

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
import { Evt } from "ts-evt";
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
    ctx6
).then(time=> console.log("2: " +  time));

evtText.pipe(ctx)
    .pipe(text => [text.toUpperCase()])
    .attach(upperCaseText=> console.log("3: " + upperCaseText))
    ;

Evt.merge(ctx, [ evtText, evtTime ])
    .attach(textOrTime => console.log("4: " + textOrTime))
    ;

const ee= new EventEmitter();

Evt.fromEvent<string>(ctx, ee, "text")
    .attach(text=> console.log("5: " + text))
    ;


evtText.attach.post("foo"); //Prints "1: 3" "3: FOO" "4: foo"
ee.emit("text", "bar"); //Prints "5: bar"

console.log(evtText.getHandlers().length); //Prints "3"
console.log(evtTime.getHandlers().length); //Prints "2"
console.log(ee.listenerCount("text")); //Print "1"

ctx.getEvtDone().attahcOnce(
    handlerEvts=> {
    
        console.log(
            handlerEvts.filter(({ evt })=> evt === evtString).lenght +
            " handlers detached from evtText"
        );
        
        console.log(
            handlerEvts.filter(({ evt })=> evt === evtTime).lenght +
            " handlers detached from evtTime"
        );
        
        console.log(
            handlerEvts.lenght + " handlers detached total"
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

evtText.attach.post("foo"); //Prints nothing
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

