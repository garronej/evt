"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
exports.useSemanticGuaranteeMemo = void 0;
var React = require("react");
function useSemanticGuaranteeMemo(fn, deps) {
    var ref = React.useRef();
    if (!ref.current ||
        deps.length !== ref.current.prevDeps.length ||
        ref.current.prevDeps.map(function (v, i) { return v === deps[i]; }).indexOf(false) >= 0) {
        ref.current = {
            "v": fn(),
            "prevDeps": __spread(deps)
        };
    }
    return ref.current.v;
}
exports.useSemanticGuaranteeMemo = useSemanticGuaranteeMemo;
//# sourceMappingURL=useSemanticGuaranteeMemo.js.map