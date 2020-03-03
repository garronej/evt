"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
var index_1 = require("../index");
var typeSafety_1 = require("../../tools/typeSafety");
var types_1 = require("../types");
var typeSafety_2 = require("../../tools/typeSafety");
var Deferred_1 = require("../../tools/Deferred");
var invokeOperator_1 = require("./invokeOperator");
var Operator_1 = require("../types/Operator");
var EvtOverloaded_2 = require("../EvtOverloaded");
var prNever = new Promise(function () { });
var matchOnceEvt = function (o) {
    typeSafety_1.assert(typeSafety_1.typeGuard.dry(o));
    return (o instanceof Object &&
        o.attachOnce instanceof Function &&
        o.detach instanceof Function &&
        o.waitFor instanceof Function);
};
var matchPromiseLike = function (o) {
    typeSafety_1.assert(typeSafety_1.typeGuard.dry(o));
    return (o instanceof Object &&
        o.then instanceof Function);
};
/** If promise racer rejection unhandled */
var raceUnsafe = (function () {
    var raceUnsafeRec = (function () {
        var raceCouple = (function () {
            var matchDirectValue = function (o) {
                return !matchOnceEvt(o) && !matchPromiseLike(o);
            };
            var raceCoupleSym = function (evt, raceContext, racer, i) {
                var evtWeak = evt;
                raceContext.evtRaceFinished.attachOnce(function () { return evtWeak = undefined; });
                var post = function (raceCoupleResult) {
                    evt.evtAttach.detach(raceContext);
                    evt.post(raceCoupleResult);
                };
                if (matchDirectValue(racer)) {
                    var raceCoupleResult_1 = {
                        "data": racer,
                        i: i
                    };
                    evt.evtAttach.attach(raceContext, function (_a) {
                        var op = _a.op;
                        typeSafety_1.assert(!Operator_1.Operator.fλ.Stateful.match(op));
                        if (!op(raceCoupleResult_1)) {
                            return;
                        }
                        post(raceCoupleResult_1);
                    });
                }
                if (matchPromiseLike(racer)) {
                    racer.then(function (data) {
                        if (evtWeak === undefined) {
                            return;
                        }
                        var raceCoupleResult = {
                            data: data,
                            i: i
                        };
                        if (evtWeak.isHandled(raceCoupleResult)) {
                            post(raceCoupleResult);
                            return;
                        }
                        evtWeak.evtAttach.attach(raceContext, function (_a) {
                            var op = _a.op;
                            typeSafety_1.assert(!Operator_1.Operator.fλ.Stateful.match(op));
                            if (!op(raceCoupleResult)) {
                                return;
                            }
                            post(raceCoupleResult);
                        });
                    });
                }
                if (matchOnceEvt(racer)) {
                    var toRaceCoupleResult_1 = function (data) { return ({
                        data: data,
                        i: i
                    }); };
                    evt.evtAttach.attach(raceContext, function (_a) {
                        var op = _a.op;
                        return racer.attachOnce(function (data) {
                            typeSafety_1.assert(!Operator_1.Operator.fλ.Stateful.match(op));
                            return !!op(toRaceCoupleResult_1(data));
                        }, raceContext, function (data) { return post(toRaceCoupleResult_1(data)); });
                    });
                }
            };
            return function raceCouple(raceContext, p1, p2) {
                var evt = new index_1.Evt();
                raceCoupleSym(evt, raceContext, p1, 0);
                raceCoupleSym(evt, raceContext, p2, 1);
                return evt;
            };
        })();
        return function raceUnsafeRec(raceContext, racersRest, racerLast) {
            var evt = new index_1.Evt();
            var post = function (raceRecResult) {
                evt.evtAttach.detach(raceContext);
                evt.post(raceRecResult);
            };
            if (racersRest.length === 0) {
                var toRaceRecResult_1 = function (raceCoupleResult) { return (__assign(__assign({}, raceCoupleResult), { "i": null })); };
                var evtRaceCoupleResult_1 = raceCouple(raceContext, racerLast, prNever);
                evt.evtAttach.attach(raceContext, function (_a) {
                    var op = _a.op;
                    return evtRaceCoupleResult_1.attachOnce(function (raceCoupleResult) {
                        typeSafety_1.assert(!Operator_1.Operator.fλ.Stateful.match(op));
                        return !!op(toRaceRecResult_1(raceCoupleResult));
                    }, function (raceCoupleResult) { return post(toRaceRecResult_1(raceCoupleResult)); });
                });
                return evt;
            }
            var newRest = racersRest.slice(0, racersRest.length - 1);
            var newRacerLast = racersRest[racersRest.length - 1];
            var evtData = new index_1.Evt();
            var raceCoupleResult_i;
            {
                var evtRaceCoupleResult_2 = raceCouple(raceContext, newRacerLast, racerLast);
                var toData_1 = function (raceCoupleResult) {
                    raceCoupleResult_i = raceCoupleResult.i;
                    return raceCoupleResult.data;
                };
                evtData.evtAttach.attach(raceContext, function (_a) {
                    var op = _a.op;
                    return evtRaceCoupleResult_2.attachOnce(function (raceCoupleResult) {
                        typeSafety_1.assert(!Operator_1.Operator.fλ.Stateful.match(op));
                        return !!op(toData_1(raceCoupleResult));
                    }, function (raceCoupleResult) {
                        evtData.evtAttach.detach(raceContext);
                        evtData.post(toData_1(raceCoupleResult));
                    });
                });
            }
            {
                var evtRaceRecResult_1 = raceUnsafeRec(raceContext, newRest, evtData);
                var transformRaceRecResult_1 = function (raceRecResult) { return ({
                    "data": raceRecResult.data,
                    "i": raceRecResult.i === null ?
                        raceCoupleResult_i === 0 ?
                            racersRest.length - 1
                            :
                                null
                        :
                            raceRecResult.i
                }); };
                evt.evtAttach.attach(raceContext, function (_a) {
                    var op = _a.op;
                    return evtRaceRecResult_1.attachOnce(function (raceRecResult) {
                        typeSafety_1.assert(!Operator_1.Operator.fλ.Stateful.match(op));
                        return !!op(transformRaceRecResult_1(raceRecResult));
                    }, function (raceRecResult) { return post(transformRaceRecResult_1(raceRecResult)); });
                });
            }
            return evt;
        };
    })();
    return function raceUnsafe(racers) {
        var evt = new index_1.Evt();
        var evtRaceFinished = new index_1.VoidEvt();
        var raceContext = { evtRaceFinished: evtRaceFinished };
        var evtRaceRecResult = raceUnsafeRec(raceContext, racers, prNever);
        var toRaceResult = function (raceRecResult) {
            typeSafety_1.assert(!typeSafety_1.typeGuard.dry(raceRecResult.i, false));
            return __assign(__assign({}, raceRecResult), { "i": raceRecResult.i, "racer": racers[raceRecResult.i] });
        };
        var detachAllEvtRacers = function () {
            evtRaceFinished.post();
            racers
                .forEach(function (racer) {
                if (!matchOnceEvt(racer)) {
                    return;
                }
                racer.detach(raceContext);
            });
        };
        evt.evtAttach.attach(raceContext, function (_a) {
            var op = _a.op, promise = _a.promise;
            promise["catch"](function () {
                if (evt.getHandlers().length !== 0) {
                    return;
                }
                detachAllEvtRacers();
            });
            evtRaceRecResult.attachOnce(function (raceRecResult) {
                typeSafety_1.assert(!Operator_1.Operator.fλ.Stateful.match(op));
                return !!op(toRaceResult(raceRecResult));
            }, raceContext, function (raceRecResult) {
                evt.evtAttach.detach(raceContext);
                detachAllEvtRacers();
                evt.post(toRaceResult(raceRecResult));
            });
        });
        return evt;
    };
})();
function wrapRejection(promise) {
    return promise.then(function (data) { return typeSafety_2.id({
        promise: promise,
        "isFulfilled": true,
        data: data
    }); }, function (error) { return typeSafety_2.id({
        promise: promise,
        "isFulfilled": false,
        "data": null,
        error: error
    }); });
}
function generateProxyFunctionFactory(oneShotEvt) {
    var parseOverloadParams = EvtOverloaded_2.parseOverloadParamsFactory({ "defaultBoundTo": oneShotEvt });
    return function generateProxyFunction(methodName) {
        var methodBackup = typeSafety_2.id(oneShotEvt[methodName]).bind(oneShotEvt);
        Object.defineProperty(oneShotEvt, methodName, {
            "value": function () {
                var inputs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    inputs[_i] = arguments[_i];
                }
                var op = parseOverloadParams(inputs, methodName === "waitFor" ?
                    "waitFor" : "attach*").op;
                var i = inputs.indexOf(op);
                if (i < 0) {
                    inputs = __spread([undefined], inputs);
                    i = 0;
                }
                var dOut = new Deferred_1.Deferred();
                inputs[i] = function matcherOverride(raceResult) {
                    if (!matchPromiseLike(raceResult.racer)) {
                        typeSafety_1.assert(!Operator_1.Operator.fλ.Stateful.match(op));
                        return op(raceResult);
                    }
                    var prResultWrap = raceResult.data;
                    if (!prResultWrap.isFulfilled) {
                        dOut.reject(new types_1.EvtError.RacePromiseRejection(prResultWrap.error, raceResult.i, raceResult.racer));
                        return "DETACH";
                    }
                    typeSafety_1.assert(!Operator_1.Operator.fλ.Stateful.match(op));
                    return invokeOperator_1.invokeOperator(op, {
                        "i": raceResult.i,
                        "data": prResultWrap.data,
                        "racer": prResultWrap.promise
                    });
                };
                methodBackup.apply(void 0, __spread(inputs)).then(function (data) { return dOut.resolve(data); }, function (error) { return dOut.reject(error); });
                return dOut.pr;
            }
        });
    };
}
;
function race(racers) {
    var oneShotEvt = raceUnsafe(racers.map(function (racer) { return matchPromiseLike(racer) ?
        wrapRejection(racer)
        :
            racer; }));
    {
        var generateProxyFunction = generateProxyFunctionFactory(oneShotEvt);
        ["waitFor", "attachOnce"]
            .forEach(generateProxyFunction);
    }
    return typeSafety_2.id(oneShotEvt);
}
exports.race = race;
;
//# sourceMappingURL=race.js.map