import { SyncEvent } from "../lib/index";

interface Animal {
    type: "CAT" | "SPIDER";
    cute: boolean;
    name: string;
}

interface Cat extends Animal {
    type: "CAT";
    cute: true;
}

//@ts-ignore: unused
interface Spider extends Animal {
    type: "SPIDER";
    cute: false;
}

const animals: Animal[] = [
    { "type": "CAT", "cute": true, "name": "boubou" },
    { "type": "SPIDER", "cute": false, "name": "spiderMan" },
    { "type": "CAT", "cute": true, "name": "miaou" },
    { "type": "SPIDER", "cute": false, "name": "aracnide" }
];


let cats = animals.filter(({ type }) => type === "CAT");
let spiders = animals.filter(({ type }) => type === "SPIDER");

let evtAnimal = new SyncEvent<Animal>();

evtAnimal.attach(
    animal => console.assert(spiders.shift() === animal)
);

evtAnimal.attachExtract(
    (animal: Animal): animal is Cat => animal.type === "CAT",
    "extractCats",
    cat => {

        console.assert(cats.shift() === cat);

        if (!cats.length) evtAnimal.detach("extractCats");

        console.log("PASS".green);

    }
);

(function main() {

    for (let animal of animals)
        evtAnimal.post(animal);


})();



