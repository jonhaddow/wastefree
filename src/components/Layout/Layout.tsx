import React, { ReactElement, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Footer, Header, Navigation } from "..";
import { useMetadata } from "../../hooks";

interface LayoutProps {
	children?: JSX.Element[] | JSX.Element;
	pageTitle?: string;
	pageDescription?: string;
}

export const Layout = (props: LayoutProps): ReactElement => {
	const { title, description, tagLine, instagramLink } = useMetadata();
	const { pageDescription, pageTitle } = props;

	// Add analytics to the end of the document
	useEffect(() => {
		const script = document.createElement("script");

		script.setAttribute(
			"src",
			"https://static.cloudflareinsights.com/beacon.min.js"
		);

		script.setAttribute(
			"data-cf-beacon",
			'{"token": "bf66bc112e1b4b3bb4bd45139ce4d6d2"}'
		);

		document.body.appendChild(script);
	}, []);

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
