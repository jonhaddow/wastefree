import React from "react";
import Slider from "../components/slider";
import Styles from "./index.module.scss";
import { Link } from "gatsby";

import BlogsImage from "../assets/img/dog-and-baby.jpg";
import AboutImage from "../assets/img/about-portrait.jpg";
import RecipesImage from "../assets/img/recipes-strawberries.jpg";

export default function Home(): JSX.Element {
	const itemDetails = [
		{
			link: "/blogs",
			imageSrc: BlogsImage,
			title: "Blogs"
		},
		{
			link: "/about",
			imageSrc: AboutImage,
			title: "About"
		},
		{
			link: "/recipes",
			imageSrc: RecipesImage,
			title: "Recipes"
		}
	];

	const links = itemDetails.map(
		(link): JSX.Element => {
			const style: React.CSSProperties = {
				backgroundImage: `url(${link.imageSrc})`
			};
			return (
				<li key={link.title} style={style}>
					<Link to={link.link}>
						<h3>{link.title}</h3>
					</Link>
				</li>
			);
		}
	);

	return (
		<section className={Styles.home}>
			<Slider />

			<ul>{links}</ul>
		</section>
	);
}
