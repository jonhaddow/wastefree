import React from "react";
import { Layout } from "../components";
import Link from "next/link";
export default function _404Page(): JSX.Element {
	return (
		<Layout>
			<section>
				<h2>404</h2>
				<p>
					The page could not be found. Go back to the{" "}
					<Link href="/">
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a>Home page</a>
					</Link>
					.
				</p>
			</section>
		</Layout>
	);
}
