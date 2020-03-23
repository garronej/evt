"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
var typeGuard_1 = require("../typeSafety/typeGuard");
var Set_1 = require("minimal-polyfills/dist/lib/Set");
var SetLike;
(function (SetLike) {
    function match(set) {
        return (typeGuard_1.typeGuard(set) &&
            typeof set.values === "function" &&
            /Set/.test(Object.getPrototypeOf(set).constructor.name));
    }
    SetLike.match = match;
})(SetLike || (SetLike = {}));
var MapLike;
(function (MapLike) {
    function match(map) {
        return (typeGuard_1.typeGuard(map) &&
            typeof map.keys === "function" &&
            typeof map.get === "function" &&
            /Map/.test(Object.getPrototypeOf(map).constructor.name));
    }
    MapLike.match = match;
})(MapLike || (MapLike = {}));
/**
 * Return a function that perform a in depth comparison of two things of arbitrary type T.
 *
 * Think of it as JSON.stringify(o1) === JSON.stringify(o2)
 * but unlike a test performed with JSON.stringify the order in the property
 * have been assigned to an object does not matter.
 *
 * If takeIntoAccountArraysOrdering === false then
 * representsSameData(["a", "b"], ["b", "a"]) will return true.
 *
 * If Date are compared via .getTime()
 *
 * The objects can includes Map and Set.
 * */
function representsSameDataFactory(_a) {
    var takeIntoAccountArraysOrdering = _a.takeIntoAccountArraysOrdering;
    return { "representsSameData": function (o1, o2) { return representsSameData(o1, o2, takeIntoAccountArraysOrdering); } };
}
exports.representsSameDataFactory = representsSameDataFactory;
function representsSameData(o1, o2, takeIntoAccountArraysOrdering) {
    var e_1, _a, e_2, _b, e_3, _c;
    if (o1 === o2) {
        return true;
    }
    if (o1 instanceof Date) {
        if (!(o2 instanceof Date)) {
            return false;
        }
        return o1.getTime() === o2.getTime();
    }
    if (o1 instanceof Object) {
        if (!(o2 instanceof Object)) {
            return false;
        }
        if (MapLike.match(o1)) {
            if (!MapLike.match(o2)) {
                return false;
            }
            var newO1 = new Set_1.Polyfill();
            var newO2 = new Set_1.Polyfill();
            try {
                for (var _d = __values([o1, o2]), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var o = _e.value;
                    var newO = o === o1 ? newO1 : newO2;
                    var arr = Array.from(o.keys());
                    for (var i = 0; i < arr.length; i++) {
                        var key = arr[i];
                        var value = o.get(key);
                        newO.add({ key: key, value: value });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d["return"])) _a.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return representsSameData(newO1, newO2, takeIntoAccountArraysOrdering);
        }
        var takeIntoAccountArraysOrderingOv = undefined;
        if (SetLike.match(o1)) {
            if (!SetLike.match(o2)) {
                return false;
            }
            o1 = Array.from(o1.values());
            o2 = Array.from(o2.values());
            takeIntoAccountArraysOrderingOv = false;
        }
        if (!(takeIntoAccountArraysOrderingOv !== null && takeIntoAccountArraysOrderingOv !== void 0 ? takeIntoAccountArraysOrderingOv : takeIntoAccountArraysOrdering) &&
            o1 instanceof Array) {
            if (!(o2 instanceof Array)) {
                return false;
            }
            if (o1.length !== o2.length) {
                return false;
            }
            var o2Set = new Set_1.Polyfill(o2);
            try {
                for (var o1_1 = __values(o1), o1_1_1 = o1_1.next(); !o1_1_1.done; o1_1_1 = o1_1.next()) {
                    var val1 = o1_1_1.value;
                    var isFound = false;
                    try {
                        for (var _f = (e_3 = void 0, __values(o2Set.values())), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var val2 = _g.value;
                            var result = representsSameData(val1, val2, takeIntoAccountArraysOrdering);
                            if (!result) {
                                continue;
                            }
                            isFound = true;
                            o2Set["delete"](val2);
                            break;
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_c = _f["return"])) _c.call(_f);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    if (!isFound) {
                        return false;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (o1_1_1 && !o1_1_1.done && (_b = o1_1["return"])) _b.call(o1_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else {
            if (o1 instanceof Array) {
                if (!(o2 instanceof Array)) {
                    return false;
                }
                if (o1.length !== o2.length) {
                    return false;
                }
            }
            else {
                var result = representsSameData(Object.keys(o1).filter(function (key) { return o1[key] !== undefined; }), Object.keys(o2).filter(function (key) { return o2[key] !== undefined; }), takeIntoAccountArraysOrdering);
                if (!result) {
                    return false;
                }
            }
            for (var key in o1) {
                var result = representsSameData(o1[key], o2[key], takeIntoAccountArraysOrdering);
                if (!result) {
                    return false;
                }
            }
        }
        return true;
    }
    return false;
}
//# sourceMappingURL=representsSameData.js.map