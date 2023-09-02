import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { Link } from "gatsby";
import Post from "../../common/post";
import { ChevronLeft, ChevronRight } from "../icons";
import { GatsbyImage } from "gatsby-plugin-image";

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
			className="overflow-hidden h-96 w-full max-w-3xl relative"
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
				className="p-2 w-12 absolute inset-0 left-0 z-10 bg-gradient-to-r hover:from-semi-transparent"
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
						frontmatter: { date, title, featuredImage },
						fields: { slug },
						id,
					}) => {
						return (
							<li
								key={slug}
								className={`w-full h-full
									${id === recentPosts[index]?.id ? "" : "hidden"}`}
							>
								<div
									className="grid h-full"
									aria-roledescription="slide"
									aria-labelledby={id}
								>
									{featuredImage && (
										<div className="col-start-1 row-start-1 bg-gradient-to-r from-black/50 to-black/50 h-full">
											<GatsbyImage
												className="-z-10 h-full"
												image={
													featuredImage
														.childImageSharp
														.gatsbyImageData
												}
												alt=""
											/>
										</div>
									)}
									<div className="flex flex-col justify-center items-center font-sans text-white relative row-start-1 col-start-1 h-96">
										<h2
											className="font-serif font-bold text-center mb-8 text-5xl"
											id={id}
										>
											<Link to={slug}>{title}</Link>
										</h2>
										<Link
											className="text-sm text-black font-medium tracking-wider bg-white leading-10 px-8 uppercase mb-6 transition-opacity opacity-80 hover:opacity-100"
											to={slug}
										>
											Read More
										</Link>
										<time className="text-sm">{date}</time>
									</div>
								</div>
							</li>
						);
					},
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

						if (post.id === recentPosts[index]?.id) {
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
				className="p-2 w-12 absolute top-0 bottom-0 right-0 z-10 bg-gradient-to-l hover:from-semi-transparent"
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
