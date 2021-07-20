
    export class Detached extends Error {
        constructor() {
            super(`Evt handler detached`);
            Object.setPrototypeOf(this, new.target.prototype);
        }
    }