import { Evt } from "../index";
export declare type OneShotEvt<T> = Pick<Evt<T>, "waitFor" | "attachOnce" | "$attachOnce" | "detach" | "evtAttach" | "postCount">;
export declare type Racer<T> = OneShotEvt<T> | PromiseLike<T> | T;
export declare type UnpackRacer<T extends Racer<any>> = T extends OneShotEvt<infer U> ? U : T extends PromiseLike<infer V> ? V : T;
export declare type RaceResultGeneric<Data, Index extends number, Racers extends readonly Racer<any>[]> = Readonly<{
    data: Data;
    i: Index;
    racer: Racers[Index];
}>;
export declare type RaceResult<RacerUnion> = RaceResultGeneric<UnpackRacer<RacerUnion>, number, readonly RacerUnion[]>;
export declare type PrResultWrap<T> = PrResultWrap.Fulfilled<T> | PrResultWrap.Rejected<T>;
export declare namespace PrResultWrap {
    type Common<T> = {
        promise: PromiseLike<T>;
    };
    export type Fulfilled<T> = Common<T> & {
        isFulfilled: true;
        data: T;
    };
    export type Rejected<T> = Common<T> & {
        isFulfilled: false;
        data: never;
        error: any;
    };
    export {};
}
export declare function race<T, U>(racers: readonly [Racer<T>, Racer<U>]): OneShotEvt<RaceResultGeneric<T, 0, typeof racers> | RaceResultGeneric<U, 1, typeof racers>>;
export declare function race<T, U, V>(racers: readonly [Racer<T>, Racer<U>, Racer<V>]): OneShotEvt<RaceResultGeneric<T, 0, typeof racers> | RaceResultGeneric<U, 1, typeof racers> | RaceResultGeneric<V, 2, typeof racers>>;
export declare function race<T1, T2, T3, T4>(racers: readonly [Racer<T1>, Racer<T2>, Racer<T3>, Racer<T4>]): OneShotEvt<RaceResultGeneric<T1, 0, typeof racers> | RaceResultGeneric<T2, 1, typeof racers> | RaceResultGeneric<T3, 2, typeof racers> | RaceResultGeneric<T4, 3, typeof racers>>;
export declare function race<T1, T2, T3, T4, T5>(racers: readonly [Racer<T1>, Racer<T2>, Racer<T3>, Racer<T4>, Racer<T5>]): OneShotEvt<RaceResultGeneric<T1, 0, typeof racers> | RaceResultGeneric<T2, 1, typeof racers> | RaceResultGeneric<T3, 2, typeof racers> | RaceResultGeneric<T4, 3, typeof racers> | RaceResultGeneric<T5, 4, typeof racers>>;
export declare function race<T1, T2, T3, T4, T5, T6>(racers: readonly [Racer<T1>, Racer<T2>, Racer<T3>, Racer<T4>, Racer<T5>, Racer<T6>]): OneShotEvt<RaceResultGeneric<T1, 0, typeof racers> | RaceResultGeneric<T2, 1, typeof racers> | RaceResultGeneric<T3, 2, typeof racers> | RaceResultGeneric<T4, 3, typeof racers> | RaceResultGeneric<T5, 4, typeof racers> | RaceResultGeneric<T6, 5, typeof racers>>;
export declare function race<T1, T2, T3, T4, T5, T6, T7>(racers: readonly [Racer<T1>, Racer<T2>, Racer<T3>, Racer<T4>, Racer<T5>, Racer<T6>, Racer<T7>]): OneShotEvt<RaceResultGeneric<T1, 0, typeof racers> | RaceResultGeneric<T2, 1, typeof racers> | RaceResultGeneric<T3, 2, typeof racers> | RaceResultGeneric<T4, 3, typeof racers> | RaceResultGeneric<T5, 4, typeof racers> | RaceResultGeneric<T6, 5, typeof racers> | RaceResultGeneric<T7, 6, typeof racers>>;
export declare function race<T1, T2, T3, T4, T5, T6, T7, T8>(racers: readonly [Racer<T1>, Racer<T2>, Racer<T3>, Racer<T4>, Racer<T5>, Racer<T6>, Racer<T7>, Racer<T8>]): OneShotEvt<RaceResultGeneric<T1, 0, typeof racers> | RaceResultGeneric<T2, 1, typeof racers> | RaceResultGeneric<T3, 2, typeof racers> | RaceResultGeneric<T4, 3, typeof racers> | RaceResultGeneric<T5, 4, typeof racers> | RaceResultGeneric<T6, 5, typeof racers> | RaceResultGeneric<T7, 6, typeof racers> | RaceResultGeneric<T8, 7, typeof racers>>;
export declare function race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(racers: readonly [Racer<T1>, Racer<T2>, Racer<T3>, Racer<T4>, Racer<T5>, Racer<T6>, Racer<T7>, Racer<T8>, Racer<T9>]): OneShotEvt<RaceResultGeneric<T1, 0, typeof racers> | RaceResultGeneric<T2, 1, typeof racers> | RaceResultGeneric<T3, 2, typeof racers> | RaceResultGeneric<T4, 3, typeof racers> | RaceResultGeneric<T5, 4, typeof racers> | RaceResultGeneric<T6, 5, typeof racers> | RaceResultGeneric<T7, 6, typeof racers> | RaceResultGeneric<T8, 7, typeof racers> | RaceResultGeneric<T9, 8, typeof racers>>;
export declare function race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(racers: readonly [Racer<T1>, Racer<T2>, Racer<T3>, Racer<T4>, Racer<T5>, Racer<T6>, Racer<T7>, Racer<T8>, Racer<T9>, Racer<T10>]): OneShotEvt<RaceResultGeneric<T1, 0, typeof racers> | RaceResultGeneric<T2, 1, typeof racers> | RaceResultGeneric<T3, 2, typeof racers> | RaceResultGeneric<T4, 3, typeof racers> | RaceResultGeneric<T5, 4, typeof racers> | RaceResultGeneric<T6, 5, typeof racers> | RaceResultGeneric<T7, 6, typeof racers> | RaceResultGeneric<T8, 7, typeof racers> | RaceResultGeneric<T9, 8, typeof racers> | RaceResultGeneric<T10, 9, typeof racers>>;
export declare function race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(racers: readonly [Racer<T1>, Racer<T2>, Racer<T3>, Racer<T4>, Racer<T5>, Racer<T6>, Racer<T7>, Racer<T8>, Racer<T9>, Racer<T10>, Racer<T11>]): OneShotEvt<RaceResultGeneric<T1, 0, typeof racers> | RaceResultGeneric<T2, 1, typeof racers> | RaceResultGeneric<T3, 2, typeof racers> | RaceResultGeneric<T4, 3, typeof racers> | RaceResultGeneric<T5, 4, typeof racers> | RaceResultGeneric<T6, 5, typeof racers> | RaceResultGeneric<T7, 6, typeof racers> | RaceResultGeneric<T8, 7, typeof racers> | RaceResultGeneric<T9, 8, typeof racers> | RaceResultGeneric<T10, 9, typeof racers> | RaceResultGeneric<T11, 10, typeof racers>>;
export declare function race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(racers: readonly [Racer<T1>, Racer<T2>, Racer<T3>, Racer<T4>, Racer<T5>, Racer<T6>, Racer<T7>, Racer<T8>, Racer<T9>, Racer<T10>, Racer<T11>, Racer<T12>]): OneShotEvt<RaceResultGeneric<T1, 0, typeof racers> | RaceResultGeneric<T2, 1, typeof racers> | RaceResultGeneric<T3, 2, typeof racers> | RaceResultGeneric<T4, 3, typeof racers> | RaceResultGeneric<T5, 4, typeof racers> | RaceResultGeneric<T6, 5, typeof racers> | RaceResultGeneric<T7, 6, typeof racers> | RaceResultGeneric<T8, 7, typeof racers> | RaceResultGeneric<T9, 8, typeof racers> | RaceResultGeneric<T10, 9, typeof racers> | RaceResultGeneric<T11, 10, typeof racers> | RaceResultGeneric<T12, 11, typeof racers>>;
export declare function race<RacerUnion>(racers: readonly RacerUnion[]): OneShotEvt<RaceResult<RacerUnion>>;
