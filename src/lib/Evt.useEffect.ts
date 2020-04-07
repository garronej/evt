

type EvtLike<T> = {
    attach(callback: (data: T) => void): void;
};

/** https://docs.evt.land/api/evt/use-effect */
export function useEffect<T>(
    effect: (
        data: T,
        dataWrap: { isFirst: true } | { isFirst: false, data: T },
        i: number
    ) => void,
    evt: EvtLike<T>,
    dataFirst: [T]
): void;
export function useEffect<T>(
    effect: (
        data: T | undefined,
        dataWrap: { isFirst: true } | { isFirst: false, data: T },
        i: number
    ) => void,
    evt: EvtLike<T>
): void;
export function useEffect<T>(
    effect: (
        data: T | undefined,
        dataWrap: { isFirst: true } | { isFirst: false, data: T },
        i: number
    ) => void,
    evt: EvtLike<T>,
    dataFirst?: [T]
): void {

    let i = 0;

    evt.attach(data => effect(data, { "isFirst": false, data }, i++));

    effect(dataFirst?.[0], { "isFirst": true }, i++);

}



