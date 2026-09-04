import { RAW_FEEDBACK_DATASET, SYNTHESIZED_DISCOVERY_STATS } from './feedbackDataset.js';
import { OPPORTUNITY_PRIORITIZATION_MATRIX } from './analysisEngine.js';

export const PRESET_AI_QUERIES = [
  {
    id: "q1",
    label: "Core Non-Monetary Blockers",
    query: "What prevents wishlisted products from being purchased when price is not the barrier?"
  },
  {
    id: "q2",
    label: "Off-Platform Leakage",
    query: "What information do users seek outside the platform on YouTube, Reddit, and WhatsApp?"
  },
  {
    id: "q3",
    label: "Fit & Size Uncertainty",
    query: "Why does fit anxiety cause the biggest drop-off in trousers and dresses?"
  },
  {
    id: "q4",
    label: "Styling & Wardrobe Synergy",
    query: "How does lack of outfit visualization cause purchase postponement?"
  },
  {
    id: "q5",
    label: "Intent vs Bookmarking",
    query: "How do we distinguish genuine purchase intent from passive bookmarking in the wishlist?"
  },
  {
    id: "q6",
    label: "ICE Prioritized Roadmap",
    query: "Rank the top non-monetary opportunity areas by ICE score and projected 30-day conversion lift."
  }
];

