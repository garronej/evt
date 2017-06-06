# ts-events-extended

Add method attachOnce for handler to be called only one time.
Add postCount attribute to tell how many time the event have been triggered.

#install

````shell
npm install garronej/ts-events-extended
````

#usage

````JavaScript
import { 
    SyncEvent, 
    AsyncEvent, 
    VoidSyncEvent, 
    VoidAsyncEvent 
} from "ts-events-extended";

let evt = new SyncEvent<string>();

evt.attach(data => console.log("Post: ", data));
evt.attachOnce(data => console.log("Post once: ", data));

console.log("Post count: ", evt.postCount);

evt.post("tick");
evt.post("tick");

console.log("Post count: ", evt.postCount);

````
* Output:
````shell
Post count:  0
Post:  tick
Post once:  tick
Post:  tick
Post count:  2
````

TODO: Attach once and attach should return the emmiter.
