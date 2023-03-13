import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "gatsby";
import { navigate } from "@reach/router";
import { Cross, Search } from "../icons";
import { StaticImage } from "gatsby-plugin-image";

const LINKS = [
	{
		name: "Home",
		link: "/",
	},
	{
		name: "Blogs",
		link: "/blogs",
	},
	{
		name: "About",
		link: "/about",
	},
	{
		name: "Recipes",
		link: "/recipes",
	},
	{
		name: "Products",
		link: "/products",
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
		<nav className="flex justify-center items-center h-20 sticky w-full top-0 bg-white z-50 shadow-lg">
			{searchOpen ? (
				<form className="my-4 px-4 flex w-96" onSubmit={onSubmit}>
					<input
						ref={searchBox}
						className="py-2 px-3 rounded-xl bg-gray-100 outline-none border-2 focus:border-primary flex-1"
						placeholder="Search for content"
						value={query}
						onChange={(e) => setQuery(e.currentTarget.value)}
					></input>
					<button
						className="ml-3 p-1"
						onClick={() => setSearchOpen(!searchOpen)}
						type="button"
					>
						<Cross
							width="16"
							height="16"
							className="text-gray-700 fill-current font-normal"
						/>
					</button>
				</form>
			) : (
				<div className="flex px-4">
					<div className="flex items-center justify-center mr-5">
						<StaticImage
							alt=""
							src="./logo-wfm.png"
							placeholder="blurred"
							width={50}
							height={50}
						/>
					</div>
					<ul className="flex-1 flex justify-center flex-wrap my-4">
						{LINKS.map((l) => (
							<li className="px-1 m-0 " key={l.name}>
								<Link
									className="py-1 md:py-2 h-full text-gray-700 uppercase font-normal hover:bg-gray-100 rounded-md tracking-wide px-2 md:px-4 leading-10"
									to={l.link}
									activeClassName="text-primary"
								>
									{l.name}
								</Link>
							</li>
						))}
					</ul>
					<button
						className="ml-3 p-1"
						onClick={() => setSearchOpen(!searchOpen)}
					>
						<Search
							width="16"
							height="16"
							className="text-gray-700 fill-current font-normal"
						/>
					</button>
				</div>
			)}
		</nav>
	);
};
