# evt.setMaxHandlers\(n\)

By default `Evt` will print a warning if more than 25 handlers are added. This is a useful default that helps finding memory leaks.  Not all events should be limited to 25 handlers. The `evt.setMaxHandlers()` method allows the limit to be modified for this specific `Evt` instance. \( Use the static method [`Evt.setDefaultMaxHandlers()`](https://docs.evt.land/api/evt/setdefaultmaxhandlers) to change this limit globally.

The value can be set to `Infinity` \(or 0\) to indicate an unlimited number of listeners. 

Returns a reference to the Evt, so that calls can be chained.

