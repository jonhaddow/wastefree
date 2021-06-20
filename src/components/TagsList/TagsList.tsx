import React, { ReactElement } from "react";
import { Link } from "gatsby";
import _ from "lodash";

export const TagsList = ({ tags }: { tags: string[] }): ReactElement => {
	return (
		<ul className="my-7 mx-3">
			{tags.map((tag) => (
				<li
					key={tag}
					className="inline-block mr-3 mb-3 border-gray-400 border rounded-lg"
				>
					<Link
						to={`/tags/${_.kebabCase(tag)}`}
						className="px-2 leading-10 text-gray-500 inline-block hover:text-gray-700"
					>
						{tag}
					</Link>
				</li>
			))}
		</ul>
	);
};
