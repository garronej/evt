import { Operator } from "../../types";
export declare const onlyIfChanged: <T>(params?: {
    areEqual?: ((a: T, b: T) => boolean) | undefined;
} | undefined) => Operator.fλ.Stateful<T, T>;
