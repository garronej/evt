import React from "https://dev.jspm.io/react@18.2.0";;
const { useRef } = React;

export function useGuaranteedMemo<T>(fn: () => T, deps: readonly any[]): T {

    const ref = useRef<{ v: T; prevDeps: any[]; }>()

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