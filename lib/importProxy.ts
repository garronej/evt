

/** Manually handling circular import so React Native does not gives warning. */
export const importProxy: {
    Ctx: typeof import("./Ctx.ts").Ctx;
    Evt: typeof import("./Evt.ts").Evt;
    StatefulEvt: typeof import("./StatefulEvt.ts").StatefulEvt;
} = {} as any;



