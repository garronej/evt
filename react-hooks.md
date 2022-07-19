---
description: >-
  Evt let you work with events in react without having to worry about cleaning
  up afterward.
---

# 🪝 React hooks

## useEvt()

```tsx
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

****[**Run it**](https://stackblitz.com/edit/evt-hooks-101?file=index.tsx)****

{% hint style="success" %}
The core idea is to always use the `ctx` to attach handlers. This will enable EVT to detach/reload handlers when they need to be namely when the component is unmounted or a value used in a handler has changed.
{% endhint %}

## useRerenderOnStateChange()

```tsx
import { useState } from "react";
import { Evt } from "evt";
import { useRerenderOnStateChange } from "evt/hooks";

const evtTickCount = Evt.create(0);

setInterval(()=> evtTickCount.state++, 1000);

function App(){

    useRerenderOnStateChange(evtTickCount);
    
    return <h1>tick count: {evtTickCount.state}</h1>;

}
```

## ESLint

You can use this [`react-hooks/exhaustive-deps`](https://github.com/facebook/react/blob/master/packages/eslint-plugin-react-hooks/README.md#advanced-configuration) to be warned if you forget a dependency:

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

