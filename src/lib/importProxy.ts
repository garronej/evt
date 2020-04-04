
/** Manually handling circular import so React Native does not gives warning. */
export const importProxy: {
    Ctx: typeof import("./Ctx").Ctx;
    VoidCtx: typeof import("./Ctx").VoidCtx;
    Evt: typeof import("./Evt").Evt;
    Observable: typeof import("./Observable").Observable;
    ObservableInDepth: typeof import("./Observable").ObservableInDepth;
} = {} as any;
