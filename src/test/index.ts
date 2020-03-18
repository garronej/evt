import "colors";


process.once("unhandledRejection", error => {

    throw error;

});
console.assert = (condition: any, msg?: string) => {
    if (!condition) {
        throw new Error(msg);
    }
};

import { existsSync } from "fs";
import { join } from "path";

let n = process.argv[2];

if (n) {

    require("./test" + n);

} else {

    const n = 67;

    for (let i = 1; i <= n; i++) {

        const filePath = join(__dirname,"./test" + i);

        if( !existsSync(filePath + ".js") ){
            continue;
        }

        try {

            require(filePath);

        } catch (error) {

            console.log(`Fail test ${i}`.red);

            throw error;


        }

    }
}