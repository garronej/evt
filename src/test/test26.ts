import { SyncEvent } from "../lib";
import { EventEmitter } from "events";

let success = 0;

(() => {

    let e = new EventEmitter();

    let evt = new SyncEvent<string>(e, "click");


    evt.waitFor(200).catch(() => console.assert(false)).then(
        str => {

            console.assert(str === "foo");

            success++;

        }
    );

    e.emit("click", "foo");


})();

(() => {

    let e = new EventEmitter();

    let evt = new SyncEvent<string>(e, "click", (a, b)=> a + b);

    evt.waitFor(200).then(
        str => {

            console.assert(str === "foobar", "m");

            success++;

        }
    );

    e.emit("click", "foo", "bar");

})();



setTimeout(() => {

    console.assert(success === 2);

    console.log("PASS".green);

}, 2000);







