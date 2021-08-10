import { useEffect, useState } from "react";
import { Product } from "../common/product";

interface EtsyApi {
	results: Product[];
}

export const useProducts = (): Product[] => {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		void (async () => {
			try {
				const getProducts = await fetch(
					"/.netlify/functions/etsy-listings"
				);
				const { results } = (await getProducts.json()) as EtsyApi;
				setProducts(results);
			} catch (ex) {
				console.error("Failed to fetch etsy listings");
				setProducts([]);
			}
		})();
	}, []);

	return products;
};
