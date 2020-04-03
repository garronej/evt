
export function getPrototypeChain(obj: Object, i: number = 0): Object[] {


    const proto = Object.getPrototypeOf(obj);

    if (!proto) {
        return [];
    }


    //return [proto, ...getPrototypeChain(proto, i+1)];
    return [proto];


}
export namespace getPrototypeChain {

    export function isMatched(obj: Object, regExp: RegExp): boolean {


        return getPrototypeChain(obj)
            .map(({ constructor }) => constructor.name).find(name => regExp.test(name)) !== undefined;



    }

}

