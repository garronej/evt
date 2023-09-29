
import type { EvtLike } from "./EvtLike.ts";

export interface StatefulEvtLike<T> extends EvtLike<T> {
	state: T;
};
