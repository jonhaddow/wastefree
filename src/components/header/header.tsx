import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { header } from "./header.module.scss";
import { BgImage } from "gbimage-bridge";
import { getImage } from "gatsby-plugin-image";

interface HeaderProps {
	title: string;
	description: string;
}

export default function Header(props: HeaderProps): JSX.Element {
	const { title, description } = props;

	const { placeholderImage } = useStaticQuery(
		graphql`
			query {
				placeholderImage: file(
					relativePath: { eq: "site_images/header-image.jpg" }
				) {
					childImageSharp {
						gatsbyImageData(
							layout: FULL_WIDTH
							placeholder: BLURRED
						)
					}
				}
			}
		`
	);

	const pluginImage = getImage(placeholderImage);

	return (
		<header className={header}>
			<BgImage image={pluginImage}>
				<h1>
					<Link to="/">{title}</Link>
				</h1>
				<p>{description}</p>
			</BgImage>
		</header>
	);
}
