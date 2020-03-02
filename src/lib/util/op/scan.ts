import { composeMatcher } from "../composeMatcher";

export function scan<T, U>(
    accumulator: (acc: U, value: T, index: number) => U, seed: U
) {
    return composeMatcher<T, [T, U, number], U>(
        [
            (data, [, acc, index]) => 
                [[data, accumulator(acc, data, index), index + 1]],
            [null as any, seed, 0]
        ],
        ([, acc]) => [acc]
    );
}