/**
 * Think of it as void.
 * void itself is indistinguishable from undefined or null
 * which cause inference problem using ToPostable<E>
 * */
export interface Void {
    __voidBrand: any;
}
export declare namespace Void {
    const instance: Void;
    function match(o: any): o is Void;
}
