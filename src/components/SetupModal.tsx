"use client";

import { useState } from "react";
import { X, Calendar, ArrowRight, ArrowLeft, Check } from "lucide-react";

interface SetupModalProps {
  onComplete: (data: {
    lastPeriodStart: string;
    cycleLength: number;
    periodLength: number;
  }) => void;
  onClose: () => void;
}

export default function SetupModal({ onComplete, onClose }: SetupModalProps) {
  const [step, setStep] = useState(1);
  const [lastPeriodStart, setLastPeriodStart] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);

  const handleComplete = () => {
    if (!lastPeriodStart) return;
    onComplete({
      lastPeriodStart,
      cycleLength,
      periodLength,
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-[430px] bg-white rounded-t-3xl p-6 pb-8 animate-slide-up">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-400"
        >
          <X size={16} />
        </button>

        {/* Progress */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-all ${
                s <= step ? "bg-rose-500" : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div>
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">📅</div>
              <h2 className="text-xl font-bold text-slate-800">
                When did your last period start?
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                This helps us track your cycle accurately
              </p>
            </div>
            <div className="mb-6">
              <input
                type="date"
                value={lastPeriodStart}
                onChange={(e) => setLastPeriodStart(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="w-full bg-rose-50 border border-rose-200 rounded-xl px-4 py-3.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
            <button
              onClick={() => lastPeriodStart && setStep(2)}
              disabled={!lastPeriodStart}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3.5 rounded-2xl font-semibold text-sm shadow-lg shadow-rose-200 active:scale-[0.98] transition-transform disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              Next <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🔄</div>
              <h2 className="text-xl font-bold text-slate-800">
                How long is your cycle?
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Average is 28 days (21-35 is normal)
              </p>
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() =>
                    setCycleLength((l) => Math.max(21, l - 1))
                  }
                  className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 text-xl font-bold active:bg-rose-100"
                >
                  −
                </button>
                <div className="text-center">
                  <span className="text-4xl font-bold text-slate-800">
                    {cycleLength}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">days</p>
                </div>
                <button
                  onClick={() =>
                    setCycleLength((l) => Math.min(45, l + 1))
                  }
                  className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 text-xl font-bold active:bg-rose-100"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3.5 rounded-2xl font-semibold text-sm border border-rose-200 text-rose-500 flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3.5 rounded-2xl font-semibold text-sm shadow-lg shadow-rose-200 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
              >
                Next <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">💧</div>
              <h2 className="text-xl font-bold text-slate-800">
                How many days does your period last?
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Average is 3-7 days
              </p>
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() =>
                    setPeriodLength((l) => Math.max(1, l - 1))
                  }
                  className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 text-xl font-bold active:bg-rose-100"
                >
                  −
                </button>
                <div className="text-center">
                  <span className="text-4xl font-bold text-slate-800">
                    {periodLength}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">days</p>
                </div>
                <button
                  onClick={() =>
                    setPeriodLength((l) => Math.min(10, l + 1))
                  }
                  className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 text-xl font-bold active:bg-rose-100"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3.5 rounded-2xl font-semibold text-sm border border-rose-200 text-rose-500 flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={handleComplete}
                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3.5 rounded-2xl font-semibold text-sm shadow-lg shadow-rose-200 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
              >
                <Check size={16} /> Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
