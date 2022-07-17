# Async iterator

An `Evt` is an `AsyncIterable`: &#x20;

{% embed url="https://stackblitz.com/edit/evt-playground-uvjd74?file=index.ts" %}

You can stop the loop from outside by using a `Ctx`

{% embed url="https://stackblitz.com/edit/evt-playground-xw66az?file=index.ts" %}

You can automatically exit the loop when ever x millisecond have passed since the last event was received.

{% embed url="https://stackblitz.com/edit/evt-playground-fsbad9?file=index.ts" %}

You can also filter the type of event you want to iterate over: &#x20;

{% embed url="https://stackblitz.com/edit/evt-playground-i17pvg?file=index.ts" %}
