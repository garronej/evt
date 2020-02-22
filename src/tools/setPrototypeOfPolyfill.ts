
function setProtoOf(obj: any, proto: any): any {
    obj.__proto__ = proto;
    return obj;
}

function mixinProperties(obj: any, proto: any) {
    for (const prop in proto) {
        if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
            obj[prop] = proto[prop];
        }
    }
    return obj;
}

export const setPrototypeOf: typeof Object.setPrototypeOf =
    Object.setPrototypeOf.bind(Object) ||
    ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties)
    ;
