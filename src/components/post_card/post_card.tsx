import React from "react";
import {
	postCard,
	title as titleClass,
	date as dateClass,
} from "./post_card.module.scss";
import { Link } from "gatsby";
import Post from "../../common/post";
import { BgImage } from "gbimage-bridge";

export default function PostCard(props: Post): JSX.Element {
	const { slug } = props.fields;
	const { title, featuredImage, date } = props.frontmatter;

	const backgroundFluidImageStack = [
		featuredImage.childImageSharp.gatsbyImageData,
		`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- forcing it to any because <BgImage> has the wrong types.
	].reverse() as any;

	return (
		<li className={postCard}>
			<BgImage image={backgroundFluidImageStack}>
				<Link to={slug}>
					<span className={titleClass}>{title}</span>
					<time className={dateClass}>{date}</time>
				</Link>
			</BgImage>
		</li>
	);
}
