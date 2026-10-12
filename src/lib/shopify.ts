const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const version = process.env.SHOPIFY_API_VERSION || "2026-10";

export async function shopifyFetch<T>({
    query,
    variables = {},
}: {
    query: string;
    variables?: Record<string, unknown>;
}): Promise<T> {
    if (!domain || !token) {
        throw new Error(
            "Shopify environment variables SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN are missing."
        );
    }

    const endpoint = `https://${domain}/api/${version}/graphql.json`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": token,
            },
            body: JSON.stringify({ query, variables }),
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            throw new Error(`Shopify API HTTP Error: ${response.status}`);
        }

        const result = await response.json();

        if (result.errors) {
            console.error("Shopify GraphQL Errors:", result.errors);
            throw new Error("Failed to fetch data from Shopify GraphQL API");
        }

        return result.data;
    } catch (error) {
        console.error("Error fetching from Shopify:", error);
        throw error;
    }
}