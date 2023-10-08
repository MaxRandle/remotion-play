import { Composition } from "remotion";
import {
	HelloWorld,
	HelloWorldLogoOnly,
	HelloWorldLogoOnlySchema,
	HelloWorldSchema,
} from "./compositions/HelloWorld";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="HelloWorldLogoOnly"
				component={HelloWorldLogoOnly}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				schema={HelloWorldLogoOnlySchema}
				defaultProps={{
					logoColor1: "#91dAE2" as const,
					logoColor2: "#86A8E7" as const,
				}}
			/>
			<Composition
				// You can take the "id" to render a video:
				// npx remotion render src/index.ts <id> out/video.mp4
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				// You can override these props for each render:
				// https://www.remotion.dev/docs/parametrized-rendering
				schema={HelloWorldSchema}
				defaultProps={{
					titleText: "Welcome to Remotion",
					titleColor: "#000000",
					logoColor1: "#91EAE4",
					logoColor2: "#86A8E7",
				}}
			/>
		</>
	);
};
