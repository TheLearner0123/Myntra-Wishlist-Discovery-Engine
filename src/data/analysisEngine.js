import { RAW_FEEDBACK_DATASET, SYNTHESIZED_DISCOVERY_STATS } from './feedbackDataset.js';

export const OPPORTUNITY_PRIORITIZATION_MATRIX = [
  {
    id: "OPP-1",
    name: "Real-Body Fit & Drape Confidence Engine",
    category: "Fit & Sizing Certainty",
    problemAddressed: "34.8% of users stall because studio models don't reflect their height, hips, or torso length, creating intense return anxiety.",
    nonMonetaryMechanism: "Dynamic 'Fit-Twin' Review Filter: Matches user height/weight/chest with real reviewer photos & 5-sec walking/sitting video clips. Cross-brand size translation ('If you are M in Zara, take L in this brand').",
    addressableWishlistVolume: "5,150+ signals (34.8% of wishlists)",
    conversionImpactScore: 9.4, // out of 10
    confidenceScore: 9.1,
    easeOfImplementation: 7.5,
    iceScore: 8.7, // (Impact * Confidence * Ease) normalized
    projected30DayConvLift: "+32% relative lift in 30-day wishlist conversion",
    implementationComplexity: "Medium (Requires reviewer dimension tagging + lightweight video player)",
    status: "Priority #1 (Crown Opportunity)"
  },
  {
    id: "OPP-2",
    name: "Interactive Mix-and-Match Outfit Studio",
    category: "Styling & Wardrobe Synergy",
    problemAddressed: "23.4% of wishlisters love individual items in isolation but cannot visualize what to pair them with, fearing wardrobe mismatch.",
    nonMonetaryMechanism: "Drag-and-Drop Outfit Canvas inside Wishlist: Users can pair wishlisted tops with their saved/past purchased bottoms, shoes, and bags to see a 1-glance assembled look with versatile occasion tags.",
    addressableWishlistVolume: "3,460+ signals (23.4% of wishlists)",
    conversionImpactScore: 8.8,
    confidenceScore: 8.5,
    easeOfImplementation: 8.2,
    iceScore: 8.5,
    projected30DayConvLift: "+24% relative lift in 30-day wishlist conversion",
    implementationComplexity: "Low-to-Medium (Frontend canvas with layer stacking + AI auto-pairing presets)",
    status: "Priority #2 (High Value, Rapid Deployment)"
  },
  {
    id: "OPP-3",
    name: "Social Co-Shopping & 1-Tap Friend Polls",
    category: "Social Validation & Peer Approval",
    problemAddressed: "62% of fashion shoppers take screenshots to ask friends on WhatsApp, causing massive funnel friction and forgotten purchase intent.",
    nonMonetaryMechanism: "Instant 'Ask Friends' Web Link: Generates a lightweight, interactive WhatsApp poll card where friends can vote ('Hot', 'Pass', 'Style with Sneakers') without needing the app installed. Real-time feedback appears directly on user's wishlist card.",
    addressableWishlistVolume: "2,200+ signals (15.0% of wishlists)",
    conversionImpactScore: 8.9,
    confidenceScore: 8.7,
    easeOfImplementation: 8.8,
    iceScore: 8.8,
    projected30DayConvLift: "+28% relative lift in high-intent social shoppers",
    implementationComplexity: "Low (PWA lightweight voting widget + deep link notification)",
    status: "Priority #3 (Viral Loop & Instant Decision Catalyst)"
  },
  {
    id: "OPP-4",
    name: "Sensory & Fabric Transparency Shield",
    category: "Fabric & Material Certainty",
    problemAddressed: "18.2% of users hesitate over fabric sheer/opacity, post-wash shrinkage, wrinkle propensity, and breathability in local climate.",
    nonMonetaryMechanism: "Standardized Sensory Passport: Opacity Rating (1-5 Scale), Fabric Weight (GSM), Daylight vs Studio Lighting Toggle, and 30-Day Verified Post-Wash Durability Badge.",
    addressableWishlistVolume: "2,700+ signals (18.2% of wishlists)",
    conversionImpactScore: 8.0,
    confidenceScore: 8.3,
    easeOfImplementation: 8.5,
    iceScore: 8.3,
    projected30DayConvLift: "+18% relative lift in fabric-sensitive categories (Kurtis, Linen, Dresses)",
    implementationComplexity: "Low (Catalog spec standard + customer post-wash survey check-in)",
    status: "Priority #4 (Essential Baseline Quality Enabler)"
  },
  {
    id: "OPP-5",
    name: "Occasion Timeline & Capsule Planner",
    category: "Occasion Staging & Context Retention",
    problemAddressed: "13.6% of wishlisted items are saved for future events (weddings, vacations, festive) but users forget context and procrastinate.",
    nonMonetaryMechanism: "Event-Based Wishlist Boards: Users tag items to specific events (e.g. 'Goa Trip - Nov 12', 'Pooja - Oct 4') with countdown readiness checklists ('Outfit 80% Complete: Missing Footwear') and timely styling prep cues.",
    addressableWishlistVolume: "2,010+ signals (13.6% of wishlists)",
    conversionImpactScore: 7.6,
    confidenceScore: 7.9,
    easeOfImplementation: 9.0,
    iceScore: 8.1,
    projected30DayConvLift: "+15% relative lift in seasonal & event fashion",
    implementationComplexity: "Low (Folder architecture + calendar date association + push timing)",
    status: "Priority #5 (Retention & Multi-Item Conversion Driver)"
  }
];

export function filterFeedback(filters = {}) {
  return RAW_FEEDBACK_DATASET.filter(item => {
    if (filters.cluster && filters.cluster !== 'all' && item.rootCauseCluster !== filters.cluster) return false;
    if (filters.source && filters.source !== 'all' && !item.source.includes(filters.source)) return false;
    if (filters.segment && filters.segment !== 'all' && item.userSegment !== filters.segment) return false;
    if (filters.intent && filters.intent !== 'all' && !item.intentLevel.includes(filters.intent)) return false;
    if (filters.category && filters.category !== 'all' && item.category !== filters.category) return false;
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      const matchText = (item.quote + " " + item.brand + " " + item.nonMonetaryUnlock + " " + item.emotion).toLowerCase();
      if (!matchText.includes(term)) return false;
    }
    return true;
  });
}
