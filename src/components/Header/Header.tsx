import React, { ReactElement } from "react";
import Link from "next/link";
import { header as headerClass } from "./Header.module.css";
import Image from "next/image";
import headerImg from "./header-image.jpg";

interface HeaderProps {
	title: string;
	description: string;
}

export const Header = (props: HeaderProps): ReactElement => {
	const { title, description } = props;

	return (
		<header className={`${headerClass} h-96`}>
			<div className="relative">
				<Image
					src={headerImg}
					layout="fill"
					className="object-cover object-center pointer-events-none"
					placeholder="blur"
				/>
				<h1 className="text-center m-2 z-10">
					<Link href="/">
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a className="text-white font-serif text-6xl sm:text-8xl">
							{title}
						</a>
					</Link>
				</h1>
				<p className="text-white z-10 font-sans text-base md:text-lg">
					{description}
				</p>
			</div>
		</header>
	);
};
