
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

{

    const evtShape = new Evt<Shape>();

    /*
     * Only circle event are handled.
     * AND
     * to be handled circle must have a radius greater than 100
     * 
     * Pass the radius of such circle to the callback.
     */
    evtShape.$attach(
        shape => shape.type === "CIRCLE" && shape.radius > 100 ? 
            [ shape.radius ] : null,
        radius => console.log(`radius: ${radius}`) 
        //NOTE: The radius argument is inferred as being of type number!
    );

    //Nothing will be printed to the console, it's not a circle
    evtShape.post({
        "type": "SQUARE",
        "sideLength": 3
    });
    
    //Nothing will be printed to the console, The circle is too small.
    evtShape.post({
        "type": "CIRCLE",
        "radius": 3
    });
    
    //"radius 200" Will be printed to the console.
    evtShape.post({
        "type": "CIRCLE",
        "radius": 200
    });

}

{

    const evtText= new Evt<"TICK" | "END">();

    /*
     * Only handle events that are not "END".
     * If the event is "END", detach the handler.
     * Pass the event data string in lower cace to the callback.
     */
    evtText.$attach(
        text => text !== "END" ? [ text.toLowerCase() ] : "DETACH",
        text => console.log(text) 
    );

    //"tick" is printed to the console
    evtText.post("TICK");

    //Nothing is printed to the console, the handler is detached
    evtText.post("END");

    //Nothing is printed to the console the handler have been detached.
    evtText.post("TICK");

}

console.log("============");

{

    const evtText= new Evt<"TICK" | "END">();

    evtText.attach(
        text => [ text, text === "END" ? "DETACH" : null ],
        text => console.log(text) 
    );

    //"TICK" is printed to the console
    evtText.post("TICK");
    //"END" is printed to the console, the handler is detached.
    evtText.post("END");

    //Nothing is printed to the console the handler have been detached.
    evtText.post("TICK");

}