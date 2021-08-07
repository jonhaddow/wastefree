import React, { ReactElement } from "react";
import { Link } from "gatsby";
import { header as headerClass } from "./Header.module.css";
import { BgImage } from "gbimage-bridge";
import { useHeaderImage } from "../../hooks";

interface HeaderProps {
	title: string;
	description: string;
}

export const Header = (props: HeaderProps): ReactElement => {
	const { title, description } = props;

	const headerImage = useHeaderImage();

	return (
		<header className={`${headerClass} h-96`}>
			<BgImage image={headerImage}>
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
			</BgImage>
		</header>
	);
};
