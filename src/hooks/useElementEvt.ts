import * as React from "react";
const { useRef, useEffect, useState } = React;
import { useEvt } from "./useEvt";
import type { Ctx } from "../lib";

export function useElementEvt<T extends HTMLElement = any>(
	effect: (params: { ctx: Ctx; element: T }) => void,
	deps: React.DependencyList
): { ref: React.RefObject<T>; };
export function useElementEvt<T extends HTMLElement = any>(
	effect: (params: { ctx: Ctx; element: T }) => void,
	ref: React.RefObject<T>,
	deps: React.DependencyList
): void;
export function useElementEvt<T extends HTMLElement = any>(
	effect: (params: {
		ctx: Ctx;
		element: T;
		registerSideEffect: (sideEffect: () => void) => void;
	}) => void,
	depsOrRef: React.DependencyList | React.RefObject<T>,
	depsOrUndefined?: React.DependencyList
): { ref: React.RefObject<T>; } | void {

	const isRefProvided = depsOrUndefined !== undefined;

	const deps = depsOrUndefined ?? depsOrRef as React.DependencyList;

	const refInternallyCreated = useRef<T>(null);

	const ref = isRefProvided ? depsOrRef as React.RefObject<T> : refInternallyCreated;

	const [element, setElement] = useState<T | null>(null);

	useEffect(
		() => { setElement(ref.current); },
		[ref.current ?? Object]
	);

	useEvt(
		(ctx, registerSideEffect) => {

			if (element === null) {
				return;
			}

			effect({ ctx, element, registerSideEffect });

		},
		[element ?? Object, ...deps]
	);

	return { ref };


}
