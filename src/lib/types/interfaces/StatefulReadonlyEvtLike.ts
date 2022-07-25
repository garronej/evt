
import type { NonPostableEvtLike } from "./NonPostableEvtLike";

export interface StatefulReadonlyEvtLike<T> extends NonPostableEvtLike<T> {
	readonly state: T;
};
