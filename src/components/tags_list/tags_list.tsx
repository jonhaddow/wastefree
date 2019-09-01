import React from "react";
import { Link } from "gatsby";
import _ from "lodash";

export default function TagsList(props: { tags: string[] }): JSX.Element {
	const tags = props.tags.map(
		(tag): JSX.Element => {
			const link = `/tags/${_.kebabCase(tag)}`;
			return (
				<li key={tag}>
					<Link to={link}>{tag}</Link>
				</li>
			);
		}
	);
	return <ul>{tags}</ul>;
}
