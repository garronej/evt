export declare class LazyEvtFactory<T> {
    private initialPostCount;
    private evt;
    getEvt(): import("../Evt").Evt<T>;
    post(data: T): void;
}
