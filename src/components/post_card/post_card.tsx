import React from "react";
import Styles from "./post_card.module.scss";
import { Link } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import Post from "../../common/post";

export default function PostCard(props: Post): JSX.Element {
	const { slug } = props.fields;
	const { title, featuredImage, date: dateStr } = props.frontmatter;

	const date = new Date(dateStr);

	const backgroundFluidImageStack = [
		featuredImage.childImageSharp.fluid,
		`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))`
	].reverse();

	return (
		<BackgroundImage
			Tag="li"
			className={Styles.postCard}
			fluid={backgroundFluidImageStack}
		>
			<Link to={slug}>
				<span className={Styles.title}>{title}</span>
				<time className={Styles.date}>
					{date.toLocaleDateString("en-GB", {
						day: "numeric",
						month: "short",
						year: "numeric"
					})}
				</time>
			</Link>
		</BackgroundImage>
	);
}
