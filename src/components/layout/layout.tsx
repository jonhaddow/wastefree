import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Header from "../header";
import Navigation from "../navigation";
import Footer from "../footer";
import { wrapper } from "./layout.module.scss";

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
						description
						tagLine
						instagramLink
					}
				}
			}
		`
	);

	const {
		title,
		description,
		tagLine,
		instagramLink,
	} = data.site.siteMetadata;
	const { pageDescription, pageTitle } = props;

	return (
		<>
			<Helmet>
				<meta
					name="Description"
					content={pageDescription ? pageDescription : description}
				></meta>
				<title>
					{pageTitle ? `${pageTitle} - ` : ""}
					{title}
				</title>
			</Helmet>
			<div className={wrapper}>
				<Header title={title} description={tagLine} />
				<Navigation />
				{props.children}
				<Footer title={title} instagramLink={instagramLink} />
			</div>
		</>
	);
}
