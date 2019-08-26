import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import styles from "./slider.module.scss";
import { Link, graphql } from "gatsby";
import Post from "../../common/post";
import BackgroundImage from "gatsby-background-image";

interface SliderState {
	sliderRunning: boolean;
	activePostId: string;
}

interface SliderProps {
	recentPosts: Post[];
}

export default class Slider extends Component<SliderProps, SliderState> {
	private sliderTimer: NodeJS.Timer;

	public constructor(props: SliderProps) {
		super(props);

		this.state = {
			sliderRunning: true,
			activePostId: props.recentPosts[0].id
		};
	}

	public componentDidMount(): void {
		this.setupSliderTimer();
	}

	public componentWillUnmount(): void {
		clearInterval(this.sliderTimer);
	}

	private onDotClick(index: number): void {
		this.setState({ sliderRunning: false });
		this.goTo(index);
	}

	private setupSliderTimer(): void {
		this.sliderTimer = setInterval((): void => {
			const { sliderRunning } = this.state;

			if (!sliderRunning) {
				clearInterval(this.sliderTimer);
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
					activePostId: this.props.recentPosts[index].id,
					sliderRunning: state.sliderRunning
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

	public render(): JSX.Element {
		const { recentPosts } = this.props;

		if (recentPosts == null || recentPosts.length === 0) return null;

		const sliderItems = recentPosts.map(
			(post): JSX.Element => {
				const backgroundFluidImageStack = [
					post.frontmatter.featuredImage.childImageSharp.fluid,
					`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))`
				].reverse();
				const link = `/blog/${post.fields.slug}`;
				return (
					<li
						key={post.fields.slug}
						className={
							post.id === this.state.activePostId
								? styles.active
								: ""
						}
					>
						<BackgroundImage fluid={backgroundFluidImageStack}>
							<h2>
								<Link to={link}>{post.frontmatter.title}</Link>
							</h2>
							<Link to={link}>Read More</Link>
							<time>{post.frontmatter.date}</time>
						</BackgroundImage>
					</li>
				);
			}
		);

		const dots = recentPosts.map(
			(post, index): JSX.Element => {
				return (
					<li key={post.fields.slug}>
						<button
							type="button"
							onClick={this.onDotClick.bind(this, index)}
							className={
								post.id === this.state.activePostId
									? styles.active
									: ""
							}
						/>
					</li>
				);
			}
		);

		return (
			<div className={styles.slider}>
				<button type="button" onClick={this.goBack}>
					<FontAwesomeIcon icon={faChevronLeft} size="3x" />
				</button>

				<ul className={styles.posts}>{sliderItems}</ul>

				<ul className={styles.dots}>{dots}</ul>

				<button type="button" onClick={this.goNext}>
					<FontAwesomeIcon icon={faChevronRight} size="3x" />
				</button>
			</div>
		);
	}
}

export const query = graphql`
	query {
		allMarkdownRemark(
			filter: {
				fileAbsolutePath: { regex: "/(blogs|recipes)/.*\\\\.md$/" }
			}
			sort: { fields: frontmatter___date, order: DESC }
			limit: 3
		) {
			nodes {
				frontmatter {
					featuredImage {
						childImageSharp {
							fluid {
								...GatsbyImageSharpFluid
							}
						}
					}
					date
					title
				}
				id
				fields {
					slug
				}
			}
		}
	}
`;
