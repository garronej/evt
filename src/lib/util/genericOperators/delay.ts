import { Operator } from "../../types/Operator";

export const delay = <T>(duration: number): Operator.Special<T, T> =>
    [handlerCallback => ({
        "isHandled": () => true,
        "onEvent": data => setTimeout(() => handlerCallback(data), duration)
    })]
    ;
