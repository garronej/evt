import { NonPostableEvt } from "../lib";
/** For tests that used the legacy attach returned Promise */
export declare function getHandlerPr(evt: NonPostableEvt<any>, run: () => void): Promise<any>;
