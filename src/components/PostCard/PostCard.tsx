import React, { ReactElement } from "react";
import Link from "next/link";
import Post from "../../common/post";
import Image from "next/image";

export const PostCard = (props: Post): ReactElement => {
	const { slug } = props.fields;
	const { title, featuredImage, date } = props.frontmatter;

	return (
		<li className=" z-10 m-auto py-4 md:p-4 h-96 w-full bg-image-wrapper transform-gpu transition-transform hover:scale-105 relative">
			<div className="relative z-0 p-4">
				<Image
					src={featuredImage}
					layout="fill"
					className="object-cover object-center m-5 relative z-0"
				/>
			</div>
			<Link href={`/blogs/${slug}`}>
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<a className="relative flex flex-col justify-center p-4 w-full items-center text-white h-full focus:outline-black z-10">
					<span className="text-2xl">{title}</span>
					<time className="font-thin pt-4">{date}</time>
				</a>
			</Link>
		</li>
	);
};
