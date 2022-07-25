
import type { Evt } from "./Evt";
import type { StatefulEvt, UnpackEvt, NonPostableEvtLike, StatefulReadonlyEvtLike } from "./types";
import type { PromiseOrNot } from "tsafe/lab/PromiseOrNot";
import { importProxy } from "./importProxy";



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
export function asyncPipe<E extends NonPostableEvtLike<any>, U>(
    evt: E,
    asyncOp: (data: UnpackEvt<E>) => PromiseOrNot<[U] | null>
): 
    E extends StatefulReadonlyEvtLike<any> ? StatefulEvt<U | undefined> : Evt<U> 
{

    const out = "state" in evt ?
        importProxy.Evt.create<UnpackEvt<E> | undefined>(undefined) :
        importProxy.Evt.create<UnpackEvt<E>>();

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

