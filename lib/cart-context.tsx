"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { STORAGE_KEYS } from "./constants";
import { createCheckoutSession } from "./checkout";
import { createPersistedStore } from "./persisted-store";
import type { CartItem, CheckoutResult, Product } from "./types";

const MAX_QTY = 99;
const EMPTY: CartItem[] = [];

function parseCart(raw: string): CartItem[] | undefined {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return undefined;
    return parsed.filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as CartItem).slug === "string" &&
        typeof (item as CartItem).name === "string" &&
        typeof (item as CartItem).price === "number" &&
        typeof (item as CartItem).quantity === "number",
    );
  } catch {
    return undefined;
  }
}

const cartStore = createPersistedStore<CartItem[]>({
  key: STORAGE_KEYS.cart,
  initial: EMPTY,
  parse: parseCart,
});

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  /** False until the saved cart has been read out of localStorage. */
  hydrated: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addProduct: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  checkout: () => Promise<CheckoutResult>;
  /** Slug of the most recently added item, for transient confirmation UI. */
  lastAdded: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );
  const hydrated = useSyncExternalStore(
    cartStore.subscribeLoaded,
    cartStore.getLoadedSnapshot,
    cartStore.getLoadedServerSnapshot,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const addProduct = useCallback((product: Product, quantity = 1) => {
    cartStore.set((current) => {
      const existing = current.find((i) => i.slug === product.slug);
      if (existing) {
        return current.map((i) =>
          i.slug === product.slug
            ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + quantity) }
            : i,
        );
      }
      return [
        ...current,
        {
          slug: product.slug,
          name: product.name,
          price: product.price.amount,
          image: product.media.booklet,
          quantity,
        },
      ];
    });

    setLastAdded(product.slug);
    window.setTimeout(
      () => setLastAdded((slug) => (slug === product.slug ? null : slug)),
      2400,
    );
  }, []);

  const removeItem = useCallback((slug: string) => {
    cartStore.set((current) => current.filter((i) => i.slug !== slug));
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    cartStore.set((current) =>
      quantity < 1
        ? current.filter((i) => i.slug !== slug)
        : current.map((i) =>
            i.slug === slug
              ? { ...i, quantity: Math.min(MAX_QTY, quantity) }
              : i,
          ),
    );
  }, []);

  const clear = useCallback(() => cartStore.set(EMPTY), []);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items],
  );
  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const checkout = useCallback(
    () => createCheckoutSession({ items, subtotal }),
    [items, subtotal],
  );

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count,
      subtotal,
      hydrated,
      isOpen,
      openCart,
      closeCart,
      addProduct,
      removeItem,
      setQuantity,
      clear,
      checkout,
      lastAdded,
    }),
    [
      items,
      count,
      subtotal,
      hydrated,
      isOpen,
      openCart,
      closeCart,
      addProduct,
      removeItem,
      setQuantity,
      clear,
      checkout,
      lastAdded,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
