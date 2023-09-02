import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

/**
 * Serverless function to proxy to etsy product listings.
 */
const handler: Handler = async () => {
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
		const getProducts = await fetch(
			`https://openapi.etsy.com/v3/application/shops/${process.env.ETSY_SHOP_ID}/listings/active`,
			{
				headers: {
					"x-api-key": process.env.ETSY_API_KEY,
				},
			},
		);
		const response = await getProducts.json();

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

export { handler };
