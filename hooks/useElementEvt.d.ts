import * as React from "react";
import type { Ctx } from "../lib";
export declare function useElementEvt<T extends HTMLElement = any>(effect: (params: {
    ctx: Ctx;
    element: T;
    registerSideEffect: (sideEffect: () => void) => void;
}) => void, deps: React.DependencyList): {
    ref: React.RefObject<T>;
};
export declare function useElementEvt<T extends HTMLElement = any>(effect: (params: {
    ctx: Ctx;
    element: T;
    registerSideEffect: (sideEffect: () => void) => void;
}) => void, ref: React.RefObject<T>, deps: React.DependencyList): void;
