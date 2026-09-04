import { RAW_FEEDBACK_DATASET, SYNTHESIZED_DISCOVERY_STATS } from './data/feedbackDataset.js';
import { OPPORTUNITY_PRIORITIZATION_MATRIX, filterFeedback } from './data/analysisEngine.js';
import { PRESET_AI_QUERIES, runAiQuery } from './data/aiQueryCopilot.js';

// Application State
let activeTab = 'antigravity-chat';
let activeFilters = {
  source: 'all',
  cluster: 'all',
  segment: 'all',
  category: 'all',
  searchTerm: ''
};
let selectedFeedbackItem = null;
let currentAiQueryResult = runAiQuery("What prevents wishlisted products from being purchased when price is not the barrier?");

let chatHistory = [
  {
    sender: "bot",
    text: "Welcome back! I analyzed the items in your wishlist. Here is what we can figure out today:",
    starterChips: [
      "Will the Levi's Cotton Formal Shirt fit me in size M?",
      "Compare my saved Green Casual Shirt vs Levi's Shirt.",
      "Is the Fbella Satin Nightdress sheer or good quality?"
    ],
    productCard: null,
    followUpChips: []
  }
];

// DOM Elements
const app = document.getElementById('app');

function renderApp() {
  app.innerHTML = `
    <!-- Top Global Header -->
    <header class="border-b border-slate-800/80 bg-slate-950/80 sticky top-0 z-50 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl font-extrabold tracking-tight text-white font-display">AURA-Discovery™</h1>
              <span class="badge badge-indigo">Decision AI v2.4</span>
              <span class="badge badge-pink">Zero Monetary Incentives</span>
            </div>
            <p class="text-xs text-slate-400 font-medium">Myntra Growth & Styling Decision AI • Grounded Strictly on Customer Reviews</p>
          </div>
        </div>

        <div class="flex items-center gap-3 self-stretch md:self-auto justify-between md:justify-end">
          <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Analyzed Signals: <strong class="text-emerald-400 font-mono">14,820</strong></span>
          </div>
          <button id="export-report-btn" class="btn-glow text-xs flex items-center gap-1.5 py-2 px-4">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Strategy Deck
          </button>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2 border-t border-slate-900">
        <button class="nav-tab-btn ${activeTab === 'antigravity-chat' ? 'active' : ''}" data-tab="antigravity-chat">
          <svg class="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          ✨ Antigravity Decision Chat (Live UI)
        </button>
        <button class="nav-tab-btn ${activeTab === 'overview' ? 'active' : ''}" data-tab="overview">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          Overview & Executive KPIs
        </button>
        <button class="nav-tab-btn ${activeTab === 'ai-copilot' ? 'active' : ''}" data-tab="ai-copilot">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          AI Query Copilot
        </button>
        <button class="nav-tab-btn ${activeTab === 'verbatim-feed' ? 'active' : ''}" data-tab="verbatim-feed">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          Multi-Source Verbatim Feed
        </button>
        <button class="nav-tab-btn ${activeTab === 'root-causes' ? 'active' : ''}" data-tab="root-causes">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          Root Cause & Uncertainty Taxonomy
        </button>
        <button class="nav-tab-btn ${activeTab === 'personas' ? 'active' : ''}" data-tab="personas">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          User Personas & Intent Split
        </button>
        <button class="nav-tab-btn ${activeTab === 'off-platform' ? 'active' : ''}" data-tab="off-platform">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          Off-Platform Leakage Map
        </button>
        <button class="nav-tab-btn ${activeTab === 'opportunity-matrix' ? 'active' : ''}" data-tab="opportunity-matrix">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          Opportunity Matrix & ICE Ranking
        </button>
      </div>
    </header>

    <!-- Main Content Container -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      ${renderActiveTab()}
    </main>

    <!-- Modal for Detailed Feedback Item -->
    ${selectedFeedbackItem ? renderFeedbackModal(selectedFeedbackItem) : ''}
  `;

  attachEventListeners();
}

function renderActiveTab() {
  switch (activeTab) {
    case 'antigravity-chat':
      return renderAntigravityChatTab();
    case 'overview':
      return renderOverviewTab();
    case 'ai-copilot':
      return renderAiCopilotTab();
    case 'verbatim-feed':
      return renderVerbatimFeedTab();
    case 'root-causes':
      return renderRootCausesTab();
    case 'personas':
      return renderPersonasTab();
    case 'off-platform':
      return renderOffPlatformTab();
    case 'opportunity-matrix':
      return renderOpportunityMatrixTab();
    default:
      return renderAntigravityChatTab();
  }
}

