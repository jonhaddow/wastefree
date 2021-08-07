import React, { ReactElement } from "react";
import Post from "../../common/post";
import Link from "next/link";
import Image from "next/image";

interface RelatedPostsProps {
	relatedPosts: Post[];
}

export const RelatedPosts = ({
	relatedPosts,
}: RelatedPostsProps): ReactElement => {
	return (
		<section className="flex flex-col items-center">
			<h3 className="uppercase text-gray-900 text-lg mb-6">
				You may also like
			</h3>
			<ul className="mx-4 max-w-4xl w-10/12 justify-evenly sm:w-2/3 sm:flex">
				{relatedPosts.map((post) => (
					<li
						key={post.fields.slug}
						className="sm:w-full mx-4 flex-grow mb-5"
					>
						<Link href={post.fields.slug}>
							{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
							<a>
								<Image
									className="h-40"
									src={post.frontmatter.featuredImage}
									alt=""
									layout="fill"
								/>
								<h4 className="font-serif font-bold text-3xl py-2 text-gray-900">
									{post.frontmatter.title}
								</h4>
							</a>
						</Link>
						<time className="text-gray-500">
							{post.frontmatter.date}
						</time>
					</li>
				))}
			</ul>
		</section>
	);
};
