import { Evt } from "./Evt";
/** https://docs.evt.land/api/voidevt */
export declare class VoidEvt extends Evt<void> {
    post(): number;
    postAsyncOnceHandled(): Promise<number>;
}
