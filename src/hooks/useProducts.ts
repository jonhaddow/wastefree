import { useEffect, useState } from "react";
import { Product } from "../common/product";

interface EtsyApi {
	results: Product[];
}

export const useProducts = (): { results: Product[]; isLoading: boolean } => {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		void (async () => {
			try {
				const getProducts = await fetch(
					"/.netlify/functions/etsy-listings",
				);
				const { results } = (await getProducts.json()) as EtsyApi;
				setProducts(results);
			} catch (ex) {
				console.error("Failed to fetch etsy listings");
				setProducts([]);
			}
			setIsLoading(false);
		})();
	}, []);

	return { results: products, isLoading };
};
