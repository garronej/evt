"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var EvtBase_2 = require("./EvtBase");
var EvtBaseProtected_1 = require("./EvtBaseProtected");
var EvtCompat = /** @class */ (function (_super) {
    __extends(EvtCompat, _super);
    function EvtCompat() {
        var _this_1 = _super !== null && _super.apply(this, arguments) || this;
        _this_1.evtAttach = new EvtBase_2.EvtBase();
        return _this_1;
    }
    EvtCompat.prototype.addHandler = function (attachParams, implicitAttachParams) {
        var handler = _super.prototype.addHandler.call(this, attachParams, implicitAttachParams);
        this.evtAttach.post(handler);
        return handler;
    };
    /** Wait until an handler that match the event data have been attached
     * return a promise that resolve with post count.
     * The event is not posted synchronously when the candidate handler attach.
     *  */
    EvtCompat.prototype.postOnceMatched = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.getHandlers().find(function (handler) { return handler.matcher(data); })) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.evtAttach.waitFor(function (handler) { return EvtBaseProtected_1.invokeMatcher(handler.matcher, data) !== null; })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.post(data)];
                }
            });
        });
    };
    EvtCompat.prototype.__createDelegate = function (matcher) {
        var evtDelegate = new EvtCompat();
        this.$attach(matcher, function (transformedData) { return evtDelegate.post(transformedData); });
        return evtDelegate;
    };
    EvtCompat.prototype.createDelegate = function (matcher) {
        return this.__createDelegate(function (data) { return EvtBaseProtected_1.invokeMatcher((matcher !== null && matcher !== void 0 ? matcher : (function () { return true; })), data); });
    };
    return EvtCompat;
}(EvtBase_2.EvtBase));
exports.EvtCompat = EvtCompat;
var VoidEvtCompat = /** @class */ (function (_super) {
    __extends(VoidEvtCompat, _super);
    function VoidEvtCompat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VoidEvtCompat.prototype.post = function () {
        return _super.prototype.post.call(this, undefined);
    };
    VoidEvtCompat.prototype.postOnceMatched = function () {
        return _super.prototype.postOnceMatched.call(this, undefined);
    };
    return VoidEvtCompat;
}(EvtCompat));
exports.VoidEvtCompat = VoidEvtCompat;