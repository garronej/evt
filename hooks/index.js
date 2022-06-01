"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
/*
NOTE: In theory react should be a peer dependency
instead of a dev dependency.
But given that /hook is just a plugin for using Evt
with react we don't want to require react to be
installed to install Evt.
*/
var useEvt_1 = require("./useEvt");
__createBinding(exports, useEvt_1, "useEvt");
var useRerenderOnStateChange_1 = require("./useRerenderOnStateChange");
__createBinding(exports, useRerenderOnStateChange_1, "useRerenderOnStateChange");
//# sourceMappingURL=index.js.map