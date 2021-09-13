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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEffectRunConditionToDependencyArray = void 0;
var assert_1 = require("tsafe/assert");
var React = require("react");
var useRef = React.useRef;
var depsMaxLength = 9;
var privateObject = {};
/**
 * Hooks for having better control on when an effect should be run.
 *
 * function useMyEffect(effect: ()=> void; effectRunCondition: EffectRunCondition) {
 *
 *     const { deps, doSkipEffectRun }= useEffectRunConditionToDependencyArray({
 *         effectRunCondition,
 *         "hookName": useMyEffect.name
 *     });
 *
 *     useEffect(()=> {
 *         if( doSkipEffectRun ) return;
 * 	       effect();
 *     }, deps);
 *
 * }
 *
 */
function useEffectRunConditionToDependencyArray(props) {
    var effectRunCondition = props.effectRunCondition, _a = props.hookName, hookName = _a === void 0 ? useEffectRunConditionToDependencyArray.name : _a;
    var depsRef = useRef(new Array(depsMaxLength).fill(privateObject));
    var _b = (function () {
        if (typeof effectRunCondition === "boolean") {
            return {
                "deps": effectRunCondition ? __spreadArray([{}], __read(new Array(depsMaxLength - 1).fill(privateObject))) :
                    depsRef.current,
                "doSkipEffectRun": !effectRunCondition
            };
        }
        assert_1.assert(effectRunCondition.length <= depsMaxLength, "dependency array passed to " + hookName + " can only contain at most " + depsMaxLength + " elements");
        var deps = __spreadArray(__spreadArray([], __read(effectRunCondition)), __read(new Array(depsMaxLength - effectRunCondition.length).fill(privateObject)));
        return { deps: deps, "doSkipEffectRun": false };
    })(), deps = _b.deps, doSkipEffectRun = _b.doSkipEffectRun;
    depsRef.current = deps;
    return {
        deps: deps,
        doSkipEffectRun: doSkipEffectRun /* NOTE: Only necessary for fist render */
    };
}
exports.useEffectRunConditionToDependencyArray = useEffectRunConditionToDependencyArray;
//# sourceMappingURL=useEffectRunConditionToDependencyArray.js.map