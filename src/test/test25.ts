import { SyncEvent } from "../lib";


let matcher = (object: Object): object is Array<any> => object instanceof Array;

let boundTo= {};

let timeout = 10;

function mkCb(expect: Object[]) {

    expect = [ ...expect ];

    let timer= setTimeout(()=> console.assert(!expect.length),2000);

    return (object: Object)=> {
        console.assert( expect.shift() === object );
        clearTimeout(timer);
    }

}

function mustResolve(p: Promise<Object>, data: Object){

    let timer= setTimeout(()=> console.assert(false), 2000);

    p.then(r=> {
        console.assert(r === data);
        clearTimeout(timer);
    });

}


function mustReject(p: Promise<Object>){

    let timer= setTimeout(()=> console.assert(false), 2000);

    p.then(r=> {
        console.assert(false);
    }).catch(()=> clearTimeout(timer));

}



(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= posts.filter( matcher );

    mustResolve(
        evt.attach(matcher, boundTo, timeout, mkCb(expect)), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();

(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= posts.filter( matcher );

    mustResolve(
        evt.attach(matcher, timeout, mkCb(expect)), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();

(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= posts.filter( matcher );

    mustResolve(
        evt.attach(matcher, mkCb(expect)), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();

(()=>{


    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= [ ...posts ];

    mustResolve(
        evt.attach(mkCb(expect)), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();

(()=>{


    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= [ ...posts ];

    mustResolve(
        evt.attach(timeout, mkCb(expect)), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();

(()=>{


    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= [ ...posts ];

    mustResolve(
        evt.attach(boundTo, mkCb(expect)), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();

(()=>{


    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= [ ...posts ];

    mustResolve(
        evt.attach(boundTo, timeout, mkCb(expect)), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();

(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    mustReject( evt.attach(matcher, timeout, ()=>{}) );

    posts.filter( object => !matcher(object) ).forEach(object => evt.post(object));

})();

(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    mustReject( evt.attach(matcher, boundTo, timeout, ()=>{}) );

    posts.filter( object => !matcher(object) ).forEach(object => evt.post(object));

})();

(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    mustReject( evt.attach(boundTo, timeout, ()=>{}) );


})();











(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= posts.filter( matcher );

    mustResolve(
        evt.attachPrepend(matcher, boundTo, timeout, mkCb(expect)), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();


(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= posts.filter( matcher );

    mustResolve(
        evt.attachPrepend(matcher, timeout, mkCb(expect)), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();


(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= posts.filter( matcher );

    mustResolve(
        evt.attachPrepend(matcher, mkCb(expect)), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();


(()=>{


    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= [ ...posts ];

    mustResolve(
        evt.attachPrepend(mkCb(expect)), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();


(()=>{


    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= [ ...posts ];

    mustResolve(
        evt.attachPrepend(timeout, mkCb(expect)), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();


(()=>{


    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= [ ...posts ];

    mustResolve(
        evt.attachPrepend(boundTo, mkCb(expect)), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();


(()=>{


    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= [ ...posts ];

    mustResolve(
        evt.attachPrepend(boundTo, timeout, mkCb(expect)), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();


(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    mustReject( evt.attachPrepend(matcher, timeout, ()=>{}) );

    posts.filter( object => !matcher(object) ).forEach(object => evt.post(object));

})();


(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    mustReject( evt.attachPrepend(matcher, boundTo, timeout, ()=>{}) );

    posts.filter( object => !matcher(object) ).forEach(object => evt.post(object));

})();


(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    mustReject( evt.attachPrepend(boundTo, timeout, ()=>{}) );


})();







(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= posts.filter( matcher );

    mustResolve(
        evt.attachOnce(matcher, boundTo, timeout, mkCb([ expect[0] ])), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();

(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= posts.filter( matcher );

    mustResolve(
        evt.attachOnce(matcher, timeout, mkCb([ expect[0] ])), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();

(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= posts.filter( matcher );

    mustResolve(
        evt.attachOnce(matcher, mkCb([expect[0]])), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();

(()=>{


    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= [ ...posts ];

    mustResolve(
        evt.attachOnce(mkCb([expect[0]])), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();

(()=>{


    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= [ ...posts ];

    mustResolve(
        evt.attachOnce(timeout, mkCb([expect[0]])), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();

(()=>{


    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= [ ...posts ];

    mustResolve(
        evt.attachOnce(boundTo, mkCb([expect[0]])), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();

(()=>{


    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= [ ...posts ];

    mustResolve(
        evt.attachOnce(boundTo, timeout, mkCb([expect[0]])), 
        expect[0]
    );

    posts.forEach(object => evt.post(object));


})();

(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    mustReject( evt.attachOnce(matcher, timeout, ()=>{}) );

    posts.filter( object => !matcher(object) ).forEach(object => evt.post(object));

})();

(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    mustReject( evt.attachOnce(matcher, boundTo, timeout, ()=>{}) );

    posts.filter( object => !matcher(object) ).forEach(object => evt.post(object));

})();

(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    mustReject( evt.attachOnce(boundTo, timeout, ()=>{}) );


})();








(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= posts.filter( matcher );

    mustResolve(
        evt.attachOnce(matcher, boundTo, timeout, mkCb([ expect[1] ])), 
        expect[1]
    );

    mustResolve(
        evt.attachOnceExtract(matcher, boundTo, timeout, mkCb([ expect[0] ])), 
        expect[0]
    );


    posts.forEach(object => evt.post(object));


})();

(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= posts.filter( matcher );

    mustResolve(
        evt.attachOnce(matcher, timeout, mkCb([ expect[1] ])), 
        expect[1]
    );

    mustResolve(
        evt.attachOnceExtract(matcher, timeout, mkCb([ expect[0] ])), 
        expect[0]
    );


    posts.forEach(object => evt.post(object));


})();

(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= posts.filter( matcher );

    mustResolve(
        evt.attachOnce(matcher, mkCb([expect[1]])), 
        expect[1]
    );

    mustResolve(
        evt.attachOnceExtract(matcher, mkCb([expect[0]])), 
        expect[0]
    );


    posts.forEach(object => evt.post(object));


})();

(()=>{


    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= [ ...posts ];

    mustResolve(
        evt.attachOnce(mkCb([expect[1]])), 
        expect[1]
    );

    mustResolve(
        evt.attachOnceExtract(mkCb([expect[0]])), 
        expect[0]
    );


    posts.forEach(object => evt.post(object));


})();

(()=>{


    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= [ ...posts ];

    mustResolve(
        evt.attachOnce(timeout, mkCb([expect[1]])), 
        expect[1]
    );

    mustResolve(
        evt.attachOnceExtract(timeout, mkCb([expect[0]])), 
        expect[0]
    );


    posts.forEach(object => evt.post(object));


})();

(()=>{


    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= [ ...posts ];

    mustResolve(
        evt.attachOnce(boundTo, mkCb([expect[1]])), 
        expect[1]
    );

    mustResolve(
        evt.attachOnceExtract(boundTo, mkCb([expect[0]])), 
        expect[0]
    );


    posts.forEach(object => evt.post(object));


})();

(()=>{


    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    let expect= [ ...posts ];

    mustResolve(
        evt.attachOnce(boundTo, timeout, mkCb([expect[1]])), 
        expect[1]
    );

    mustResolve(
        evt.attachOnceExtract(boundTo, timeout, mkCb([expect[0]])), 
        expect[0]
    );


    posts.forEach(object => evt.post(object));


})();

(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    mustReject( evt.attachOnceExtract(matcher, timeout, ()=>{}) );

    posts.filter( object => !matcher(object) ).forEach(object => evt.post(object));

})();

(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    let posts= [ [], [], [], "foo", {}, [] ];

    mustReject( evt.attachOnceExtract(matcher, boundTo, timeout, ()=>{}) );

    posts.filter( object => !matcher(object) ).forEach(object => evt.post(object));

})();

(()=>{

    let evt = new SyncEvent<Object>();

    //evt.enableTrace("evt");

    mustReject( evt.attachOnceExtract(boundTo, timeout, ()=>{}) );


})();










setTimeout(()=>{

    console.log("PASS".green);

}, 2100);