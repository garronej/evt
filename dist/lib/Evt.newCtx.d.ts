declare type Ctx<Result = any> = import("./Ctx").Ctx<Result>;
declare type VoidCtx = import("./types/interfaces").VoidCtx;
/**
 * https://docs.evt.land/api/evt/newctx
 *
 * return a new Ctx instance
 * */
export declare function newCtx(): VoidCtx;
export declare function newCtx<T>(): Ctx<T>;
export {};
