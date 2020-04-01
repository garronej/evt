# Evt.setDefaultMaxHandlers\(n\)

By default if an `Evt` is attached more than 25 handlers a warning will be displayed. It is possible to increase this limmit on a specific `Evt` instance using [`evt.setMaxHandlers(n)`](https://docs.evt.land/api/evt/setmaxhandlers) or globally with this static method.

Using this method will not overwrite the vale set on specific instance with `evt.setMaxHandlers(n)`.

Use Infinity or 0 to completely disable the warning.

{% hint style="warning" %}
Different version of EVT can be coabitating in a single project. The modification will only apply to the `Evt`s instantiated by this constructor.
{% endhint %}



