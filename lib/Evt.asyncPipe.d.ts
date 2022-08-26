import type { Evt } from "./Evt";
import type { StatefulEvt, UnpackEvt, NonPostableEvtLike, StatefulReadonlyEvtLike } from "./types";
import type { PromiseOrNot } from "tsafe/lab/PromiseOrNot";
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
export declare function asyncPipe<E extends NonPostableEvtLike<any>, U>(evt: E, asyncOp: (data: UnpackEvt<E>) => PromiseOrNot<[U] | null>): E extends StatefulReadonlyEvtLike<any> ? StatefulEvt<U | undefined> : Evt<U>;
