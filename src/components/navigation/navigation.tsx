import React from "react";
import { Link } from "gatsby";
import styles from "./navigation.module.scss";

export default function Navigation(): JSX.Element {
	const listItems = [
		{
			name: "Home",
			link: "/"
		},
		{
			name: "Blogs",
			link: "/blogs"
		},
		{
			name: "About",
			link: "/about"
		},
		{
			name: "Recipes",
			link: "/recipes"
		}
	].map(
		(x): JSX.Element => {
			return (
				<li key={x.name}>
					<Link to={x.link}>{x.name}</Link>
				</li>
			);
		}
	);

	return (
		<nav className={styles.mainNav}>
			<ul>{listItems}</ul>
		</nav>
	);
}
