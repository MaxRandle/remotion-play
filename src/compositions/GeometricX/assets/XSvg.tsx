import * as React from "react";
import { type SVGProps } from "react";

type SvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export const XSvg = React.forwardRef<React.ElementRef<"svg">, SvgProps>(
	({ size = 32, ...props }, ref) => {
		return (
			<svg
				ref={ref}
				width={size}
				height={size}
				xmlns="http://www.w3.org/2000/svg"
				xmlSpace="preserve"
				style={{
					fillRule: "evenodd",
					clipRule: "evenodd",
					strokeLinejoin: "round",
					strokeMiterlimit: 2,
				}}
				viewBox="0 0 64 64"
				{...props}
			/>
		);
	}
);

XSvg.displayName = "XSvg";
