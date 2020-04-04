
import { ObservableInDepth } from "../lib";
import { assert } from "../tools/typeSafety";
import { getPromiseAssertionApi} from "../tools/testing/getPromiseAssertionApi";

const { mustResolve } = getPromiseAssertionApi();

type Circle = { radius: number; color: "RED" | "WHITE" };

const circle: Circle = {
    "radius": 33,
    "color": "RED"
};

const obsCircle = new ObservableInDepth<Circle>(circle);

assert(circle !== obsCircle.val);
//^ Prints "false", circle have been copied.

circle.radius = 0;

assert(obsCircle.val.radius === 33);
//^ Prints "33"


mustResolve({
    "promise": obsCircle.evt.$attach(circle=> [circle.radius], ()=>{}),
    "expectedData": 0
});


obsCircle.update(circle); //Prints "0"

try { obsCircle.val.radius = -3; assert(false); } catch{  }

setTimeout(()=> console.log("PASS".green), 0);