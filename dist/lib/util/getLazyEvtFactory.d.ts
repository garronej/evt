import { Evt } from "../Evt";
export declare function getLazyEvtFactory<T>(): {
    getEvt: () => Evt<T>;
    post: (data: T) => void;
};
