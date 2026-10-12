import { shopifyFetch } from "./shopify";

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage?: {
    url: string;
    altText: string;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface ProductsResponse {
  products: {
    nodes: ShopifyProduct[];
  };
}

export async function getProducts(): Promise<ShopifyProduct[]> {
  const query = `
    query GetProducts {
      products(first: 10) {
        nodes {
          id
          title
          handle
          description
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<ProductsResponse>({ query });
  return data.products.nodes;
}