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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEvt = void 0;
var Evt_2 = require("../lib/Evt");
var useGuaranteedMemo_1 = require("../tools/powerhooks/useGuaranteedMemo");
var useEffectIf_1 = require("../tools/powerhooks/useEffectIf");
var React = require("react");
var useEffect = React.useEffect, useState = React.useState, useReducer = React.useReducer, useRef = React.useRef;
//TODO: Find a more reliable way to test if <React.UseStrict> is used.
var isDevStrictMode = typeof process !== "object" ?
    false :
    ((_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) !== null && _b !== void 0 ? _b : "production") !== "production";
/**
 * https://docs.evt.land/api/react-hooks
 *
 * Provide a Ctx to attach handlers.
 * You should list in deps all the Evt that are
 * susceptible to change ( Evt passed as props
 * or Evt that are react states ) that you use in the
 * factoryOrEffect callback.
 * As for useEffect you should also list every other
 * value that you use.
 * Whenever any value in deps is changed factoryOrEffect
 * is invoked again with the new Evt and the previous handler
 * get detached.
 * All handler are also detached when the component unmount.
 *
 * factoryOrEffect can be used for attaching handler to event
 * or to generate a new event that is a merge/pipe of other
 * Evts.
 *
 * BE AWARE: Unlike useEffect factoryOrEffect is called
 * on render ( like useMemo's callback ).
 * Remember that you shouldn't update state in a component
 * render tick (in the useMemo for example). If you you need to
 * perform an effect on first render (attaching a stateful evt
 * for example) use registerSideEffect(()=>{ ... })
 *
 * Demo: https://stackblitz.com/edit/evt-useevt?file=index.tsx
 */
function useEvt(factoryOrEffect, deps) {
    var ctxRef = useRef(null);
    var _a = __read(useState([]), 1), registeredSideEffects = _a[0];
    var _b = __read(useReducer(function (n) { return n + 1; }, 0), 2), forceUpdate = _b[1];
    useEffectIf_1.useEffectIf(function callee() {
        var registeredSideEffectsCopy = __spreadArray([], __read(registeredSideEffects));
        registeredSideEffectsCopy.forEach(function (sideEffect) { return sideEffect(); });
        registeredSideEffects.splice(0, registeredSideEffectsCopy.length);
        if (registeredSideEffects.length !== 0) {
            callee();
            return;
        }
    }, registeredSideEffects.length !== 0);
    var out = useGuaranteedMemo_1.useGuaranteedMemo(function () {
        var _a;
        (_a = ctxRef.current) === null || _a === void 0 ? void 0 : _a.done();
        ctxRef.current = Evt_2.Evt.newCtx();
        return factoryOrEffect(ctxRef.current, function (sideEffect) {
            registeredSideEffects.push(sideEffect);
            forceUpdate();
        });
    }, deps);
    useEffect(function () { return function () { ctxRef.current.done(); }; }, []);
    useClearCtxIfReactStrictModeInspectRun(isDevStrictMode, ctxRef);
    return out;
}
exports.useEvt = useEvt;
/**
 * When <React.StrictMode> is used in development
 * useState and useMemo get triggered a first time on a
 * separate component instance but useEffect is not invoked.
 *
 * To prevent leaving handlers that we attached inside the useMemo
 * callback we clear the context if useEffect(f,[])
 * is not invoked right after useState(f).
 */
function useClearCtxIfReactStrictModeInspectRun(isDevStrictMode, ctxRef) {
    var timerRef = useRef(null);
    useGuaranteedMemo_1.useGuaranteedMemo(function () {
        if (!isDevStrictMode) {
            return;
        }
        timerRef.current = setTimeout(function () { return ctxRef.current.done(); }, 700);
    }, []);
    useEffect(function () {
        if (!isDevStrictMode) {
            return;
        }
        if (timerRef.current === null) {
            return;
        }
        clearTimeout(timerRef.current);
    }, []);
}
//# sourceMappingURL=useEvt.js.map