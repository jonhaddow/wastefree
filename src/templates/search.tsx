import React from "react";
import * as JsSearch from "js-search";
import Layout from "../components/layout";

export default function SearchTemplate(props: {
	pageContext: {
		searchData: {
			title: string;
			tags: string[];
			slug: string;
		}[];
	};
}): JSX.Element {
	const { searchData } = props.pageContext;
	const search = new JsSearch.Search("slug");
	search.addIndex("title");
	search.addIndex("tag");
	search.addDocuments(searchData);
	console.log(search.search("first"));
	return (
		<Layout>
			<section>
				<input type="text"></input>
				<ul></ul>
			</section>
		</Layout>
	);
}
