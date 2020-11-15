declare type EvtLike<T> = {
    attach(callback: (data: T) => void): void;
};
declare type StatefulEvtLike<T> = {
    evtChange: EvtLike<T>;
    state: T;
};
/** https://docs.evt.land/api/evt/use-effect */
export declare function useEffect<T>(effect: (data: T, dataWrap: {
    isFirst: true;
} | {
    isFirst: false;
    data: T;
}, i: number) => void, evt: StatefulEvtLike<T>): void;
export declare function useEffect<T>(effect: (data: T, dataWrap: {
    isFirst: true;
} | {
    isFirst: false;
    data: T;
}, i: number) => void, evt: EvtLike<T>, dataFirst: [T]): void;
export declare function useEffect<T>(effect: (data: T | undefined, dataWrap: {
    isFirst: true;
} | {
    isFirst: false;
    data: T;
}, i: number) => void, evt: EvtLike<T>): void;
export {};
