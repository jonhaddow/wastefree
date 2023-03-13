import React from "react";
import { Layout, PostList } from "../components";
import { useProducts } from "../hooks";

const fetchProductImage = async (
	listingId: string
): Promise<string | undefined> => {
	try {
		const getListingImages = await fetch(
			`/.netlify/functions/etsy-listing-images?listingId=${listingId}`
		);
		const response = await getListingImages.json();
		return (response.results?.[0]?.["url_570xN"] as string | null) ?? "";
	} catch (ex) {
		console.error(ex);
	}
};

export default function Products(): React.ReactElement {
	const { results: products, isLoading } = useProducts();

	const pageTitle = "Products";

	return (
		<Layout pageTitle={pageTitle}>
			{products.length === 0 ? (
				<div className="flex mt-6">
					<p className="m-auto">
						{isLoading ? "Loading..." : "No products"}
					</p>
				</div>
			) : (
				<PostList
					items={products.map(({ listing_id, title, url }) => ({
						title,
						url,
						getImage: () => fetchProductImage(listing_id),
					}))}
				/>
			)}
		</Layout>
	);
}
