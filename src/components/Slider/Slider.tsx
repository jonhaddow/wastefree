import React, { ReactElement, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Post from "../../common/post";
import { ChevronLeft, ChevronRight } from "../icons";
import Image from "next/image";

interface SliderProps {
	recentPosts: Post[];
}

export const Slider = ({ recentPosts }: SliderProps): ReactElement | null => {
	const [running, setRunning] = useState(true);
	const [index, setIndex] = useState(0);

	const incrementSlider = useCallback((): void => {
		setIndex((idx) => (idx >= recentPosts.length - 1 ? 0 : idx + 1));
	}, [recentPosts.length]);

	const decrementSlider = (): void => {
		setIndex((idx) => (idx <= 0 ? recentPosts.length - 1 : idx - 1));
	};

	const onDotClick = (idx: number): void => {
		setRunning(false);
		setIndex(idx);
	};

	useEffect(() => {
		const interval = setInterval((): void => {
			if (!running) {
				clearInterval(interval);
				return;
			}

			incrementSlider();
		}, 4000);

		return () => clearInterval(interval);
	}, [incrementSlider, running]);

	if (recentPosts == null || recentPosts.length === 0) return null;

	return (
		<div
			className="overflow-hidden h-96 w-full md:w-3/4 border-gray-500 border relative"
			role="group"
			aria-roledescription="carousel"
			aria-label="A collection of recent blog posts and recipes"
		>
			<button
				type="button"
				onClick={() => {
					setRunning(false);
					decrementSlider();
				}}
				aria-label="Previous image"
				className="p-2 w-12 absolute inset-0 left-0 z-20 bg-gradient-to-r hover:from-semi-transparent"
			>
				<ChevronLeft
					className="fill-current text-white"
					width="32"
					height="32"
				/>
			</button>
			<ul className="h-full w-full" aria-live="off" aria-atomic="false">
				{recentPosts.map(
					({
						frontmatter: { featuredImage, title },
						fields: { slug },
					}) => {
						return (
							<li
								key={slug}
								className={`w-full h-full bg-image-wrapper relative
									${slug === recentPosts[index]?.fields.slug ? "" : "hidden"}`}
							>
								<Image
									src={featuredImage}
									layout="fill"
									className="object-cover object-center"
									aria-roledescription="slide"
									aria-labelledby={slug}
								/>
								<div
									style={{
										background: "rgba(0, 0, 0, 0.3)",
									}}
									className="flex flex-col relative justify-center items-center font-sans text-white z-10"
								>
									<h2
										className="font-serif font-bold text-center mb-8 text-5xl z-10"
										id={slug}
									>
										<Link href={`/blogs/${slug}`}>
											{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
											<a>{title}</a>
										</Link>
									</h2>
									<Link href={`/blogs/${slug}`}>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a className="text-sm text-black font-medium tracking-wider bg-white leading-10 px-8 uppercase mb-6 transition-opacity opacity-80 hover:opacity-100">
											Read More
										</a>
									</Link>
								</div>
							</li>
						);
					}
				)}
			</ul>

			<div role="group" aria-label="Choose slide to display">
				<ul className="flex justify-center items-center absolute bottom-2 w-full mb-5 z-10">
					{recentPosts.map((post, i): JSX.Element => {
						const buttonAttributes: React.DetailedHTMLProps<
							React.ButtonHTMLAttributes<HTMLButtonElement>,
							HTMLButtonElement
						> = {
							type: "button",
							onClick: onDotClick.bind(this, i),
							"aria-label": `sliderItem${post.frontmatter.title}`,
							className:
								"h-3 w-3 border-2 border-white rounded-full focus:outline-white",
						};

						if (
							post.fields.slug === recentPosts[index]?.fields.slug
						) {
							buttonAttributes.className += " bg-white";
							buttonAttributes["aria-disabled"] = true;
						}

						return (
							<li key={post.fields.slug} className="mr-3">
								<button {...buttonAttributes} />
							</li>
						);
					})}
				</ul>
			</div>

			<button
				type="button"
				onClick={() => {
					setRunning(false);
					incrementSlider();
				}}
				aria-label="Next image"
				className="p-2 w-12 absolute top-0 bottom-0 right-0 z-20 bg-gradient-to-l hover:from-semi-transparent"
			>
				<ChevronRight
					className="fill-current text-white"
					width="32"
					height="32"
				/>
			</button>
		</div>
	);
};
