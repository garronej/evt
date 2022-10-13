"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEffectIf = void 0;
var useEffectRunConditionToDependencyArray_1 = require("./tools/useEffectRunConditionToDependencyArray");
var React = __importStar(require("react"));
var assert_1 = require("tsafe/assert");
var useEffect = React.useEffect;
function useEffectIf(effect, effectRunCondition) {
    var _a = (0, useEffectRunConditionToDependencyArray_1.useEffectRunConditionToDependencyArray)({
        effectRunCondition: effectRunCondition,
        "hookName": useEffectIf.name
    }), deps = _a.deps, doSkipEffectRun = _a.doSkipEffectRun;
    useEffect(function () {
        if (doSkipEffectRun)
            return;
        (0, assert_1.assert)(effectRunCondition !== false);
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