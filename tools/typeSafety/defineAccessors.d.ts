export declare const defineAccessors: <T extends {
    [key: string]: any;
}, K extends keyof T>(obj: T, propertyName: K, propertyDescriptor: {
    get?: (() => T[K]) | undefined;
    set?: ((value: T[K]) => void) | undefined;
}) => void;
