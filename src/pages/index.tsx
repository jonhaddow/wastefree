import React from "react";
import Slider from "../components/slider";
import Styles from "./index.module.scss";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Post from "../common/post";
import BackgroundImage, { IFluidObject } from "gatsby-background-image";

interface GraphQLSchema {
	featuredPosts: {
		nodes: Post[];
	};
	blogImg: {
		childImageSharp: {
			fluid: IFluidObject;
		};
	};
	aboutImg: {
		childImageSharp: {
			fluid: IFluidObject;
		};
	};
	recipeImg: {
		childImageSharp: {
			fluid: IFluidObject;
		};
	};
}

export default function Home(props: { data: GraphQLSchema }): JSX.Element {
	const itemDetails = [
		{
			link: "/blogs",
			imageSrc: props.data.blogImg.childImageSharp.fluid,
			title: "Blogs"
		},
		{
			link: "/about",
			imageSrc: props.data.aboutImg.childImageSharp.fluid,
			title: "About"
		},
		{
			link: "/recipes",
			imageSrc: props.data.recipeImg.childImageSharp.fluid,
			title: "Recipes"
		}
	];

	const links = itemDetails.map(
		(link): JSX.Element => {
			return (
				<BackgroundImage
					key={link.title}
					Tag="li"
					fluid={link.imageSrc}
				>
					<Link to={link.link}>
						<h3>{link.title}</h3>
					</Link>
				</BackgroundImage>
			);
		}
	);

	return (
		<Layout>
			<section className={Styles.home}>
				<Slider recentPosts={props.data.featuredPosts.nodes} />

				<ul>{links}</ul>
			</section>
		</Layout>
	);
}

export const query = graphql`
	query {
		featuredPosts: allMarkdownRemark(
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
		blogImg: file(relativePath: { eq: "site_images/dog-and-baby.jpg" }) {
			childImageSharp {
				fluid {
					...GatsbyImageSharpFluid
				}
			}
		}
		aboutImg: file(relativePath: { eq: "site_images/about-portrait.jpg" }) {
			childImageSharp {
				fluid {
					...GatsbyImageSharpFluid
				}
			}
		}
		recipeImg: file(
			relativePath: { eq: "site_images/recipes-strawberries.jpg" }
		) {
			childImageSharp {
				fluid {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`;
