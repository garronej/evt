
export const overwriteReadonlyProp = <T extends { [key: string]: any; }, K extends keyof T>(
    obj: T,
    propertyName: K,
    value: T[K]
): T[K] => {

    try {

        obj[propertyName] = value;

        if (obj[propertyName] === value) {
            return value;
        }

    } catch{
    }

    Object.defineProperty(
        obj,
        propertyName,
        {
            ...Object.getOwnPropertyDescriptor(obj, propertyName),
            value
        }
    );

    return value;

};