
import { Handler } from "../Handler.ts";

import type { Ctx } from "./Ctx.ts";

/** 
 * https://docs.evt.land/api/evt/ctx 
 * 
 * Only an interface (not a class), use Evt.newCtx() to get an instance.
 */
export interface VoidCtx extends Ctx<void> {
    done(): Handler.WithEvt<any, void>[];
};