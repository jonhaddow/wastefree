import React from "react";
import Styles from "./post_card.module.scss";
import { Link } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import Post from "../../common/post";

export default function PostCard(props: Post): JSX.Element {
	const { slug } = props.fields;
	const { title, featuredImage, date } = props.frontmatter;

	const backgroundFluidImageStack = [
		featuredImage.childImageSharp.fluid,
		`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))`
	].reverse();

	return (
		<li className={Styles.postCard}>
			<BackgroundImage fluid={backgroundFluidImageStack}>
				<Link to={slug}>
					<span className={Styles.title}>{title}</span>
					<time className={Styles.date}>{date}</time>
				</Link>
			</BackgroundImage>
		</li>
	);
}
