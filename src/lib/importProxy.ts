

/** Manually handling circular import so React Native does not gives warning. */
export const importProxy: {
    Ctx: typeof import("./Ctx").Ctx;
    VoidCtx: typeof import("./Ctx").VoidCtx;
    Evt: typeof import("./Evt").Evt;
    StatefulEvt: typeof import("./StatefulEvt").StatefulEvt;
} = {} as any;



