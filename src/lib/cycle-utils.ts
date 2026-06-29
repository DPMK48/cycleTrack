import { differenceInDays, addDays, format } from "date-fns";

export interface CyclePhase {
  name: string;
  day: number;
  totalDays: number;
  description: string;
  emoji: string;
  color: string;
  bgColor: string;
  tips: string[];
  foods: string[];
  avoid: string[];
  exercise: string[];
}

export function getCyclePhase(
  lastPeriodStart: Date,
  cycleLength: number = 28,
  periodLength: number = 5
): CyclePhase {
  const today = new Date();
  const daysSinceStart = differenceInDays(today, lastPeriodStart);
  const cycleDay = ((daysSinceStart % cycleLength) + cycleLength) % cycleLength + 1;

  if (cycleDay <= periodLength) {
    return {
      name: "Menstruation",
      day: cycleDay,
      totalDays: periodLength,
      description:
        "Your body is shedding the uterine lining. Focus on rest, warmth, and gentle nourishment.",
      emoji: "",
      color: "text-rose-600",
      bgColor: "bg-rose-100",
      tips: [
        "Rest and listen to your body",
        "Apply heat to your lower abdomen",
        "Stay hydrated with warm drinks",
        "Practice gentle stretching",
      ],
      foods: [
        "Iron-rich foods (spinach, lentils)",
        "Dark chocolate",
        "Warm soups and stews",
        "Herbal teas (ginger, turmeric)",
        "Vitamin C fruits for iron absorption",
      ],
      avoid: [
        "Excessive caffeine",
        "Cold foods and drinks",
        "Salty processed foods",
        "Intense exercise",
      ],
      exercise: [
        "Gentle yoga",
        "Light walking",
        "Stretching",
        "Meditation",
      ],
    };
  }

  const follicularEnd = Math.floor(cycleLength * 0.46);
  if (cycleDay <= follicularEnd) {
    return {
      name: "Follicular Phase",
      day: cycleDay - periodLength,
      totalDays: follicularEnd - periodLength,
      description:
        "Estrogen is rising! Your energy increases and creativity peaks. Great time to start new projects.",
      emoji: "",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      tips: [
        "Start new projects and goals",
        "Try new workouts",
        "Social activities are energizing",
        "Your skin is likely glowing!",
      ],
      foods: [
        "Fermented foods (yogurt, kimchi)",
        "Lean proteins",
        "Fresh vegetables and salads",
        "Sprouted grains",
        "Citrus fruits",
      ],
      avoid: [
        "Heavy, greasy foods",
        "Excessive sugar",
      ],
      exercise: [
        "Cardio and HIIT",
        "Dance workouts",
        "Hiking",
        "Swimming",
      ],
    };
  }

  const ovulationEnd = Math.floor(cycleLength * 0.54);
  if (cycleDay <= ovulationEnd) {
    return {
      name: "Ovulation",
      day: cycleDay - follicularEnd,
      totalDays: ovulationEnd - follicularEnd,
      description:
        "Peak energy and confidence! Your body is at its most fertile. Communication skills are heightened.",
      emoji: "",
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      tips: [
        "Peak fertility window",
        "Energy and confidence at highest",
        "Great for important conversations",
        "You may feel more social",
      ],
      foods: [
        "Anti-inflammatory foods",
        "Raw fruits and vegetables",
        "Whole grains",
        "Fatty fish (salmon, sardines)",
        "Nuts and seeds",
      ],
      avoid: [
        "Processed foods",
        "Excessive alcohol",
      ],
      exercise: [
        "High-intensity training",
        "Group sports",
        "Running",
        "Power yoga",
      ],
    };
  }

  return {
    name: "Luteal Phase",
    day: cycleDay - ovulationEnd,
    totalDays: cycleLength - ovulationEnd,
    description:
      "Progesterone rises as your body prepares. You may feel PMS symptoms. Focus on self-care and comfort.",
    emoji: "",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    tips: [
      "Practice self-care routines",
      "Journal your feelings",
      "Get extra sleep if needed",
      "Magnesium-rich foods help",
    ],
    foods: [
      "Complex carbs (sweet potato, brown rice)",
      "Magnesium-rich foods (dark chocolate, nuts)",
      "B-vitamin foods (whole grains, eggs)",
      "Comfort foods in moderation",
      "Warm herbal teas",
    ],
    avoid: [
      "Excessive salt (causes bloating)",
      "Too much caffeine",
      "Refined sugars",
      "Alcohol",
    ],
    exercise: [
      "Pilates",
      "Moderate walking",
      "Gentle yoga",
      "Swimming",
    ],
  };
}

