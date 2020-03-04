import "colors";

process.once("unhandledRejection", error => {

    throw error;

});

console.assert = (condition: any, msg?: string) => {
    if (!condition) {
        throw new Error(msg);
    }
};

let n = process.argv[2];

if (n) {

    require("./test" + n);

} else {

    const n = 57;

    console.log(`Running ${n} tests`);

    for (let i = 1; i <= n; i++) {

        try {
            require("./test" + i);
        } catch (error) {

            console.log(`Fail test ${i}`.red);

            throw error;


        }

    }
}