---
description: >-
  Evt let you work with events in react without having to worry about cleaning
  up afterward.
---

# React integration

Checkout this quick example: 

```typescript
import { useState } from "react";
import { Evt } from "evt";
import { useEvt } from "evt/hooks";

const evtTick = Evt.create();

setInterval(()=> evtTick.post(), 1000);

function App(){

    const [count, setCount]= useState(0);

    useEvt(ctx=> {
    
        evtTick.attach(ctx, ()=> setCount(count+1));
    
    
    },[count]);
    
    return <h1>tick count: {count}</h1>;


}

```

\*\*\*\*[**Run it**](https://stackblitz.com/edit/evt-hooks-101?file=index.tsx)\*\*\*\*

## Custom hooks

Evt let enables you to create powerful custom hooks. Here are some examples:

### Custom hook that gives the innerWith of the window

```typescript
import { Evt } from "evt";
import { useEvt, useStatefulEvt } from "evt/hooks";

export function useWindowInnerWidth() {

    const evtInnerWidth = useEvt(ctx =>
        Evt.from(ctx, window, "resize")
            .toStateful()
            .pipe(() => [window.innerWidth])
        ,
        []
    );

    useStatefulEvt([evtInnerWidth]);

    return { "windowInnerWidth": evtInnerWidth.state };

}

```

Usage \( you'll have to resize the window to see the text change \)

```typescript
import { useWindowInnerWidth } from "app/utils/hooks/useWindowInnerWidth.ts";

export function MyComponent(){

    const { windowInnerWidth } = useWindowInnerWidth();
    
    return <h1>window.innerWidth is: {windowInnerWidth}px</h1>;

}
```

{% hint style="info" %}
This example will only work with [EVT v2.0](https://github.com/garronej/evt/pull/16)
{% endhint %}

## ESLint

You can use this [`react-hooks/exhaustive-deps`](https://github.com/facebook/react/blob/master/packages/eslint-plugin-react-hooks/README.md#advanced-configuration) setting to be warned if you forget a dependency:

```javascript
//package.json (if you use create-react-app otherwise use .eslintrc.js) 
{
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ],
    "rules": {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": [
        "error",
        {
          "additionalHooks": "(useEvt)"
        }
      ]
    }
  }
}
```

## Mini "Hello World" project Example 

 [Live code](https://stackblitz.com/edit/evt-hooks?embed=1&file=Hello.tsx)

Just a basic example to demonstrate how to use the Hooks.

## Comprehensive example: A TODO list app

This example is meant to show how EVT can help you build fully reactive UI that can be synced in real time across devices.

It also provides gidelines on how to optimize as much as possible the performance of the UI.

_NOTE: The request delay are simulated to show how the UI would handle slow network._

[Live code](https://stackblitz.com/edit/evt-react-hooks-todo-list?embed=1&file=index.tsx) / [GitHub repo](https://github.com/garronej/evt_react_hooks_todo_list)

![](.gitbook/assets/89027333-9891ca80-d32a-11ea-8d58-6e93c12a50f5.png)



