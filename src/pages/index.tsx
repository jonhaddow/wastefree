import React from "react";
import Slider from "../components/slider";
import Styles from "./index.module.scss";
import { Link, graphql } from "gatsby";

import BlogsImage from "../assets/img/dog-and-baby.jpg";
import AboutImage from "../assets/img/about-portrait.jpg";
import RecipesImage from "../assets/img/recipes-strawberries.jpg";
import Layout from "../components/layout";
import Post from "../common/post";

interface GraphQLSchema {
	allMarkdownRemark: {
		nodes: Post[];
	};
}

export default function Home(props: { data: GraphQLSchema }): JSX.Element {
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
		<Layout>
			<section className={Styles.home}>
				<Slider recentPosts={props.data.allMarkdownRemark.nodes} />

				<ul>{links}</ul>
			</section>
		</Layout>
	);
}

export const query = graphql`
	query {
		allMarkdownRemark(
			filter: {
				fileAbsolutePath: { regex: "/(blogs|recipes)/.*\\\\.md$/" }
			}
			sort: { fields: frontmatter___date, order: DESC }
			limit: 3
		) {
			nodes {
				frontmatter {
					featuredImage {
						childImageSharp {
							fluid {
								...GatsbyImageSharpFluid
							}
						}
					}
					date
					title
				}
				id
				fields {
					slug
				}
			}
		}
	}
`;
