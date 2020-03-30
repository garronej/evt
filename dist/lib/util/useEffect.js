"use strict";
exports.__esModule = true;
function useEffect(effect, evt, dataFirst) {
    var i = 0;
    evt.attach(function (data) { return effect(data, { "isFirst": false, data: data }, i++); });
    effect(dataFirst === null || dataFirst === void 0 ? void 0 : dataFirst[0], { "isFirst": true }, i++);
}
exports.useEffect = useEffect;
//# sourceMappingURL=useEffect.js.map