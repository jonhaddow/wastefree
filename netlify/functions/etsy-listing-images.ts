import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

/**
 * Serverless function to proxy to etsy product listing images.
 */
export const handler: Handler = async (event) => {
	const listingId = event.queryStringParameters?.listingId;
	if (!listingId) {
		return {
			statusCode: 400,
			body: "Missing parameter 'listingId'",
		};
	}

	if (!process.env.ETSY_SHOP_ID) {
		return {
			statusCode: 500,
			body: "Missing environment variable: 'ETSY_SHOP_ID'",
		};
	}
	if (!process.env.ETSY_API_KEY) {
		return {
			statusCode: 500,
			body: "Missing environment variable: 'ETSY_API_KEY'",
		};
	}

	try {
		const getListingImages = await fetch(
			`https://openapi.etsy.com/v3/application/shops/${process.env.ETSY_SHOP_ID}/listings/${listingId}/images`,
			{
				headers: {
					"x-api-key": process.env.ETSY_API_KEY,
				},
			},
		);
		const response = await getListingImages.json();

		return {
			statusCode: 200,
			body: JSON.stringify(response),
		};
	} catch (ex) {
		console.error(ex);
		return {
			statusCode: 500,
			body: JSON.stringify(ex),
		};
	}
};
