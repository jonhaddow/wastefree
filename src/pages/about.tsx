import React, { Component } from "react";
import ApiRequest, { URLS } from "../common/api_request";
import Page from "../common/page";
import Layout from "../components/layout";

export default class About extends Component<{}, { model: Page }> {
	public constructor(props: {}) {
		super(props);

		this.initializeModel();
	}

	private async initializeModel(): Promise<void> {
		const response = await ApiRequest.fetch<Page[]>(URLS.getAboutPage());
		this.setState({ model: response[0] });
	}

	public render(): JSX.Element {
		if (this.state == null) {
			return null;
		}

		const {
			model: {
				title: { rendered: title },
				content: { rendered: content }
			}
		} = this.state;

		return (
			<Layout>
				<section>
					<article>
						<h1>{title}</h1>

						<div dangerouslySetInnerHTML={{ __html: content }} />
					</article>
				</section>
			</Layout>
		);
	}
}
