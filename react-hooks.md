---
description: >-
  Evt let you work with events in react without having to worry about cleaning
  up afterward.
---

# 🪝 React hooks

## useEvt()

{% embed url="https://stackblitz.com/edit/evt-hooks-101?file=index.tsx" %}
Basic example
{% endembed %}

{% embed url="https://stackblitz.com/edit/react-ts-hqhuzk?file=App.tsx" %}
Creating Evt from DOM Elements
{% endembed %}

The core idea is to always use the `ctx` to attach handlers. This will enable EVT to detach/reload handlers when they need to be namely when the component is unmounted or a value used in a handler has changed. &#x20;

## useRerenderOnStateChange()

{% embed url="https://stackblitz.com/edit/react-ts-wquwqg?file=App.tsx" %}
With StatefulEvt
{% endembed %}

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

