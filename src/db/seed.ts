import "dotenv/config";
import { db } from "./index";
import { teas } from "./schema";

async function main() {
  console.log("Starting database seeding...");

  // 1. Clear existing teas
  console.log("Clearing existing tea records...");
  await db.delete(teas);
  console.log("Cleared all existing tea records.");

  // 2. Insert new teas
  console.log("Inserting new real tea formulations...");
  await db.insert(teas).values([
    {
      id: 1,
      name: "Cassia-Turmeric Infusion",
      description: "Our flagship 'Golden Detoxifier' and deep cellular cleanser. Formulated with black pepper to increase curcumin absorption by 2,000%, offering advanced anti-inflammatory and joint support.",
      benefits: [
        "Advanced anti-inflammatory & joint support (curcumin + piperine 2000% boost)",
        "Metabolic cleanse (cassia seeds support liver, intestines & water balance)",
        "Deep digestive and gut healing (fennel, coriander & ginger soothe GI)",
        "Cardioprotective & lipid support (prevents bad LDL cholesterol oxidation)"
      ],
      ingredients: [
        "Cassia Seeds",
        "Turmeric Root",
        "Ginger Root",
        "Black Pepper",
        "Fennel Seeds",
        "Coriander Seeds"
      ],
      singlePrice: "₦2,000",
      bulkPrice: "₦1,500",
      bulkMinQty: 10,
      imageUrl: "/assets/Cassia tumeric image.jpeg",
      videoUrl: null,
      isPrimary: true,
      category: "Flagship Blend"
    },
    {
      id: 2,
      name: "Hamy Black Tea",
      description: "A robust, warming, and aromatic blend. Fires up metabolism and supports cellular defense with exceptional antioxidant power. It features a lingering back-of-the-throat warmth—the 'Thermogenic Kick' of ginger and cayenne.",
      benefits: [
        "Fires up metabolism & supports weight management (thermogenic cayenne & ginger)",
        "Deep digestive comfort (mint, lemongrass, cardamom & ginger)",
        "Ultimate cellular defense (polyphenols from black tea & cloves antioxidant shield)",
        "Sustained energy and focus without the caffeine crash"
      ],
      ingredients: [
        "Black Tea Leaves",
        "Mint Leaves",
        "Lemongrass",
        "Ginger",
        "Cinnamon",
        "Cayenne Pepper",
        "Cloves",
        "Cardamom"
      ],
      singlePrice: "₦2,000",
      bulkPrice: "₦1,500",
      bulkMinQty: 10,
      imageUrl: "/assets/Black tea image.jpeg",
      videoUrl: "/assets/Black tea video.mp4",
      isPrimary: false,
      category: "Metabolic & Wellness"
    },
    {
      id: 3,
      name: "Hamy Green Tea",
      description: "A crisp metabolic energy and digestive ease blend. Synergizes EGCG from green tea with black pepper (piperine) to maximize bio-absorption of active wellness compounds.",
      benefits: [
        "Robust metabolic support (caffeine & EGCG fat oxidation synergy)",
        "Advanced digestive comfort (fennel anethole relaxes GI tract)",
        "High antioxidant & immune protection (cardamom & allspice polyphenols)",
        "Natural bio-enhancer (black pepper piperine boosts nutrient absorption)"
      ],
      ingredients: [
        "Green Tea Leaves",
        "Black Tea Leaves",
        "Ginger",
        "Cinnamon",
        "Mint Leaves",
        "Fennel Seeds",
        "Black Pepper",
        "Cardamom",
        "Allspice"
      ],
      singlePrice: "₦2,000",
      bulkPrice: "₦1,500",
      bulkMinQty: 12,
      imageUrl: "/assets/Green tea image.jpeg",
      videoUrl: "/assets/Green tea video.mp4",
      isPrimary: false,
      category: "Metabolic & Digestive"
    },
    {
      id: 4,
      name: "Hami Hibiscus Spiced Delight",
      description: "An exceptionally refreshing, stimulating, and heart-healthy blend. Vibrant hibiscus combined with a fiery kick of cayenne pepper and citrusy lemongrass. Naturally caffeine-free for an all-day wellness drink.",
      benefits: [
        "Vibrant cardiovascular support and heart-healthy hydration",
        "Fiery metabolic stimulation with cayenne pepper",
        "Refreshing citrusy lemongrass and stomach-soothing mint",
        "Naturally caffeine-free for all-day wellness and vitality"
      ],
      ingredients: [
        "Hibiscus Flowers",
        "Cayenne Pepper",
        "Lemongrass",
        "Mint Leaves"
      ],
      singlePrice: "₦2,000",
      bulkPrice: "₦1,500",
      bulkMinQty: 10,
      imageUrl: "/assets/Spiced hibiscus delight image.jpeg",
      videoUrl: "/assets/Spiced hibiscus delight video.mp4",
      isPrimary: false,
      category: "Cardiovascular & Vitality"
    }
  ]);

  console.log("Successfully seeded new teas into the database!");
}

main()
  .catch((error) => {
    console.error("Seeding failed with error:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
