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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEffectRunConditionToDependencyArray = void 0;
var assert_1 = require("tsafe/assert");
var React = __importStar(require("react"));
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
                "deps": effectRunCondition ? __spreadArray([{}], __read(new Array(depsMaxLength - 1).fill(privateObject)), false) :
                    depsRef.current,
                "doSkipEffectRun": !effectRunCondition
            };
        }
        (0, assert_1.assert)(effectRunCondition.length <= depsMaxLength, "dependency array passed to ".concat(hookName, " can only contain at most ").concat(depsMaxLength, " elements"));
        var deps = __spreadArray(__spreadArray([], __read(effectRunCondition), false), __read(new Array(depsMaxLength - effectRunCondition.length).fill(privateObject)), false);
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