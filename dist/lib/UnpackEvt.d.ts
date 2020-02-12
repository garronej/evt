export declare type UnpackEvt<T> = T extends import("./Evt").Evt<infer U> ? U : never;
