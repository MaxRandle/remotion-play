import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { Arc } from "./Arc";
import { Atom } from "./Atom";

export const ReactLogoSchema = z.object({
	logoColor1: zColor(),
	logoColor2: zColor(),
});

export type ReactLogoProps = z.infer<typeof ReactLogoSchema>;

export const ReactLogo: React.FC<ReactLogoProps> = ({
	logoColor1: color1,
	logoColor2: color2,
}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const development = spring({
		config: {
			damping: 100,
			mass: 0.5,
		},
		fps: videoConfig.fps,
		frame,
	});

	const rotationDevelopment = spring({
		config: {
			damping: 100,
			mass: 0.5,
		},
		fps: videoConfig.fps,
		frame,
	});

	return (
		<>
			<Arc
				rotateProgress={rotationDevelopment}
				progress={development}
				rotation={30}
				color1={color1}
				color2={color2}
			/>
			<Arc
				rotateProgress={rotationDevelopment}
				rotation={90}
				progress={development}
				color1={color1}
				color2={color2}
			/>
			<Arc
				rotateProgress={rotationDevelopment}
				rotation={-30}
				progress={development}
				color1={color1}
				color2={color2}
			/>
			<Atom
				scale={rotationDevelopment}
				color1={color1}
				color2={color2}
			/>
		</>
	);
};
