"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var lib_1 = require("../lib");
var assert_1 = require("../tools/typeSafety/assert");
var inDepth_1 = require("../tools/inDepth");
{
    var evtText_1 = new lib_1.Evt();
    var evtAge_1 = new lib_1.Evt();
    var pr_1 = Promise.resolve(null);
    var arr_1 = [];
    var ctx_1 = lib_1.Evt.newCtx();
    lib_1.Evt.useEffect(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return arr_1.push(args);
    }, lib_1.Evt.merge(ctx_1, [
        evtText_1,
        evtAge_1,
        lib_1.Evt.from(pr_1)
    ]));
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var text, age;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pr_1];
                case 1:
                    _a.sent();
                    text = "Hello world";
                    evtText_1.post(text);
                    age = 99;
                    evtAge_1.post(age);
                    ctx_1.done();
                    evtAge_1.post(4444);
                    assert_1.assert(inDepth_1.same(arr_1, [
                        [undefined, { "isFirst": true }, 0],
                        [null, { "isFirst": false, "data": null }, 1],
                        [text, { "isFirst": false, "data": text }, 2],
                        [age, { "isFirst": false, "data": age }, 3]
                    ]));
                    return [2 /*return*/];
            }
        });
    }); })();
}
{
    var evtText_2 = new lib_1.Evt();
    var evtAge_2 = new lib_1.Evt();
    var pr_2 = Promise.resolve(null);
    var arr_2 = [];
    var ctx_2 = lib_1.Evt.newCtx();
    var initData_1 = "foo bar";
    lib_1.Evt.useEffect(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return arr_2.push(args);
    }, lib_1.Evt.merge(ctx_2, [
        evtText_2,
        evtAge_2,
        lib_1.Evt.from(pr_2)
    ]), [initData_1]);
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var text, age;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pr_2];
                case 1:
                    _a.sent();
                    text = "Hello world";
                    evtText_2.post(text);
                    age = 99;
                    evtAge_2.post(age);
                    ctx_2.done();
                    evtAge_2.post(4444);
                    assert_1.assert(inDepth_1.same(arr_2, [
                        [initData_1, { "isFirst": true }, 0],
                        [null, { "isFirst": false, "data": null }, 1],
                        [text, { "isFirst": false, "data": text }, 2],
                        [age, { "isFirst": false, "data": age }, 3]
                    ]));
                    return [2 /*return*/];
            }
        });
    }); })();
}
setTimeout(function () { return console.log("PASS"); }, 0);
//# sourceMappingURL=test72.js.map