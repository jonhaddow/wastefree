import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import styles from "./navigation.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Navigation(props: {
	currentQuery?: string;
	setCurrentQuery?: (x: string) => void;
}): JSX.Element {
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
	const [searchOpen, setSearchOpen] = useState(!!props.currentQuery);
	const onSearchOpen = (): void => {
		setSearchOpen(!searchOpen);
	};

	const [query, setQuery] = useState(
		props.currentQuery ? props.currentQuery : ""
	);

	useEffect((): void => {
		if (searchBox.current) {
			searchBox.current.focus();
		}
	});

	const onInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setQuery(e.currentTarget.value);
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		const newQuery = searchBox.current.value;

		if (!newQuery) return;

		if (props.setCurrentQuery) {
			props.setCurrentQuery(newQuery);
		} else {
			window.location.href = `/search?q=${newQuery}`;
		}
	};

	return (
		<nav className={styles.mainNav}>
			{searchOpen ? (
				<form onSubmit={onSubmit}>
					<input
						ref={searchBox}
						className={`${styles.searchBar} ${
							searchOpen ? styles.active : ""
						}`}
						placeholder="Search for content"
						value={query}
						onChange={onInput}
					></input>
				</form>
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
