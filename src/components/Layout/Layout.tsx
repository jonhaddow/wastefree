import React, { ReactElement, useEffect } from "react";
import { Footer, Header, Navigation } from "..";
import Head from "next/head";
import config from "../../config";

interface LayoutProps {
	children?: JSX.Element[] | JSX.Element;
	pageTitle?: string;
	pageDescription?: string;
}

export const Layout = (props: LayoutProps): ReactElement => {
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

	const { title, description, tagLine, instagramLink } = config;

	return (
		<>
			<Head>
				<title>{`${pageTitle ? `${pageTitle} - ` : ""}${title}`}</title>
				<meta name="description" content={pageDescription} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:site_name" content={title} />
				<meta property="twitter:card" content="summary" />
				<meta property="twitter:title" content={title} />
				<meta property="twitter:description" content={description} />
			</Head>
			<div className="min-h-screen">
				<Header title={title} description={tagLine} />
				<Navigation />
				<main className="relative">{props.children}</main>
				<Footer title={title} instagramLink={instagramLink} />
			</div>
		</>
	);
};
