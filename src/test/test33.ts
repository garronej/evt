
import { Evt } from "../lib";

type Circle = {
    type: "CIRCLE";
    radius: number;
};

type Square = {
    type: "SQUARE";
    sideLength: number;
};

type Shape = Circle | Square;

const matchCircle = (shape: Shape): shape is Circle => shape.type === "CIRCLE";

{

    const evtShape = new Evt<Shape>();

    const circle: Circle = {
        "type": "CIRCLE",
        "radius": 33
    };

    const square: Square = {
        "type": "SQUARE",
        "sideLength": 12
    };

    const evtCircle = evtShape.createDelegate(matchCircle);

    evtCircle.attachOnce(
        10,
        circle_ => console.assert(circle_ === circle)
    );

    evtShape.post(circle);

    evtCircle.waitFor(10)
        .then(
            ()=> console.assert(false),
            ()=> {}
        )
        ;

    evtShape.post(square);

}

{

    const evtShape = new Evt<Shape>();

    const smallCircle: Circle = {
        "type": "CIRCLE",
        "radius": 3
    };

    const bigCircle: Circle = {
        "type": "CIRCLE",
        "radius": 10
    };


    const evtLargeShape = evtShape.createDelegate(
        shape => {
            switch (shape.type) {
                case "CIRCLE": return shape.radius > 5;
                case "SQUARE": return shape.sideLength > 3;
            }
        }
    );


    evtLargeShape.waitFor(circle => circle === smallCircle, 10)
        .then(
            ()=> console.assert(false),
            ()=> {}
        )
        ;


    evtLargeShape.waitFor(circle => circle === bigCircle, 10);

    evtShape.post(smallCircle);

    evtShape.post(bigCircle);

}

setTimeout(()=> console.log("PASS".green), 100);
