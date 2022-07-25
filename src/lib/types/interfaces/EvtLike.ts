
import type { NonPostableEvtLike } from "./NonPostableEvtLike";

export interface EvtLike<T> extends NonPostableEvtLike<T>  {
	post(data: T): void;
};