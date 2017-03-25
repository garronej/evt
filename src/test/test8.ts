import {
    SyncEvent
} from "../lib/index";

require("colors");

export interface Person {
    name: string;
    age: number;
    [prom: string]: any;
}

export interface TypedPerson extends Person {
    sex: "male" | "female";
}

export function isTyped(p: Person): p is TypedPerson {
    return p.sex ? true: false;
}

let testCount= 0;


export class TypedPersonIntro {


    private intro= "this person is ";

    public introduce( tp: TypedPerson): void{

        console.assert(this.intro + tp.sex === "this person is female");

        testCount++;

    }
}

let tpi= new TypedPersonIntro();


let evt = new SyncEvent<Person>();

evt.attach(isTyped, tpi, tpi.introduce);

console.assert(evt.handlerCount === 1);

evt.post({
    "name": "Sienna",
    "age": 22,
    "sex": "female"
});

evt.detach(tpi);

console.assert( evt.handlerCount === 0);

evt.post({
    "name": "Antonin",
    "age": 21,
    "sex": "male"
});


evt.attach(isTyped, tpi, tpi.introduce);

console.assert(evt.handlerCount === 1);

evt.post({
    "name": "Sienna",
    "age": 22,
    "sex": "female"
});


evt.detach({ "matcher": isTyped } );

console.assert( evt.handlerCount === 0);

evt.post({
    "name": "Antonin",
    "age": 21,
    "sex": "male"
});


evt.attach(isTyped, tpi, tpi.introduce);

console.assert(evt.handlerCount === 1);

evt.post({
    "name": "Sienna",
    "age": 22,
    "sex": "female"
});

evt.detach(tpi.introduce);

console.assert( evt.handlerCount === 0);

evt.post({
    "name": "Antonin",
    "age": 21,
    "sex": "male"
});


console.assert(testCount === 3);

console.log("PASS".green);