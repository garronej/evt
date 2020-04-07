/** Manually handling circular import so React Native does not gives warning. */
export declare const importProxy: {
    Ctx: typeof import("./Ctx").Ctx;
    VoidCtx: typeof import("./Ctx").VoidCtx;
    Evt: typeof import("./Evt").Evt;
    StatefulEvt: typeof import("./StatefulEvt").StatefulEvt;
};
