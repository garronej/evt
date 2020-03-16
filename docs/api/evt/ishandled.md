---
Description: Test if posting event data will have an effect.
---

# evt.isHandled\(data\)

Return true if:

* There is at least one handler matching this event data \( at least one handler's callback function will be invoked if the data is posted. \)
* There is at least one handler that will be detached if the event data is posted.

```typescript
const evtText = new Evt<string>();

/*
Handle the text starting with 'h'.
Ignore all other text, when a text starting with 'g'
is posted the handler is detached
*/
evtText.$attach(
    text=> text.startsWith("h") ? 
        [ text ] : 
        text.startsWith("g") ? "DETACH" : null,
    text=> {/* do something with the text */}
);

//"true", start with 'h'
console.log(
    evtText.isHandled("hello world")
);

//"false", do not start with 'h' or 'g'
console.log(
    evtText.isHandled("foo bar")
);

//"true", not matched but will cause the handler to be detached if posted
console.log(
    evtText.isHandled("goodby world")
);
```

[**Run the example**](https://stackblitz.com/edit/evt-a3m4od?embed=1&file=index.ts&hideExplorer=1)

