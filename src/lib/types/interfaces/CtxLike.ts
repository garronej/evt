
import { Handler } from "../Handler";
import { typeGuard } from "../../../tools/typeSafety/typeGuard";
type EvtLike<T> = import("../helper/UnpackEvt").EvtLike<T>;

/** 
 * Minimal interface that an object must implement to be a valid context argument 
 * ( for interop between mismatching EVT versions )
 * */
export interface CtxLike<Result = any> {
    done(result: Result): void;
    abort(error: Error): void;
    zz__addHandler<T>(handler: Handler<T, any, CtxLike<Result>>, evt: EvtLike<T>): void;
    zz__removeHandler<T>(handler: Handler<T, any, CtxLike<Result>>): void;
}

export namespace CtxLike {

    export function match<T=any>(o: any): o is CtxLike<T> {
        return (
            typeGuard<CtxLike>(o) &&
            o instanceof Object &&
            typeof o.done === "function" &&
            typeof o.abort === "function" &&
            typeof o.zz__addHandler === "function" &&
            typeof o.zz__removeHandler === "function"
        );
    }

}


export interface VoidCtxLike extends CtxLike<void> {
    done(): void;
}