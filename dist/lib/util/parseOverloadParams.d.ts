import { Handler } from "../types/Handler";
export declare function parseOverloadParamsFactory<T>(): (inputs: readonly any[], methodName: "pipe" | "waitFor" | "attach*" | "createDelegate") => Handler.PropsFromArgs<T, any, import("..").Ctx | undefined>;
