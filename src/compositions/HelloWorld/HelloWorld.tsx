import { spring } from "remotion";
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { HelloWorldLogoOnly } from "./HelloWorldLogoOnly";
import { Subtitle } from "./assets/Subtitle";
import { Title } from "./assets/Title";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const HelloWorldSchema = z.object({
	titleText: z.string(),
	titleColor: zColor(),
	logoColor1: zColor(),
	logoColor2: zColor(),
});

export type HelloWorldProps = z.infer<typeof HelloWorldSchema>;

export const HelloWorld: React.FC<HelloWorldProps> = ({
	titleText,
	titleColor,
	logoColor1,
	logoColor2,
}) => {
	const frame = useCurrentFrame();
	const { durationInFrames, fps } = useVideoConfig();

	// Animate from 0 to 1 after 25 frames
	const logoTranslationProgress = spring({
		frame: frame - 25,
		fps,
		config: {
			damping: 100,
		},
	});

	// Move the logo up by 150 pixels once the transition starts
	const logoTranslation = interpolate(
		logoTranslationProgress,
		[0, 1],
		[0, -150]
	);

	// Fade out the animation at the end
	const opacity = interpolate(
		frame,
		[durationInFrames - 25, durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		}
	);

	// A <AbsoluteFill> is just a absolutely positioned <div>!
	return (
		<AbsoluteFill style={{ backgroundColor: "white" }}>
			<AbsoluteFill style={{ opacity }}>
				<AbsoluteFill style={{ transform: `translateY(${logoTranslation}px)` }}>
					<HelloWorldLogoOnly
						logoColor1={logoColor1}
						logoColor2={logoColor2}
					/>
				</AbsoluteFill>
				{/* Sequences can shift the time for its children! */}
				<Sequence from={35}>
					<Title
						titleText={titleText}
						titleColor={titleColor}
					/>
				</Sequence>
				{/* The subtitle will only enter on the 75th frame. */}
				<Sequence from={75}>
					<Subtitle />
				</Sequence>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
