"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

export default function CartDrawer() {
  const { state, dispatch, totalItems, totalPrice, cartDrawerOpen, closeCartDrawer } = useCart();

  const shipping = totalPrice > 0 && totalPrice < 150 ? 8 : 0;
  const orderTotal = totalPrice + shipping;

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = cartDrawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartDrawerOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          cartDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCartDrawer}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] z-50 bg-fti-black border-l border-fti-border flex flex-col transition-transform duration-300 ease-out ${
          cartDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-fti-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} strokeWidth={1.5} className="text-fti-white" />
            <span className="font-mono text-sm font-bold tracking-[0.25em] uppercase text-fti-white">
              Cart
            </span>
            {totalItems > 0 && (
              <span className="font-mono text-[10px] font-bold bg-fti-acid text-black px-2 py-0.5 leading-none">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCartDrawer}
            className="text-fti-white/40 hover:text-fti-acid transition-colors"
            aria-label="Close cart"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
              <ShoppingBag size={52} strokeWidth={1} className="text-fti-white/8" />
              <div>
                <p className="font-display text-5xl text-fti-white/15 tracking-wider mb-2">
                  EMPTY
                </p>
                <p className="font-mono text-xs text-fti-white/20 tracking-[0.2em] uppercase">
                  Nothing in your cart yet
                </p>
              </div>
              <Link
                href="/catalog"
                onClick={closeCartDrawer}
                className="font-mono text-sm font-bold tracking-[0.25em] uppercase bg-fti-acid text-black px-8 py-3 hover:bg-fti-white transition-colors"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-fti-border">
              {state.items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                return (
                  <div key={item.id} className="flex gap-4 px-5 py-5">
                    {/* Thumbnail */}
                    <div
                      className="relative w-[72px] h-[96px] flex-shrink-0 overflow-hidden"
                      style={{ backgroundColor: item.placeholderBg }}
                    >
                      {product?.imageSrc ? (
                        <Image
                          src={product.imageSrc}
                          alt={item.name}
                          fill
                          sizes="72px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center select-none">
                          <span
                            className="font-display text-sm"
                            style={{ color: item.placeholderText, opacity: 0.3 }}
                          >
                            LS
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs font-bold tracking-[0.1em] uppercase text-fti-white/80 leading-snug mb-1 truncate">
                        {item.name}
                      </p>
                      <p className="font-mono text-[10px] text-fti-white/25 tracking-widest uppercase mb-3">
                        Size: {item.size}
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Qty controls */}
                        <div className="flex items-center border border-fti-border">
                          <button
                            onClick={() =>
                              dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity - 1 } })
                            }
                            className="w-8 h-8 flex items-center justify-center text-fti-white/35 hover:text-fti-white hover:bg-fti-gray transition-colors font-mono text-base"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center font-mono text-xs font-bold text-fti-white/60">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity + 1 } })
                            }
                            className="w-8 h-8 flex items-center justify-center text-fti-white/35 hover:text-fti-white hover:bg-fti-gray transition-colors font-mono text-base"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-display text-xl text-fti-acid tracking-wider">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() =>
                              dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })
                            }
                            className="text-fti-white/20 hover:text-fti-acid transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer — order summary */}
        {state.items.length > 0 && (
          <div className="border-t border-fti-border px-5 py-5 flex-shrink-0 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs text-fti-white/35 tracking-widest uppercase">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-mono text-xs text-fti-white/35 tracking-widest uppercase">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              {totalPrice > 0 && totalPrice < 150 && (
                <p className="font-mono text-[10px] text-fti-acid/50 tracking-wider">
                  ${(150 - totalPrice).toFixed(2)} away from free shipping
                </p>
              )}
              <div className="flex items-baseline justify-between pt-2 border-t border-fti-border">
                <span className="font-mono text-xs font-bold tracking-widest uppercase text-fti-white/50">
                  Total
                </span>
                <span className="font-display text-3xl text-fti-acid tracking-wider">
                  ${orderTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button className="w-full font-mono text-sm font-bold tracking-[0.3em] uppercase py-4 bg-fti-acid text-black hover:bg-fti-white transition-colors duration-200 active:scale-[0.98]">
              Checkout
            </button>

            <Link
              href="/cart"
              onClick={closeCartDrawer}
              className="block w-full text-center font-mono text-xs font-medium tracking-[0.25em] uppercase text-fti-white/20 hover:text-fti-white/45 transition-colors py-1"
            >
              View full cart →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
