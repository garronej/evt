
import type { NonPostableEvtLike } from "./NonPostableEvtLike.ts";

export interface StatefulReadonlyEvtLike<T> extends NonPostableEvtLike<T> {
	readonly state: T;
};
