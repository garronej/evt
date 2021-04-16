

    export class Timeout extends Error {
        constructor(public readonly timeout: number) {
            super(`Evt timeout after ${timeout}ms`);
            Object.setPrototypeOf(this, new.target.prototype);
        }
    }