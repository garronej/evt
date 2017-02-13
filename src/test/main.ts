import { 
    SyncEvent, 
    AsyncEvent, 
    VoidSyncEvent, 
    VoidAsyncEvent 
} from "../lib/index";

require("colors");

if (true) {

    let evt = new SyncEvent<string>();

    evt.attach(data => console.log("Post: ".green, data));
    evt.attachOnce(data => console.log("Post once: ".cyan, data));

    console.log("Post count: ", evt.postCount);

    evt.post("tick");
    evt.post("tick");
    evt.post("tick");
    evt.post("tick");
    evt.post("tick");

    console.log("Post count: ", evt.postCount);
}

console.log("=====");

if (true) {

    let evt = new AsyncEvent<string>();

    evt.attach(data => console.log("Post: ".green, data));
    evt.attachOnce(data => console.log("Post once: ".cyan, data));

    console.log("Post count: ", evt.postCount);

    evt.post("tick");
    evt.post("tick");
    evt.post("tick");
    evt.post("tick");
    evt.post("tick");

    console.log("Post count: ", evt.postCount);
}

console.log("=====");

if (true) {

    let evt = new VoidSyncEvent();

    evt.attach(() => console.log("Post!".green));
    evt.attachOnce(() => console.log("Post Once!"));

    console.log("Post count: ", evt.postCount);

    evt.post();
    evt.post();
    evt.post();
    evt.post();
    evt.post();

    console.log("Post count: ", evt.postCount);
}

console.log("=====");

if (true) {

    let evt = new VoidAsyncEvent();

    evt.attach(() => console.log("Post!".green));
    evt.attachOnce(() => console.log("Post once!".cyan));

    console.log("Post count: ", evt.postCount);

    evt.post();
    evt.post();
    evt.post();
    evt.post();
    evt.post();

    console.log("Post count: ", evt.postCount);
}







