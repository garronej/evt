
// @denoify-line-ignore
import { Polyfill as Map } from "minimal-polyfills/Map";
import type { LightMap } from "../minimal-polyfills/LightMap";
import type { LightSet } from "../minimal-polyfills/LightSet";
import { assert } from "tsafe/assert";
import { MapLike, SetLike, ArrayLike, DateLike } from "./types";
import { overwriteReadonlyProp } from "tsafe/lab/overwriteReadonlyProp";

/** Will work with:
 * Array
 * Set
 * Map
 * Date
 * Plain object
 * 
 * Any primary type.
 * 
 * Best effort for object of custom class.
 */
export const copy = (() => {

    const copyRec = <T>(obj: T, freeze: boolean, alreadyCloned: LightMap<any, any>): T => {

        if (typeof obj !== "object" || obj === null) {
            return obj;
        }

        if (alreadyCloned.has(obj)) {
            return alreadyCloned.get(obj)!;
        }

        assert(typeof obj !== "function", "Functions can't be cloned");

        const onCreate = <T>(out: T): T => {

            alreadyCloned.set(obj, out);

            return out;

        };

        const onReturn = <T>(out: T): T => {

            if (freeze) {
                Object.freeze(out);
            }

            return out;

        };

        const rec = <T>(obj: T): T => copyRec(obj, freeze, alreadyCloned);

        if (MapLike.match(obj)) {

            const Map: { new <K, V>(): LightMap<K, V>; } = Object.getPrototypeOf(obj).constructor;

            const out = onCreate(new Map<any, any>());

            Array.from(obj.keys())
                .forEach(key => out.set(key, rec(obj.get(key))))
                ;

            return onReturn(out as any as T);

        }

        if (SetLike.match(obj)) {

            const Set: { new <V>(): LightSet<V>; } = Object.getPrototypeOf(obj).constructor;

            const out = onCreate(new Set<any>());

            Array.from(obj.values())
                .forEach(value => out.add(rec(value)))
                ;

            return onReturn(out as any as T);

        }

        if (ArrayLike.match(obj)) {

            const Array: { new <T>(): ArrayLike<T>; } = Object.getPrototypeOf(obj).constructor;

            const out = onCreate(new Array<any>());

            for (let i = 0; i < obj.length; i++) {

                if (!(`${i}` in obj)) {
                    continue;
                }

                overwriteReadonlyProp(out, i, rec(obj[i]));

            }


            return onReturn(out as any as T);

        }

        if( DateLike.match(obj) ){

            const Date: { new (time: number): DateLike; } = Object.getPrototypeOf(obj).constructor;

            const out = onCreate(new Date(obj.getTime()));

            return onReturn(out as any as T);

        }

        const proto = Object.getPrototypeOf(obj);

        const out: T = onCreate(Object.create(proto));

        alreadyCloned.set(obj, out);

        const names = Object.getOwnPropertyNames(obj);

        for (const name of names) {

            const prop = { ...Object.getOwnPropertyDescriptor(obj, name)! };

            assert(!prop.get && !prop.set, "can't clone getter and setter");

            prop.value = rec(prop.value);

            Object.defineProperty(out, name, prop);

        }

        return onReturn(out);

    }

    return function copy<T>(
        obj: T,
        options: { freeze: boolean } = { "freeze": false }
    ): T {
        return copyRec(obj, options.freeze, new Map());
    }


})();



