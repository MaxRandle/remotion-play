import * as React from "react";
import { type SVGProps } from "react";

export type PathProps = SVGProps<SVGPathElement>;

export const XRightHalf: React.FC<PathProps> = ({ ...props }) => {
	return (
		<path
			d="M64 64 44 32 64 0H44L32 20h8L24 44h8l12 20h20Z"
			{...props}
		/>
	);
};
