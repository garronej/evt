import { Operator } from "../../types/Operator";
export declare const to: <T extends [string, any], K extends T[0]>(eventName: K) => Operator.fλ.Once<T, Extract<T, [K, any]>[1]>;
