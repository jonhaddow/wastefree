import React, { ReactElement } from "react";
import { Link } from "gatsby";

interface DirectionalLinkProps {
	to: string;
}
const DirectionalLink = (
	props: React.PropsWithChildren<DirectionalLinkProps>
): ReactElement => {
	return (
		<Link
			className=" mx-3 py-3 px-4 text-xl border-gray-400 border rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
			to={props.to}
		>
			{props.children}
		</Link>
	);
};

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	typeOfPage: string;
}

/**
 * This component handles navigation between listing pages.
 * It assumes that the pages are setup as such -
 * /{type}
 * /{type}/2
 * /{type}/3
 */
export const Pagination = (props: PaginationProps): ReactElement => {
	const { currentPage, totalPages, typeOfPage } = props;
	const showNext = currentPage != totalPages;
	const showPrev = currentPage != 1;

	const linkPrefix = `/${typeOfPage}/`;

	const prevLocation =
		currentPage === 2 ? linkPrefix : `${linkPrefix}${currentPage - 1}`;

	const nextLocation = `${linkPrefix}${currentPage + 1}`;

	return (
		<div className="flex justify-center items-center w-full p-4 mx-auto">
			{showPrev && (
				<DirectionalLink to={prevLocation}>Previous</DirectionalLink>
			)}
			<p>
				{currentPage}
				<span className={"totalPagesClass"}> / {totalPages}</span>
			</p>

			{showNext && (
				<DirectionalLink to={nextLocation}>Next</DirectionalLink>
			)}
		</div>
	);
};