export function getNextPeriodDate(
  lastPeriodStart: Date,
  cycleLength: number = 28
): Date {
  const today = new Date();
  let nextDate = new Date(lastPeriodStart);
  while (nextDate <= today) {
    nextDate = addDays(nextDate, cycleLength);
  }
  return nextDate;
}

export function getDaysUntilNextPeriod(
  lastPeriodStart: Date,
  cycleLength: number = 28
): number {
  const nextPeriod = getNextPeriodDate(lastPeriodStart, cycleLength);
  return differenceInDays(nextPeriod, new Date());
}

export function formatDate(date: Date): string {
  return format(date, "MMM d, yyyy");
}

export const SYMPTOMS = [
  { id: "cramps", label: "Cramps", emoji: "" },
  { id: "headache", label: "Headache", emoji: "" },
  { id: "bloating", label: "Bloating", emoji: "" },
  { id: "fatigue", label: "Fatigue", emoji: "" },
  { id: "backpain", label: "Back Pain", emoji: "" },
  { id: "breasttenderness", label: "Breast Tenderness", emoji: "" },
  { id: "acne", label: "Acne", emoji: "" },
  { id: "cravings", label: "Cravings", emoji: "" },
  { id: "moodswings", label: "Mood Swings", emoji: "" },
  { id: "nausea", label: "Nausea", emoji: "" },
  { id: "insomnia", label: "Insomnia", emoji: "" },
  { id: "anxiety", label: "Anxiety", emoji: "" },
];

export const MOODS = [
  { id: "happy", label: "Happy", emoji: "😊" },
  { id: "calm", label: "Calm", emoji: "😌" },
  { id: "energetic", label: "Energetic", emoji: "⚡" },
  { id: "tired", label: "Tired", emoji: "😪" },
  { id: "irritable", label: "Irritable", emoji: "😤" },
  { id: "sad", label: "Sad", emoji: "😢" },
  { id: "anxious", label: "Anxious", emoji: "😟" },
  { id: "sensitive", label: "Sensitive", emoji: "🥺" },
];

export function getSymptomRecommendations(symptoms: string[]): {
  teas: string[];
  tips: string[];
} {
  const teas: string[] = [];
  const tips: string[] = [];

  if (symptoms.includes("cramps")) {
    teas.push("Cassia-Turmeric Infusion", "Hamy Black Tea");
    tips.push("Apply a warm compress to your lower abdomen", "Try gentle hip-opening stretches");
  }
  if (symptoms.includes("bloating")) {
    teas.push("Hamy Green Tea", "Hamy Black Tea");
    tips.push("Reduce salt intake", "Drink plenty of water", "Try gentle walking");
  }
  if (symptoms.includes("headache")) {
    teas.push("Hamy Black Tea");
    tips.push("Stay hydrated", "Rest in a dark, quiet room", "Try peppermint oil on temples");
  }
  if (symptoms.includes("moodswings") || symptoms.includes("anxiety")) {
    teas.push("Hami Hibiscus Spiced Delight");
    tips.push("Practice deep breathing exercises", "Journal your feelings", "Take a warm bath");
  }
  if (symptoms.includes("fatigue")) {
    teas.push("Hamy Black Tea", "Hamy Green Tea");
    tips.push("Prioritize sleep", "Eat iron-rich foods", "Take short power naps");
  }
  if (symptoms.includes("nausea")) {
    teas.push("Hamy Black Tea", "Hamy Green Tea");
    tips.push("Eat small, frequent meals", "Avoid strong smells", "Try ginger candies");
  }

  return {
    teas: [...new Set(teas)],
    tips: [...new Set(tips)],
  };
}
