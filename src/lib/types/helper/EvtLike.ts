
export type EvtLike<T> = { isHandled(data: T): boolean; };