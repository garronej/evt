

const fs = require("fs");
const { join } = require("path");


//const str = `
//
//
///** A controller object that allows you to abort one or more DOM requests as and when desired. */
//export interface AbortController {
//    /**
//     * Returns the AbortSignal object associated with this object.
//     */
//    readonly signal: AbortSignal;
//    /**
//     * Invoking this method will set this object's AbortSignal's aborted flag and signal to any observers that the associated activity is to be aborted.
//     */
//    abort(): void;
//}
//
//declare var AbortController: {
//    prototype: AbortController;
//    new(): AbortController;
//};
//
//export interface AbortSignalEventMap {
//    "abort": Event;
//}
//
//declare var onblur: ((this: Window, ev: FocusEvent) => any) | null;
//declare var oncancel: ((this: Window, ev: Event) => any) | null;
///**
// * Occurs when playback is possible, but would require further buffering.
// * @param ev The event.
// */
//declare var oncanplay: ((this: Window, ev: Event) => any) | null;
//declare var oncanplaythrough: ((this: Window, ev: Event) => any) | null;
///**
// * Fires when the contents of the object or selection have changed.
// * @param ev The event.
// */
//declare var onchange: ((this: Window, ev: Event) => any) | null;
///**
// * Fires when the user clicks the left mouse button on the object
// * @param ev The mouse event.
// */
//declare var onclick: ((this: Window, ev: MouseEvent) => any) | null;
//declare var onclose: ((this: Window, ev: Event) => any) | null;
//
//
//`;



const str= fs.readFileSync(join(__dirname,"./lib.dom.ts")).toString("utf8");


const newArr = []

let stateRemove = false;

for (const line of str.split("\n")) {

    if (!stateRemove) {

        if (line.startsWith("declare ")) {

            stateRemove = true;

        }

    } else {

        if (!line.match(/^[}\s]/) && !line.startsWith("declare ")) {

            stateRemove = false;

        }

    }

    if (!stateRemove) {

        newArr.push(line);

    }
}

fs.writeFileSync(join(__dirname, "./lib.dom.curated.ts"), Buffer.from(newArr.join("\n")));

//console.log(newArr.join("\n"));



