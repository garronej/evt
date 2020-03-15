
import { Evt, throttleTime } from "../lib";

//Type only test
if (1 + 0 === 2) {

    {

        let count = 0;
        const rate = 1000;
        let lastClick = Date.now() - rate;
        document.addEventListener('click', event => {
            if (Date.now() - lastClick >= rate) {
                count += event.clientX;
                console.log(count);
                lastClick = Date.now();
            }
        });

    }

    //clientX should be number
    Evt.from(document, "click")
        .pipe(
            throttleTime(1000),
            event => [event.clientX],
            [(clientX, count) => [count + clientX], 0]
        ).attach(count => console.log(count));

}

console.log("PASS".green);

