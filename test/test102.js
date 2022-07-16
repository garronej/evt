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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
var log = global.console.log;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var timer, console, evtStr, it, it_1, it_1_1, str, e_1_1;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                timer = setTimeout(function () {
                    (0, assert_1.assert)(false);
                }, 500);
                console = { "log": function (str) { return console.stdOut += "".concat(str); }, "stdOut": "" };
                evtStr = lib_1.Evt.create();
                it = evtStr.getAsyncIterable(60);
                setTimeout(function () {
                    evtStr.post("one");
                    evtStr.post("two");
                    evtStr.post("three");
                    it.ctx.done();
                }, 0);
                it.ctx.evtDoneOrAborted.attachOnce(function (event) {
                    if (event.type === "ABORTED") {
                        var error = event.error;
                        if (error instanceof lib_1.TimeoutEvtError) {
                            console.log("TIMEOUT");
                        }
                        else {
                            console.log("Aborter: ".concat(error.message));
                        }
                        return;
                    }
                    console.log("DONE");
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, 8, 13]);
                it_1 = __asyncValues(it);
                _b.label = 2;
            case 2: return [4 /*yield*/, it_1.next()];
            case 3:
                if (!(it_1_1 = _b.sent(), !it_1_1.done)) return [3 /*break*/, 6];
                str = it_1_1.value;
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
            case 4:
                _b.sent();
                console.log(str);
                _b.label = 5;
            case 5: return [3 /*break*/, 2];
            case 6: return [3 /*break*/, 13];
            case 7:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 13];
            case 8:
                _b.trys.push([8, , 11, 12]);
                if (!(it_1_1 && !it_1_1.done && (_a = it_1.return))) return [3 /*break*/, 10];
                return [4 /*yield*/, _a.call(it_1)];
            case 9:
                _b.sent();
                _b.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 12: return [7 /*endfinally*/];
            case 13:
                console.log("loop_end");
                (0, assert_1.assert)(console.stdOut === "DONEonetwothreeloop_end");
                clearTimeout(timer);
                (0, assert_1.assert)(evtStr.getHandlers().length === 0);
                log("PASS");
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=test102.js.map