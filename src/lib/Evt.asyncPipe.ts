
import { Evt } from "./Evt";

type UnpackEvt<T extends ({ [key: string]: any; } | import("./types/helper/UnpackEvt").EvtLike<any>)> = 
    import("./types/helper/UnpackEvt").UnpackEvt<T>;

type SwapEvtType<E extends import("./types/helper/UnpackEvt").EvtLike<any>, T> = 
    import("./types/helper/SwapEvtType").SwapEvtType<E, T>;

type EvtLike<T> = import("./types/helper/UnpackEvt").EvtLike<T> & {
    attach(callback: (data: T) => void): void;
};

/** 
 * Will be deprecated in next release once async operators lands.
 * Example of use: https://stackblitz.com/edit/evt-async-op?file=index.ts 
 */
export function asyncPipe<E extends EvtLike<any>, U>(
    evt: E,
    asyncOp: (data: UnpackEvt<E>) => Promise<[U] | null>
): SwapEvtType<E, U> {

    const out = new Evt<UnpackEvt<E>>();

    evt.attach(async data => {
        const opResult = await asyncOp(data);
        if (opResult === null) {
            return;
        }
        out.post(opResult[0] as any);
    });

    return out as any;

}
