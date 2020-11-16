
//Okay to import without type as the namespace is overloaded with functions.
import { Operator } from "../../types/Operator";

const isNonNullable= <T>(arg: T): arg is NonNullable<T> => arg !== undefined && arg !== null;

export const nonNullable = <T>(data: T): Operator.fλ.Result<NonNullable<T>, never> => 
    !isNonNullable(data) ? null : [data];
