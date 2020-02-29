
import { overwriteReadonlyProp } from "./overwriteReadonlyProp";

export class Deferred<T> {

    public readonly pr: Promise<T>;

    /** NOTE: Does not need to be called bound to instance*/
    public readonly resolve: (value: T)=> void;
    public readonly reject: (error: any)=> void;

    constructor() {

        let resolve!: (value: T)=> void;
        let reject!: (error: any)=> void;

        this.pr = new Promise<T>(
            (resolve_, reject_) => {

                resolve = value => {

                    this.setIsPendingToFalse();

                    resolve_(value);

                };

                reject = error => {

                    this.setIsPendingToFalse();

                    reject_(error);

                };

            }
        );

        this.resolve = resolve;
        this.reject = reject;

    }

    private setIsPendingToFalse() {
        overwriteReadonlyProp(this, "isPending", false);
    };

    public readonly isPending: boolean = true;


}

export namespace Deferred {

    export type Unpack<T extends Deferred<any>> = T extends Deferred<infer U> ? U : never;

}

export class VoidDeferred extends Deferred<undefined>{

    public readonly resolve!: () => void;

}







