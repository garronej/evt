import { $Matcher } from "../types/$Matcher";
export declare function composeMatcher<A, B, C>(tm1: $Matcher<A, B>, tm2: $Matcher<B, C>): $Matcher<A, C>;
export declare namespace composeMatcher {
    function many<T>(args: [$Matcher<T, any>, ...$Matcher<any, any>[]]): $Matcher<T, any>;
}
