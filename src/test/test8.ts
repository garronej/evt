import { Evt } from "../lib/index";

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

        console.assert(this.intro + tp.sex === "this person is female", "m1");

        testCount++;

    }
}

let tpi= new TypedPersonIntro();


let evt = new Evt<Person>();

evt.attach(isTyped, tpi, tpi.introduce);

console.assert(evt.getHandlers().length === 1,"m2");

evt.post({
    "name": "Sienna",
    "age": 22,
    "sex": "female"
});

evt.detach(tpi);

console.assert( evt.getHandlers().length === 0, "m3");

evt.post({
    "name": "Antonin",
    "age": 21,
    "sex": "male"
});


evt.attach(isTyped, tpi, tpi.introduce);

console.assert(evt.getHandlers().length === 1,"m4");

evt.post({
    "name": "Sienna",
    "age": 22,
    "sex": "female"
});


evt.getHandlers().find(({ matcher })=> matcher === isTyped )!.detach();

console.assert( evt.getHandlers().length === 0, "m5");

evt.post({
    "name": "Antonin",
    "age": 21,
    "sex": "male"
});


evt.attach(isTyped, tpi, tpi.introduce);

console.assert(evt.getHandlers().length === 1, "m6");

evt.post({
    "name": "Sienna",
    "age": 22,
    "sex": "female"
});

evt.getHandlers().find(({ callback })=> callback === tpi.introduce )!.detach();

console.assert( evt.getHandlers().length === 0, "m7");

evt.post({
    "name": "Antonin",
    "age": 21,
    "sex": "male"
});


console.assert(testCount === 3, "m8");

console.log("PASS".green);