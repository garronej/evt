
export interface Postable<T> {

    /** https://docs.evt.land/api/evt/post */
    postAsyncOnceHandled(data: T): number | Promise<number>;

    /** 
     * Returns post count 
     * */
    post(data: T): number;

}
