
import * as React from "react";

export function useSemanticGuaranteeMemo<T>(fn: () => T, deps: any[]): T {

    const ref = React.useRef<{ v: T; prevDeps: any[]; }>()

    if (
        !ref.current ||
        deps.length !== ref.current.prevDeps.length ||
        ref.current.prevDeps.map((v, i) => v === deps[i]).indexOf(false) >= 0
    ) {
        ref.current = {
            "v": fn(),
            "prevDeps": [...deps]
        };
    }

    return ref.current.v;

}