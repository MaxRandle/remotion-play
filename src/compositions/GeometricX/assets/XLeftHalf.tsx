import * as React from "react";
import { type SVGProps } from "react";

export type PathProps = SVGProps<SVGPathElement>;

export const XLeftHalf: React.FC<PathProps> = ({ ...props }) => {
	return (
		<path
			d="m0 0 20 32L0 64h20l12-20h-8l16-24h-8L20 0H0Z"
			{...props}
		/>
	);
};
