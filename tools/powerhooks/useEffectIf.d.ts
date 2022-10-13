export declare type Destructor = () => void;
export declare function useEffectIf<Deps extends readonly any[]>(effect: (params: {
    deps: Deps;
}) => (void | Destructor), effectRunCondition: Deps | boolean): void;
