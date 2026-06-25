"use client";

import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Star,
  Leaf,
  Heart,
  MessageCircle,
  ChevronLeft,
  Check,
  Package,
} from "lucide-react";

interface Tea {
  id: number;
  name: string;
  description: string;
  benefits: string[] | null;
  ingredients: string[] | null;
  singlePrice: string;
  bulkPrice: string;
  bulkMinQty: number | null;
  imageUrl: string | null;
  isPrimary: boolean | null;
  category: string | null;
}

const WHATSAPP_NUMBER = "2348095660030";

export default function ShopTab() {
  const [teas, setTeas] = useState<Tea[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTea, setSelectedTea] = useState<Tea | null>(null);
  const [orderQty, setOrderQty] = useState<"single" | "bulk">("single");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchTeas(1);
  }, []);

  const fetchTeas = async (pageNum = 1) => {
    try {
      const res = await fetch(`/api/teas?page=${pageNum}&limit=10`);
      const data = await res.json();
      if (data.length < 10) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      if (pageNum === 1) {
        setTeas(data);
      } else {
        setTeas((prev) => [...prev, ...data]);
      }
    } catch (err) {
      console.error("Failed to fetch teas:", err);
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTeas(nextPage);
  };

  const openWhatsApp = (tea: Tea) => {
    const price = orderQty === "single" ? tea.singlePrice : tea.bulkPrice;
    const qty =
      orderQty === "single" ? "1 unit" : `${tea.bulkMinQty}+ units (bulk)`;
    const message = encodeURIComponent(
      `Hi! I'd like to order from CycleTrack:\n\n*${tea.name}*\n📦 Quantity: ${qty}\n💰 Price: ${price}\n\nPlease provide me with the ordering details. Thank you!`
    );
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank"
    );
  };

  if (selectedTea) {
    return (
      <div className="pb-28">
        {/* Hero Image */}
        {selectedTea.imageUrl && (
          <div className="relative w-full h-64">
            <img
              src={selectedTea.imageUrl}
              alt={selectedTea.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <button
              onClick={() => setSelectedTea(null)}
              className="absolute top-12 left-4 w-9 h-9 rounded-full glass flex items-center justify-center"
            >
              <ChevronLeft size={20} className="text-slate-700" />
            </button>
            {selectedTea.isPrimary && (
              <div className="absolute top-12 right-4 bg-amber-400 text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Star size={10} />
                FLAGSHIP
              </div>
            )}
          </div>
        )}

        <div className="px-5 -mt-6 relative">
          {/* Info Card */}
          <div className="bg-white rounded-2xl p-5 shadow-md border border-rose-100 mb-4">
            {selectedTea.category && (
              <span className="text-[10px] font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                {selectedTea.category}
              </span>
            )}
            <h1 className="text-lg font-bold text-slate-800 mt-2 mb-2">
              {selectedTea.name}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedTea.description}
            </p>

            {/* Price Toggle */}
            <div className="mt-4 bg-rose-50 rounded-xl p-3">
              <div className="flex bg-white rounded-lg p-0.5 mb-3">
                <button
                  onClick={() => setOrderQty("single")}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                    orderQty === "single"
                      ? "bg-rose-500 text-white shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  Single
                </button>
                <button
                  onClick={() => setOrderQty("bulk")}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                    orderQty === "bulk"
                      ? "bg-rose-500 text-white shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  Bulk ({selectedTea.bulkMinQty}+)
                </button>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-800">
                  {orderQty === "single"
                    ? selectedTea.singlePrice
                    : selectedTea.bulkPrice}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {orderQty === "single"
                    ? "per unit"
                    : `for ${selectedTea.bulkMinQty}+ units`}
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          {selectedTea.benefits && selectedTea.benefits.length > 0 && (
            <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-sm mb-4">
              <h3 className="font-semibold text-sm text-slate-800 mb-3 flex items-center gap-2">
                <Heart size={16} className="text-rose-400" />
                Health Benefits
              </h3>
              <div className="space-y-2">
                {selectedTea.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check
                      size={14}
                      className="text-emerald-500 mt-0.5 flex-shrink-0"
                    />
                    <p className="text-xs text-slate-600">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients */}
          {selectedTea.ingredients && selectedTea.ingredients.length > 0 && (
            <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-sm mb-4">
              <h3 className="font-semibold text-sm text-slate-800 mb-3 flex items-center gap-2">
                <Leaf size={16} className="text-emerald-500" />
                Ingredients
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedTea.ingredients.map((ingredient, i) => (
                  <span
                    key={i}
                    className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-full font-medium"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 mb-4">
            <p className="text-[10px] text-amber-700 leading-relaxed">
              ⚠️ This is a natural wellness lifestyle support product, NOT a
              medical treatment or cure. Consult your healthcare provider
              before use.
            </p>
          </div>

          {/* Order Button */}
          <button
            onClick={() => openWhatsApp(selectedTea)}
            className="w-full bg-[#25D366] text-white py-3.5 rounded-2xl font-semibold text-sm shadow-lg shadow-emerald-200 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            <MessageCircle size={18} />
            Order via WhatsApp
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-12 pb-28">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <ShoppingBag size={20} className="text-rose-500" />
        <h1 className="text-xl font-bold text-slate-800">Wellness Shop</h1>
      </div>
      <p className="text-xs text-slate-500 mb-5">
        Cassia-Turmeric Infusion Innovation & Natural Teas
      </p>

      {/* Featured Banner */}
      <div
        className="rounded-2xl p-5 mb-5 text-white shadow-lg relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)",
        }}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-1">
            <Star size={14} className="text-amber-300" />
            <span className="text-[10px] font-bold text-amber-200 uppercase tracking-wider">
              Flagship Product
            </span>
          </div>
          <h2 className="font-bold text-lg mb-1">
            Cassia-Turmeric Infusion
          </h2>
          <p className="text-xs text-amber-100 leading-relaxed max-w-[250px]">
            A carefully designed herbal wellness drink supporting comfort-based
            wellness routines during menstrual cycles.
          </p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-2xl font-bold">$8.99</span>
            <span className="text-xs text-amber-200 mb-1">per unit</span>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 text-8xl opacity-20">
        </div>
      </div>

      {/* Tea List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-8 h-8 border-3 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
          <p className="text-xs text-slate-400 mt-3">Loading products...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {teas.map((tea) => (
            <button
              key={tea.id}
              onClick={() => setSelectedTea(tea)}
              className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-rose-50 active:scale-[0.98] transition-transform text-left"
            >
              <div className="flex">
                {tea.imageUrl && (
                  <div className="w-24 h-28 flex-shrink-0 relative">
                    <img
                      src={tea.imageUrl}
                      alt={tea.name}
                      className="w-full h-full object-cover"
                    />
                    {tea.isPrimary && (
                      <div className="absolute top-1.5 left-1.5 bg-amber-400 text-amber-900 text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <Star size={8} />
                      </div>
                    )}
                  </div>
                )}
                <div className="flex-1 p-3">
                  {tea.category && (
                    <span className="text-[9px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
                      {tea.category}
                    </span>
                  )}
                  <h3 className="font-semibold text-sm text-slate-800 mt-1 leading-tight line-clamp-1">
                    {tea.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                    {tea.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-bold text-sm text-rose-600">
                      {tea.singlePrice}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-600">
                      <Package size={10} />
                      <span>Bulk: {tea.bulkPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
          {hasMore && (
            <button
              onClick={handleLoadMore}
              className="w-full mt-4 bg-white border border-rose-100 text-rose-500 py-3 rounded-2xl font-semibold text-xs active:scale-[0.98] transition-transform shadow-sm"
            >
              Next
            </button>
          )}
        </div>
      )}

      {/* How to Order */}
      <div className="mt-8 bg-slate-50 rounded-2xl p-5 border border-slate-100">
        <h3 className="font-semibold text-sm text-slate-800 mb-1.5">
          How to Order
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-2">
          Tap on any tea to view details, then use the WhatsApp button to
          connect directly with our producer for ordering.
        </p>
        <p className="text-[11px] text-slate-400 font-medium">
          Available for single and bulk purchase
        </p>
      </div>

      {/* Info Card */}
      <div className="mt-6 px-4 text-center">
        <p className="text-[11px] text-slate-400 italic leading-relaxed max-w-[300px] mx-auto">
          CycleTrack bridges technology, agriculture, and women
          empowerment—creating a full ecosystem from herbal farms to digital
          health solutions.
        </p>
      </div>
    </div>
  );
}
