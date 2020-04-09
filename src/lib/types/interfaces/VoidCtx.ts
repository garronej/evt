
import { Handler } from "../Handler";

type Ctx<T> = import("./Ctx").Ctx<T>;
type Void = import("./Void").Void;

/** 
 * https://docs.evt.land/api/evt/ctx 
 * 
 * Only an interface (not a class), use Evt.newCtx() to get an instance.
 */
export interface VoidCtx extends Ctx<Void> {
    done(): Handler.WithEvt<any, Void>[];
};