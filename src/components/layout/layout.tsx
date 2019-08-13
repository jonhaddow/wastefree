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
					}
				}
			}
		`
	);

	const { title, description } = data.site.siteMetadata;

	return (
		<div className={styles.wrapper}>
			<Header title={title} description={description} />
			<Navigation />
			{props.children}
			<Footer title={title} />
		</div>
	);
}
