//NOTE: Type only
import { Evt, StatefulEvt, ToPostableEvt, ToNonPostableEvt, VoidEvt, NonPostableEvt, StatefulReadonlyEvt } from "../lib";

{

    type T = void; type Source = VoidEvt;

    type A = ToNonPostableEvt<Source>;

    const x: NonPostableEvt<T> = null as any as A;x;

    type B = ToPostableEvt<A>

    const y: Source = null as any as B;y;

}
{
    type T = undefined; type Source = Evt<T>;

    type A = ToNonPostableEvt<Source>;

    const x: NonPostableEvt<T> = null as any as A;x;

    type B = ToPostableEvt<A>

    const y: B = null as any as Source; y;

}
{
    type T = undefined | number; type Source = Evt<T>;

    type A = ToNonPostableEvt<Source>;

    const x: NonPostableEvt<T> = null as any as A;x;

    type B = ToPostableEvt<A>

    const y: B = null as any as Source; y;

}
{
    type T = undefined; type Source = StatefulEvt<T>;

    type A = ToNonPostableEvt<Source>;

    const x: StatefulReadonlyEvt<T> = null as any as A;x;

    type B = ToPostableEvt<A>

    const y: B = null as any as Source; y;

}
{
    type T = undefined | number; type Source = StatefulEvt<T>;

    type A = ToNonPostableEvt<Source>;

    const x: StatefulReadonlyEvt<T> = null as any as A;x;

    type B = ToPostableEvt<A>

    const y: B = null as any as Source; y;

}

{

    type Source = {
        evtText: Evt<string | number>;
        evtIsConnected: StatefulReadonlyEvt<boolean | number>;
        evtTime: NonPostableEvt<number | Date>;
        evtTime2: StatefulReadonlyEvt<number | Date>;
        p: number;
    };

    type A = ToNonPostableEvt<Source>;

    const x: {
        evtText: NonPostableEvt<string | number>;
        evtIsConnected: StatefulReadonlyEvt<number | boolean>;
        evtTime: NonPostableEvt<number | Date>;
        evtTime2: StatefulReadonlyEvt<number | Date>;
        p: number;
    }= null as any as A; x;

    type B= ToPostableEvt<A>;

    const y: {
        evtText: Evt<string | number>;
        evtIsConnected: StatefulEvt<number | boolean>;
        evtTime: Evt<number | Date>;
        evtTime2: StatefulEvt<number | Date>;
        p: number;
    }= null as any as B; y;

}

console.log("PASS");



