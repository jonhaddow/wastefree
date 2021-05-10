import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { navigate } from "@reach/router";
import { active, mainNav, searchBar } from "./navigation.module.scss";
import Icon from "../icons";
import Cross from "../icons/cross";
import Search from "../icons/search";

export default function Navigation(): JSX.Element {
	const listItems = [
		{
			name: "Home",
			link: "/",
		},
		{
			name: "Blogs",
			link: "/blogs/",
		},
		{
			name: "About",
			link: "/about/",
		},
		{
			name: "Recipes",
			link: "/recipes/",
		},
	].map(
		(x): JSX.Element => {
			return (
				<li key={x.name}>
					<Link to={x.link} activeClassName={active}>
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

	const onSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();

		const newQuery = searchBox.current?.value;

		if (!newQuery) return;

		await navigate(`/search?q=${newQuery}`);

		setSearchOpen(false);
		setQuery("");
	};

	return (
		<nav className={mainNav}>
			{searchOpen ? (
				<form onSubmit={onSubmit}>
					<input
						ref={searchBox}
						className={`${searchBar} ${searchOpen ? active : ""}`}
						placeholder="Search for content"
						value={query}
						onChange={onInput}
					></input>
				</form>
			) : (
				<ul>{listItems}</ul>
			)}
			<button onClick={onSearchOpen}>
				{searchOpen ? (
					<Icon width="16" height="16">
						<Cross />
					</Icon>
				) : (
					<Icon width="20" height="20">
						<Search />
					</Icon>
				)}
			</button>
		</nav>
	);
}
