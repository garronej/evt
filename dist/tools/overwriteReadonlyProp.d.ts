export declare const overwriteReadonlyProp: <T extends {
    [key: string]: any;
}, K extends keyof T>(obj: T, propertyName: K, value: T[K]) => void;
