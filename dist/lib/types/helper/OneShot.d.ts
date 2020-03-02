declare type Evt<T> = import("../../Evt").Evt<T>;
import { NonPostable } from "./NonPostable";
export declare type OneShot<T extends NonPostable<Evt<any>>> = Pick<T, "waitFor" | "attachOnce" | "$attachOnce" | "detach" | "evtAttach" | "evtDetach" | "postCount">;
export {};
