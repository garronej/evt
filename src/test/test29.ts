import { SyncEvent } from "../lib";


let evt= new SyncEvent<string>();


evt.attach(
    str=> str === "foo",
    str=> {



    }
);