import React from "react";
import * as JsSearch from "js-search";
import Layout from "../components/layout";
import PostList from "../components/post_list";
import Post from "../common/post";
import { graphql } from "gatsby";
import Styling from "./search.module.scss";

class SearchDocument {
	public constructor(post: Post) {
		this.title = post.frontmatter.title;
		this.slug = post.fields.slug;
	}

	public title: string;
	public slug: string;
}

export default function SearchTemplate(props: {
	data: {
		allMarkdownRemark: {
			nodes: Post[];
		};
	};
	location: {
		state: {
			query: string;
		};
	};
}): JSX.Element {
	const { nodes: posts } = props.data.allMarkdownRemark;
	const { query } = props.location.state;

	// Setup search engine state to process the initial state
	const engine = new JsSearch.Search("slug");
	engine.addIndex("title");
	engine.addDocuments(
		props.data.allMarkdownRemark.nodes.map(
			(x): SearchDocument => new SearchDocument(x)
		)
	);

	const searchResults = engine.search(query) as SearchDocument[];
	const resultSlugs = searchResults.map((x): string => x.slug);
	const filteredPosts = posts.filter((x): boolean =>
		resultSlugs.includes(x.fields.slug)
	);

	return (
		<Layout>
			<section>
				<h2
					className={Styling.searchRequestedMessage}
				>{`Searching for "${query}"`}</h2>
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
