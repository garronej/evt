
export const overwriteReadonlyProp = <T extends { [key: string]: any; }, K extends keyof T>(
    obj: T,
    propertyName: K,
    value: T[K]
): void => {

    try {

        obj[propertyName] = value;

        if (obj[propertyName] === value) {
            return;
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

};