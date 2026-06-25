"use client";

import { useState } from "react";
import { SYMPTOMS, MOODS, getSymptomRecommendations } from "@/lib/cycle-utils";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Droplets,
  MessageCircle,
  Lightbulb,
  Calendar,
  CalendarDays,
} from "lucide-react";
import { format, addDays, subDays, isToday } from "date-fns";

interface TrackerTabProps {
  lastPeriodStart: Date | null;
  onSetup: () => void;
}

const FLOWS = [
  { id: "none", label: "None", emoji: "○", color: "bg-slate-100" },
  { id: "light", label: "Light", emoji: "💧", color: "bg-rose-100" },
  { id: "medium", label: "Medium", emoji: "💧💧", color: "bg-rose-200" },
  { id: "heavy", label: "Heavy", emoji: "💧💧💧", color: "bg-rose-400" },
];

export default function TrackerTab({ lastPeriodStart, onSetup }: TrackerTabProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  if (!lastPeriodStart) {
    return (
      <div className="px-5 pt-14 pb-28 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="mb-4">
          <CalendarDays size={48} className="text-rose-400" strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          Set Up Your Cycle
        </h2>
        <p className="text-sm text-slate-500 text-center mb-6 max-w-[260px]">
          To start tracking, we need to know your last period date.
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

  const toggleSymptom = (id: string) => {
    setSaved(false);
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const saveEntry = async () => {
    try {
      await fetch("/api/cycle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: format(selectedDate, "yyyy-MM-dd"),
          symptoms: selectedSymptoms,
          mood: selectedMood,
          flow: selectedFlow,
          notes,
        }),
      });
      setSaved(true);
      if (selectedSymptoms.length > 0) {
        setShowRecommendations(true);
      }
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save:", err);
    }
  };

  const recommendations = getSymptomRecommendations(selectedSymptoms);

  // Generate week dates
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const start = subDays(selectedDate, 3);
    return addDays(start, i);
  });

  return (
    <div className="px-5 pt-12 pb-28">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Calendar size={20} className="text-rose-500" />
        <h1 className="text-xl font-bold text-slate-800">
          Daily Tracker
        </h1>
      </div>

      {/* Date Picker */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100 mb-5">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setSelectedDate((d) => subDays(d, 7))}
            className="p-1.5 rounded-full hover:bg-rose-50 active:bg-rose-100"
          >
            <ChevronLeft size={18} className="text-slate-500" />
          </button>
          <p className="font-semibold text-sm text-slate-800">
            {format(selectedDate, "MMMM yyyy")}
          </p>
          <button
            onClick={() => setSelectedDate((d) => addDays(d, 7))}
            className="p-1.5 rounded-full hover:bg-rose-50 active:bg-rose-100"
          >
            <ChevronRight size={18} className="text-slate-500" />
          </button>
        </div>
        <div className="flex justify-between">
          {weekDates.map((date) => {
            const isSelected =
              format(date, "yyyy-MM-dd") ===
              format(selectedDate, "yyyy-MM-dd");
            const isTodayDate = isToday(date);
            return (
              <button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                className={`flex flex-col items-center gap-1 py-2 px-2.5 rounded-xl transition-all ${
                  isSelected
                    ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                    : isTodayDate
                    ? "bg-rose-50 text-rose-600"
                    : "text-slate-500"
                }`}
              >
                <span className="text-[10px] font-medium uppercase">
                  {format(date, "EEE")}
                </span>
                <span
                  className={`text-sm font-bold ${
                    isSelected ? "text-white" : ""
                  }`}
                >
                  {format(date, "d")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Flow */}
      <div className="mb-5">
        <h3 className="font-semibold text-sm text-slate-800 mb-3 flex items-center gap-2">
          <Droplets size={16} className="text-rose-400" />
          Flow
        </h3>
        <div className="flex gap-2">
          {FLOWS.map((flow) => (
            <button
              key={flow.id}
              onClick={() => {
                setSelectedFlow(flow.id);
                setSaved(false);
              }}
              className={`flex-1 py-3 rounded-xl text-center transition-all ${
                selectedFlow === flow.id
                  ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                  : "bg-white text-slate-600 border border-rose-100"
              }`}
            >
              <div className="text-sm">{flow.emoji}</div>
              <div className="text-[10px] font-medium mt-0.5">{flow.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Symptoms */}
      <div className="mb-5">
        <h3 className="font-semibold text-sm text-slate-800 mb-3">
          Symptoms
        </h3>
        <div className="flex flex-wrap gap-2">
          {SYMPTOMS.map((symptom) => {
            const isSelected = selectedSymptoms.includes(symptom.id);
            return (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                    : "bg-white text-slate-600 border border-rose-100"
                }`}
              >
                <span>{symptom.emoji}</span>
                <span>{symptom.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mood */}
      <div className="mb-5">
        <h3 className="font-semibold text-sm text-slate-800 mb-3 flex items-center gap-2">
          <MessageCircle size={16} className="text-pink-400" />
          Mood
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {MOODS.map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => {
                  setSelectedMood(mood.id);
                  setSaved(false);
                }}
                className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${
                  isSelected
                    ? "bg-pink-500 text-white shadow-md shadow-pink-200"
                    : "bg-white text-slate-600 border border-rose-100"
                }`}
              >
                <span className="text-xl">{mood.emoji}</span>
                <span className="text-[10px] font-medium">{mood.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notes */}
      <div className="mb-5">
        <h3 className="font-semibold text-sm text-slate-800 mb-3">Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            setSaved(false);
          }}
          placeholder="How are you feeling today?"
          className="w-full bg-white border border-rose-100 rounded-xl p-3 text-sm text-slate-700 placeholder-slate-400 resize-none h-20 focus:outline-none focus:ring-2 focus:ring-rose-200"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={saveEntry}
        className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-[0.98] ${
          saved
            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
            : "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-200"
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          {saved ? (
            <>
              <Check size={18} /> Saved!
            </>
          ) : (
            "Save Entry"
          )}
        </span>
      </button>

      {/* Symptom Recommendations */}
      {showRecommendations && selectedSymptoms.length > 0 && (
        <div className="mt-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200 animate-slide-up">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={16} className="text-amber-500" />
            <h3 className="font-semibold text-sm text-slate-800">
              Recommendations for You
            </h3>
          </div>

          {recommendations.teas.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-medium text-amber-700 mb-1.5">
                Suggested Teas
              </p>
              {recommendations.teas.map((tea, i) => (
                <p key={i} className="text-xs text-slate-600 ml-4 mb-0.5">
                  • {tea}
                </p>
              ))}
            </div>
          )}

          {recommendations.tips.length > 0 && (
            <div>
              <p className="text-xs font-medium text-amber-700 mb-1.5">
                💡 Wellness Tips
              </p>
              {recommendations.tips.map((tip, i) => (
                <p key={i} className="text-xs text-slate-600 ml-4 mb-0.5">
                  • {tip}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
