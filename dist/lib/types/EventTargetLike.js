"use strict";
exports.__esModule = true;
var typeSafety_1 = require("../../tools/typeSafety");
var EventTargetLike;
(function (EventTargetLike) {
    var RxJSSubject;
    (function (RxJSSubject) {
        function match(eventTarget) {
            return (typeSafety_1.typeGuard(eventTarget) &&
                eventTarget instanceof Object &&
                typeof eventTarget.subscribe === "function");
        }
        RxJSSubject.match = match;
    })(RxJSSubject = EventTargetLike.RxJSSubject || (EventTargetLike.RxJSSubject = {}));
    var NodeStyleEventEmitter;
    (function (NodeStyleEventEmitter) {
        ;
        function match(eventTarget) {
            return (typeSafety_1.typeGuard(eventTarget) &&
                eventTarget instanceof Object &&
                typeof eventTarget.addListener === "function" &&
                typeof eventTarget.removeListener === "function");
        }
        NodeStyleEventEmitter.match = match;
    })(NodeStyleEventEmitter = EventTargetLike.NodeStyleEventEmitter || (EventTargetLike.NodeStyleEventEmitter = {}));
    var JQueryStyleEventEmitter;
    (function (JQueryStyleEventEmitter) {
        function match(eventTarget) {
            return (typeSafety_1.typeGuard(eventTarget) &&
                eventTarget instanceof Object &&
                typeof eventTarget.on === "function" &&
                typeof eventTarget.off === "function");
        }
        JQueryStyleEventEmitter.match = match;
    })(JQueryStyleEventEmitter = EventTargetLike.JQueryStyleEventEmitter || (EventTargetLike.JQueryStyleEventEmitter = {}));
    var HasEventTargetAddRemove;
    (function (HasEventTargetAddRemove) {
        function match(eventTarget) {
            return (typeSafety_1.typeGuard(eventTarget) &&
                eventTarget instanceof Object &&
                typeof eventTarget.addEventListener === "function" &&
                typeof eventTarget.removeEventListener === "function");
        }
        HasEventTargetAddRemove.match = match;
    })(HasEventTargetAddRemove = EventTargetLike.HasEventTargetAddRemove || (EventTargetLike.HasEventTargetAddRemove = {}));
})(EventTargetLike = exports.EventTargetLike || (exports.EventTargetLike = {}));
//# sourceMappingURL=EventTargetLike.js.map