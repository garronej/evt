
import type { NonPostableEvtLike } from "./NonPostableEvtLike.ts";

export interface EvtLike<T> extends NonPostableEvtLike<T>  {
	post(data: T): void;
};