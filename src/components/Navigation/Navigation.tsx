import React, { useState, useEffect, ReactElement } from "react";
import { Link } from "gatsby";
import { navigate } from "@reach/router";
import { Search, Cross } from "../icons";

const LINKS = [
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
];

export const Navigation = (): ReactElement => {
	const searchBox = React.createRef<HTMLInputElement>();
	const [searchOpen, setSearchOpen] = useState(false);
	const [query, setQuery] = useState("");

	useEffect((): void => {
		if (searchBox.current) {
			searchBox.current.focus();
		}
	}, [searchBox]);

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
		<nav className="flex justify-center items-center my-2 h-16">
			{searchOpen ? (
				<form className="my-4" onSubmit={onSubmit}>
					<input
						ref={searchBox}
						className="py-2 px-3 rounded-xl bg-gray-100 outline-none border-2 focus:border-primary w-96"
						placeholder="Search for content"
						value={query}
						onChange={(e) => setQuery(e.currentTarget.value)}
					></input>
				</form>
			) : (
				<ul className="flex justify-center flex-wrap my-4">
					{LINKS.map((l) => (
						<li className="px-1 m-0 " key={l.name}>
							<Link
								className="py-2 h-full text-gray-700 uppercase font-normal  hover:bg-gray-100 rounded-md tracking-wide px-4"
								to={l.link}
								activeClassName="text-primary"
							>
								{l.name}
							</Link>
						</li>
					))}
				</ul>
			)}
			<button
				className="ml-3 p-1"
				onClick={() => setSearchOpen(!searchOpen)}
			>
				{searchOpen ? (
					<Cross
						width="16"
						height="16"
						className="text-gray-700 fill-current font-normal"
					/>
				) : (
					<Search
						width="16"
						height="16"
						className="text-gray-700 fill-current font-normal"
					/>
				)}
			</button>
		</nav>
	);
};
