

type EvtLike<T> = {
    attach(callback: (data: T) => void): void;
};

type StatefulEvtLike<T> = {
    evtChange: EvtLike<T>;
    state: T;
};

/** https://docs.evt.land/api/evt/use-effect */
export function useEffect<T>(
    effect: (
        data: T,
        dataWrap: { isFirst: true } | { isFirst: false, data: T },
        i: number
    ) => void,
    evt: StatefulEvtLike<T>
): void;
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
    evt: EvtLike<T> | StatefulEvtLike<T>,
    dataFirst?: [T]
): void {

    let i = 0;

    ("state" in evt ? evt.evtChange : evt)
        .attach(data =>
            effect(
                data,
                { "isFirst": false, data },
                i++
            )
        )
        ;

    effect(
        "state" in evt ? evt.state : dataFirst?.[0], 
        { "isFirst": true }, i++
    );

}



