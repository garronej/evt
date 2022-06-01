"use strict";
exports.__esModule = true;
exports.EventTargetLike = exports.z_2 = void 0;
var typeSafety_1 = require("../../tools/typeSafety");
exports.z_2 = {
    "RxJSSubject_match": function match(eventTarget) {
        return (typeSafety_1.typeGuard(eventTarget) &&
            eventTarget instanceof Object &&
            typeof eventTarget.subscribe === "function");
    },
    "NodeStyleEventEmitter_match": function match(eventTarget) {
        return (typeSafety_1.typeGuard(eventTarget) &&
            eventTarget instanceof Object &&
            typeof eventTarget.addListener === "function" &&
            typeof eventTarget.removeListener === "function");
    },
    "JQueryStyleEventEmitter_match": function match(eventTarget) {
        return (typeSafety_1.typeGuard(eventTarget) &&
            eventTarget instanceof Object &&
            typeof eventTarget.on === "function" &&
            typeof eventTarget.off === "function");
    },
    "HasEventTargetAddRemove_match": function match(eventTarget) {
        return (typeSafety_1.typeGuard(eventTarget) &&
            eventTarget instanceof Object &&
            typeof eventTarget.addEventListener === "function" &&
            typeof eventTarget.removeEventListener === "function");
    },
    "canBe": function canBe(o) {
        try {
            return (exports.z_2.HasEventTargetAddRemove_match(o) ||
                exports.z_2.NodeStyleEventEmitter_match(o) ||
                exports.z_2.JQueryStyleEventEmitter_match(o) ||
                exports.z_2.RxJSSubject_match(o));
        }
        catch (_a) {
            return false;
        }
    }
};
var EventTargetLike;
(function (EventTargetLike) {
    var RxJSSubject;
    (function (RxJSSubject) {
        RxJSSubject.match = exports.z_2.RxJSSubject_match;
    })(RxJSSubject = EventTargetLike.RxJSSubject || (EventTargetLike.RxJSSubject = {}));
    var NodeStyleEventEmitter;
    (function (NodeStyleEventEmitter) {
        ;
        NodeStyleEventEmitter.match = exports.z_2.NodeStyleEventEmitter_match;
    })(NodeStyleEventEmitter = EventTargetLike.NodeStyleEventEmitter || (EventTargetLike.NodeStyleEventEmitter = {}));
    var JQueryStyleEventEmitter;
    (function (JQueryStyleEventEmitter) {
        JQueryStyleEventEmitter.match = exports.z_2.JQueryStyleEventEmitter_match;
    })(JQueryStyleEventEmitter = EventTargetLike.JQueryStyleEventEmitter || (EventTargetLike.JQueryStyleEventEmitter = {}));
    var HasEventTargetAddRemove;
    (function (HasEventTargetAddRemove) {
        HasEventTargetAddRemove.match = exports.z_2.HasEventTargetAddRemove_match;
    })(HasEventTargetAddRemove = EventTargetLike.HasEventTargetAddRemove || (EventTargetLike.HasEventTargetAddRemove = {}));
    /* Return true if o can be a EventTargetLike */
    EventTargetLike.canBe = exports.z_2.canBe;
})(EventTargetLike = exports.EventTargetLike || (exports.EventTargetLike = {}));
//# sourceMappingURL=EventTargetLike.js.map