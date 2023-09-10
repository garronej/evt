
const isNonNullable = <T>(arg: T): arg is NonNullable<T> =>
    arg !== undefined && arg !== null;

const nonNullableImpl = <T>(data: T) =>
    !isNonNullable(data) ? null : [data] as const;

export const nonNullable =
    <T>(): import("../lib/types").Operator.fλ.Stateless<T, NonNullable<T>> =>
        nonNullableImpl;
