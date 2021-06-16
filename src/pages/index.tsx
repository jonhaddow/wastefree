import React from "react";
import { home } from "./index.module.scss";
import { Link, graphql } from "gatsby";
import { Layout, Slider } from "../components";
import Post from "../common/post";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { BgImage } from "gbimage-bridge";

interface GraphQLSchema {
	featuredPosts: {
		nodes: Post[];
	};
	blogImg: {
		childImageSharp: {
			gatsbyImageData: IGatsbyImageData;
		};
	};
	aboutImg: {
		childImageSharp: {
			gatsbyImageData: IGatsbyImageData;
		};
	};
	recipeImg: {
		childImageSharp: {
			gatsbyImageData: IGatsbyImageData;
		};
	};
}

export default function Home(props: { data: GraphQLSchema }): JSX.Element {
	const itemDetails = [
		{
			link: "/blogs",
			imageSrc: props.data.blogImg.childImageSharp,
			title: "Blogs",
		},
		{
			link: "/about",
			imageSrc: props.data.aboutImg.childImageSharp,
			title: "About",
		},
		{
			link: "/recipes",
			imageSrc: props.data.recipeImg.childImageSharp,
			title: "Recipes",
		},
	];

	const links = itemDetails.map(
		(link): JSX.Element => {
			return (
				<li key={link.title}>
					<BgImage image={link.imageSrc.gatsbyImageData}>
						<Link to={link.link}>
							<h3>{link.title}</h3>
						</Link>
					</BgImage>
				</li>
			);
		}
	);

	return (
		<Layout>
			<section className={home}>
				<Slider recentPosts={props.data.featuredPosts.nodes} />

				<ul>{links}</ul>
			</section>
		</Layout>
	);
}

export const query = graphql`
	query {
		featuredPosts: allMarkdownRemark(
			filter: { fileAbsolutePath: { regex: "/(blogs|recipes)/" } }
			sort: { fields: frontmatter___date, order: DESC }
			limit: 3
		) {
			nodes {
				...PostFragment
			}
		}
		blogImg: file(relativePath: { eq: "site_images/dog-and-baby.jpg" }) {
			childImageSharp {
				gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
			}
		}
		aboutImg: file(relativePath: { eq: "site_images/about-portrait.jpg" }) {
			childImageSharp {
				gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
			}
		}
		recipeImg: file(
			relativePath: { eq: "site_images/recipes-strawberries.jpg" }
		) {
			childImageSharp {
				gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
			}
		}
	}
`;
