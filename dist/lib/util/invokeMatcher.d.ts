import { $Matcher } from "../types/$Matcher";
/** If the matcher is not a $Matcher then the transformedData will be the input data */
export declare function invokeMatcher<T, U>(matcher: $Matcher<T, U> | ((data: T) => boolean), data: T, cbInvokedIfMatched?: true, prev?: U): $Matcher.Result<T | U>;
