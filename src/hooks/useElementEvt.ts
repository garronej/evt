import * as React from "react";
const { useRef, useEffect, useState } = React;
import { useEvt } from "./useEvt";
import type { Ctx } from "../lib";

export function useElementEvt<T extends HTMLElement = any>(
	effect: (params: { ctx: Ctx; element: T }) => void,
	deps: React.DependencyList
) {

	const ref = useRef<T>(null);

	const [element, setElement] = useState<T | null>(null);

	useEffect(
		() => { setElement(ref.current); },
		[ref.current ?? Object]
	);

	useEvt(
		ctx => {

			if (element === null) {
				return;
			}

			effect({ ctx, element });

		},
		[element ?? Object, ...deps]
	);

	return { ref };

}