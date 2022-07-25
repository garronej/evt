
import type { EvtLike } from "./EvtLike";

export interface StatefulEvtLike<T> extends EvtLike<T> {
	state: T;
};
