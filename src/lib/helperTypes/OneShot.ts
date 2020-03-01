
type EvtCompat<T> = import("../EvtCompat").EvtCompat<T>;
import { NonPostable } from "./NonPostable";

export type OneShot<T extends NonPostable<EvtCompat<any>>> = Pick<T, "waitFor" | "attachOnce" | "$attachOnce" | "detach" | "evtAttach" | "evtDetach" | "postCount">;
