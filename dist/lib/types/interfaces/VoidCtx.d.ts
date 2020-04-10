import { Handler } from "../Handler";
declare type Ctx<T> = import("./Ctx").Ctx<T>;
/**
 * https://docs.evt.land/api/evt/ctx
 *
 * Only an interface (not a class), use Evt.newCtx() to get an instance.
 */
export interface VoidCtx extends Ctx<void> {
    done(): Handler.WithEvt<any, void>[];
}
export {};
