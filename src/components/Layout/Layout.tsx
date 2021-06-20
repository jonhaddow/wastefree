import React, { ReactElement } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { Footer, Header, Navigation } from "..";

interface LayoutProps {
	children?: JSX.Element[] | JSX.Element;
	pageTitle?: string;
	pageDescription?: string;
}

export const Layout = (props: LayoutProps): ReactElement => {
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
			<div className="min-h-screen">
				<Header title={title} description={tagLine} />
				<Navigation />
				<main className="relative">{props.children}</main>
				<Footer title={title} instagramLink={instagramLink} />
			</div>
		</>
	);
};
