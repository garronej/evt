# Handler&lt;T, U&gt; \(type\)



### Glossary

* An event is said to be **matched** by an handler if posting the event will cause the callback to be invoked. In practice this is the case whe the operator returns true if it is a filter or a type guard or \[ value, \] if it is a fλ.
* An event is said to be **handled** by an handler if the if the event data is matched or if posting it will cause the handler and/or potential others handler to be detached. In practice this is the case when the operator of the handler returns "DETACH" or {DETACH: Ctx}

