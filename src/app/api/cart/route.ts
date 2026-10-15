import { NextRequest, NextResponse } from "next/server";
import {
  createShopifyCart,
  addToShopifyCart,
  getShopifyCart,
  updateShopifyCartLine,
  removeShopifyCartLine,
} from "@/lib/cart";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, cartId, variantId, quantity, lineId } = body;

    if (action === "get") {
      if (!cartId) {
        return NextResponse.json({ cart: null });
      }
      const cart = await getShopifyCart(cartId);
      return NextResponse.json({ cart });
    }

    if (action === "add") {
      if (!variantId) {
        return NextResponse.json({ error: "Missing variantId" }, { status: 400 });
      }
      const qty = typeof quantity === "number" && quantity > 0 ? quantity : 1;

      let cart;
      if (cartId) {
        try {
          cart = await addToShopifyCart(cartId, variantId, qty);
        } catch {
          // If cart expired or invalid, create new cart
          cart = await createShopifyCart(variantId, qty);
        }
      } else {
        cart = await createShopifyCart(variantId, qty);
      }

      return NextResponse.json({ cart });
    }

    if (action === "update") {
      if (!cartId || !lineId || typeof quantity !== "number") {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
      }

      const cart =
        quantity <= 0
          ? await removeShopifyCartLine(cartId, lineId)
          : await updateShopifyCartLine(cartId, lineId, quantity);

      return NextResponse.json({ cart });
    }

    if (action === "remove") {
      if (!cartId || !lineId) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
      }

      const cart = await removeShopifyCartLine(cartId, lineId);
      return NextResponse.json({ cart });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: unknown) {
    console.error("Cart API Route Error:", error);
    const message = error instanceof Error ? error.message : "Cart action failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
