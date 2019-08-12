import React, { Component, CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import ApiRequest, { URLS } from "../../common/api_request";
import styles from "./slider.module.scss";
import { Link } from "gatsby";

interface SliderState {
	recentPosts: RecentPost[];
	sliderRunning: boolean;
}

interface RecentPost {
	slug: string;
	type: string;
	title: string;
	image: string;
	active: boolean;
}

export default class Slider extends Component<{}, SliderState> {
	private sliderTimer: NodeJS.Timer;

	public constructor(props: {}) {
		super(props);

		this.state = { recentPosts: [], sliderRunning: true };
	}

	public async componentDidMount(): Promise<void> {
		await this.initializeModel();
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
				state.recentPosts.forEach((post, i): void => {
					post.active = i === index;
				});

				return state;
			}
		);
	}

	private decrementSlider(): void {
		const { recentPosts } = this.state;

		const currentIndex = recentPosts.findIndex(
			(post): boolean => post.active
		);
		let nextIndex = currentIndex - 1;
		if (nextIndex < 0) nextIndex = recentPosts.length - 1;

		this.goTo(nextIndex);
	}

	private incrementSlider(): void {
		const { recentPosts } = this.state;

		const currentIndex = recentPosts.findIndex(
			(post): boolean => post.active
		);
		let nextIndex = currentIndex + 1;
		if (nextIndex == recentPosts.length) nextIndex = 0;

		this.goTo(nextIndex);
	}

	private async initializeModel(): Promise<void> {
		const recentPosts = await ApiRequest.fetch<RecentPost[]>(
			URLS.getRecentPosts()
		);

		recentPosts[0].active = true;

		this.setState({
			recentPosts: recentPosts
		});
	}

	public render(): JSX.Element {
		const { recentPosts } = this.state;

		if (recentPosts == null || recentPosts.length === 0) return null;

		const sliderItems = recentPosts.map(
			(post): JSX.Element => {
				const style: CSSProperties = {
					backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("${post.image}")`
				};
				const link = `/blog/${post.slug}`;
				return (
					<li
						key={post.slug}
						style={style}
						className={post.active ? styles.active : ""}
					>
						<h2>
							<Link to={link}>{post.title}</Link>
						</h2>
						<Link to={link}>Read More</Link>
						<time>1st April 2019</time>
					</li>
				);
			}
		);

		const dots = recentPosts.map(
			(post, index): JSX.Element => {
				return (
					<li key={post.slug}>
						<button
							type="button"
							onClick={this.onDotClick.bind(this, index)}
							className={post.active ? styles.active : ""}
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
