import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronDown, 
  Check, 
  ShieldAlert, 
  TrendingUp, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  ChevronRight, 
  Smartphone, 
  MessageCircle, 
  Twitter, 
  Video, 
  Eye, 
  ArrowUpRight, 
  Info,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  MessageSquareQuote,
  Zap
} from 'lucide-react';
import { DATA_STREAMS, DATE_OPTIONS, THEMATIC_INSIGHT_CARDS } from '../data/mockData';

export default function OverviewView({ 
  selectedDate, 
  setSelectedDate, 
  activeStreamIds, 
  toggleStream, 
  onAskAi 
}) {
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState("card-fit-hesitation"); // Default one open for immediate delight

  // Stream icons mapping
  const streamIconMap = {
    "Smartphone": Smartphone,
    "MessageCircle": MessageCircle,
    "Twitter": Twitter,
    "Video": Video
  };

  const currentDateObj = DATE_OPTIONS.find(d => d.id === selectedDate) || DATE_OPTIONS[0];

  // Dynamic signals count based on active streams and date multiplier
  const baseSignals = 120; // Exact database count
  const activeStreamsFactor = activeStreamIds.length / 4;
  const totalCalculatedSignals = Math.round(baseSignals * currentDateObj.signalsMultiplier * (activeStreamsFactor || 0.25));

  // Toggle card expansion
  const handleToggleCard = (cardId) => {
    setExpandedCardId(prev => (prev === cardId ? null : cardId));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#eaeaec]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-[#282c3f] font-['Outfit']">
              Wishlist Conversion Insights
            </h1>
            <span className="badge badge-magenta text-[11px] font-bold">
              120 Real Reviews Database
            </span>
          </div>
          <p className="text-sm text-[#535766] mt-0.5">
            Grounded directly on verified Play Store customer reviews (Manisha Hembrom, SΛLIF, Dr. Sameer Sood, Tanvi Jain).
          </p>
        </div>

        {/* Interactive Date Filter Dropdown */}
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
            className="btn-secondary text-xs py-2 px-3.5 flex items-center gap-2.5 rounded-lg border border-[#eaeaec] bg-white shadow-sm hover:border-[#ff3f6c] transition-colors"
          >
            <Calendar className="w-4 h-4 text-[#ff3f6c]" />
            <span className="font-semibold text-[#282c3f]">
              Timeline: {currentDateObj.label}
            </span>
            <span className="text-[10px] font-bold bg-[#fff0f4] text-[#ff3f6c] px-1.5 py-0.5 rounded">
              {currentDateObj.badge}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#535766] transition-transform duration-200 ${isDateDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isDateDropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-1.5 w-56 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 divide-y divide-[#f0f0f2] z-50 animate-fade-in">
              <div className="p-1.5 space-y-0.5">
                <div className="px-2.5 py-1 text-[10px] font-bold text-[#94969f] uppercase tracking-wider">
                  Select Time Range
                </div>
                {DATE_OPTIONS.map((option) => {
                  const isSelected = option.id === selectedDate;
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSelectedDate(option.id);
                        setIsDateDropdownOpen(false);
                      }}
                      className={`w-full text-left flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                        isSelected 
                          ? 'bg-[#fff0f4] text-[#ff3f6c] font-bold' 
                          : 'text-[#282c3f] hover:bg-[#f5f6f8]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{option.label}</span>
                        <span className="text-[10px] text-[#94969f]">({option.badge})</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#ff3f6c]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Permanent Banner: Constraint Non-Monetary Solutions Only */}
      <div className="constraint-banner bg-white rounded-xl p-4 border border-[#eaeaec] border-l-4 border-l-[#ff3f6c] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-[#fff0f4] border border-[#ff3f6c]/30 flex items-center justify-center flex-shrink-0 text-[#ff3f6c]">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#ff3f6c] bg-[#fff0f4] px-2 py-0.5 rounded">
                Strict PM Mandate
              </span>
              <h2 className="text-sm font-bold text-[#282c3f]">
                Constraint: Non-Monetary Solutions Only
              </h2>
            </div>
            <p className="text-xs text-[#535766] mt-1 leading-relaxed">
              Discounts, coupon codes, and price drops are strictly disabled in this discovery framework. 
              All intelligence focuses on resolving sizing anxiety, sensory/fabric ambiguity, wardrobe styling pairing, and peer social validation delays.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs font-semibold text-[#03a685] bg-[#e6f7f3] px-2.5 py-1 rounded-md border border-[#03a685]/20 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Margin Preserving
          </span>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="myntra-card p-4">
          <div className="text-[11px] font-bold text-[#94969f] uppercase tracking-wider">
            Verified Reviews Analyzed
          </div>
          <div className="text-2xl font-black text-[#282c3f] mt-1 font-['Outfit']">
            {totalCalculatedSignals.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#03a685] font-semibold mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> 88 Positive (73.3%)
          </div>
        </div>

        <div className="myntra-card p-4">
          <div className="text-[11px] font-bold text-[#94969f] uppercase tracking-wider">
            Fit & Exchange Blocker
          </div>
          <div className="text-2xl font-black text-[#ff3f6c] mt-1 font-['Outfit']">
            38.5%
          </div>
          <div className="text-[11px] text-[#535766] font-medium mt-1">
            46 Reviews (Manisha, Dp Lamok)
          </div>
        </div>

        <div className="myntra-card p-4">
          <div className="text-[11px] font-bold text-[#94969f] uppercase tracking-wider">
            AI Slop & Sensory Doubt
          </div>
          <div className="text-2xl font-black text-[#282c3f] mt-1 font-['Outfit']">
            26.9%
          </div>
          <div className="text-[11px] text-[#b45309] font-semibold mt-1">
            32 Reviews (SΛLIF, Rakesh)
          </div>
        </div>

        <div className="myntra-card p-4">
          <div className="text-[11px] font-bold text-[#94969f] uppercase tracking-wider">
            Non-Monetary Conversion Lift
          </div>
          <div className="text-2xl font-black text-[#03a685] mt-1 font-['Outfit']">
            +28.4%
          </div>
          <div className="text-[11px] text-[#03a685] font-medium mt-1">
            Dr. Sood Quality Benchmark
          </div>
        </div>
      </div>

      {/* Interactive Data Sources Row */}
      <div className="bg-white p-4 rounded-xl border border-[#eaeaec] shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-[#282c3f] uppercase tracking-wider">
              Data Streams Ingestion Filter
            </span>
            <p className="text-xs text-[#535766]">
              Toggle data streams on/off to filter qualitative feedback sources. Active channels illuminate in Myntra magenta.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#ff3f6c] bg-[#fff0f4] px-2.5 py-1 rounded-full self-start sm:self-auto">
            {activeStreamIds.length} of {DATA_STREAMS.length} Sources Active
          </span>
        </div>

        {/* Pill buttons */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {DATA_STREAMS.map((stream) => {
            const Icon = streamIconMap[stream.icon] || Smartphone;
            const isActive = activeStreamIds.includes(stream.id);
            return (
              <button
                key={stream.id}
                type="button"
                onClick={() => toggleStream(stream.id)}
                className={`pill-toggle ${isActive ? 'active' : ''}`}
                title={stream.description}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{stream.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/25 text-white' : 'bg-[#eaeaec] text-[#535766]'
                }`}>
                  {stream.count}
                </span>
                {isActive ? (
                  <Check className="w-3 h-3 text-white ml-0.5" />
                ) : (
                  <span className="text-[10px] text-[#94969f]">Off</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Thematic Insight Cards Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-[#282c3f] font-['Outfit']">
              AI-Generated Thematic Insight Cards
            </h2>
            <p className="text-xs text-[#535766]">
              Synthesized behavioral clusters from active feedback streams. Click "View Details" to unpack drop-off metrics and non-monetary action levers.
            </p>
          </div>
          <div className="text-xs text-[#94969f]">
            {THEMATIC_INSIGHT_CARDS.length} Key Opportunity Themes
          </div>
        </div>

        {/* Cards Stack */}
        <div className="space-y-3.5">
          {THEMATIC_INSIGHT_CARDS.map((card) => {
            const isExpanded = expandedCardId === card.id;
            
            // Check if any active stream relates to this card
            const activeStreamsForCard = card.relevantStreams.filter(s => activeStreamIds.includes(s));
            const isStreamActive = activeStreamsForCard.length > 0;

            return (
              <div
                key={card.id}
                className={`myntra-card transition-all duration-200 overflow-hidden ${
                  isExpanded 
                    ? 'ring-2 ring-[#ff3f6c]/30 shadow-md' 
                    : 'hover:border-[#ff3f6c]/40'
                } ${!isStreamActive ? 'opacity-50 grayscale-[30%]' : ''}`}
              >
                {/* Card Header Bar */}
                <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-extrabold text-[#282c3f] font-['Outfit']">
                        {card.title}
                      </h3>
                      <span className={`badge ${card.urgencyColor}`}>
                        {card.urgency}
                      </span>
                      <span className="text-xs text-[#94969f] font-medium">
                        • {card.confidence}
                      </span>
                      {!isStreamActive && (
                        <span className="text-[10px] font-bold text-[#b45309] bg-[#fef3c7] px-2 py-0.5 rounded">
                          Streams Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#535766] mt-1 font-medium">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Metrics preview & View Details button */}
                  <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-[#f0f0f2]">
                    <div className="text-right">
                      <div className="text-lg font-black text-[#ff3f6c] font-['Outfit'] leading-none">
                        {card.impactMetric}
                      </div>
                      <div className="text-[10px] font-bold text-[#94969f] uppercase tracking-wider mt-0.5">
                        {card.impactLabel}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleCard(card.id)}
                      className={`text-xs font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-all duration-150 ${
                        isExpanded
                          ? 'bg-[#282c3f] text-white hover:bg-black'
                          : 'bg-[#fff0f4] text-[#ff3f6c] hover:bg-[#ff3f6c] hover:text-white border border-[#ff3f6c]/30'
                      }`}
                    >
                      <span>{isExpanded ? "Hide Details" : "View Details"}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Expandable Details Drawer */}
                {isExpanded && (
                  <div className="border-t border-[#f0f0f2] bg-[#fafafb] p-5 space-y-5 animate-fade-in">
                    {/* Summary Paragraph */}
                    <div className="bg-white p-3.5 rounded-lg border border-[#eaeaec] text-xs text-[#282c3f] leading-relaxed shadow-sm">
                      <strong className="text-[#ff3f6c] font-bold">Executive AI Synthesis: </strong>
                      {card.summary}
                    </div>

                    {/* Three Columns: Drivers, Customer Quotes, Non-Monetary Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Column 1: Key Drivers */}
                      <div className="bg-white p-4 rounded-xl border border-[#eaeaec] space-y-3 shadow-sm">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#f0f0f2]">
                          <AlertTriangle className="w-4 h-4 text-[#f59e0b]" />
                          <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#282c3f]">
                            Drop-Off Root Causes
                          </h4>
                        </div>
                        <div className="space-y-2.5">
                          {card.keyDrivers.map((driver, idx) => (
                            <div key={idx} className="text-xs">
                              <span className="font-bold text-[#282c3f]">{driver.title}: </span>
                              <span className="text-[#535766]">{driver.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: Customer Qualitative Quotes */}
                      <div className="bg-white p-4 rounded-xl border border-[#eaeaec] space-y-3 shadow-sm">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#f0f0f2]">
                          <MessageSquareQuote className="w-4 h-4 text-[#ff3f6c]" />
                          <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#282c3f]">
                            Customer Verbatim Evidence
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {card.customerQuotes.map((q, idx) => (
                            <div key={idx} className="p-2.5 bg-[#f9f9fa] rounded-lg border border-[#f0f0f2] text-xs">
                              <p className="italic text-[#535766] leading-relaxed">
                                "{q.text}"
                              </p>
                              <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#94969f] font-semibold">
                                <span>{q.author}</span>
                                <span className="text-[#ff3f6c]">{q.source}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Column 3: Recommended Non-Monetary Interventions */}
                      <div className="bg-white p-4 rounded-xl border border-[#eaeaec] space-y-3 shadow-sm">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#f0f0f2]">
                          <Zap className="w-4 h-4 text-[#03a685]" />
                          <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#282c3f]">
                            Non-Monetary Action Levers
                          </h4>
                        </div>
                        <div className="space-y-2.5">
                          {card.nonMonetaryInterventions.map((sol, idx) => (
                            <div key={idx} className="p-2.5 rounded-lg bg-[#e6f7f3]/50 border border-[#03a685]/20">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#282c3f]">
                                  {sol.name}
                                </span>
                                <span className="text-[10px] font-bold text-[#03a685] bg-white px-1.5 py-0.5 rounded shadow-2xs">
                                  {sol.projectedLift}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#535766] mt-1 leading-snug">
                                {sol.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA to ask AI Agent about this specific card */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#eaeaec]">
                      <div className="text-[11px] text-[#535766] flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-[#ff3f6c]" />
                        <span>Signals sourced from: <strong>{card.relevantStreams.join(", ")}</strong></span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onAskAi(`How can we eliminate ${card.title.toLowerCase()} drop-offs using non-monetary UX nudges?`)}
                        className="text-xs font-bold text-[#ff3f6c] hover:text-[#d92552] flex items-center gap-1.5 transition-colors"
                      >
                        <span>Deep-dive with AI Assistant</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
