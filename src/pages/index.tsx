import React, { ReactElement } from "react";
import Link from "next/link";
import { Layout, Slider } from "../components";
import Post from "../common/post";
import { GetStaticProps } from "next";
import blogImg from "../../content/site_images/dog-and-baby.jpg";
import aboutImg from "../../content/site_images/about-portrait.jpg";
import recipeImg from "../../content/site_images/recipes-strawberries.jpg";
import { getFeaturedPosts } from "../helpers/blogs";
import Image from "next/image";

interface HomeProps {
	featuredPosts: Post[];
}

export const getStaticProps: GetStaticProps = (): { props: HomeProps } => {
	const posts = getFeaturedPosts();
	return {
		props: {
			featuredPosts: posts,
		},
	};
};

export default function Home({ featuredPosts }: HomeProps): ReactElement {
	const itemDetails = [
		{
			link: "/blogs",
			imageSrc: blogImg,
			title: "Blogs",
		},
		{
			link: "/about",
			imageSrc: aboutImg,
			title: "About",
		},
		{
			link: "/recipes",
			imageSrc: recipeImg,
			title: "Recipes",
		},
	];

	return (
		<Layout>
			<section className="flex flex-col items-center mt-6 md:px-12">
				<Slider recentPosts={featuredPosts} />
				<ul className="flex flex-wrap w-full lg:max-w-5xl mt-10">
					{itemDetails.map(({ link, title, imageSrc }) => (
						<li
							key={title}
							className="w-full md:w-auto md:mr-5 md:flex-grow h-52 bg-image-wrapper transform-gpu transition-transform hover:scale-105 relative"
						>
							<Image
								src={imageSrc}
								alt=""
								layout="fill"
								className="object-center object-cover"
								placeholder="blur"
							/>
							<Link href={link}>
								{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
								<a className="h-full w-full flex justify-center items-center hover:opacity-100 shadow-lg focus:outline-black">
									<h3 className="py-3 px-5 bg-white text-black inline-block z-10 font-semibold text-sm uppercase tracking-wider">
										{title}
									</h3>
								</a>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}
