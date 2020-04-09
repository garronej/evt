
/** 
 * Think of it as void.
 * void itself is indistinguishable from undefined or null
 * which cause inference problem using ToPostable<E>
 * */
export interface Void { __voidBrand: any; }

export namespace Void {
    export const instance: Void = {} as any;
    export function match(o: any): o is Void {
        return o === instance;
    }
}
