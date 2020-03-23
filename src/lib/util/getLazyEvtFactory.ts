import { Evt } from "../Evt";
import { setPostCount } from "../Evt";

export function getLazyEvtFactory<T>(): { getEvt: () => Evt<T>; post: (data: T) => void; } {

    let initialPostCount = 0;

    let evt: Evt<T> | undefined = undefined;

    function getEvt() {

        if (evt === undefined) {
            evt = new Evt();
            setPostCount(
                evt,
                initialPostCount
            );
        }

        return evt;

    }

    function post(data: T) {

        if (evt === undefined) {

            initialPostCount++;
            return;

        }

        evt.post(data);

    }

    return { getEvt, post };

}
