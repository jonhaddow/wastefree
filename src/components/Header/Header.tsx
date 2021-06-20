import React, { ReactElement } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { header as headerClass } from "./Header.module.css";
import { BgImage } from "gbimage-bridge";
import { getImage } from "gatsby-plugin-image";

interface HeaderProps {
	title: string;
	description: string;
}

export const Header = (props: HeaderProps): ReactElement => {
	const { title, description } = props;

	const { header } = useStaticQuery(
		graphql`
			query {
				header: file(
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

	const headerImage = getImage(header);

	return (
		<header className={`${headerClass} h-96`}>
			<BgImage image={headerImage}>
				<h1 className="text-center m-2">
					<Link
						className="text-white font-serif text-6xl sm:text-8xl"
						to="/"
					>
						{title}
					</Link>
				</h1>
				<p className="text-white font-sans text-base md:text-lg">
					{description}
				</p>
			</BgImage>
		</header>
	);
};
