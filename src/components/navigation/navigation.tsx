import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import styles from "./navigation.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Navigation(): JSX.Element {
	const currentUrl = window.location.pathname;
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
					<Link
						to={x.link}
						className={x.link == currentUrl ? styles.active : ""}
					>
						{x.name}
					</Link>
				</li>
			);
		}
	);

	const searchBox = React.createRef<HTMLInputElement>();
	const [searchOpen, setSearchOpen] = useState(false);
	const onSearchOpen = (): void => {
		setSearchOpen(!searchOpen);
	};

	useEffect((): void => {
		if (searchBox.current) {
			searchBox.current.focus();
		}
	});

	return (
		<nav className={styles.mainNav}>
			{searchOpen ? (
				<input
					ref={searchBox}
					className={`${styles.searchBar} ${
						searchOpen ? styles.active : ""
					}`}
					placeholder="Search for content"
				></input>
			) : (
				<ul>{listItems}</ul>
			)}
			<button onClick={onSearchOpen}>
				<FontAwesomeIcon
					icon={searchOpen ? faTimes : faSearch}
				></FontAwesomeIcon>
			</button>
		</nav>
	);
}
