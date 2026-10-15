"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ShopifyCart } from "@/lib/cart";

interface CartContextType {
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (variantId: string, quantity?: number) => Promise<boolean>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "adhira_shopify_cart_id";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync with stored cart on mount
  useEffect(() => {
    const savedCartId = typeof window !== "undefined" ? localStorage.getItem(CART_STORAGE_KEY) : null;
    if (savedCartId) {
      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "get", cartId: savedCartId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.cart) {
            setCart(data.cart);
          } else {
            localStorage.removeItem(CART_STORAGE_KEY);
          }
        })
        .catch(() => {
          // Ignore background fetch error
        });
    }
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addToCart = useCallback(
    async (variantId: string, quantity = 1): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const storedCartId = typeof window !== "undefined" ? localStorage.getItem(CART_STORAGE_KEY) : null;

        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "add",
            cartId: storedCartId,
            variantId,
            quantity,
          }),
        });

        const data = await res.json();

        if (!res.ok || data.error) {
          throw new Error(data.error || "Failed to add to cart");
        }

        if (data.cart) {
          setCart(data.cart);
          if (typeof window !== "undefined") {
            localStorage.setItem(CART_STORAGE_KEY, data.cart.id);
          }
          setIsOpen(true);
          return true;
        }

        return false;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Error adding to cart";
        setError(msg);
        console.error(err);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "update",
            cartId: cart.id,
            lineId,
            quantity,
          }),
        });

        const data = await res.json();
        if (data.cart) {
          setCart(data.cart);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Error updating cart";
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return;
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "remove",
            cartId: cart.id,
            lineId,
          }),
        });

        const data = await res.json();
        if (data.cart) {
          setCart(data.cart);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Error removing item";
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        error,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
