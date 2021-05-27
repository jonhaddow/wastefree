import React from "react";
import * as JsSearch from "js-search";
import { Layout } from "../components";
import PostList from "../components/post_list";
import Post from "../common/post";
import { graphql } from "gatsby";
import { searchRequestedMessage } from "./search.module.scss";

class SearchDocument {
	public constructor(post: Post) {
		this.title = post.frontmatter.title;
		this.slug = post.fields?.slug;
		this.tags = post.frontmatter.tags;
	}

	public title: string;
	public tags: string[];
	public slug: string;
}

export default function SearchTemplate(props: {
	data: {
		allMarkdownRemark: {
			nodes: Post[];
		};
	};
	location: {
		search: string;
	};
}): JSX.Element {
	const { nodes: posts } = props.data.allMarkdownRemark;

	const searchParams = new URLSearchParams(props.location.search);
	const query = searchParams.get("q");

	// Setup search engine state to process the initial state
	const engine = new JsSearch.Search("slug");
	engine.addIndex("title");
	engine.addIndex("tags");
	engine.addDocuments(
		props.data.allMarkdownRemark.nodes.map(
			(x): SearchDocument => new SearchDocument(x)
		)
	);

	const searchResults = engine.search(query ?? "") as SearchDocument[];
	const resultSlugs = searchResults.map((x): string => x.slug);
	const filteredPosts = posts.filter((x): boolean =>
		resultSlugs.includes(x.fields?.slug)
	);

	return (
		<Layout
			pageTitle="Search"
			pageDescription="Search for blogs or recipes across the site."
		>
			<section>
				<h2 className={searchRequestedMessage}>{`Searching for "${
					query ?? ""
				}"`}</h2>
				{filteredPosts.length > 0 ? (
					<PostList posts={filteredPosts}></PostList>
				) : (
					<p>No results found</p>
				)}
			</section>
		</Layout>
	);
}

export const query = graphql`
	query {
		allMarkdownRemark {
			nodes {
				...PostFragment
			}
		}
	}
`;
