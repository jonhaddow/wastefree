import React, { useState, useEffect } from "react";
import { Link, navigate } from "gatsby";
import styles from "./navigation.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

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
					<Link to={x.link} activeClassName={styles.active}>
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

	const [query, setQuery] = useState("");

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

		navigate(`/search`, { state: { query: newQuery } });
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
