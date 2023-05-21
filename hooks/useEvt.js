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
exports.useEvt = void 0;
var lib_1 = require("../lib");
var React = __importStar(require("react"));
var useEffect = React.useEffect;
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
 * Demo: https://docs.evt.land/react-hooks#useevt
 */
function useEvt(effect, deps) {
    useEffect(function () {
        var ctx = lib_1.Evt.newCtx();
        effect(ctx);
        return function () { ctx.done(); };
    }, deps);
}
exports.useEvt = useEvt;
//# sourceMappingURL=useEvt.js.map