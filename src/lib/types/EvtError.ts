export type EvtError = 
    EvtError.Timeout |
    EvtError.Detached
    ;

export namespace EvtError {

    export class Timeout extends Error {
        constructor(public readonly timeout: number) {
            super(`Evt timeout after ${timeout}ms`);
            Object.setPrototypeOf(this, new.target.prototype);
        }
    }

    export class Detached extends Error {
        constructor() {
            super(`Evt handler detached`);
            Object.setPrototypeOf(this, new.target.prototype);
        }
    }

    export class RacePromiseRejection extends Error {
        constructor(
            public readonly onRejectedArgument: any,
            public readonly i: number,
            public readonly racer: PromiseLike<any>
        ) {
            super(`Evt race error: Promise at index ${i} rejected`);
            Object.setPrototypeOf(this, new.target.prototype);
        }
    }

}

