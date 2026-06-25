"use client";

import { useState, useEffect } from "react";
import {
  getCyclePhase,
  type CyclePhase,
} from "@/lib/cycle-utils";
import {
  Apple,
  Dumbbell,
  Ban,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Leaf,
} from "lucide-react";

interface WellnessTabProps {
  lastPeriodStart: Date | null;
  cycleLength: number;
  periodLength: number;
  onSetup: () => void;
}

const phases = [
  {
    name: "Menstruation",
    emoji: "",
    dayRange: "Days 1-5",
    color: "from-rose-500 to-red-400",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    textColor: "text-rose-700",
    lightBg: "bg-rose-100",
  },
  {
    name: "Follicular Phase",
    emoji: "",
    dayRange: "Days 6-13",
    color: "from-emerald-500 to-green-400",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
    lightBg: "bg-emerald-100",
  },
  {
    name: "Ovulation",
    emoji: "",
    dayRange: "Days 14-16",
    color: "from-amber-500 to-yellow-400",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    lightBg: "bg-amber-100",
  },
  {
    name: "Luteal Phase",
    emoji: "",
    dayRange: "Days 17-28",
    color: "from-purple-500 to-violet-400",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
    lightBg: "bg-purple-100",
  },
];

export default function WellnessTab({
  lastPeriodStart,
  cycleLength,
  periodLength,
  onSetup,
}: WellnessTabProps) {
  const [currentPhase, setCurrentPhase] = useState<CyclePhase | null>(null);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  useEffect(() => {
    if (lastPeriodStart) {
      const phase = getCyclePhase(lastPeriodStart, cycleLength, periodLength);
      setCurrentPhase(phase);
      setExpandedPhase(phase.name);
    }
  }, [lastPeriodStart, cycleLength, periodLength]);

  if (!lastPeriodStart) {
    return (
      <div className="px-5 pt-14 pb-28 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="mb-4">
          <Leaf size={48} className="text-rose-400" strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          Personalized Wellness
        </h2>
        <p className="text-sm text-slate-500 text-center mb-6 max-w-[260px]">
          Set up your cycle to get personalized diet and wellness recommendations.
        </p>
        <button
          onClick={onSetup}
          className="bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-8 rounded-2xl font-semibold text-sm shadow-lg shadow-rose-200 active:scale-[0.98] transition-transform"
        >
          Set Up Now
        </button>
      </div>
    );
  }

  const phaseDietData: Record<
    string,
    { foods: string[]; avoid: string[]; exercise: string[] }
  > = {
    Menstruation: {
      foods: [
        "Iron-rich leafy greens (spinach, kale)",
        "Dark chocolate (70%+ cacao)",
        "Warm soups & bone broths",
        "Ginger & turmeric teas",
        "Vitamin C fruits (oranges, strawberries)",
        "Fatty fish (salmon, mackerel)",
        "Lentils and beans",
      ],
      avoid: [
        "Excessive caffeine",
        "Cold foods and iced drinks",
        "Salty processed foods",
        "Deep fried foods",
        "Sugary drinks",
      ],
      exercise: [
        "Gentle yoga & stretching",
        "Light walking (20 min)",
        "Meditation & breathwork",
        "Gentle swimming",
      ],
    },
    "Follicular Phase": {
      foods: [
        "Fresh salads & raw veggies",
        "Eggs and lean proteins",
        "Fermented foods (yogurt, kimchi)",
        "Sprouted grains & quinoa",
        "Citrus fruits",
        "Avocados & healthy fats",
        "Seeds (pumpkin, flax)",
      ],
      avoid: [
        "Heavy, greasy foods",
        "Excessive refined sugar",
        "Excessive alcohol",
      ],
      exercise: [
        "Cardio & HIIT workouts",
        "Dance classes",
        "Hiking & outdoor activities",
        "Strength training",
      ],
    },
    Ovulation: {
      foods: [
        "Anti-inflammatory vegetables",
        "Antioxidant-rich berries",
        "Omega-3 fatty fish",
        "Nuts (almonds, walnuts)",
        "Whole grains",
        "Raw fruits & vegetables",
        "Ginger & turmeric",
      ],
      avoid: [
        "Processed foods",
        "Excessive alcohol",
        "Refined carbohydrates",
      ],
      exercise: [
        "High-intensity training",
        "Team sports",
        "Running & sprinting",
        "Rock climbing",
      ],
    },
    "Luteal Phase": {
      foods: [
        "Complex carbs (sweet potato, brown rice)",
        "Magnesium foods (dark chocolate, nuts)",
        "B-vitamin foods (eggs, whole grains)",
        "Potassium-rich foods (bananas)",
        "Warm herbal teas",
        "Leafy greens",
        "Seeds (sunflower, sesame)",
      ],
      avoid: [
        "High sodium foods (causes bloating)",
        "Excessive caffeine",
        "Refined sugars",
        "Alcohol",
      ],
      exercise: [
        "Pilates",
        "Moderate walking",
        "Restorative yoga",
        "Swimming",
      ],
    },
  };

  return (
    <div className="px-5 pt-12 pb-28">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={20} className="text-rose-500" />
        <h1 className="text-xl font-bold text-slate-800">Wellness Guide</h1>
      </div>
      <p className="text-xs text-slate-500 mb-5">
        Phase-based nutrition, exercise & wellness tips
      </p>

      {/* Current Phase Highlight */}
      {currentPhase && (
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-4 mb-5 text-white shadow-lg shadow-rose-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{currentPhase.emoji}</span>
            <p className="text-xs text-rose-100">You&apos;re currently in</p>
          </div>
          <h2 className="font-bold text-lg">{currentPhase.name}</h2>
          <p className="text-xs text-rose-100 mt-1 leading-relaxed">
            {currentPhase.description}
          </p>
        </div>
      )}

      {/* Phase Cards */}
      <div className="space-y-3">
        {phases.map((phase) => {
          const isExpanded = expandedPhase === phase.name;
          const data = phaseDietData[phase.name];
          const isCurrent = currentPhase?.name === phase.name;

          return (
            <div
              key={phase.name}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isCurrent ? phase.borderColor : "border-slate-100"
              } ${isCurrent ? phase.bgColor : "bg-white"}`}
            >
              <button
                onClick={() =>
                  setExpandedPhase(isExpanded ? null : phase.name)
                }
                className="w-full flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-white text-lg shadow-sm`}
                  >
                    {phase.emoji}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-sm text-slate-800">
                      {phase.name}
                      {isCurrent && (
                        <span className="ml-2 text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full">
                          NOW
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-500">{phase.dayRange}</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp size={18} className="text-slate-400" />
                ) : (
                  <ChevronDown size={18} className="text-slate-400" />
                )}
              </button>

              {isExpanded && data && (
                <div className="px-4 pb-4 space-y-4 animate-slide-up">
                  {/* Recommended Foods */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Apple size={14} className={phase.textColor} />
                      <h4
                        className={`text-xs font-semibold ${phase.textColor}`}
                      >
                        Recommended Foods
                      </h4>
                    </div>
                    <div className="space-y-1.5">
                      {data.foods.map((food, i) => (
                        <p key={i} className="text-xs text-slate-600">
                          {food}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Foods to Avoid */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Ban size={14} className="text-red-400" />
                      <h4 className="text-xs font-semibold text-red-500">
                        Foods to Limit
                      </h4>
                    </div>
                    <div className="space-y-1.5">
                      {data.avoid.map((food, i) => (
                        <p key={i} className="text-xs text-slate-600">
                          {food}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Exercise */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Dumbbell size={14} className={phase.textColor} />
                      <h4
                        className={`text-xs font-semibold ${phase.textColor}`}
                      >
                        Best Exercises
                      </h4>
                    </div>
                    <div className="space-y-1.5">
                      {data.exercise.map((ex, i) => (
                        <p key={i} className="text-xs text-slate-600">
                          {ex}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Herbal Support */}
                  <div
                    className={`${phase.lightBg} rounded-xl p-3`}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Leaf size={14} className={phase.textColor} />
                      <h4 className={`text-xs font-semibold ${phase.textColor}`}>
                        Herbal Support
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our Cassia-Turmeric Wellness Infusion is especially
                      beneficial during this phase. The anti-inflammatory
                      properties of turmeric combined with warming cassia help
                      support your body naturally.
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="mt-8 px-4 text-center">
        <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase mb-1">
          Medical Disclaimer
        </p>
        <p className="text-[10px] text-slate-400/80 leading-relaxed max-w-[280px] mx-auto">
          This is not medical advice. CycleTrack provides wellness lifestyle support. Always consult your healthcare provider for medical concerns.
        </p>
      </div>
    </div>
  );
}
