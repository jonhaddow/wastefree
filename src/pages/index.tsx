import React, { ReactElement } from "react";
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

export default function Home(props: { data: GraphQLSchema }): ReactElement {
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

	return (
		<Layout>
			<section className="flex flex-col items-center md:px-12">
				<Slider recentPosts={props.data.featuredPosts.nodes} />
				<ul className="flex flex-wrap w-full lg:max-w-5xl mt-10">
					{itemDetails.map(({ link, title, imageSrc }) => (
						<li
							key={title}
							className="w-full md:w-auto md:mr-5 md:flex-grow h-52 bg-image-wrapper"
						>
							<BgImage image={imageSrc.gatsbyImageData}>
								<Link
									to={link}
									className="h-full w-full flex justify-center items-center opacity-80 hover:opacity-100 shadow-md hover:shadow-lg focus:shadow-lg focus:outline-black"
								>
									<h3 className="py-3 px-5 bg-white text-black inline-block font-semibold text-sm uppercase tracking-wider">
										{title}
									</h3>
								</Link>
							</BgImage>
						</li>
					))}
				</ul>
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
