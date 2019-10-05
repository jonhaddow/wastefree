import React from "react";
import Styling from "./pagination.module.scss";
import { Link } from "gatsby";

/**
 * This component handles navigation between listing pages.
 * It assumes that the pages are setup as such -
 * /{type}
 * /{type}/2
 * /{type}/3
 */
export default function Pagination(props: {
	currentPage: number;
	totalPages: number;
	typeOfPage: string;
}): JSX.Element {
	const { currentPage, totalPages, typeOfPage } = props;
	const showNext = currentPage != totalPages;
	const showPrev = currentPage != 1;

	const linkPrefix = `/${typeOfPage}/`;

	const prevLocation =
		currentPage === 2 ? linkPrefix : `${linkPrefix}${currentPage - 1}`;

	const nextLocation = `${linkPrefix}${currentPage + 1}`;

	return (
		<div className={Styling.pagination}>
			{showPrev ? <Link to={prevLocation}>Previous</Link> : ""}
			{showNext ? <Link to={nextLocation}>Next</Link> : ""}
			<p>
				{currentPage}
				<span className={Styling.totalPages}> / {totalPages}</span>
			</p>
		</div>
	);
}
