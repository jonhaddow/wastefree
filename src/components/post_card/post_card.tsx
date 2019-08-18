import React from "react";
import Styles from "./post_card.module.scss";
import { Link } from "gatsby";
import BackgroundImage, { IFluidObject } from "gatsby-background-image";

interface PostCardProps {
	title: string;
	date: string;
	featuredImage: {
		childImageSharp: {
			fluid: IFluidObject;
		};
	};
	slug: string;
}

export default function PostCard(props: PostCardProps): JSX.Element {
	const innerEls: JSX.Element[] = [];
	const { title, slug, featuredImage } = props;

	innerEls.push(<p>{title}</p>);

	const date = new Date(props.date);

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
