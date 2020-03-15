# NonPostable&lt;Evt&lt;T&gt;&gt; \(type\)

A non-potable `Evt` is an `Evt` that does not expose the methods `post() and` `postAsyncOnceHandled()`. It is useful for exposing `Evt`s to parts of the code that are in charge of reacting to the events but are not supposed to post.

Note that `NonPostable<>` is not a class or an interface, it's just a helper type that says: _"You are not allowed to post with this `Evt`"_

```typescript
import { Evt } from "ts-evt";
import { NonPostable } from "ts-evt/dist/lib/helperTypes";

const evtText= new Evt<string>();

//Api to expose.
export const api:{ evtText: NonPostable<Evt<string>>; } = { evtText };

//evtText exposed by the api cannot be posted…
api.evtText.post //<=== TS error 
api.evtText.postOnceMatched //<===== TS error

//…but we can post internally.
evtText.post("good");
```

[**Run the example**](https://stackblitz.com/edit/ts-evt-demo-non-postable?embed=1&file=index.ts)

