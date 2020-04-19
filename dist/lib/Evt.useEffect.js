"use strict";
exports.__esModule = true;
function useEffect(effect, evt, dataFirst) {
    var i = 0;
    ("state" in evt ? evt.evtChange : evt)
        .attach(function (data) {
        return effect(data, { "isFirst": false, data: data }, i++);
    });
    effect("state" in evt ? evt.state : dataFirst === null || dataFirst === void 0 ? void 0 : dataFirst[0], { "isFirst": true }, i++);
}
exports.useEffect = useEffect;
//# sourceMappingURL=Evt.useEffect.js.map