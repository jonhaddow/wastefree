import React from "react";
import { Link } from "gatsby";
import BackgroundImage, { IFluidObject } from "gatsby-background-image";
import styles from "./header.module.scss";

interface HeaderProps {
	title: string;
	description: string;
	image: IFluidObject;
}

export default function Header(props: HeaderProps): JSX.Element {
	const { title, description, image } = props;
	return (
		<BackgroundImage Tag="header" fluid={image} className={styles.header}>
			<h1>
				<Link to="/">{title}</Link>
			</h1>
			<p>{description}</p>
		</BackgroundImage>
	);
}
