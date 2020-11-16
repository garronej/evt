
const isNonNullable= <T>(arg: T): arg is NonNullable<T> => arg !== undefined && arg !== null;

export const nonNullable = <T>(data: T): import("../../types").Operator.fλ.Result<NonNullable<T>, never> => 
    !isNonNullable(data) ? null : [data];
