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

interface CollectionResponse {
  collection: {
    title: string;
    products: {
      edges: Array<{ node: ShopifyProduct }>;
    };
  } | null;
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

export async function getProductsByCollection(handle: string): Promise<ShopifyProduct[]> {
  const query = `
    query getCollectionByHandle($handle: String!) {
      collection(handle: $handle) {
        title
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              description
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              featuredImage {
                url
                altText
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<CollectionResponse>({
    query,
    variables: { handle },
  });

  if (!data.collection) return [];

  return data.collection.products.edges.map((edge) => edge.node);
}