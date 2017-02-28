"use strict";
let fs = require("fs");
let path = require("path");

let source = fs.readFileSync(
    path.join(__dirname, "SyncEventExt.ts"),
    { "encoding": "utf8" }
);

let sourceVoid = fs.readFileSync(
    path.join(__dirname, "VoidSyncEventExt.ts"),
    { "encoding": "utf8" }
);

source= source.replace(/SyncEvent/g, "AsyncEvent");
sourceVoid= sourceVoid.replace(/SyncEvent/g, "AsyncEvent");

let outDir = path.join(__dirname, "..", "generated");

if (!fs.existsSync(outDir))
    fs.mkdirSync(outDir);

fs.writeFileSync(
    path.join(outDir, "AsyncEventExt.ts"),
    source,
    { "encoding": "utf8", "flag": "w" }
);

fs.writeFileSync(
    path.join(outDir, "VoidAsyncEventExt.ts"),
    sourceVoid,
    { "encoding": "utf8", "flag": "w" }
);
