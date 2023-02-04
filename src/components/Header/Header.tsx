import React, { ReactElement } from "react";
import { Link } from "gatsby";
import { header as headerClass } from "./Header.module.css";
import { useHeaderImage } from "../../hooks";
import { GatsbyImage } from "gatsby-plugin-image";

interface HeaderProps {
	title: string;
	description: string;
}

export const Header = (props: HeaderProps): ReactElement => {
	const { title, description } = props;

	const header = useHeaderImage();

	return (
		<header className={`${headerClass} h-96 grid`}>
			{header?.childImageSharp?.gatsbyImageData && (
				<GatsbyImage
					className="row-start-1 col-start-1"
					alt=""
					image={header.childImageSharp.gatsbyImageData}
				/>
			)}
			<div className="flex items-center flex-col relative row-start-1 col-start-1">
				<h1 className="text-center m-2">
					<Link
						className="text-white font-serif text-6xl sm:text-8xl"
						to="/"
					>
						{title}
					</Link>
				</h1>
				<p className="text-white font-sans text-base md:text-lg">
					{description}
				</p>
			</div>
		</header>
	);
};
