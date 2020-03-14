import { Evt } from "./Evt";
/** https://garronej.github.io/ts-evt/#voidevt */
export declare class VoidEvt extends Evt<void> {
    post(): number;
    postAsyncOnceHandled(): Promise<number>;
}
