
import { Evt } from "./Evt";
import type { StatefulEvt, StatefulReadonlyEvt, NonPostableEvt, UnpackEvt } from "./types";
import type { PromiseOrNot } from "tsafe/lab/PromiseOrNot";

type EvtLike<T> = import("./types/helper").EvtLike<T> & {
    attach(callback: (data: T) => void): void;
};


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
): 
    E extends StatefulReadonlyEvt<any> ? StatefulEvt<U | undefined> :
    E extends NonPostableEvt<any> ? Evt<U> :
    EvtLike<U>
{

    const out = "state" in evt ?
        Evt.create<UnpackEvt<E> | undefined>(undefined) :
        Evt.create<UnpackEvt<E>>();

    let currentCallCount = 0;

    evt.attach(async (data: UnpackEvt<E>) => {

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

        if (!opResult) {

            return;
        }

        out.post(opResult[0] as any);

    });

    return out as any;

}

