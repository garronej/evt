# evt.post\*\(data\)

## **`evt.post(data)`**

Equivalent of `eventEmitter.emit()` and `subject.next()`.

Returns evt.postCount

## **`evt.postCount: number`**

The number of times `evt.post()` has been called can. It's a readonly property.

```typescript
import { Evt } from "ts-evt";

const evtText= new Evt<string>();

//prints 0
console.log(evtText.postCount);

evtText.post("foo");
evtText.post("bar");
evtText.post("baz");

//prints 3
console.log(evtText.postCount);
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-postcount?embed=1&file=index.ts)

## `evt.postAsyncOnceHandled(data)`

Post the event data only once there is at least one  handler candidate to handle it.

When `evt.isHandled(data)` return `true`, `post(data)` is invoked synchronously and the new post count is returned. When `postAsyncOnceHandled(data)` is invoked at a time where`evt.isHandled(data)` returns `false`, the `data` will be kept on hold and posted only once a candidate handler is attached.

`evt.post(data)` is not invoked synchronously as soon as the candidate handler is attached but is sheduled to be invoked in a microtask.  
When the call to post is delayed `postAsyncOnceHandled(data)` returns a promise that resolve with the new post count after `post(data)` have been invoked. 

```typescript
import { Evt } from "ts-evt";

function createPreloadedEvtText(): Evt<string>{

    const evtText = new Evt<string>();

    (async ()=>{

        await evtText.postAsyncOnceHandled("Foo");
        evtText.post("bar");

    })();


    return evtText;

}

const evtText = createPreloadedEvtText();

evtText.attach(text => console.log("1 " + text));
evtText.attach(text => console.log("2 " + text));

console.log("BEFORE");

//"BEFORE" then (next micro task) "1 foo" "2 foo" "1 bar" "2 bar"
//If we use postSyncOnceHandled in place of postAsyncOnceHandled
//we get "1 Foo" "BEFORE" "1 Bar" "2 Bar"
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-postoncematched?embed=1&file=index.ts)

## **`evt.postSyncOnceHandled(data)`**

The same thing that `evt.postAsyncOnceHandled(data)` but the data is posted synchronously as soon as a candidate handler is attached.

Not that it has less practical value than it's async counterpart as you likely want to leave an event loop "tick" for all handlers to be attached before posting the event.

