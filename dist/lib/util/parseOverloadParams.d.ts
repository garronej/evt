import { Handler } from "../types/Handler";
export declare function parseOverloadParamsFactory<T>(): (inputs: readonly any[], methodName: "pipe" | "waitFor" | "attach*") => Handler.PropsFromArgs<T, any, import("../Ctx").CtxLike<any> | undefined>;
