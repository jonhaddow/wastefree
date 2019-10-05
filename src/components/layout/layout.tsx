import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Header from "../header";
import Navigation from "../navigation";
import Footer from "../footer";
import styles from "./layout.module.scss";
import "../../styles/global.scss";

interface LayoutProps {
	children?: JSX.Element[] | JSX.Element;
	pageTitle?: string;
	pageDescription?: string;
}

export default function Layout(props: LayoutProps): JSX.Element {
	const data = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						tagLine
						instagramLink
						url
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

	const { title, tagLine, instagramLink, url } = data.site.siteMetadata;
	const { fluid: headerImage } = data.file.childImageSharp;
	const { pageDescription, pageTitle } = props;

	return (
		<>
			<Helmet>
				{pageDescription ? (
					<meta name="Description" content={pageDescription}></meta>
				) : (
					""
				)}
				<link rel="canonical" href={url}></link>
				<title>
					{pageTitle ? `${pageTitle} - ` : ""}
					{title}
				</title>
			</Helmet>
			<div className={styles.wrapper}>
				<Header
					title={title}
					description={tagLine}
					image={headerImage}
				/>
				<Navigation />
				{props.children}
				<Footer title={title} instagramLink={instagramLink} />
			</div>
		</>
	);
}
