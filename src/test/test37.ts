/*
import { Evt } from "../lib";

const id = <T>(x: T) => x;

type Circle = {
    type: "CIRCLE";
    radius: number;
};

type Square = {
    type: "SQUARE";
    sideLength: number;
};

type Shape = Circle | Square;

function mustResolve<T>(p: Promise<T>, expectedResolvedValue: T){

    let timer= setTimeout(()=> console.assert(false, "did not resolve"), 0);

    p.then(resolvedValue=> {
        console.assert(resolvedValue === expectedResolvedValue);
        clearTimeout(timer);
    });

}

const matchCircle = (shape: Shape): shape is Circle =>
    shape.type === "CIRCLE";

const evtShape = new Evt<Shape>();

const prCircle = evtShape.attachOnceExtract_(
    shape => matchCircle(shape) ? [shape] : null,
    circle => console.assert(circle.type === "CIRCLE")
);
id<Promise<Circle>>(prCircle);


const prRadius= evtShape.attachExtract_(
    shape => shape.type === "CIRCLE" ? [ shape.radius ] : null,
    radius => { id<number>(radius); }
);
id<Promise<number>>(prRadius);

const prBigCircle = evtShape.attachOnce_(
    shape => shape.type === "CIRCLE" && shape.radius > 100 ? [shape] : null,
    bigCircle => console.assert(bigCircle.radius > 100 )
);
id<Promise<Circle>>(prBigCircle);

const evtBigCircle = evtShape.createDelegate(
    shape => shape.type === "CIRCLE" && shape.radius > 100 ? [shape] : null
);
id<Evt<Circle>>(evtBigCircle);

const evtBigShape = evtShape.createDelegate(shape => {
    switch (shape.type) {
        case "SQUARE": return shape.sideLength > 100;
        case "CIRCLE": return shape.radius > 100;
    }
});
id<Evt<Shape>>(evtBigShape);

(async () => {

    {
        const bigCircle: Circle = {
            "type": "CIRCLE",
            "radius": 200
        };

        evtCircle.waitFor(0)
            .then(circle => circle === bigCircle)
            ;

        evtRadius.waitFor(0)
            .then(radius => bigCircle.radius === radius)
            ;

        evtShapeClone.waitFor(0)
            .then(shape => shape === bigCircle)
            ;

        evtBigCircle.waitFor(0)
            .then(circle => circle === bigCircle)
            ;

        evtBigShape.waitFor(0)
            .then(shape => shape === bigCircle)
            ;

        evtShape.post(bigCircle);

    }

    await new Promise(resolve => setTimeout(resolve, 0));

    {

        const smallCircle: Circle = {
            "type": "CIRCLE",
            "radius": 2
        };

        evtCircle.waitFor(0)
            .then(circle => circle === smallCircle)
            ;

        evtRadius.waitFor(0)
            .then(radius => smallCircle.radius === radius)
            ;

        evtShapeClone.waitFor(0)
            .then(shape => shape === smallCircle)
            ;

        evtBigCircle.waitFor(0)
            .then(
                () => console.assert(false, "1"),
                () => { }
            )
            ;

        evtBigShape.waitFor(0)
            .then(
                () => console.assert(false, "2"),
                () => { }
            )
            ;

        evtShape.post(smallCircle);

    }
    await new Promise(resolve => setTimeout(resolve, 0));

    {
        const bigSquare: Square = {
            "type": "SQUARE",
            "sideLength": 400
        };

        evtCircle.waitFor(0)
            .then(
                () => console.assert(false, "3"),
                () => { }
            )
            ;

        evtRadius.waitFor(0)
            .then(
                () => console.assert(false, "4"),
                () => { }
            )
            ;

        evtShapeClone.waitFor(0)
            .then(shape => shape === bigSquare)
            ;

        evtBigCircle.waitFor(0)
            .then(
                () => console.assert(false, "5"),
                () => { }
            )
            ;

        evtBigShape.waitFor(0)
            .then(shape => shape === bigSquare)
            ;

        evtShape.post(bigSquare);

    }

})();

setTimeout(() => console.log("PASS".green), 10);
*/