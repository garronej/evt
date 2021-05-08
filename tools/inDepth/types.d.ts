export declare const z_: {
    SetLike_match: <T>(set: Object) => set is SetLike<T>;
    MapLike_match: <T_1, U>(map: Object) => map is MapLike<T_1, U>;
    ArrayLike_match: <T_2>(arr: Object) => arr is ArrayLike<T_2>;
    DateLike_match: (date: Object) => date is DateLike;
};
export declare type SetLike<T> = {
    values: () => Iterable<T>;
};
export declare namespace SetLike {
    const match: <T>(set: Object) => set is SetLike<T>;
}
export declare type MapLike<T, U> = {
    keys: () => Iterable<T>;
    get(key: T): U | undefined;
};
export declare namespace MapLike {
    const match: <T, U>(map: Object) => map is MapLike<T, U>;
}
export declare namespace ArrayLike {
    const match: <T>(arr: Object) => arr is ArrayLike<T>;
}
export declare type DateLike = {
    getTime: () => number;
};
export declare namespace DateLike {
    const match: (date: Object) => date is DateLike;
}
