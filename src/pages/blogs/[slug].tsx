import React from "react";
import { Layout, RelatedPosts, TagsList } from "../../components";
import { getAllPosts, getPostBySlug } from "../../helpers/blogs";
import html from "remark-html";
import Image from "next/image";
import { GetStaticPathsResult, GetStaticProps } from "next";
import Post from "../../common/post";
import RelatedPostsBuilder from "../../components/RelatedPosts/related_posts_builder";
import remark from "remark";

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const allPosts = getAllPosts();
	const post = getPostBySlug(params?.slug as string);
	const markdown = await remark()
		.use(html)
		.process(post.html || "");
	const postContent = markdown.toString();

	const relatedPosts = new RelatedPostsBuilder(allPosts, post)
		.setTags(post.frontmatter.tags)
		.setLimit(3)
		.generate();

	return {
		props: {
			post: post,
			postContent,
			relatedPosts,
		},
	};
};

export function getStaticPaths(): GetStaticPathsResult<{ slug: string }> {
	const posts = getAllPosts();

	return {
		paths: posts.map((post) => {
			return {
				params: {
					slug: post.fields.slug,
				},
			};
		}),
		fallback: false,
	};
}

interface PostTemplateProps {
	post: Post;
	postContent: string;
	relatedPosts: Post[];
}

function PostTemplate({
	post,
	postContent,
	relatedPosts,
}: PostTemplateProps): JSX.Element {
	const {
		frontmatter: { title, featuredImage, tags, date },
	} = post;
	return (
		<Layout pageTitle={title}>
			<section className="flex items-center flex-col">
				<article className="max-w-2xl w-11/12 sm:w-3/4 lg:w-2/3 inline-block mt-5">
					<div className="w-full flex justify-center h-auto mb-7 relative">
						<Image
							className="object-center object-cover"
							layout="fill"
							src={featuredImage}
							alt=""
						/>
					</div>
					<h1 className="font-serif font-bold text-5xl m-4 text-center">
						{title}
					</h1>
					<time className="text-center block mb-4">{date}</time>
					<div
						dangerouslySetInnerHTML={{
							__html: postContent,
						}}
						className="prose m-auto"
					/>
					{tags != null ? <TagsList tags={tags}></TagsList> : null}
				</article>
			</section>
			{tags && <RelatedPosts relatedPosts={relatedPosts} />}
		</Layout>
	);
}

export default PostTemplate;
