
//NOTE: Do not export directly so we can support typescript before 2.8.
export type UnpackEvt<T> = T extends import("./Evt").Evt<infer U> ? U : never;

