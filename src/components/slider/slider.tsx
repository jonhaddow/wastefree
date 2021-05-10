import React, { Component } from "react";
import { active, posts, dots as dotsClass, slider } from "./slider.module.scss";
import { Link } from "gatsby";
import Post from "../../common/post";
import Icon from "../icons";
import ChevronRight from "../icons/chevron-right";
import ChevronLeft from "../icons/chevron-left";
import { BgImage } from "gbimage-bridge";

interface SliderState {
	sliderRunning?: boolean;
	activePostId?: string;
}

interface SliderProps {
	recentPosts: Post[];
}

export default class Slider extends Component<SliderProps, SliderState> {
	private sliderTimer: NodeJS.Timer | undefined;

	public constructor(props: SliderProps) {
		super(props);

		this.state = {
			sliderRunning: true,
			activePostId: props.recentPosts[0]?.id,
		};
	}

	public componentDidMount(): void {
		this.setupSliderTimer();
	}

	public componentWillUnmount(): void {
		if (this.sliderTimer) clearInterval(this.sliderTimer);
	}

	private onDotClick(index: number): void {
		this.setState({ sliderRunning: false });
		this.goTo(index);
	}

	private setupSliderTimer(): void {
		this.sliderTimer = setInterval((): void => {
			const { sliderRunning } = this.state;

			if (!sliderRunning) {
				if (this.sliderTimer) clearInterval(this.sliderTimer);
				return;
			}

			this.incrementSlider();
		}, 4000);
	}

	private goBack = (): void => {
		this.setState({ sliderRunning: false });
		this.decrementSlider();
	};

	private goNext = (): void => {
		this.setState({ sliderRunning: false });
		this.incrementSlider();
	};

	private goTo(index: number): void {
		this.setState(
			(state): SliderState => {
				return {
					activePostId: this.props.recentPosts[index]?.id,
					sliderRunning: state.sliderRunning,
				};
			}
		);
	}

	private decrementSlider(): void {
		const { recentPosts } = this.props;

		const currentIndex = recentPosts.findIndex(
			(post): boolean => post.id == this.state.activePostId
		);
		let nextIndex = currentIndex - 1;
		if (nextIndex < 0) nextIndex = recentPosts.length - 1;

		this.goTo(nextIndex);
	}

	private incrementSlider(): void {
		const { recentPosts } = this.props;

		const currentIndex = recentPosts.findIndex(
			(post): boolean => post.id == this.state.activePostId
		);
		let nextIndex = currentIndex + 1;
		if (nextIndex == recentPosts.length) nextIndex = 0;

		this.goTo(nextIndex);
	}

	public render(): JSX.Element | null {
		const { recentPosts } = this.props;

		if (recentPosts == null || recentPosts.length === 0) return null;

		const sliderItems = recentPosts.map(
			(post): JSX.Element => {
				const backgroundFluidImageStack = [
					post.frontmatter.featuredImage.childImageSharp
						.gatsbyImageData,
					`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))`,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any -- BgImage types are wrong.
				].reverse() as any;
				const link = post.fields.slug;
				const { date } = post.frontmatter;
				return (
					<li
						key={post.fields.slug}
						className={
							post.id === this.state.activePostId ? active : ""
						}
					>
						<BgImage
							image={backgroundFluidImageStack}
							aria-roledescription="slide"
							aria-labelledby={`sliderPostTitle${post.id ?? ""}`}
						>
							<h2 id={`sliderPostTitle${post.id ?? ""}`}>
								<Link to={link}>{post.frontmatter.title}</Link>
							</h2>
							<Link to={link}>Read More</Link>
							<time>{date}</time>
						</BgImage>
					</li>
				);
			}
		);

		const dots = recentPosts.map(
			(post, index): JSX.Element => {
				const buttonAttributes: React.DetailedHTMLProps<
					React.ButtonHTMLAttributes<HTMLButtonElement>,
					HTMLButtonElement
				> = {
					type: "button",
					onClick: this.onDotClick.bind(this, index),
					"aria-label": `sliderItem${post.frontmatter.title}`,
				};

				if (post.id === this.state.activePostId) {
					buttonAttributes.className = active;
					buttonAttributes["aria-disabled"] = true;
				}

				return (
					<li key={post.fields.slug}>
						<button {...buttonAttributes} />
					</li>
				);
			}
		);

		const chevronStyling: React.CSSProperties = {
			fill: "white",
		};

		return (
			<div
				className={slider}
				role="group"
				aria-roledescription="carousel"
				aria-label="A collection of recent blog posts and recipes"
			>
				<button
					type="button"
					onClick={this.goBack}
					aria-label="Previous image"
				>
					<Icon styling={chevronStyling} width="32" height="32">
						<ChevronLeft />
					</Icon>
				</button>

				<ul className={posts} aria-live="off" aria-atomic="false">
					{sliderItems}
				</ul>

				<div
					className={dotsClass}
					role="group"
					aria-label="Choose slide to display"
				>
					<ul>{dots}</ul>
				</div>

				<button
					type="button"
					onClick={this.goNext}
					aria-label="Next image"
				>
					<Icon styling={chevronStyling} width="32" height="32">
						<ChevronRight />
					</Icon>
				</button>
			</div>
		);
	}
}
