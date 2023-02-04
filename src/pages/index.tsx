import React, { ReactElement } from "react";
import { Link, graphql } from "gatsby";
import { Layout, Slider } from "../components";
import Post from "../common/post";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

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
			<section className="flex flex-col items-center mt-6 md:px-12">
				<Slider recentPosts={props.data.featuredPosts.nodes} />
				<ul className="flex flex-wrap w-full max-w-3xl mt-10 gap-5">
					{itemDetails.map(({ link, title, imageSrc }) => (
						<li
							key={title}
							className="w-full md:w-auto md:flex-grow h-52 transform-gpu transition-transform hover:scale-105 grid"
						>
							<GatsbyImage
								className="col-start-1 row-start-1 -z-10"
								image={imageSrc.gatsbyImageData}
								alt=""
							/>
							<Link
								to={link}
								className="h-full w-full flex justify-center items-center opacity-80 hover:opacity-100 shadow-lg focus:outline-black col-start-1 row-start-1"
							>
								<h3 className="py-3 px-5 bg-white text-black inline-block font-semibold text-sm uppercase tracking-wider">
									{title}
								</h3>
							</Link>
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
			sort: { frontmatter: { date: DESC } }
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
