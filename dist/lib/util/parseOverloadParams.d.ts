import { Handler } from "../types/Handler";
export declare function parseOverloadParamsFactory<T>(): (inputs: readonly any[], methodName: "waitFor" | "attach*" | "pipe") => Handler.PropsFromArgs<T, any, import("../Ctx").CtxLike<any> | undefined>;
