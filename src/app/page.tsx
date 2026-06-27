"use client";

import { useState, useEffect } from "react";
import BottomNav from "@/components/BottomNav";
import HomeTab from "@/components/HomeTab";
import TrackerTab from "@/components/TrackerTab";
import WellnessTab from "@/components/WellnessTab";
import LearnTab from "@/components/LearnTab";
import ShopTab from "@/components/ShopTab";
import SetupModal from "@/components/SetupModal";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [showSetup, setShowSetup] = useState(false);
  const [lastPeriodStart, setLastPeriodStart] = useState<Date | null>(null);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load stored settings
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cycletrack_settings");
      if (stored) {
        const settings = JSON.parse(stored);
        setLastPeriodStart(new Date(settings.lastPeriodStart));
        setCycleLength(settings.cycleLength || 28);
        setPeriodLength(settings.periodLength || 5);
      }
    } catch {
      // ignore parse errors
    }
    setIsLoaded(true);
  }, []);

  const handleSetupComplete = (data: {
    lastPeriodStart: string;
    cycleLength: number;
    periodLength: number;
  }) => {
    const date = new Date(data.lastPeriodStart);
    setLastPeriodStart(date);
    setCycleLength(data.cycleLength);
    setPeriodLength(data.periodLength);
    setShowSetup(false);

    localStorage.setItem(
      "cycletrack_settings",
      JSON.stringify({
        lastPeriodStart: data.lastPeriodStart,
        cycleLength: data.cycleLength,
        periodLength: data.periodLength,
      })
    );
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-pink-50">
        <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
          CycleTrack
        </h1>
        <p className="text-xs text-slate-400 mt-1">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-white relative">
      {/* Status Bar Spacer */}
      <div className="h-0" />

      {/* Content */}
      <main className="relative">
        {activeTab === "home" && (
          <HomeTab
            lastPeriodStart={lastPeriodStart}
            cycleLength={cycleLength}
            periodLength={periodLength}
            onNavigate={setActiveTab}
            onSetup={() => setShowSetup(true)}
          />
        )}
        {activeTab === "tracker" && (
          <TrackerTab
            lastPeriodStart={lastPeriodStart}
            onSetup={() => setShowSetup(true)}
          />
        )}
        {activeTab === "wellness" && (
          <WellnessTab
            lastPeriodStart={lastPeriodStart}
            cycleLength={cycleLength}
            periodLength={periodLength}
            onSetup={() => setShowSetup(true)}
          />
        )}
        {activeTab === "learn" && <LearnTab />}
        {activeTab === "shop" && <ShopTab />}
      </main>

      {/* Bottom Navigation */}
      <BottomNav active={activeTab} onNavigate={setActiveTab} />

      {/* Setup Modal */}
      {showSetup && (
        <SetupModal
          onComplete={handleSetupComplete}
          onClose={() => setShowSetup(false)}
        />
      )}
    </div>
  );
}
