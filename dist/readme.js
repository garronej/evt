"use strict";
/*

#ts-events-extended

A library intended to be a replacement for node's EventEmitter
featuring type safety and making use promises.

Similar to Qt signal/slot or C# events.

Target es3, will run anywhere including in the browser ( with browserify ).
Will transpile used in projects with old version of typescript ( 2.1 and up ).

#History

This project was originally a fork aimed to add features to "ts-events".
Along way it has been re-implemented from scratch keeping only the
core design philosophy of it's parent.
AsyncEvent and QueuedEvent have been scraped out focusing only on the SyncEvent class.


*/
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
var _a;
exports.__esModule = true;
var lib_1 = require("./lib");
{
    var evtText = new lib_1.Evt();
    //Unlike in node's events we use a different instance of SyncEvent
    //for every event type
    var evtTime = new lib_1.Evt();
    evtText.attach(function (text) { return console.log(text); });
    evtTime.attachOnce(function (time) { return console.log(time); });
    evtText.post("hi!");
    // at this point, "hi!" have been printed to the console.
    evtTime.post(123);
    // at this point, "123" have been printed to the console.
    evtTime.post(1234);
    //Nothing was printed to the console. ( attachOnce )
}
/*
Exact equivalent with node's EventEmitter:
*/
var events_1 = require("events");
{
    var eventEmitter = new events_1.EventEmitter();
    eventEmitter.on("text", function (text) { return console.log(text); });
    eventEmitter.on("time", function (time) { return console.log(time); });
    eventEmitter.emit("text", "hi!");
    eventEmitter.emit("time", 123);
}
/*
# Uses of Promise, waiting until the next event is posted.
*/
{
    var evtText_1 = new lib_1.Evt();
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, evtText_1.waitFor()];
                case 1:
                    text = _a.sent();
                    console.log(text);
                    return [2 /*return*/];
            }
        });
    }); })();
    evtText_1.post("Hi");
}
//It is possible to set how long we wait for the next event before
//the promise returned by waitFor reject.
var lib_2 = require("./lib");
{
    var evtText_2 = new lib_1.Evt();
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var text, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, evtText_2.waitFor(500)];
                case 1:
                    text = _a.sent();
                    console.log(text);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.assert(error_1 instanceof lib_2.EvtError.Timeout);
                    //Error can be of type EvtError.Detached if the handler
                    //was detached before the promise returned by waitFor have resolved.
                    console.log("TIMEOUT!");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })();
    //A random integer between 0 and 1000
    var timeout = ~~(Math.random() * 1000);
    //There is a fifty-fifty chance "Hi!" is printed to the console
    //else "TIMEOUT!" is printed.
    setTimeout(function () { return evtText_2.post("Hi!"); }, timeout);
}
//Filtering events.
/*
Matcher function are used to attach a callback that will handle
only eventData that satisfies certain properties:
*/
{
    var evtText = new lib_1.Evt();
    evtText.attach(function (text) { return text.startsWith("H"); }, //A matcher function take an argument of type T ( here string ) and returns a boolean.
    function (//A matcher function take an argument of type T ( here string ) and returns a boolean.
    text) {
        console.assert(text.startsWith("H"));
        console.log(text);
    });
    //Nothing will be printed to the console.
    evtText.post("Bonjour");
    //"Hi!" will be printed to the console.
    evtText.post("Hi!");
}
var matchCircle = function (shape) {
    return shape.type === "CIRCLE";
};
{
    var evtShape = new lib_1.Evt();
    evtShape.attach(matchCircle, function (shape) {
        //When the matcher function passed to attach is a Type Guard
        //the type of the event data will be inferred.
        //Here shape is of type Circle thus the TSC does not complain if we try to access 
        //the radius property.
        console.log(shape.radius);
    });
    //Nothing will be printed to the console.
    evtShape.post({
        "type": "SQUARE",
        "sideLength": 3
    });
    //"33" Will be printed to the console.
    evtShape.post({
        "type": "CIRCLE",
        "radius": 33
    });
}
/* Combining Matcher and waitFor, attachOnce */
{
    var evtShape = new lib_1.Evt();
    evtShape.attachOnce(function (shape) { return (shape.type === "SQUARE" &&
        shape.sideLength > 20); }, function (_a) {
        var sideLength = _a.sideLength;
        return console.log("length: " + sideLength);
    });
    evtShape.waitFor(matchCircle)
        .then(function (circle) { return console.log("radius: " + circle.radius); });
    var circle = {
        "type": "CIRCLE",
        "radius": 33
    };
    //"radius: 33" will be printed to the console.
    evtShape.post(circle);
    //Nothing will be printed to the console, the promise returned by waitFor has already resolved.
    evtShape.post(circle);
    //Nothing will be printed, the side length is too short
    evtShape.post({
        "type": "SQUARE",
        "sideLength": 12
    });
    evtShape.post({
        "type": "SQUARE",
        "sideLength": 21
    });
    //"length: 21" have been  printed to the console.
    //Noting will be printed, attachOnce's callback function have already been invoked.
    evtShape.post({
        "type": "SQUARE",
        "sideLength": 44
    });
}
/*
#No arguments
A TypeScript annoyance: when you create an event with a void argument, TypeScript forces you to pass 'undefined' to post().
To overcome this, we added VoidSyncEvent class.
*/
var lib_3 = require("./lib");
{
    var evtSocketConnect = new lib_3.VoidEvt();
    evtSocketConnect.attach(function () { return console.log("SOCKET CONNECTED"); });
    evtSocketConnect.post();
    //"SOCKET CONNECTED" have been printed to the console.
}
//Handler priority.
//The handlers callback functions are invoked in the order they have been attached
//unless attachPrepend is used.
{
    var evtConnect = new lib_3.VoidEvt();
    evtConnect.attach(function () { return console.log("B"); });
    evtConnect.attach(function () { return console.log("C"); });
    evtConnect.attachPrepend(function () { return console.log("A"); });
    evtConnect.post();
    //"A", "B", "C" is printed to the console.
}
//Extracting events.
//To handle hedge cases that haven't been anticipated without having to rethink the all model
//we provide a way to extract particular event.
{
    var evtCircle = new lib_1.Evt();
    evtCircle.attach(function (circle) {
        console.assert(circle.radius > 0);
    });
    evtCircle.attachExtract(function (_a) {
        var radius = _a.radius;
        return radius <= 0;
    }, function (_a) {
        var radius = _a.radius;
        return console.log("malformed circle with radius: " + radius + " extracted");
    });
}
//Detaching events
{
    var evtText = new lib_1.Evt();
    //detach with no argument will detach all handlers (attach, attachOnce, waitFor... )
    evtText.detach();
}
//To detach a particular handler for which we have the reference of the callback function:
{
    var evtText = new lib_1.Evt();
    var callback_1 = function (_text) { };
    evtText.attach(callback_1);
    (_a = evtText.getHandlers().find(function (handler) { return handler.callback === callback_1; })) === null || _a === void 0 ? void 0 : _a.detach();
}
//By far the preferred way of detaching an handler is by using "boundTo" context 
//as more often that not we don't keep the reference of the callback function.
{
    var evtText = new lib_1.Evt();
    //boundTo can be anything but a number, a callable function (i.e. not a constructor), undefined  or null.
    var boundTo = [];
    evtText.attach(boundTo, function (_text) { });
    evtText.attachOnce(boundTo, function (_text) { });
    evtText.detach(boundTo);
}
//A more advanced example here detaching all handler that have a given matcher:
{
    var evtShape = new lib_1.Evt();
    evtShape.attach(matchCircle, function (_circle) { });
    evtShape.attachOnce(matchCircle, function (_circle) { });
    evtShape.waitFor(matchCircle)
        .then(function (_circle) { });
    //waitFor will no reject once detached as no timeout have been specified.
    evtShape.getHandlers()
        .filter(function (_a) {
        var matcher = _a.matcher;
        return matcher === matchCircle;
    })
        .forEach(function (_a) {
        var detach = _a.detach;
        return detach();
    });
}
//Misc
{
    var evtText = new lib_1.Evt();
    //Number of type post() have been called.
    var n = evtText.postCount;
    console.assert(n === 0);
    //A SyncEvent<Handler<string>> that track when handler are attached to evt.
    evtText.evtAttach;
}
// Combining Once, Prepend, matcher, timeout and boundTo
/*

Large number of methods combining Once, Prepend are exposed.

![Screenshot 2020-02-06 at 21 43 27](https://user-images.githubusercontent.com/6702424/73977452-b3125a80-492a-11ea-9657-4434a4c21d29.png)


For each of those methods a large number of overload are defined
so that you can combine matcher, timeout or boundTo.

![Screenshot 2020-02-06 at 21 43 59](https://user-images.githubusercontent.com/6702424/73977365-865e4300-492a-11ea-8e51-c304ade3fa41.png)


*/
//When we are not sure if the handlers have been attached already
//postOnceMatched can be used.
{
    var evtText = new lib_1.Evt();
    evtText.postOnceMatched("Foo Bar");
    //"before"\n"Foo Bar" will be printed to the console.
    evtText.attachOnce(function (text) { return console.log(text); });
    console.log("before");
}
//ObservableImpl is a class that allow to track mutation on
//a particular data type.
var lib_4 = require("./lib");
{
    var obsText_1 = new lib_4.ObservableImpl("foo");
    console.assert(obsText_1.value === "foo");
    obsText_1.evtChange.attach(function (newValue) {
        console.assert(newValue === obsText_1.value);
        console.log("newValue: " + newValue);
    });
    //Nothing will be printed to the console as the value did not change.
    obsText_1.onPotentialChange("foo");
    obsText_1.onPotentialChange("bar");
    //"newValue: bar" have been printed to the console.
    console.assert(obsText_1.value === "bar");
    //ObservableImpl is assignable to Observable but
    //Observable is missing the onPotentialChange method.
    //It is used to expose an observable that should not be
    //modified by the user.
    var exposedObsText = obsText_1;
    exposedObsText.value;
    exposedObsText.evtChange;
}
//Edge cases: 
{
    var evtText_3 = new lib_1.Evt();
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var text1, text2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, evtText_3.waitFor()];
                case 1:
                    text1 = _a.sent();
                    return [4 /*yield*/, evtText_3.waitFor()];
                case 2:
                    text2 = _a.sent();
                    console.log(text1 + " " + text2);
                    return [2 /*return*/];
            }
        });
    }); })();
    evtText_3.post("FOO");
    evtText_3.post("BAR");
    //"FOO BAR" is printed to the console ( Voodoo involved )
}
/*

To track changes of the data we use a library that we have build in house called "ts-event-extended"

node's EventEmitter was not designed to support types so we build our onw alternative.

*/
