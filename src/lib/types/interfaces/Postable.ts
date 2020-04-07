
export interface Postable<T> {

    /** https://docs.evt.land/api/evt/post */
    postAsyncOnceHandled(data: T): number | Promise<number>;

    /** 
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * Returns post count 
     * */
    post(data: T): number;

}
