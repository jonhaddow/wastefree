import Post from "../../common/post";

export default class RelatedPostsBuilder {
	private posts: Post[];
	private tags!: string[];
	private limit!: number;

	public constructor(posts: Post[], currentPost: Post) {
		this.posts = posts.filter((x): boolean => x.id !== currentPost.id);
	}

	public setTags(tags: string[]): RelatedPostsBuilder {
		this.tags = tags;
		return this;
	}

	public setLimit(limit: number): RelatedPostsBuilder {
		this.limit = limit;
		return this;
	}

	public generate(): Post[] {
		const postScoreMap = this.posts.map(
			(
				post,
			): {
				post: Post;
				score: number;
			} => {
				const tagScore = this.calculateTagScore(post);
				return {
					post: post,
					score: tagScore,
				};
			},
		);

		postScoreMap.sort((postScoreA, postScoreB): number => {
			return postScoreB.score - postScoreA.score;
		});

		postScoreMap.splice(this.limit);

		return postScoreMap.map((post): Post => post.post);
	}

	private calculateTagScore(post: Post): number {
		let score = 0;
		if (post.frontmatter.tags !== null) {
			post.frontmatter.tags.forEach((tag): void => {
				if (this.tags.includes(tag)) {
					score++;
				}
			});
		}
		return score;
	}
}
