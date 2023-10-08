import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { ReactLogo } from "./assets/ReactLogo";

export const HelloWorldLogoOnlySchema = z.object({
	logoColor1: zColor(),
	logoColor2: zColor(),
});

export type HelloWorldLogoOnlyProps = z.infer<typeof HelloWorldLogoOnlySchema>;

export const HelloWorldLogoOnly: React.FC<HelloWorldLogoOnlyProps> = ({
	logoColor1,
	logoColor2,
}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const scale = spring({
		frame,
		config: {
			mass: 0.5,
		},
		fps: videoConfig.fps,
	});

	const logoRotation = interpolate(
		frame,
		[0, videoConfig.durationInFrames],
		[0, 360]
	);

	return (
		<AbsoluteFill
			style={{
				transform: `scale(${scale}) rotate(${logoRotation}deg)`,
			}}
		>
			<ReactLogo
				logoColor1={logoColor1}
				logoColor2={logoColor2}
			/>
		</AbsoluteFill>
	);
};
