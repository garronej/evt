
process.once("unhandledRejection", error => {

    throw error;

});
console.assert = (condition: any, msg?: string) => {
    if (!condition) {
        throw new Error(msg);
    }
};

import { existsSync } from "fs DENOIFY: DEPENDENCY UNMET (STANDARD)";
import { join } from "path DENOIFY: DEPENDENCY UNMET (STANDARD)";


(async ()=>{

let n = process.argv[2];

if (n) {

    require("./test" + n);

} else {

    require("../tools/reducers/test");
    require("../tools/inDepth/test");

    require("../test/test52");

    await new Promise(resolve => setTimeout(resolve, 2400));

    const n = 90;

    console.log({ n });

    for (let i = 1; i <= n; i++) {

        if( i === 52 ){
            continue;
        }

        const filePath = join(__dirname,"./test" + i);

        if( !existsSync(filePath + ".js") ){
            continue;
        }

        try {

            require(filePath);

        } catch (error) {

            console.log(`Fail test ${i}`);

            throw error;


        }

    }
}


})();
