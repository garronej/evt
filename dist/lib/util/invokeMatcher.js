"use strict";
exports.__esModule = true;
/** If the matcher is not a $Matcher then the transformedData will be the input data */
function invokeMatcher(matcher, data, cbInvokedIfMatched, prev //If stateful prev must be provided
) {
    var matcherResult = typeof matcher === "function" ?
        matcher(data, undefined, cbInvokedIfMatched) :
        matcher[0](data, prev, cbInvokedIfMatched);
    //NOTE: We assume it was a $matcher only 
    //if the returned value is a singleton or a couple, otherwise 
    //we assume it was a filtering matcher that should have returned
    //a boolean but returned something else.
    return (matcherResult === null ? null :
        matcherResult === "DETACH" ? "DETACH" :
            typeof matcherResult === "object" &&
                (matcherResult.length === 1 || matcherResult.length === 2) ? matcherResult :
                !!matcherResult ? [data] : null);
}
exports.invokeMatcher = invokeMatcher;
//# sourceMappingURL=invokeMatcher.js.map