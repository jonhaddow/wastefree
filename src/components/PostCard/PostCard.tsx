import React, { ReactElement } from "react";
import { Link } from "gatsby";
import Post from "../../common/post";
import { BgImage } from "gbimage-bridge";

export const PostCard = (props: Post): ReactElement => {
	const { slug } = props.fields;
	const { title, featuredImage, date } = props.frontmatter;

	const backgroundFluidImageStack = [
		featuredImage.childImageSharp.gatsbyImageData,
		`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))`,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- forcing it to any because <BgImage> has the wrong types.
	].reverse() as any;

	return (
		<li className="m-auto py-4 md:p-4 h-96 w-full bg-image-wrapper transform-gpu transition-transform hover:scale-105">
			<BgImage image={backgroundFluidImageStack}>
				<Link
					className="flex flex-col justify-center p-4 w-full items-center text-white h-full"
					to={slug}
				>
					<span className="text-2xl">{title}</span>
					<time className="font-thin pt-4">{date}</time>
				</Link>
			</BgImage>
		</li>
	);
};
