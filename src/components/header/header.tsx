import React from "react";
import { Link } from "gatsby";
import styles from "./header.module.scss";

interface HeaderProps {
	title: string;
	description: string;
}

export default function Header(props: HeaderProps): JSX.Element {
	const { title, description } = props;
	return (
		<header className={styles.header}>
			<h1>
				<Link to="/">{title}</Link>
			</h1>
			<p>{description}</p>
		</header>
	);
}
