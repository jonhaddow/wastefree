import React, { useState, useEffect } from "react";
import * as JsSearch from "js-search";
import Layout from "../components/layout";
import PostList from "../components/post_list";
import Post from "../common/post";
import { graphql } from "gatsby";

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
		search: string;
	};
}): JSX.Element {
	const { nodes: posts } = props.data.allMarkdownRemark;

	// Get search query and setup state
	const searchParams = new URLSearchParams(props.location.search);
	const initialQuery = searchParams.get("q");
	const [query, setQuery] = useState(initialQuery);

	// Setup search engine state with initial state
	const [engine] = useState(
		(): JsSearch.Search => {
			const e = new JsSearch.Search("slug");
			e.addIndex("title");
			e.addDocuments(
				props.data.allMarkdownRemark.nodes.map(
					(x): SearchDocument => new SearchDocument(x)
				)
			);
			return e;
		}
	);

	// Define function to query search engine
	const search = (query: string): Post[] => {
		const searchResults = engine.search(query) as SearchDocument[];
		const resultSlugs = searchResults.map((x): string => x.slug);
		return posts.filter((x): boolean =>
			resultSlugs.includes(x.fields.slug)
		);
	};

	// Setup search results state
	const [searchResults, setSearchResults] = useState([]);
	useEffect((): void => {
		setSearchResults(search(query));
	}, [query]);

	return (
		<Layout currentQuery={query} setCurrentQuery={setQuery}>
			<section>
				<h2>{`Searching for "${query}"`}</h2>
				<PostList posts={searchResults}></PostList>
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
