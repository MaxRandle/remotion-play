import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
	Easing,
} from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { XSvg } from "./assets/XSvg";
import { XLeftHalf } from "./assets/XLeftHalf";
import { PathProps, XRightHalf } from "./assets/XRightHalf";

export const GeometricXSchema = z.object({
	backgroundColor: zColor(),
	logoLeftHalfColor: zColor(),
	logoRightHalfColor: zColor(),
});

export type GeometricXProps = z.infer<typeof GeometricXSchema>;

export const GeometricX: React.FC<GeometricXProps> = ({
	backgroundColor,
	logoLeftHalfColor,
	logoRightHalfColor,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const easeIn2Seconds = interpolate(frame, [0, 2 * fps], [0, 1], {
		easing: Easing.in(Easing.ease),
	});

	const linear2Seconds = interpolate(frame, [0, 2 * fps], [0, 1]);

	const backgroundStyles: React.CSSProperties = {
		backgroundColor,
		display: "relative",
	};

	const xSvgStyles: React.CSSProperties = {
		position: "absolute",
		inset: "25%",
		// transform: "translate(-50%, -50%)",
		width: "50%",
		height: "50%",
	};

	const xPathStyles: React.CSSProperties = {
		strokeWidth: 1,
		stroke: "white",
		strokeDasharray: `1 1`,
		strokeDashoffset: 1 - linear2Seconds,
	};

	const xPathLeftStyles: React.CSSProperties = {
		transform: `translateX(${-(10 - easeIn2Seconds * 10)}px)`,
	};

	const xPathRightStyles: React.CSSProperties = {
		transform: `translateX(${10 - easeIn2Seconds * 10}px)`,
	};

	const xPathProps: PathProps = {
		pathLength: 1,
	};

	return (
		<AbsoluteFill style={backgroundStyles}>
			<XSvg style={xSvgStyles}>
				<XLeftHalf
					fill={logoLeftHalfColor}
					stroke={logoRightHalfColor}
					style={{ ...xPathStyles, ...xPathLeftStyles }}
					{...xPathProps}
				/>
				<XRightHalf
					fill={logoRightHalfColor}
					stroke={logoLeftHalfColor}
					style={{ ...xPathStyles, ...xPathRightStyles }}
					{...xPathProps}
				/>
			</XSvg>
		</AbsoluteFill>
	);
};
