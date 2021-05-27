import React from "react";
import { Layout } from "../components";
import { Link } from "gatsby";

export default function _404Page(): JSX.Element {
	return (
		<Layout>
			<section>
				<h2>404</h2>
				<p>
					The page could not be found. Go back to the{" "}
					<Link to="/">Home page</Link>.
				</p>
			</section>
		</Layout>
	);
}
