import { compose } from "../compose.ts";

export const scan = <T, U>(
    accumulator: (acc: U, value: T, index: number) => U,
    seed: U
) => compose<T, [T, U, number], U>(
    [
        (data, [, acc, index]) =>
            [[data, accumulator(acc, data, index), index + 1]],
        [null as any, seed, 0]
    ],
    ([, acc]) => [acc]
);

type CtxLike = { evtDoneOrAborted: { postCount: number; }  };

export const distinct = <T>(
    keySelector?: ((value: T) => any) | undefined,
    ctxFlush?: CtxLike
) => compose<
    T,
    {
        data: T,
        selectedKey: any,
        currentFlushCount: number;
    },
    {
        boxedData: [T] | null;
        alreadyPostedData: Set<any>;
        previousFlushCount: number
    },
    T
>(
    data => [{
        data,
        "selectedKey": keySelector?.(data) ?? data,
        "currentFlushCount": ctxFlush?.evtDoneOrAborted.postCount ?? 0
    }],
    [
        ({ data, selectedKey, currentFlushCount }, { alreadyPostedData, previousFlushCount }) => [{
            "boxedData": (
                currentFlushCount !== previousFlushCount ||
                !alreadyPostedData.has(selectedKey)
            ) ? [data] : null,
            "alreadyPostedData": new Set([
                ...(
                    currentFlushCount !== previousFlushCount ?
                        [] : Array.from(alreadyPostedData)
                ),
                selectedKey
            ]),
            "previousFlushCount": currentFlushCount
        }],
        {
            "boxedData": null,
            "alreadyPostedData": new Set(),
            "previousFlushCount": ctxFlush?.evtDoneOrAborted.postCount ?? 0
        }
    ],
    ({ boxedData }) => boxedData
);