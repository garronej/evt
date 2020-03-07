import { Handler } from "../types/Handler";
export declare const parseOverloadParamsFactory: <T>({ defaultBoundTo }: {
    defaultBoundTo: Object;
}) => (inputs: readonly any[], methodName: "pipe" | "waitFor" | "attach*" | "createDelegate") => Handler.PropsFromArgs<T, any, import("..").Bindable>;
