"use client";

import { useState, useEffect } from "react";
import {
  getCyclePhase,
  getDaysUntilNextPeriod,
  getNextPeriodDate,
  formatDate,
  getSymptomRecommendations,
  type CyclePhase,
} from "@/lib/cycle-utils";
import {
  Calendar,
  Droplets,
  Heart,
  ArrowRight,
  Sun,
  Moon,
  Sunrise,
  Flower,
} from "lucide-react";

interface HomeTabProps {
  lastPeriodStart: Date | null;
  cycleLength: number;
  periodLength: number;
  onNavigate: (tab: string) => void;
  onSetup: () => void;
}

export default function HomeTab({
  lastPeriodStart,
  cycleLength,
  periodLength,
  onNavigate,
  onSetup,
}: HomeTabProps) {
  const [greeting, setGreeting] = useState("");
  const [phase, setPhase] = useState<CyclePhase | null>(null);
  const [daysUntil, setDaysUntil] = useState(0);
  const [nextDate, setNextDate] = useState<Date | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    if (lastPeriodStart) {
      setPhase(getCyclePhase(lastPeriodStart, cycleLength, periodLength));
      setDaysUntil(getDaysUntilNextPeriod(lastPeriodStart, cycleLength));
      setNextDate(getNextPeriodDate(lastPeriodStart, cycleLength));
    }
  }, [lastPeriodStart, cycleLength, periodLength]);

  if (!lastPeriodStart) {
    return (
      <div className="px-5 pt-14 pb-28">
        {/* Welcome Screen */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 text-rose-500">
            <Flower size={48} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
            Welcome to CycleTrack
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Your personal menstrual wellness companion
          </p>
        </div>

        <div
          className="bg-white rounded-3xl p-6 shadow-sm border border-rose-100 mb-6"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #fff1f2 0%, #fce7f3 50%, #fdf2f8 100%)",
          }}
        >
          <h2 className="font-semibold text-lg text-slate-800 mb-2">
            Let&apos;s get started
          </h2>
          <p className="text-slate-600 text-sm mb-5 leading-relaxed">
            Set up your cycle information to receive personalized wellness
            insights, phase tracking, and daily guidance.
          </p>
          <button
            onClick={onSetup}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3.5 rounded-2xl font-semibold text-sm shadow-lg shadow-rose-200 active:scale-[0.98] transition-transform"
          >
            Set Up My Cycle
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              title: "Track Cycles",
              desc: "Log & predict periods",
            },
            {
              title: "Wellness Teas",
              desc: "Natural herbal support",
            },
            {
              title: "Learn & Grow",
              desc: "Education resources",
            },
            {
              title: "Daily Tips",
              desc: "Phase-based guidance",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-4 border border-rose-50 shadow-sm text-center flex flex-col justify-center min-h-[90px]"
            >
              <h3 className="font-semibold text-sm text-slate-800">
                {f.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const GreetingIcon =
    new Date().getHours() < 12
      ? Sunrise
      : new Date().getHours() < 17
      ? Sun
      : Moon;

  const phaseProgress = phase
    ? Math.round((phase.day / phase.totalDays) * 100)
    : 0;

  return (
    <div className="px-5 pt-12 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-0.5">
            <GreetingIcon size={14} />
            <span>{greeting}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">CycleTrack</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
          CT
        </div>
      </div>

      {/* Phase Card */}
      {phase && (
        <div
          className={`rounded-3xl p-5 mb-5 shadow-sm border ${
            phase.name === "Menstruation"
              ? "bg-gradient-to-br from-rose-50 to-red-50 border-rose-200"
              : phase.name === "Follicular Phase"
              ? "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200"
              : phase.name === "Ovulation"
              ? "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200"
              : "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{phase.emoji}</span>
                <h2 className={`font-bold text-lg ${phase.color}`}>
                  {phase.name}
                </h2>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-[240px]">
                {phase.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-slate-800">
                Day {phase.day}
              </div>
              <div className="text-xs text-slate-500">
                of {phase.totalDays}
              </div>
            </div>
          </div>

          {/* Phase Progress */}
          <div className="mt-4">
            <div className="h-2 bg-white/60 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  phase.name === "Menstruation"
                    ? "bg-rose-400"
                    : phase.name === "Follicular Phase"
                    ? "bg-emerald-400"
                    : phase.name === "Ovulation"
                    ? "bg-amber-400"
                    : "bg-purple-400"
                }`}
                style={{ width: `${phaseProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Period Countdown */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-rose-100 flex items-center justify-center">
            <Droplets size={20} className="text-rose-500" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Next Period In</p>
            <p className="font-bold text-lg text-slate-800">
              {daysUntil} days
            </p>
          </div>
        </div>
        {nextDate && (
          <p className="text-xs text-slate-400 bg-rose-50 px-3 py-1.5 rounded-full">
            {formatDate(nextDate)}
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          onClick={() => onNavigate("tracker")}
          className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100 active:scale-[0.97] transition-transform flex flex-col items-center text-center"
        >
          <Calendar size={20} className="text-rose-500 mb-2" />
          <p className="font-semibold text-sm text-slate-800">Log Today</p>
          <p className="text-xs text-slate-500 mt-0.5">
            Symptoms & mood
          </p>
        </button>
        <button
          onClick={() => onNavigate("wellness")}
          className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100 active:scale-[0.97] transition-transform flex flex-col items-center text-center"
        >
          <Heart size={20} className="text-pink-500 mb-2" />
          <p className="font-semibold text-sm text-slate-800">Diet Tips</p>
          <p className="text-xs text-slate-500 mt-0.5">
            Phase-based nutrition
          </p>
        </button>
      </div>

      {/* Today's Tips */}
      {phase && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-slate-800">
              Today&apos;s Tips
            </h3>
          </div>
          <div className="space-y-2">
            {phase.tips.slice(0, 3).map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5 text-xs">●</span>
                <p className="text-xs text-slate-600 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Explore Tea Banner */}
      <button
        onClick={() => onNavigate("shop")}
        className="w-full rounded-2xl p-4 shadow-sm border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 active:scale-[0.98] transition-transform text-left flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl"></span>
          <div>
            <p className="font-semibold text-sm text-slate-800">
              Cassia-Turmeric Infusion
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Natural cycle wellness support
            </p>
          </div>
        </div>
        <ArrowRight size={18} className="text-amber-500" />
      </button>
    </div>
  );
}
