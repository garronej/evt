

/*

#ts-events-extended

A library intended to be a replacement for node's EventEmitter
featuring type safety and making use promises.

Similar to Qt signal/slot or C# events. 

Target es3, will run anywhere including in the browser ( with browserify ).

#History

This project was originally a fork aimed to add features to "ts-events".
Along way it has been re-implemented from scratch keeping only the 
core design philosophy of it's parent. 
AsyncEvent and QueuedEvent have been scraped out focusing only on the SyncEvent class.


*/


import { SyncEvent } from "./lib";

{

    const evtText = new SyncEvent<string>();
    //Unlike in node's events we use a different instance of SyncEvent
    //for every event type
    const evtTime = new SyncEvent<number>();

    evtText.attach(text => console.log(text));
    evtTime.attachOnce(time => console.log(time));

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

import { EventEmitter } from "events";

{

    const eventEmitter = new EventEmitter();

    eventEmitter.on("text", text => console.log(text));
    eventEmitter.on("time", time => console.log(time));

    eventEmitter.emit("text", "hi!");
    eventEmitter.emit("time", 123);


}

/*
# Uses of Promise, waiting until the next event is posted.
*/

{

    const evtText = new SyncEvent<string>();

    (async ()=>{

        //waitFor return a promise that will resolve next time 
        //post() is invoked on evtText.
        const text = await evtText.waitFor();

        console.log(text);

    })();

    evtText.post("Hi");

}

//It is possible to set how long we wait for the next event before
//the promise returned by waitFor reject.

import {  EvtError } from "./lib";

{

    const evtText = new SyncEvent<string>();


    (async ()=>{


        try{
        
            const text = await evtText.waitFor(500);

            console.log(text);

        }catch(error){

            console.assert(error instanceof EvtError.Timeout);
            //Error can be of type EvtError.Detached if the handler
            //was detached before the promise returned by waitFor have resolved.

            console.log("TIMEOUT!");

        }


    })();

    //A random integer between 0 and 1000
    const timeout= ~~(Math.random() * 1000);

    //There is a fifty-fifty chance "Hi!" is printed to the console
    //else "TIMEOUT!" is printed.
    setTimeout(
        ()=> evtText.post("Hi!"), 
        timeout
    );


}


//Filtering events.

/*
Matcher function are used to attach a callback that will handle 
only eventData that satisfies certain properties:
*/

{

    const evtText= new SyncEvent<string>();

    evtText.attach(
        text=> text.startsWith("H"), //A matcher function take an argument of type T ( here string ) and returns a boolean.
        text=> {
            console.assert( text.startsWith("H") );
            console.log(text);
        }
    );

    //Nothing will be printed to the console.
    evtText.post("Bonjour");

    //"Hi!" will be printed to the console.
    evtText.post("Hi!");

}

/* Using type guard function as matcher function */

type Circle = {
    type: "CIRCLE";
    radius: number;
}


type Square = {
    type: "SQUARE";
    sideLength: number;
}

type Shape = Circle | Square;

const matchCircle = (shape: Shape): shape is Circle =>
    shape.type === "CIRCLE"
    ;

{


    const evtShape = new SyncEvent<Shape>();

    evtShape.attach(
        matchCircle,
        shape => {

            //When the matcher function passed to attach is a Type Guard
            //the type of the event data will be inferred.
            //Here shape is of type Circle thus the TSC does not complain if we try to access 
            //the radius property.
            console.log(shape.radius);


        }
    );

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

    const evtShape = new SyncEvent<Shape>();

    evtShape.attachOnce(
        (shape): shape is Square => (
            shape.type === "SQUARE" &&
            shape.sideLength > 20
        ),
        ({ sideLength })=> console.log(`length: ${sideLength}`)
    );

    evtShape.waitFor(matchCircle)
        .then(circle => console.log(`radius: ${circle.radius}`))
        ;

    
    const circle: Circle = {
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

import { VoidSyncEvent } from "./lib";


{

    const evtSocketConnect = new VoidSyncEvent();

    evtSocketConnect.attach(() => console.log("SOCKET CONNECTED"));


    evtSocketConnect.post();
    //"SOCKET CONNECTED" have been printed to the console.


}



//Handler priority.
//The handlers callback functions are invoked in the order they have been attached
//unless attachPrepend is used.

{

    const evtConnect = new VoidSyncEvent();

    evtConnect.attach(() => console.log("B"));
    evtConnect.attach(() => console.log("C"));

    evtConnect.attachPrepend(() => console.log("A"));

    evtConnect.post();
    //"A", "B", "C" is printed to the console.

}

//Extracting events.
//To handle hedge cases that haven't been anticipated without having to rethink the all model
//we provide a way to extract particular event.


{

    const evtCircle = new SyncEvent<Circle>();


    evtCircle.attach(
        circle => {
            console.assert(circle.radius > 0);
        }
    );

    evtCircle.attachExtract(
        ({ radius }) => radius <= 0,
        ({ radius }) => console.log(`malformed circle with radius: ${radius} extracted`)
    );

}

//Detaching events

{

    const evtText = new SyncEvent<string>();

    //detach with no argument will detach all handlers (attach, attachOnce, waitFor... )
    evtText.detach();

}




//To detach a particular handler for which we have the reference of the callback function:
{

    const evtText = new SyncEvent<string>();

    const callback = (_text: string) => { };

    evtText.attach(callback);

    evtText.getHandlers().find(handler => handler.callback === callback)?.detach();

}

//By far the preferred way of detaching an handler is by using "boundTo" context 
//as more often that not we don't keep the reference of the callback function.
{

    const evtText = new SyncEvent<string>();

    //boundTo can be anything but a number, a callable function (i.e. not a constructor), undefined  or null.
    const boundTo = [];

    evtText.attach(
        boundTo,
        _text => { }
    );

    evtText.attachOnce(
        boundTo,
        _text => { }
    );

    evtText.detach(boundTo);

}

//A more advanced example here detaching all handler that have a given matcher:
{

    const evtShape = new SyncEvent<Shape>();

    evtShape.attach(
        matchCircle,
        _circle => { }
    );
    evtShape.attachOnce(
        matchCircle,
        _circle => { }
    );

    evtShape.waitFor(matchCircle)
        .then(_circle => { })
        ;

    //waitFor will no reject once detached as no timeout have been specified.
    evtShape.getHandlers()
        .filter(({ matcher }) => matcher === matchCircle)
        .forEach(({ detach }) => detach())
        ;

}

//Misc
{

    const evtText = new SyncEvent<string>();

    //Number of type post() have been called.
    const n = evtText.postCount;

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


    const evtText = new SyncEvent<string>();

    evtText.postOnceMatched("Foo Bar");

    //"before"\n"Foo Bar" will be printed to the console.
    evtText.attachOnce(text=> console.log(text));

    console.log("before");

}

//ObservableImpl is a class that allow to track mutation on
//a perticular data type.

import { Observable, ObservableImpl } from "./lib";

{

    const obsText= new ObservableImpl<string>("foo");

    console.assert(obsText.value === "foo");

    obsText.evtChange.attach(
        newValue=> {

            console.assert(newValue === obsText.value);

            console.log(`newValue: ${newValue}`);

        }
    );

    //Nothing will be printed to the console as the value did not change.
    obsText.onPotentialChange("foo");


    obsText.onPotentialChange("bar");
    //"newValue: bar" have been printed to the console.

    console.assert(obsText.value === "bar");


    //ObservableImpl is assignable to Observable but
    //Observable is missing the onPotentialChange method.
    //It is used to expose an observable that should not be
    //modified by the user.
    const exposedObsText: Observable<string> = obsText;




}




































//Edge cases: 

{


    const evtText = new SyncEvent<string>();

    (async ()=>{

        const text1= await evtText.waitFor();

        const text2 = await evtText.waitFor(); 

        console.log(`${text1} ${text2}`);


    })();

    evtText.post("FOO");
    evtText.post("BAR");

    //"FOO BAR" is printed to the console ( Voodoo involved )





}

















/*

To track changes of the data we use a library that we have build in house called "ts-event-extended"

node's EventEmitter was not designed to support types so we build our onw alternative.

*/









//Filtering event: It is possible to attach an handler with 
//an matcher function.

{

    const evtPerson = new SyncEvent<Person>();


    evtPerson.attach(
        person => person.age > 30,
        person => {
            //This handler will be invoked only when person.age > 30 are posted.
        }
    );

    evtPerson.attach(
        Person.Student.match,
        person => {
            //When the matcher function passed to attach is a Type Guard
            //the type of the event data will be inferred.
            //Here person is of type Person.Student.
            person.grades;
        }
    );

    //matcher can (and are most useful) used with attachOnce of waitFor

    evtPerson.attachOnce(
        ({ name }) => name === "Bob",
        bob => {
            //This handler will be called only one time,
            //when a person with name "Bob" is posted.
        }
    );

    (async () => {


        //Wait for the next teacher to be posted.
        const teacher: Person.Teacher = await evtPerson.waitFor(Person.Teacher.match);

        assert(typeof teacher.subject === "string");


        teacher.subject;

        //wait for the the next student to have a perfect score in math
        //and get he's name.
        const { name } = await evtPerson.waitFor(
            person => (
                Person.Student.match(person) &&
                person.grades.maths === 20
            )
        );

        assert(typeof name === "string");

    })();

}



//Evt that does not post any data:










