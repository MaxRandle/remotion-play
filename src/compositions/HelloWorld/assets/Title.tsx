import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "../constants";

const titleStyles: React.CSSProperties = {
	fontFamily: FONT_FAMILY,
	fontWeight: "bold",
	fontSize: 100,
	textAlign: "center",
	position: "absolute",
	bottom: 160,
	width: "100%",
};

const wordStyles: React.CSSProperties = {
	marginLeft: 10,
	marginRight: 10,
	display: "inline-block",
};

export const Title: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({ titleText, titleColor }) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const words = titleText.split(" ");

	return (
		<h1 style={titleStyles}>
			{words.map((word, i) => {
				const delay = i * 5;

				const scale = spring({
					fps: videoConfig.fps,
					frame: frame - delay,
					config: {
						damping: 200,
					},
				});

				return (
					<span
						key={word}
						style={{
							...wordStyles,
							color: titleColor,
							transform: `scale(${scale})`,
						}}
					>
						{word}
					</span>
				);
			})}
		</h1>
	);
};
