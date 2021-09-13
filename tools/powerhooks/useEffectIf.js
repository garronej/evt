"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEffectIf = void 0;
var useEffectRunConditionToDependencyArray_1 = require("./tools/useEffectRunConditionToDependencyArray");
var React = require("react");
var assert_1 = require("tsafe/assert");
var useEffect = React.useEffect;
function useEffectIf(effect, effectRunCondition) {
    var _a = useEffectRunConditionToDependencyArray_1.useEffectRunConditionToDependencyArray({
        effectRunCondition: effectRunCondition,
        "hookName": useEffectIf.name
    }), deps = _a.deps, doSkipEffectRun = _a.doSkipEffectRun;
    useEffect(function () {
        if (doSkipEffectRun)
            return;
        assert_1.assert(effectRunCondition !== false);
        return effect({
            "deps": effectRunCondition === true ?
                [] : effectRunCondition
        });
    }, deps);
}
exports.useEffectIf = useEffectIf;
/*
type Shape = { type: "circle"; radius: number; } | { type: "square"; sideLength: number; };

const shape: Shape = null as any;

useEffectIf(
    ({ deps: [ radius ] })=> {
    },
    shape.type !== "circle" ? false : { "doRunOnlyOnChange": true, "deps": [shape.radius, "foo"] as const }
);
*/
//# sourceMappingURL=useEffectIf.js.map