export function runAiQuery(queryText) {
  const q = queryText.toLowerCase();

  // Pattern matching on user query topics
  if (q.includes("off-platform") || q.includes("youtube") || q.includes("reddit") || q.includes("whatsapp") || q.includes("outside")) {
    return {
      title: "Off-Platform Information Seeking & Leakage Dynamics",
      summary: "64.2% of high-intent wishlisters leave the native app to validate product doubts on 3 primary external ecosystems before making a purchase decision.",
      keyFindings: [
        {
          head: "YouTube Haul Infiltration (42% frequency)",
          body: "Shoppers search for '[Brand] try on haul' to see dynamic garment movement, fabric drape, and real-world proportions on non-model bodies. A video revealing stiff fabric or uneven hems triggers immediate silent abandonment."
        },
        {
          head: "Reddit Unvarnished Due-Diligence (28% frequency)",
          body: "Communities like r/IndianFashionAddicts and r/femalefashionadvice serve as consumer truth filters for brand sizing discrepancies ('Does Mango run small?') and post-wash shrinkage."
        },
        {
          head: "WhatsApp Peer Validation Loops (62% frequency)",
          body: "High-intent users screenshot 2-4 items and share them in private friend chats with 'Which one should I get?'. The lag in peer response (often 24-48 hrs) dissolves initial purchase impulse."
        }
      ],
      strategicRecommendation: "Embed off-platform validation natively into the wishlist interface: (1) 5-second community motion clips, (2) verified fit badges, and (3) 1-tap WhatsApp interactive voting cards.",
      supportingQuotes: RAW_FEEDBACK_DATASET.filter(f => f.offPlatformAction !== 'None').slice(0, 3)
    };
  }

  if (q.includes("fit") || q.includes("size") || q.includes("trouser") || q.includes("dress") || q.includes("body")) {
    return {
      title: "Fit & Silhouette Anxiety: The #1 Silent Conversion Killer",
      summary: "Accounting for 34.8% of wishlist stagnation, fit anxiety represents the highest-intent barrier. Users love the aesthetic but dread courier return cycles and ill-fitting garments.",
      keyFindings: [
        {
          head: "Model vs Reality Asymmetry",
          body: "Models (often 5'9-5'11 with standardized proportions) provide zero visual calibration for the median Indian buyer (5'2-5'4). Key parameters like rise, inseam, thigh circumference, and bust darting are missing from standard size charts."
        },
        {
          head: "Cross-Brand Sizing Chaos",
          body: "A size M in western fast-fashion brands (e.g. H&M/Zara) frequently differs drastically from domestic brands (Roadster/HRX), causing hesitation and multi-size saving."
        },
        {
          head: "Return Friction Dread",
          body: "Even with free return policies, the cognitive and logistical friction of repackaging, waiting for courier pickups, and refund processing creates a severe psychological barrier to checkout."
        }
      ],
      strategicRecommendation: "Implement a 'Fit-Twin' Review Engine that matches buyer dimensions with real verified reviewers, alongside garment total length sliders and cross-brand size translation.",
      supportingQuotes: RAW_FEEDBACK_DATASET.filter(f => f.rootCauseCluster === 'Fit & Silhouette Uncertainty').slice(0, 3)
    };
  }

  if (q.includes("styling") || q.includes("wardrobe") || q.includes("pair") || q.includes("outfit") || q.includes("coordination")) {
    return {
      title: "Styling & Wardrobe Integration Paralysis",
      summary: "23.4% of wishlisted items represent 'orphan items' — products the user finds aesthetically stunning in isolation, but cannot map to their existing wardrobe.",
      keyFindings: [
        {
          head: "The 'Orphan Garment' Syndrome",
          body: "A user loves an olive cargo skirt or statement blazer, but postpones buying because they don't know which top, shoes, or handbag to wear with it, fearing it will require buying 3 more items."
        },
        {
          head: "Lack of Visual Juxtaposition",
          body: "E-commerce grids force users to view tops and bottoms on separate pages. Users resort to screenshotting or opening 10 browser tabs to place items side-by-side."
        },
        {
          head: "Occasion Versatility Ambiguity",
          body: "Users hesitate if they cannot verify that an item can be styled for at least 2 distinct settings (e.g., office formal vs casual dinner)."
        }
      ],
      strategicRecommendation: "Build a native 'Mix-and-Match Outfit Studio' inside the wishlist, allowing users to drag and drop wishlisted tops against saved bottoms and past purchases.",
      supportingQuotes: RAW_FEEDBACK_DATASET.filter(f => f.rootCauseCluster === 'Styling & Wardrobe Coordination').slice(0, 3)
    };
  }

  if (q.includes("intent") || q.includes("bookmark") || q.includes("hoard") || q.includes("moodboard") || q.includes("passive")) {
    return {
      title: "Deconstructing Intent: Active Shortlisting vs Aspirational Mood-Boarding",
      summary: "Wishlists currently conflate two radically different consumer behaviors into a single unorganized bucket of 20-100+ items.",
      keyFindings: [
        {
          head: "Active High-Intent Shoppers (58% of volume)",
          body: "These users have immediate purchasing intent within 7-30 days, specific use-cases, and well-defined size requirements. They are held back purely by friction (fit doubt, peer validation, styling clarity)."
        },
        {
          head: "Aspirational Mood-Boarders (42% of volume)",
          body: "These users use the wishlist as a digital aesthetic scrapbook (like Pinterest) to collect visual inspiration, luxury items, or dream outfits with zero intention of buying within 30 days."
        },
        {
          head: "The Cognitive Overload Penalty",
          body: "When aspirational items clutter the wishlist, high-intent items get buried. Every time the user opens their wishlist, they experience visual fatigue and abandon the session."
        }
      ],
      strategicRecommendation: "Transition from a flat wishlist to a Dual-State Architecture: 'Ready to Buy (Active Shortlist)' vs 'Inspiration & Style Boards'.",
      supportingQuotes: RAW_FEEDBACK_DATASET.filter(f => f.userSegment === 'The Mood-Board Hoarder' || f.userSegment === 'The Occasion Stager').slice(0, 3)
    };
  }

  if (q.includes("ice") || q.includes("rank") || q.includes("priorit") || q.includes("roadmap") || q.includes("solution")) {
    return {
      title: "Opportunity Sizing & ICE Prioritization Scorecard",
      summary: "Synthesizing 14,820 customer signals into 5 non-monetary opportunity areas ranked by ICE (Impact, Confidence, Ease) score to maximize 30-day conversion lift.",
      keyFindings: [
        {
          head: "Rank #1: Real-Body Fit & Drape Confidence Engine (ICE: 8.7)",
          body: "Solves 34.8% of user hesitation. Projected +32% relative lift in 30-day wishlist conversion through Fit-Twin reviewer matching and dimension sliders."
        },
        {
          head: "Rank #2: Interactive Mix-and-Match Outfit Studio (ICE: 8.5)",
          body: "Solves 23.4% of hesitation. Projected +24% relative lift by removing orphan item uncertainty via drag-and-drop wardrobe pairing."
        },
        {
          head: "Rank #3: Social Co-Shopping & 1-Tap Friend Polls (ICE: 8.8)",
          body: "Captures 62% of WhatsApp off-platform leakers. Projected +28% relative lift in social-driven fashion purchases."
        },
        {
          head: "Rank #4: Sensory & Fabric Transparency Shield (ICE: 8.3)",
          body: "Solves fabric opacity, breathability, and wash durability concerns for Kurtis, Linen, and Dresses."
        },
        {
          head: "Rank #5: Occasion Timeline & Capsule Planner (ICE: 8.1)",
          body: "Transforms event-based hoarding into structured, time-staged outfit preparation."
        }
      ],
      strategicRecommendation: "Phase 1: Deploy Fit-Twin & 1-Tap Friend Polls (highest immediate leverage). Phase 2: Roll out Wardrobe Studio & Occasion Capsule Boards.",
      supportingQuotes: RAW_FEEDBACK_DATASET.slice(0, 3)
    };
  }

  // Generic fallback query analyzer
  return {
    title: "AI Synthesis: Comprehensive Wishlist Conversion Intelligence",
    summary: `Analyzing ${SYNTHESIZED_DISCOVERY_STATS.totalAnalyzedSignals} multi-channel signals for: "${queryText}". The primary non-monetary conversion unlocks center on confidence enhancement, sensory transparency, and decision scaffolding.`,
    keyFindings: [
      {
        head: "Psychological vs Transactional Hesitation",
        body: "Users do not primarily withhold purchase due to lack of discount. Rather, fashion purchases carry high emotional vulnerability (flattery, peer approval, social appropriateness)."
      },
      {
        head: "Off-Platform Friction Loop",
        body: "Over 64% of shoppers leave Myntra/AJIO to search YouTube try-ons, Reddit reviews, or WhatsApp peer confirmation. Closing this loop natively captures latent intent."
      },
      {
        head: "Multi-Item Synergies",
        body: "Wishlisted items remain unpurchased when viewed in isolation; grouping items into event capsules or outfit sets unlocks multi-item checkout."
      }
    ],
    strategicRecommendation: "Adopt confidence-building UX paradigms: Real-Body Fit Twins, Wardrobe Pairing Canvas, Sensory Passports, and Private Friend Voting.",
    supportingQuotes: RAW_FEEDBACK_DATASET.slice(0, 3)
  };
}
