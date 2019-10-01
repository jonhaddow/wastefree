import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Header from "../header";
import Navigation from "../navigation";
import Footer from "../footer";
import styles from "./layout.module.scss";
import "../../styles/global.scss";

interface LayoutProps {
	children?: JSX.Element[] | JSX.Element;
}

export default function Layout(props: LayoutProps): JSX.Element {
	const data = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						instagramLink
					}
				}
				file(relativePath: { eq: "site_images/header-image.jpg" }) {
					childImageSharp {
						fluid {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		`
	);

	const { title, description, instagramLink } = data.site.siteMetadata;
	const { fluid: headerImage } = data.file.childImageSharp;

	return (
		<div className={styles.wrapper}>
			<Header
				title={title}
				description={description}
				image={headerImage}
			/>
			<Navigation />
			{props.children}
			<Footer title={title} instagramLink={instagramLink} />
		</div>
	);
}
