# evt.post\*\(data\)

## **`evt.post(data)`**

Equivalent of `eventEmitter.emit()` and `subject.next()`.

Returns evt.postCount

## **`evt.postCount: number`**

The number of times `evt.post()` has been called. It's a read-only property.

```typescript
import { Evt } from "evt";

const evtText= new Evt<string>();

//prints 0
console.log(evtText.postCount);

evtText.post("foo");
evtText.post("bar");
evtText.post("baz");

//prints 3
console.log(evtText.postCount);
```

\*\*\*\*[**Run the example**](https://stackblitz.com/edit/evt-2npimn?embed=1&file=index.ts&hideExplorer=1)\*\*\*\*

## `evt.postAsyncOnceHandled(data)`

Post the event data only once there is at least one handler candidate to handle it.

When `evt.isHandled(data)` return `true`, `post(data)` is invoked synchronously and the new post count is returned. When `postAsyncOnceHandled(data)` is invoked at a time where`evt.isHandled(data)` returns `false`, the `data` will be kept on hold and posted only once a candidate handler is attached.

`evt.post(data)` is not invoked synchronously as soon as the candidate handler is attached but is scheduled to be invoked in a microtask.  
When the call to post is delayed `postAsyncOnceHandled(data)` returns a promise that resolves with the new post count after `post(data)` has been invoked.

```typescript
import { Evt } from "evt";

function createPreloadedEvtText(): Evt<string>{

    const evtText = new Evt<string>();

    (async ()=>{

        await evtText.postAsyncOnceHandled("foo");
        evtText.post("bar");

    })();


    return evtText;

}

const evtText = createPreloadedEvtText();

evtText.attach(text => console.log("1 " + text));
evtText.attach(text => console.log("2 " + text));

console.log("BEFORE");

//"BEFORE" then (next micro task) "1 foo" "2 foo" "1 bar" "2 bar"
```

[**Run the example**](https://stackblitz.com/edit/evt-mycz4t?embed=1&file=index.ts&hideExplorer=1)

{% hint style="info" %}
`evt.postSyncOnceHandled()` does not exist because it is preferable to wait for the next event cycle before posting the event. For example, the previous example would not print `"2 foo"` if we had used `evt.postSyncOnceHandled()`
{% endhint %}

