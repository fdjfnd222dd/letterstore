"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Footer from "@/components/Footer";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { state, dispatch, totalItems, totalPrice } = useCart();
  const shipping = totalPrice >= 150 ? 0 : 8;
  const orderTotal = totalPrice + shipping;

  return (
    <>
      <div className="pt-16 min-h-screen bg-fti-black">
        {/* Header */}
        <div className="px-6 pt-16 pb-12 border-b border-fti-border relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden">
            <span className="font-display text-[18vw] leading-none text-fti-white/[0.025] translate-x-[5%]">
              CART
            </span>
          </div>
          <div className="max-w-screen-2xl mx-auto relative">
            <span className="font-mono text-xs font-bold tracking-[0.45em] text-fti-acid uppercase block mb-4">
              {totalItems} {totalItems === 1 ? "Item" : "Items"}
            </span>
            <h1 className="font-display text-[15vw] md:text-[11vw] lg:text-[9vw] text-fti-white leading-none tracking-wider">
              Cart
            </h1>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 py-16">
          {state.items.length === 0 ? (
            <div className="py-32 text-center">
              <p className="font-display text-[7vw] text-fti-white/[0.08] mb-10 leading-none">
                YOUR CART
                <br />
                IS EMPTY
              </p>
              <Link
                href="/catalog"
                className="inline-block font-mono text-sm font-bold tracking-[0.3em] uppercase text-fti-black bg-fti-acid px-14 py-4 hover:bg-fti-white transition-colors duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr,400px] gap-16 items-start">
              {/* Cart items */}
              <div>
                <div className="grid grid-cols-[1fr,auto] border-b border-fti-border pb-4 mb-0">
                  <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase text-fti-white/30">
                    Product
                  </span>
                  <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase text-fti-white/30 text-right">
                    Total
                  </span>
                </div>

                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[auto,1fr,auto] gap-6 py-8 border-b border-fti-border"
                  >
                    {/* Thumbnail */}
                    <div
                      className="w-24 h-32 flex-shrink-0 flex items-center justify-center relative overflow-hidden border border-white/[0.07]"
                      style={{ backgroundColor: item.placeholderBg }}
                    >
                      <span
                        className="font-display text-base text-center leading-tight select-none opacity-40 px-1 font-bold"
                        style={{ color: item.placeholderText }}
                      >
                        LS
                      </span>
                    </div>

                    {/* Item info */}
                    <div className="min-w-0">
                      <h3 className="font-mono text-sm font-bold tracking-wider text-fti-white uppercase leading-snug mb-1.5">
                        {item.name}
                      </h3>
                      <p className="font-mono text-xs font-medium text-fti-white/40 tracking-wider uppercase mb-5">
                        Size: {item.size}
                      </p>

                      {/* Quantity + remove */}
                      <div className="flex items-center gap-5">
                        <div className="flex items-center border border-fti-border">
                          <button
                            onClick={() =>
                              dispatch({
                                type: "UPDATE_QUANTITY",
                                payload: {
                                  id: item.id,
                                  quantity: item.quantity - 1,
                                },
                              })
                            }
                            className="w-10 h-10 flex items-center justify-center text-fti-white/50 hover:text-fti-white hover:bg-fti-gray transition-all font-mono text-xl leading-none font-bold"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-10 h-10 flex items-center justify-center font-mono text-sm font-bold text-fti-white border-x border-fti-border">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              dispatch({
                                type: "UPDATE_QUANTITY",
                                payload: {
                                  id: item.id,
                                  quantity: item.quantity + 1,
                                },
                              })
                            }
                            className="w-10 h-10 flex items-center justify-center text-fti-white/50 hover:text-fti-white hover:bg-fti-gray transition-all font-mono text-xl leading-none font-bold"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_ITEM",
                              payload: { id: item.id },
                            })
                          }
                          className="text-fti-white/25 hover:text-red-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} strokeWidth={2} />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right self-start pt-1">
                      <p className="font-display text-3xl text-fti-acid tracking-wider">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="font-mono text-xs font-medium text-fti-white/30 mt-1 tracking-wider">
                          ${item.price.toFixed(2)} ea.
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="mt-6">
                  <button
                    onClick={() => dispatch({ type: "CLEAR_CART" })}
                    className="font-mono text-xs font-bold tracking-widest uppercase text-fti-white/25 hover:text-red-500 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Order summary */}
              <div className="bg-fti-gray border border-fti-border p-8 sticky top-24">
                <h2 className="font-display text-5xl text-fti-white tracking-wider mb-8">
                  Summary
                </h2>

                <div className="space-y-4 mb-6 border-b border-fti-border pb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm font-medium text-fti-white/50 uppercase tracking-wider">
                      Subtotal
                    </span>
                    <span className="font-mono text-sm font-bold text-fti-white tracking-wider">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm font-medium text-fti-white/50 uppercase tracking-wider">
                      Shipping
                    </span>
                    <span className="font-mono text-sm font-bold text-fti-white tracking-wider">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="font-mono text-xs font-bold text-fti-acid tracking-wider">
                      ✓ Free shipping applied
                    </p>
                  )}
                  {shipping > 0 && (
                    <p className="font-mono text-xs font-medium text-fti-white/30 tracking-wider">
                      Add ${(150 - totalPrice).toFixed(2)} more for free
                      shipping
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="font-mono text-sm font-bold text-fti-white/60 uppercase tracking-wider">
                    Total
                  </span>
                  <span className="font-display text-5xl text-fti-acid tracking-wider">
                    ${orderTotal.toFixed(2)}
                  </span>
                </div>

                <button className="w-full font-mono text-sm font-bold tracking-[0.3em] uppercase py-5 bg-fti-acid text-black hover:bg-fti-white transition-colors duration-200 mb-4 hover:scale-[1.01] active:scale-[0.98]">
                  Checkout →
                </button>

                <Link
                  href="/catalog"
                  className="block text-center font-mono text-xs font-bold tracking-widest uppercase text-fti-white/30 hover:text-fti-white transition-colors mt-4"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