// ----------------------------------------------------
// TAB 0: ANTIGRAVITY DECISION CHAT (GEMINI-STYLE UI)
// ----------------------------------------------------
function renderAntigravityChatTab() {
  return `
    <div class="space-y-6 max-w-4xl mx-auto">
      <!-- Context Header -->
      <div class="glass-panel p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-pink-500/25">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-lg font-bold text-white font-display">Antigravity™ Decision Assistant</h2>
              <span class="badge badge-pink">Grounded on Wishlist JSON</span>
            </div>
            <p class="text-xs text-slate-400">User: <strong class="text-white">Manisha</strong> • Tier: <strong class="text-indigo-400">Myntra Insider Elite</strong> • Saved Items: <strong class="text-emerald-400">4</strong></p>
          </div>
        </div>

        <div class="flex items-center gap-2 text-xs">
          <span class="badge badge-emerald">Zero Monetary Bias</span>
          <button id="reset-chat-btn" class="filter-chip text-[11px] py-1 px-3">🔄 Reset Chat</button>
        </div>
      </div>

      <!-- User's Live Wishlist Inventory Bar (Grounded in JSON) -->
      <div class="glass-panel p-4 space-y-2">
        <div class="flex items-center justify-between text-xs text-slate-400">
          <span class="font-semibold uppercase text-[10px] tracking-wider">Your Active Wishlist (Grounded in App Data):</span>
          <span class="text-indigo-300">4 Items Awaiting Decision</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
            <div class="text-pink-400 font-bold text-[11px] truncate">Levi's Formal Cotton Shirt</div>
            <div class="text-[10px] text-slate-400 font-mono">Size: M • Slim Fit</div>
            <span class="badge badge-emerald text-[8px] py-0.5">True-To-Size (Dr. Sood)</span>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
            <div class="text-pink-400 font-bold text-[11px] truncate">Here&Now Green Casual Shirt</div>
            <div class="text-[10px] text-slate-400 font-mono">Size: M • Regular</div>
            <span class="badge badge-indigo text-[8px] py-0.5">Soft Cotton (Mahi Ji)</span>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
            <div class="text-pink-400 font-bold text-[11px] truncate">Fbella Satin Nightdress</div>
            <div class="text-[10px] text-slate-400 font-mono">Size: S • Satin Slip</div>
            <span class="badge badge-cyan text-[8px] py-0.5">Non-Sheer (Pankaj)</span>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
            <div class="text-pink-400 font-bold text-[11px] truncate">Mango Wide-Leg Trousers</div>
            <div class="text-[10px] text-slate-400 font-mono">Size: 30 • High Rise</div>
            <span class="badge badge-amber text-[8px] py-0.5">Runs Long for 5'2"</span>
          </div>
        </div>
      </div>

      <!-- Mobile-First Gemini Chat Stream -->
      <div class="glass-panel p-5 space-y-5 min-h-[420px] flex flex-col justify-between">
        <!-- Message History -->
        <div class="space-y-4 overflow-y-auto max-h-[500px] pr-2" id="chat-messages-container">
          ${chatHistory.map(msg => `
            <div class="flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-2">
              <div class="flex items-center gap-2">
                ${msg.sender === 'bot' ? `
                  <span class="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">✨</span>
                  <span class="text-[11px] font-semibold text-slate-300">Antigravity AI</span>
                ` : `
                  <span class="text-[11px] font-semibold text-slate-300">You (Manisha)</span>
                  <span class="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-indigo-300 font-bold">M</span>
                `}
              </div>

              <!-- Message Bubble -->
              <div class="p-4 rounded-2xl text-xs leading-relaxed max-w-xl ${
                msg.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none space-y-3'
              }">
                <p class="text-xs ${msg.sender === 'bot' ? 'text-slate-100' : 'text-white'}">${msg.text}</p>

                <!-- Rendered Product Card (If Present in JSON) -->
                ${msg.productCard ? `
                  <div class="p-3.5 rounded-xl bg-slate-950/90 border border-indigo-500/40 text-xs space-y-2 mt-2">
                    <div class="flex items-center justify-between">
                      <span class="badge badge-indigo text-[9px]">${msg.productCard.id}</span>
                      <span class="badge badge-emerald text-[9px]">${msg.productCard.fitStatus}</span>
                    </div>
                    <div class="font-bold text-white text-sm">${msg.productCard.title}</div>
                    <div class="text-[11px] text-slate-300 leading-snug">${msg.productCard.fabricDetails}</div>
                    <div class="flex items-center justify-between pt-2 border-t border-slate-800">
                      <span class="text-amber-300 font-mono font-bold">${msg.productCard.reviewConsensus}</span>
                      <button class="btn-glow text-[11px] py-1.5 px-3 move-to-bag-btn" data-product="${msg.productCard.title}">
                        🛒 Move to Bag
                      </button>
                    </div>
                  </div>
                ` : ''}

                <!-- Starter Chips (If Zero-State) -->
                ${msg.starterChips && msg.starterChips.length > 0 ? `
                  <div class="space-y-1.5 pt-2 border-t border-slate-800/80">
                    <span class="text-[10px] text-indigo-300 uppercase font-semibold">Tap to resolve an uncertainty:</span>
                    <div class="flex flex-col gap-1.5">
                      ${msg.starterChips.map(chip => `
                        <button class="text-left px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-indigo-950/60 border border-slate-700/70 hover:border-indigo-500 text-xs text-indigo-200 font-medium transition chat-starter-chip" data-query="${chip}">
                          ⚡ "${chip}"
                        </button>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}

                <!-- Next Best Action Follow-Up Chips -->
                ${msg.followUpChips && msg.followUpChips.length > 0 ? `
                  <div class="space-y-1.5 pt-2 border-t border-slate-800/80">
                    <span class="text-[10px] text-emerald-400 uppercase font-semibold">Next Best Action:</span>
                    <div class="flex flex-wrap gap-1.5">
                      ${msg.followUpChips.map(chip => `
                        <button class="filter-chip active text-[11px] py-1 px-3 chat-starter-chip" data-query="${chip}">
                          👉 ${chip}
                        </button>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Chat Input Bar -->
        <div class="pt-3 border-t border-slate-800 space-y-2">
          <div class="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl p-1.5 focus-within:border-indigo-500 transition">
            <input 
              type="text" 
              id="antigravity-chat-input" 
              placeholder="Ask Antigravity about fit, fabric, or comparing your wishlisted items..." 
              class="bg-transparent text-xs text-white px-3 py-2 w-full focus:outline-none placeholder:text-slate-500"
            />
            <button id="antigravity-send-btn" class="btn-glow text-xs px-4 py-2 shrink-0">
              Send
            </button>
          </div>
          <div class="text-[10px] text-slate-400 text-center">
            🔒 Strictly grounded on verified reviews & metadata • 0% promotional bias
          </div>
        </div>
      </div>
    </div>
  `;
}

function processAntigravityChatQuery(userText) {
  const q = userText.toLowerCase();

  // Add user message
  chatHistory.push({
    sender: "user",
    text: userText,
    starterChips: [],
    productCard: null,
    followUpChips: []
  });

  // Execute Background Analysis on JSON
  let botResponse = {};

  if (q.includes("levi") || q.includes("formal") || (q.includes("shirt") && !q.includes("green"))) {
    botResponse = {
      sender: "bot",
      text: "Based on verified buyer reviews in the data, the Levi's Slim Fit Cotton Formal Shirt is confirmed true-to-size with breathable fabric that holds up well after washing without shrinking. For your M profile, it offers a clean, tailored silhouette with no chest gaping.",
      productCard: {
        id: "ITEM-LEVIS-SHIRT",
        title: "Levi's Slim Fit Cotton Formal Shirt (Size M)",
        fabricDetails: "100% Breathable Combed Cotton • Non-Stretch Tailored Weave",
        fitStatus: "True-to-Size Consensus: 96%",
        reviewConsensus: "Verified: 0% wash shrinkage (Dr. Sameer Sood review)"
      },
      starterChips: [],
      followUpChips: [
        "Move Levi's Shirt to Bag",
        "How does it pair with my Mango Trousers?",
        "Compare with Green Casual Shirt"
      ]
    };
  } else if (q.includes("green") || q.includes("casual")) {
    botResponse = {
      sender: "bot",
      text: "According to customer feedback for the Here&Now Green Shirt, the olive-green color matches online photos accurately and the fabric is notably soft for all-day comfort. The fit is standard regular with comfortable shoulder room.",
      productCard: {
        id: "ITEM-GREEN-COTTON",
        title: "Here&Now Green Cotton Casual Shirt (Size M)",
        fabricDetails: "Soft Touch Pure Cotton • Relaxed Everyday Drape",
        fitStatus: "Color & Fit Accuracy: 98%",
        reviewConsensus: "Verified: True color match & soft feel (Mahi Ji review)"
      },
      starterChips: [],
      followUpChips: [
        "Move Green Shirt to Bag",
        "Style with beige sneakers",
        "Check Fbella Satin Nightdress"
      ]
    };
  } else if (q.includes("fbella") || q.includes("satin") || q.includes("nightdress") || q.includes("sheer")) {
    botResponse = {
      sender: "bot",
      text: "Reviewers confirm that the Fbella Satin Nightdress features a premium high-density satin weave that is completely opaque and non-sheer under normal lighting. The fabric feels soft on the skin with neat seam stitching throughout.",
      productCard: {
        id: "ITEM-FBELLA-SATIN",
        title: "Fbella Satin Nightdress / Slip (Size S)",
        fabricDetails: "High-Density Polyester Satin • Opaque Finish",
        fitStatus: "Fabric Quality Score: 5/5",
        reviewConsensus: "Verified: Premium texture & non-sheer (Pankaj Kumar review)"
      },
      starterChips: [],
      followUpChips: [
        "Move Fbella Nightdress to Bag",
        "Will size S fit 34-inch bust?",
        "Back to Wishlist Overview"
      ]
    };
  } else if (q.includes("mango") || q.includes("trouser") || q.includes("pant") || q.includes("5'2")) {
    botResponse = {
      sender: "bot",
      text: "Customer reports indicate the Mango Wide-Leg Trousers have a 32-inch inseam tailored for 5'8+ models, so buyers around 5'2 found they pool slightly on flat shoes. Sizing waist is true, but pairing with 2-inch heels or slight cuffing is recommended for shorter frames.",
      productCard: {
        id: "ITEM-MANGO-TROUSERS",
        title: "Mango High-Waist Wide-Leg Trousers (Size 30)",
        fabricDetails: "Structured Twill Blend • Wide Flare Hem",
        fitStatus: "Height Advisory: Inseam 32\"",
        reviewConsensus: "Verified: Best paired with 2-inch block heels for 5'2"
      },
      starterChips: [],
      followUpChips: [
        "Pair with Levi's Formal Shirt",
        "Move Trousers to Bag",
        "Check other items"
      ]
    };
  } else if (q.includes("compare") || q.includes("vs")) {
    botResponse = {
      sender: "bot",
      text: "The Levi's Shirt is structured 100% formal cotton with a tailored slim silhouette, ideal for office and presentations. In contrast, the Green Here&Now Shirt has a softer casual weave designed for relaxed weekend wear.",
      productCard: {
        id: "COMPARISON-MATRIX",
        title: "Levi's Formal (Slim) vs Green Casual (Relaxed)",
        fabricDetails: "Levi's: Structured Formal | Green: Soft Everyday Cotton",
        fitStatus: "Both Size M • Verified True to Size",
        reviewConsensus: "Recommendation: Keep Levi's for formal, Green for casual"
      },
      starterChips: [],
      followUpChips: [
        "Move Levi's Shirt to Bag",
        "Move Green Shirt to Bag",
        "Check Fbella Satin Slip"
      ]
    };
  } else if (q.includes("bag") || q.includes("move") || q.includes("buy")) {
    botResponse = {
      sender: "bot",
      text: "Done! I have prepared this item for your bag with verified size M. You can proceed with full confidence in fit and fabric quality.",
      productCard: null,
      starterChips: [],
      followUpChips: [
        "Check another wishlist item",
        "View styling combinations",
        "Back to Executive Dashboard"
      ]
    };
  } else {
    botResponse = {
      sender: "bot",
      text: "I analyzed our verified reviews for your saved items. What specific uncertainty can I help clarify regarding fit, fabric opacity, or styling combinations?",
      productCard: null,
      starterChips: [
        "Will the Levi's Cotton Formal Shirt fit me in size M?",
        "Compare my saved Green Casual Shirt vs Levi's Shirt.",
        "Is the Fbella Satin Nightdress sheer or good quality?"
      ],
      followUpChips: []
    };
  }

  chatHistory.push(botResponse);
  renderApp();
}

// ----------------------------------------------------
// TAB 1: OVERVIEW & EXECUTIVE KPIS
// ----------------------------------------------------
function renderOverviewTab() {
  const stats = SYNTHESIZED_DISCOVERY_STATS;
  return `
    <div class="space-y-8">
      <!-- Strategic Context Banner -->
      <div class="glass-panel glass-panel-glow p-6 relative">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div class="space-y-2 max-w-3xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Strategic Discovery Engine Mandate
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Unlocking the 30-Day Wishlist-to-Purchase Conversion Gap
            </h2>
            <p class="text-sm text-slate-300 leading-relaxed">
              Fashion wishlists represent <strong>high-intent latent demand</strong> where users have explicitly chosen items they desire. However, with a strict constraint of <strong>zero monetary incentives (no discounts, coupons, or flash markdowns)</strong>, our AI engine ingested <strong>14,820 customer signals</strong> to reveal that <span class="text-pink-400 font-semibold">82% of hesitation is driven by confidence deficits</span>: fit ambiguity, styling paralysis, sensory opacity, and missing social validation.
            </p>
          </div>
          <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 w-full lg:w-72 shrink-0 space-y-3">
            <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Baseline Funnel</div>
            <div class="flex items-baseline justify-between">
              <span class="text-xs text-slate-400">Wishlist Size (Avg)</span>
              <span class="text-lg font-mono font-bold text-white">${stats.baselineMetrics.averageWishlistSize} items</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-xs text-slate-400">Median Shelf-Life</span>
              <span class="text-lg font-mono font-bold text-amber-400">${stats.baselineMetrics.medianWishlistShelfLifeDays} days</span>
            </div>
            <div class="flex items-baseline justify-between border-t border-slate-800 pt-2">
              <span class="text-xs font-medium text-slate-300">30-Day Conv. Rate</span>
              <span class="text-xl font-mono font-extrabold text-pink-400">${stats.baselineMetrics.baseline30DayConversionRate}</span>
            </div>
            <div class="text-[11px] text-slate-400 leading-tight italic">
              Goal: Drive 30d conversion to 9.2% (+58% relative lift) via non-monetary interventions.
            </div>
          </div>
        </div>
      </div>

      <!-- Core Executive KPI Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="stat-card">
          <div class="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>FIT & SILHOUETTE ANXIETY</span>
            <span class="badge badge-pink">#1 Blocker</span>
          </div>
          <div class="text-3xl font-extrabold font-mono text-white mb-1">34.8%</div>
          <div class="text-xs text-slate-400">5,157 Signals • Discrepancy between model and real body geometry.</div>
          <div class="mt-3 progress-bar-bg">
            <div class="progress-bar-fill bg-gradient-to-r from-pink-500 to-rose-400" style="width: 34.8%"></div>
          </div>
        </div>

        <div class="stat-card">
          <div class="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>OFF-PLATFORM LEAKAGE</span>
            <span class="badge badge-amber">Friction Point</span>
          </div>
          <div class="text-3xl font-extrabold font-mono text-amber-400 mb-1">64.2%</div>
          <div class="text-xs text-slate-400">Users leave Myntra to check YouTube, Reddit, or WhatsApp before buying.</div>
          <div class="mt-3 progress-bar-bg">
            <div class="progress-bar-fill bg-gradient-to-r from-amber-500 to-orange-400" style="width: 64.2%"></div>
          </div>
        </div>

        <div class="stat-card">
          <div class="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>STYLING & WARDROBE GAP</span>
            <span class="badge badge-indigo">Decision Paralysis</span>
          </div>
          <div class="text-3xl font-extrabold font-mono text-indigo-400 mb-1">23.4%</div>
          <div class="text-xs text-slate-400">3,468 Signals • "Orphan items" that users don't know how to pair.</div>
          <div class="mt-3 progress-bar-bg">
            <div class="progress-bar-fill bg-gradient-to-r from-indigo-500 to-purple-400" style="width: 23.4%"></div>
          </div>
        </div>

        <div class="stat-card">
          <div class="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>HIGH-INTENT HESITATORS</span>
            <span class="badge badge-emerald">Convertible Target</span>
          </div>
          <div class="text-3xl font-extrabold font-mono text-emerald-400 mb-1">58.0%</div>
          <div class="text-xs text-slate-400">Users ready to purchase if specific non-monetary doubts are resolved.</div>
          <div class="mt-3 progress-bar-bg">
            <div class="progress-bar-fill bg-gradient-to-r from-emerald-500 to-teal-400" style="width: 58.0%"></div>
          </div>
        </div>
      </div>

      <!-- Two Column Deep Insights -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Ingestion Pipeline Breakdown -->
        <div class="lg:col-span-6 glass-panel p-6 space-y-5">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-bold text-white font-display">Multi-Source Ingestion Pipeline</h3>
              <p class="text-xs text-slate-400">Continuous NLP ingestion & semantic vector clustering</p>
            </div>
            <span class="badge badge-indigo">5 Streams Active</span>
          </div>
          <div class="space-y-3.5">
            ${stats.sourcesBreakdown.map(s => `
              <div class="space-y-1.5">
                <div class="flex justify-between text-xs">
                  <span class="font-medium text-slate-300">${s.source}</span>
                  <span class="font-mono text-slate-400"><strong>${s.count.toLocaleString()}</strong> (${s.pct}%)</span>
                </div>
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill bg-indigo-500" style="width: ${s.pct * 2.5}%"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Five Core Non-Monetary Conversion Levers -->
        <div class="lg:col-span-6 glass-panel p-6 space-y-5">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-bold text-white font-display">Root Cause Breakdown (Non-Price)</h3>
              <p class="text-xs text-slate-400">Why users freeze after wishlisting an item they love</p>
            </div>
            <span class="badge badge-pink">100% Non-Monetary</span>
          </div>
          <div class="space-y-3">
            ${stats.rootCauseDistribution.map(r => `
              <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs font-bold text-white">${r.cluster}</span>
                  <span class="text-xs font-mono font-semibold text-pink-400">${r.pct}% (${r.count.toLocaleString()})</span>
                </div>
                <p class="text-[11px] text-slate-400 leading-snug">${r.description}</p>
                <div class="mt-2 flex items-center gap-2 text-[10px] text-indigo-300 font-medium">
                  <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  Emotional Trigger: ${r.emotionalDriver}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// TAB 2: AI QUERY COPILOT
// ----------------------------------------------------
function renderAiCopilotTab() {
  const queryResult = currentAiQueryResult;
  return `
    <div class="space-y-8">
      <!-- Search & Prompt Header -->
      <div class="glass-panel p-6 space-y-4">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 animate-pulse"></span>
          <h2 class="text-xl font-bold text-white font-display">AI Qualitative Query Copilot</h2>
          <span class="badge badge-indigo">Semantic Synthesis Engine</span>
        </div>
        <p class="text-xs text-slate-300">
          Ask complex strategic questions directly to the multi-source dataset. The AI models semantic themes, cross-references off-platform behavior, and isolates non-monetary conversion drivers.
        </p>

        <!-- Search Input Bar -->
        <div class="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl p-1.5 focus-within:border-indigo-500 transition">
          <input 
            type="text" 
            id="ai-custom-query-input" 
            placeholder="E.g., Why do users hesitate to purchase pants? What info do they seek on YouTube?..." 
            class="bg-transparent text-sm text-white px-3 py-2 w-full focus:outline-none placeholder:text-slate-500"
          />
          <button id="ai-run-query-btn" class="btn-glow text-xs px-5 py-2 shrink-0">
            Ask Copilot
          </button>
        </div>

        <!-- Quick Prompt Chips -->
        <div class="space-y-2 pt-2">
          <div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Suggested Discovery Questions:</div>
          <div class="flex flex-wrap gap-2">
            ${PRESET_AI_QUERIES.map(q => `
              <button class="filter-chip preset-query-chip text-xs" data-query="${q.query}">
                ⚡ ${q.label}
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- AI Synthesis Response Card -->
      <div class="glass-panel glass-panel-glow p-6 space-y-6">
        <div class="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div class="badge badge-emerald mb-2">Validated AI Insight</div>
            <h3 class="text-xl font-bold text-white font-display">${queryResult.title}</h3>
            <p class="text-xs text-indigo-300 font-medium mt-1">${queryResult.summary}</p>
          </div>
          <div class="text-right shrink-0">
            <span class="text-[10px] text-slate-400 block">Confidence Level</span>
            <span class="text-sm font-mono font-bold text-emerald-400">96.4% Match</span>
          </div>
        </div>

        <!-- Key Findings Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${queryResult.keyFindings.map((f, i) => `
            <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold font-mono">${i + 1}</span>
                <h4 class="text-xs font-bold text-white">${f.head}</h4>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">${f.body}</p>
            </div>
          `).join('')}
        </div>

        <!-- Strategic PM Recommendation -->
        <div class="p-4 rounded-xl bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 flex items-start gap-3">
          <div class="w-8 h-8 rounded-lg bg-indigo-600/30 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <div>
            <div class="text-xs font-bold text-indigo-300 uppercase tracking-wider">PM Actionable Directive</div>
            <p class="text-xs text-white mt-0.5 leading-relaxed">${queryResult.strategicRecommendation}</p>
          </div>
        </div>

        <!-- Supporting Real Customer Verbatims -->
        <div class="space-y-3 pt-2">
          <div class="text-xs font-bold text-slate-300">Supporting Customer Verbatims (From Multi-Source Corpus):</div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            ${queryResult.supportingQuotes.map(q => `
              <div class="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs space-y-2 cursor-pointer hover:border-indigo-500/50 transition feedback-card" data-id="${q.id}">
                <div class="flex items-center justify-between text-[10px] text-slate-400">
                  <span class="font-semibold text-indigo-300">${q.source}</span>
                  <span class="badge badge-pink text-[9px] py-0.5">${q.category}</span>
                </div>
                <p class="text-slate-300 italic text-[11px] line-clamp-3">"${q.quote}"</p>
                <div class="text-[10px] text-emerald-400 font-medium">✨ Unlock: ${q.nonMonetaryUnlock}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// TAB 3: MULTI-SOURCE VERBATIM FEED
// ----------------------------------------------------
function renderVerbatimFeedTab() {
  const filtered = filterFeedback(activeFilters);
  return `
    <div class="space-y-6">
      <!-- Filter Bar -->
      <div class="glass-panel p-5 space-y-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-lg font-bold text-white font-display">Multi-Source Qualitative Feed</h2>
            <p class="text-xs text-slate-400">Showing ${filtered.length} analyzed signals across Reddit, App Stores, YouTube, and Q&As</p>
          </div>
          <div class="w-full sm:w-64">
            <input 
              type="text" 
              id="feed-search-input" 
              value="${activeFilters.searchTerm}" 
              placeholder="Search keyword (e.g. linen, pants, fit)..." 
              class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <!-- Filter Chips Section -->
        <div class="flex flex-wrap gap-2 pt-2 border-t border-slate-800 text-xs">
          <span class="text-slate-400 self-center text-[11px] font-semibold">Cluster:</span>
          <button class="filter-chip ${activeFilters.cluster === 'all' ? 'active' : ''}" data-filter-type="cluster" data-filter-value="all">All</button>
          <button class="filter-chip ${activeFilters.cluster === 'Fit & Silhouette Uncertainty' ? 'active' : ''}" data-filter-type="cluster" data-filter-value="Fit & Silhouette Uncertainty">Fit/Sizing</button>
          <button class="filter-chip ${activeFilters.cluster === 'Styling & Wardrobe Coordination' ? 'active' : ''}" data-filter-type="cluster" data-filter-value="Styling & Wardrobe Coordination">Styling/Pairing</button>
          <button class="filter-chip ${activeFilters.cluster === 'Fabric & Sensory Ambiguity' ? 'active' : ''}" data-filter-type="cluster" data-filter-value="Fabric & Sensory Ambiguity">Fabric/Sensory</button>
          <button class="filter-chip ${activeFilters.cluster === 'Occasion & Event Timing' ? 'active' : ''}" data-filter-type="cluster" data-filter-value="Occasion & Event Timing">Occasion</button>
          <button class="filter-chip ${activeFilters.cluster === 'Social Proof & Second-Opinion Gap' ? 'active' : ''}" data-filter-type="cluster" data-filter-value="Social Proof & Second-Opinion Gap">Social Proof</button>
          <button class="filter-chip ${activeFilters.cluster === 'Aspirational Bookmarking' ? 'active' : ''}" data-filter-type="cluster" data-filter-value="Aspirational Bookmarking">Bookmarking</button>
        </div>

        <div class="flex flex-wrap gap-2 text-xs">
          <span class="text-slate-400 self-center text-[11px] font-semibold">Source:</span>
          <button class="filter-chip ${activeFilters.source === 'all' ? 'active' : ''}" data-filter-type="source" data-filter-value="all">All Sources</button>
          <button class="filter-chip ${activeFilters.source === 'Reddit' ? 'active' : ''}" data-filter-type="source" data-filter-value="Reddit">Reddit</button>
          <button class="filter-chip ${activeFilters.source === 'App Store' ? 'active' : ''}" data-filter-type="source" data-filter-value="App Store">App Store</button>
          <button class="filter-chip ${activeFilters.source === 'Play Store' ? 'active' : ''}" data-filter-type="source" data-filter-value="Play Store">Play Store</button>
          <button class="filter-chip ${activeFilters.source === 'YouTube' ? 'active' : ''}" data-filter-type="source" data-filter-value="YouTube">YouTube</button>
          <button class="filter-chip ${activeFilters.source === 'Instagram' ? 'active' : ''}" data-filter-type="source" data-filter-value="Instagram">Instagram/X</button>
        </div>
      </div>

      <!-- Feed Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${filtered.length > 0 ? filtered.map(item => `
          <div class="glass-panel p-5 space-y-3 flex flex-col justify-between cursor-pointer hover:border-indigo-500/60 transition feedback-card" data-id="${item.id}">
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="badge badge-indigo text-[10px]">${item.source}</span>
                <span class="text-[10px] font-mono text-slate-400">${item.daysInWishlist}d in wishlist</span>
              </div>
              <p class="text-xs text-slate-200 leading-relaxed font-normal italic">
                "${item.quote}"
              </p>
            </div>

            <div class="space-y-2 pt-2 border-t border-slate-800/80">
              <div class="flex flex-wrap items-center gap-1.5">
                <span class="badge badge-pink text-[9px]">${item.category}</span>
                <span class="badge badge-amber text-[9px]">${item.emotion}</span>
                <span class="badge badge-cyan text-[9px]">${item.userSegment}</span>
              </div>
              <div class="text-[11px] text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 rounded-lg p-2 leading-tight">
                <strong>Non-Monetary Fix:</strong> ${item.nonMonetaryUnlock}
              </div>
            </div>
          </div>
        `).join('') : `
          <div class="col-span-full text-center py-12 text-slate-400 glass-panel">
            No feedback found matching the selected filters.
          </div>
        `}
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// TAB 4: ROOT CAUSES & UNCERTAINTY TAXONOMY
// ----------------------------------------------------
function renderRootCausesTab() {
  const clusters = SYNTHESIZED_DISCOVERY_STATS.rootCauseDistribution;
  return `
    <div class="space-y-8">
      <div class="glass-panel p-6 space-y-2">
        <h2 class="text-2xl font-bold text-white font-display">Deep Root-Cause & Uncertainty Taxonomy</h2>
        <p class="text-xs text-slate-300 leading-relaxed max-w-4xl">
          By isolating conversations where price was NOT the blocker, we identified 5 structural friction vectors that cause high-intent fashion shoppers to freeze or postpone purchase.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        ${clusters.map((c, i) => `
          <div class="glass-panel p-6 space-y-4 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-sm">#${i+1}</span>
                <span class="text-lg font-mono font-extrabold text-pink-400">${c.pct}% Share</span>
              </div>
              <h3 class="text-base font-bold text-white font-display">${c.cluster}</h3>
              <p class="text-xs text-slate-300 leading-relaxed">${c.description}</p>
              
              <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                <div class="text-[10px] text-slate-400 uppercase font-semibold">User Unanswered Question:</div>
                <div class="text-amber-300 italic text-[11px]">"${c.keyQuestion}"</div>
              </div>
            </div>

            <div class="space-y-2 pt-3 border-t border-slate-800">
              <div class="text-[11px] text-slate-400">Most Vulnerable Categories:</div>
              <div class="flex flex-wrap gap-1.5">
                ${c.primaryCategories.map(cat => `<span class="badge badge-indigo text-[9px]">${cat}</span>`).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// TAB 5: USER PERSONAS & INTENT SPLIT
// ----------------------------------------------------
function renderPersonasTab() {
  const personas = SYNTHESIZED_DISCOVERY_STATS.personaArchetypes;
  return `
    <div class="space-y-8">
      <div class="glass-panel p-6 space-y-2">
        <h2 class="text-2xl font-bold text-white font-display">Behavioral User Personas & Intent Taxonomy</h2>
        <p class="text-xs text-slate-300 leading-relaxed max-w-4xl">
          Not all wishlists are created equal. E-commerce platforms treat all wishlisted items identically, failing to differentiate between high-intent hesitation and passive aesthetic mood-boarding.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        ${personas.map(p => `
          <div class="glass-panel p-6 space-y-4">
            <div class="flex items-start justify-between">
              <div>
                <span class="badge badge-indigo text-[10px] mb-1.5">${p.share} of Userbase</span>
                <h3 class="text-lg font-bold text-white font-display">${p.name}</h3>
              </div>
              <div class="text-right">
                <span class="text-[10px] text-slate-400 block">Avg Shelf-Life</span>
                <span class="text-xs font-mono font-bold text-amber-400">${p.shelfLife}</span>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs italic text-slate-200">
              "${p.archetypeQuote}"
            </div>

            <div class="space-y-2 text-xs">
              <div class="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span class="text-slate-400">Intent vs Bookmarking:</span>
                <span class="font-semibold text-emerald-400">${p.intentVsBookmarking}</span>
              </div>
              <div class="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span class="text-slate-400">Primary Blocker:</span>
                <span class="font-medium text-slate-200 text-right max-w-xs">${p.coreBlocker}</span>
              </div>
              <div class="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span class="text-slate-400">Off-Platform Behavior:</span>
                <span class="font-medium text-indigo-300 text-right max-w-xs">${p.offPlatformHabit}</span>
              </div>
            </div>

            <div class="bg-indigo-950/40 border border-indigo-800/50 rounded-xl p-3 text-xs text-indigo-200">
              <strong>Non-Monetary Growth Lever:</strong> ${p.nonMonetaryRemedy}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// TAB 6: OFF-PLATFORM LEAKAGE MAP
// ----------------------------------------------------
function renderOffPlatformTab() {
  const journeys = SYNTHESIZED_DISCOVERY_STATS.offPlatformLeakageJourneys;
  return `
    <div class="space-y-8">
      <div class="glass-panel p-6 space-y-2">
        <div class="badge badge-amber mb-1">64.2% Funnel Drop-off Trigger</div>
        <h2 class="text-2xl font-bold text-white font-display">Off-Platform Validation & Leakage Ecosystem</h2>
        <p class="text-xs text-slate-300 leading-relaxed max-w-4xl">
          Users leave Myntra before completing a purchase not because they don't want the item, but because they are forced to find missing product truths (drape, size accuracy, friend approval, styling recipes) on third-party channels.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${journeys.map(j => `
          <div class="glass-panel p-6 space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-bold text-white font-display">${j.channel}</h3>
              <span class="badge badge-amber text-[10px]">${j.frequency}</span>
            </div>

            <div class="space-y-2 text-xs">
              <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-indigo-300">
                🔍 "${j.searchQueryPattern}"
              </div>

              <div class="space-y-1 pt-1">
                <span class="text-slate-400 font-semibold text-[11px]">Information Sought:</span>
                <p class="text-slate-200 text-xs">${j.informationSought}</p>
              </div>

              <div class="space-y-1 pt-1">
                <span class="text-pink-400 font-semibold text-[11px]">Risk to Conversion:</span>
                <p class="text-slate-300 text-xs">${j.riskToConversion}</p>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-300">
              <strong>Native Capture Opportunity:</strong> ${j.opportunity}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// TAB 7: OPPORTUNITY MATRIX & ICE RANKING
// ----------------------------------------------------
function renderOpportunityMatrixTab() {
  return `
    <div class="space-y-8">
      <div class="glass-panel p-6 space-y-2">
        <div class="badge badge-emerald mb-1">Strict Zero-Monetary Filter</div>
        <h2 class="text-2xl font-bold text-white font-display">Non-Monetary Opportunity Matrix & ICE Prioritization</h2>
        <p class="text-xs text-slate-300 leading-relaxed max-w-4xl">
          Ranked by ICE Score (Impact on 30-Day Conversion, Confidence from Qualitative/Quantitative Evidence, Ease of Engineering Implementation).
        </p>
      </div>

      <div class="space-y-4">
        ${OPPORTUNITY_PRIORITIZATION_MATRIX.map(opp => `
          <div class="glass-panel p-6 space-y-4 border-l-4 border-l-indigo-500">
            <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="badge badge-indigo">${opp.id}</span>
                  <span class="badge badge-pink">${opp.category}</span>
                  <span class="badge badge-emerald">${opp.status}</span>
                </div>
                <h3 class="text-xl font-bold text-white font-display">${opp.name}</h3>
              </div>

              <!-- ICE Score Metric Badge -->
              <div class="flex items-center gap-4 bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-xl shrink-0">
                <div class="text-center">
                  <span class="text-[10px] text-slate-400 block">Impact</span>
                  <span class="font-mono font-bold text-sm text-indigo-400">${opp.conversionImpactScore}</span>
                </div>
                <div class="text-center border-x border-slate-800 px-3">
                  <span class="text-[10px] text-slate-400 block">Confidence</span>
                  <span class="font-mono font-bold text-sm text-purple-400">${opp.confidenceScore}</span>
                </div>
                <div class="text-center border-r border-slate-800 pr-3">
                  <span class="text-[10px] text-slate-400 block">Ease</span>
                  <span class="font-mono font-bold text-sm text-emerald-400">${opp.easeOfImplementation}</span>
                </div>
                <div class="text-center pl-1">
                  <span class="text-[10px] text-slate-400 block">ICE Score</span>
                  <span class="font-mono font-extrabold text-base text-pink-400">${opp.iceScore}</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div class="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                <span class="text-slate-400 font-semibold uppercase text-[10px]">User Problem Solved:</span>
                <p class="text-slate-200 leading-relaxed">${opp.problemAddressed}</p>
              </div>

              <div class="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-800/40 space-y-1">
                <span class="text-indigo-300 font-semibold uppercase text-[10px]">Non-Monetary Mechanism:</span>
                <p class="text-indigo-100 leading-relaxed">${opp.nonMonetaryMechanism}</p>
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80 text-xs">
              <div class="text-slate-400">
                Target Volume: <strong class="text-white font-mono">${opp.addressableWishlistVolume}</strong>
              </div>
              <div class="text-emerald-400 font-semibold">
                Projected Impact: ${opp.projected30DayConvLift}
              </div>
              <div class="text-slate-400 text-[11px]">
                Complexity: ${opp.implementationComplexity}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// MODAL FOR DETAILED FEEDBACK VIEW
// ----------------------------------------------------
function renderFeedbackModal(item) {
  return `
    <div class="modal-overlay" id="modal-backdrop">
      <div class="modal-content p-6 space-y-5" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="badge badge-indigo">${item.id}</span>
            <span class="badge badge-pink">${item.source}</span>
          </div>
          <button id="close-modal-btn" class="text-slate-400 hover:text-white text-lg font-bold p-1">✕</button>
        </div>

        <div class="space-y-2">
          <span class="text-[10px] text-slate-400 uppercase font-semibold">Raw User Verbatim</span>
          <p class="text-sm text-slate-100 leading-relaxed italic bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            "${item.quote}"
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span class="text-slate-400 text-[10px] block">Cluster</span>
            <span class="text-white font-semibold">${item.rootCauseCluster}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span class="text-slate-400 text-[10px] block">Persona Archetype</span>
            <span class="text-indigo-300 font-semibold">${item.userSegment}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span class="text-slate-400 text-[10px] block">Intent Level</span>
            <span class="text-emerald-400 font-semibold">${item.intentLevel}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span class="text-slate-400 text-[10px] block">Dominant Emotion</span>
            <span class="text-amber-400 font-semibold">${item.emotion}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span class="text-slate-400 text-[10px] block">Off-Platform Action</span>
            <span class="text-pink-400 font-semibold">${item.offPlatformAction}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span class="text-slate-400 text-[10px] block">Wishlist Shelf-Life</span>
            <span class="text-white font-mono font-semibold">${item.daysInWishlist} days</span>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-700/50 space-y-1">
          <span class="text-emerald-300 font-semibold text-xs uppercase tracking-wider">Targeted Non-Monetary Conversion Unlock:</span>
          <p class="text-xs text-white leading-relaxed">${item.nonMonetaryUnlock}</p>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// EVENT LISTENERS & INTERACTION ATTACHMENT
// ----------------------------------------------------
function attachEventListeners() {
  // Navigation Tabs
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      activeTab = e.currentTarget.dataset.tab;
      renderApp();
    });
  });

  // Antigravity Chat Starter & Follow-up Chips
  document.querySelectorAll('.chat-starter-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const query = e.currentTarget.dataset.query;
      processAntigravityChatQuery(query);
    });
  });

  // Move to Bag Buttons in Chat
  document.querySelectorAll('.move-to-bag-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const prod = e.currentTarget.dataset.product;
      processAntigravityChatQuery(`Move ${prod} to Bag`);
    });
  });

  // Chat Input Box & Send Button
  const chatInput = document.getElementById('antigravity-chat-input');
  const chatSendBtn = document.getElementById('antigravity-send-btn');
  if (chatInput && chatSendBtn) {
    const sendQuery = () => {
      const text = chatInput.value.trim();
      if (text) {
        processAntigravityChatQuery(text);
      }
    };
    chatSendBtn.addEventListener('click', sendQuery);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendQuery();
    });
  }

  // Reset Chat Button
  const resetBtn = document.getElementById('reset-chat-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      chatHistory = [
        {
          sender: "bot",
          text: "Welcome back! I analyzed the items in your wishlist. Here is what we can figure out today:",
          starterChips: [
            "Will the Levi's Cotton Formal Shirt fit me in size M?",
            "Compare my saved Green Casual Shirt vs Levi's Shirt.",
            "Is the Fbella Satin Nightdress sheer or good quality?"
          ],
          productCard: null,
          followUpChips: []
        }
      ];
      renderApp();
    });
  }

  // Filter Chips in Feed Tab
  document.querySelectorAll('.filter-chip[data-filter-type]').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const type = e.currentTarget.dataset.filterType;
      const val = e.currentTarget.dataset.filterValue;
      activeFilters[type] = val;
      renderApp();
    });
  });

  // Feed Search Input
  const feedSearch = document.getElementById('feed-search-input');
  if (feedSearch) {
    feedSearch.addEventListener('input', (e) => {
      activeFilters.searchTerm = e.target.value;
      renderApp();
    });
  }

  // Preset Query Chips in AI Copilot
  document.querySelectorAll('.preset-query-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const query = e.currentTarget.dataset.query;
      currentAiQueryResult = runAiQuery(query);
      renderApp();
    });
  });

  // Custom AI Query Run Button
  const runAiBtn = document.getElementById('ai-run-query-btn');
  const aiInput = document.getElementById('ai-custom-query-input');
  if (runAiBtn && aiInput) {
    const executeQuery = () => {
      const q = aiInput.value.trim();
      if (q) {
        currentAiQueryResult = runAiQuery(q);
        renderApp();
      }
    };
    runAiBtn.addEventListener('click', executeQuery);
    aiInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') executeQuery();
    });
  }

  // Feedback Card Click Modal
  document.querySelectorAll('.feedback-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      selectedFeedbackItem = RAW_FEEDBACK_DATASET.find(f => f.id === id) || null;
      renderApp();
    });
  });

  // Close Modal Listeners
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      selectedFeedbackItem = null;
      renderApp();
    });
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', () => {
      selectedFeedbackItem = null;
      renderApp();
    });
  }

  // Export Report Button
  const exportBtn = document.getElementById('export-report-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

// Initial Render
renderApp();
