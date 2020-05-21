
import type { EvtLike } from "./UnpackEvt";
import type { NonPostableEvt } from "../interfaces";
import type { StatefulReadonlyEvt } from "../interfaces";
import type { StatefulEvt } from "../interfaces";
import type { Evt } from "../interfaces";
import type { VoidEvt } from "../interfaces";

type UseVoidEvt<E> = E extends Evt<void> ? VoidEvt : E;


/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export type SwapEvtType<E extends EvtLike<any>, T> =
    UseVoidEvt<
        E extends StatefulEvt<any> ? StatefulEvt<T> :
        E extends StatefulReadonlyEvt<any> ? StatefulReadonlyEvt<T> :
        E extends Evt<any> ? Evt<T> :
        E extends NonPostableEvt<any> ? NonPostableEvt<T> :
        EvtLike<T>
    >
    ;
