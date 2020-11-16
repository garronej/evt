
import { Evt } from "./Evt";

type StatefulEvt<T> = import("./types/interfaces").StatefulEvt<T>;
type StatefulReadonlyEvt<T> = import("./types/interfaces").StatefulReadonlyEvt<T>;
type NonPostableEvt<T> = import("./types/interfaces").NonPostableEvt<T>;

type UnpackEvt<T extends ({ [key: string]: any; } | import("./types/helper/UnpackEvt").EvtLike<any>)> =
    import("./types/helper").UnpackEvt<T>;

type EvtLike<T> = import("./types/helper/UnpackEvt").EvtLike<T> & {
    attach(callback: (data: T) => void): void;
};

type UseVoidEvt<T> = import("./types/helper/SwapEvtType").UseVoidEvt<T>;
type PromiseOrNot<T> = import("../tools/typeSafety").PromiseOrNot<T>;


/** 
 * NOTE: Workaround until v2.0 where .pipe() will support async operators 
 * Usage example: https://stackblitz.com/edit/evt-async-op?file=index.ts 
 * 
 * When the argument is a StatefulEvt:
 * If, wile asyncOp was running, the state of the source evt
 * have changed then the result will be discarded.
 * 
 * If the asyncOp complete synchronously (meaning it does not return
 * a promise) then the result is synchronously transformed. (As with .pipe() )
 * 
 * More usage example in src/test/test95.ts
 */
export function asyncPipe<E extends EvtLike<any>, U>(
    evt: E,
    asyncOp: (data: UnpackEvt<E>) => PromiseOrNot<[U] | null>
): UseVoidEvt<
    E extends StatefulReadonlyEvt<any> ? StatefulEvt<U | undefined> :
    E extends NonPostableEvt<any> ? Evt<U> :
    EvtLike<U>
> {

    const out = "state" in evt ?
        Evt.create<UnpackEvt<E> | undefined>(undefined) :
        Evt.create<UnpackEvt<E>>();

    let currentCallCount = 0;

    const onData = async (data: UnpackEvt<E>) => {

        currentCallCount++;

        const thisCallCount = currentCallCount;

        const prOpResult = asyncOp(data);

        let opResult: [U] | null;

        if (
            prOpResult !== null &&
            "then" in prOpResult
        ) {

            opResult = await prOpResult;

            if (
                "state" in evt &&
                thisCallCount !== currentCallCount
            ) {
                return;
            }

        } else {

            opResult = prOpResult;

        }

        if (opResult === null) {

            return;
        }

        out.post(opResult[0] as any);

    };

    evt.attach(onData);


    if ("state" in evt) {

        onData((evt as any).state);

    }

    return out as any;

}

