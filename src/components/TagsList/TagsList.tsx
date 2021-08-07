import React, { ReactElement } from "react";
import Link from "next/link";
import _ from "lodash";

export const TagsList = ({ tags }: { tags: string[] }): ReactElement => {
	return (
		<ul className="my-7 mx-3">
			{tags.map((tag) => (
				<li
					key={tag}
					className="inline-block mr-3 mb-3 border-gray-400 border rounded-lg"
				>
					<Link href={`/tags/${_.kebabCase(tag)}`}>
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a className="px-2 leading-10 text-gray-500 inline-block hover:text-gray-700">
							{tag}
						</a>
					</Link>
				</li>
			))}
		</ul>
	);
};
