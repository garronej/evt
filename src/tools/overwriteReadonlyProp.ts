
export const overwriteReadonlyProp = (
    obj: { [key: string]: any; },
    propertyName: string,
    value: any
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