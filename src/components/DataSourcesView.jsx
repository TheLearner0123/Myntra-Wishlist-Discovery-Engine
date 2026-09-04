import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  Smartphone, 
  MessageCircle, 
  Twitter, 
  Video, 
  Tag, 
  Check, 
  ExternalLink,
  Zap,
  Star,
  Quote,
  TrendingDown,
  Info,
  ShieldCheck,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { DATA_STREAMS } from '../data/mockData';
import { RAW_DATABASE, DATABASE_METRICS } from '../data/customerReviewsDatabase';

export default function DataSourcesView({ activeStreamIds, toggleStream, onAskAi }) {
  const [selectedRatingFilter, setSelectedRatingFilter] = useState("All");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");

  const streamIconMap = {
    "Smartphone": Smartphone,
    "MessageCircle": MessageCircle,
    "Twitter": Twitter,
    "Video": Video
  };

  const categories = [
    "All",
    "Fit & Exchange Barrier",
    "Fabric & Brand Legitimacy",
    "Return & Tag Logistics Dread",
    "AI / Support Experience",
    "Gold Standard (Fit, Fabric, Durability)"
  ];

  const filteredReviews = RAW_DATABASE.filter(rev => {
    const matchesRating = selectedRatingFilter === "All" || 
      (selectedRatingFilter === "1-2 Stars (Friction)" && rev.rating <= 2) ||
      (selectedRatingFilter === "5 Stars (Delight)" && rev.rating === 5) ||
      (selectedRatingFilter === "3-4 Stars" && (rev.rating === 3 || rev.rating === 4));
    
    const matchesCategory = selectedCategoryFilter === "All" || rev.category?.includes(selectedCategoryFilter) || selectedCategoryFilter === rev.category;
    
    const q = searchKeyword.toLowerCase();
    const matchesSearch = q === "" || 
      rev.text.toLowerCase().includes(q) ||
      rev.author.toLowerCase().includes(q) ||
      (rev.category && rev.category.toLowerCase().includes(q)) ||
      (rev.nonMonetaryOpportunity && rev.nonMonetaryOpportunity.toLowerCase().includes(q));

    return matchesRating && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#eaeaec]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-[#282c3f] font-['Outfit']">
              Verified Customer Reviews Database (120 Records)
            </h1>
            <span className="badge badge-magenta text-[11px] font-bold">
              Single Source of Truth
            </span>
          </div>
          <p className="text-sm text-[#535766] mt-0.5">
            Ingested Google Play Store reviews for Myntra App. Complete verbatim with author metadata, timestamps, star ratings, and non-monetary unlock analysis.
          </p>
        </div>
      </div>

      {/* Stream Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DATA_STREAMS.map((stream) => {
          const Icon = streamIconMap[stream.icon] || Smartphone;
          const isActive = activeStreamIds.includes(stream.id);
          return (
            <div 
              key={stream.id}
              className={`myntra-card p-4 flex flex-col justify-between transition-all ${
                isActive ? 'border-[#ff3f6c]/40 ring-1 ring-[#ff3f6c]/20' : 'opacity-60 bg-[#fbfbfb]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#f5f6f8] text-[#282c3f]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleStream(stream.id)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                      isActive ? 'bg-[#ff3f6c] text-white' : 'bg-[#eaeaec] text-[#535766]'
                    }`}
                  >
                    {isActive ? 'Active Stream' : 'Disabled'}
                  </button>
                </div>
                <h3 className="text-sm font-extrabold text-[#282c3f] mt-3 font-['Outfit']">
                  {stream.name}
                </h3>
                <p className="text-[11px] text-[#535766] mt-1 line-clamp-2">
                  {stream.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#f0f0f2] flex items-center justify-between text-xs">
                <span className="font-bold text-[#282c3f]">{stream.count}</span>
                <span className="text-[11px] font-semibold text-[#b45309]">{stream.sentiment}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Database Metrics Summary Banner */}
      <div className="bg-white p-4 rounded-xl border border-[#eaeaec] shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#282c3f]">Database Summary:</span>
          <span className="badge badge-neutral font-bold">{DATABASE_METRICS.totalAnalyzedReviews} Total Reviews</span>
          <span className="badge badge-success font-bold">{DATABASE_METRICS.positiveSentimentCount} Positive (★4-5)</span>
          <span className="badge badge-magenta font-bold">{DATABASE_METRICS.negativeFrictionCount} Friction Points (★1-2)</span>
        </div>
        <div className="text-[11px] text-[#535766]">
          Average Rating: <strong className="text-[#282c3f] font-black">{DATABASE_METRICS.averageRating} / 5.0</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#eaeaec] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Rating Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#282c3f] mr-1">Sentiment:</span>
          {["All", "1-2 Stars (Friction)", "5 Stars (Delight)", "3-4 Stars"].map((rf) => (
            <button
              key={rf}
              type="button"
              onClick={() => setSelectedRatingFilter(rf)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                selectedRatingFilter === rf
                  ? 'bg-[#ff3f6c] text-white shadow-xs'
                  : 'bg-[#f5f6f8] text-[#535766] hover:bg-[#eaeaec]'
              }`}
            >
              {rf}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <Search className="w-3.5 h-3.5 text-[#94969f] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Search database (e.g. Manisha, AI slop, exchange, tag, Dr. Sood)..."
            className="w-full text-xs py-2 pl-9 pr-3 rounded-lg border border-[#eaeaec] bg-[#f9f9fa] text-[#282c3f] placeholder-[#94969f] focus:outline-none focus:border-[#ff3f6c] focus:bg-white"
          />
        </div>
      </div>

      {/* Customer Verbatim Feed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-[#282c3f] font-['Outfit']">
            Review Verbatim Feed ({filteredReviews.length} Records Shown)
          </h2>
          <span className="text-xs text-[#94969f]">
            Anchored 100% in user database
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReviews.map((rev) => {
            const isNegative = rev.rating <= 2;
            const isNeutral = rev.rating === 3 || rev.rating === 4;

            return (
              <div key={rev.review_id} className="myntra-card p-5 space-y-3.5 bg-white flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#282c3f]">{rev.author}</span>
                        <div className="flex items-center gap-0.5 text-[#ff3f6c]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#94969f] font-mono mt-0.5">
                        ID: {rev.review_id.substring(0, 13)}... • App v{rev.app_version || "4.26"}
                      </div>
                    </div>
                    <span className={`badge ${
                      isNegative ? 'badge-magenta' : isNeutral ? 'badge-warning' : 'badge-success'
                    } text-[10px]`}>
                      {rev.sentiment || `${rev.rating} Stars`}
                    </span>
                  </div>

                  <div className="p-3 bg-[#fbfbfb] rounded-lg border border-[#f0f0f2] text-xs text-[#535766] leading-relaxed">
                    <Quote className="w-3.5 h-3.5 text-[#ff3f6c] inline-block mr-1 opacity-70" />
                    "{rev.text}"
                  </div>

                  {rev.reply_text && (
                    <div className="p-2.5 bg-[#f0f4f8] rounded-md border border-[#e2e8f0] text-[11px] text-[#475569]">
                      <strong className="text-[#0284c7]">Myntra Support Reply: </strong>
                      <span className="italic">{rev.reply_text.substring(0, 130)}...</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-2 border-t border-[#f0f0f2]">
                  {rev.category && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#94969f] font-medium">Category:</span>
                      <span className="font-bold text-[#282c3f]">{rev.category}</span>
                    </div>
                  )}

                  {rev.nonMonetaryOpportunity && (
                    <div className="p-2 bg-[#e6f7f3]/70 rounded-md border border-[#03a685]/20 text-[11px] text-[#282c3f] flex items-start gap-2">
                      <Zap className="w-3.5 h-3.5 text-[#03a685] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#03a685]">Non-Monetary Unlock: </span>
                        <span>{rev.nonMonetaryOpportunity}</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-1 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => onAskAi(`Analyze ${rev.author}'s review about "${rev.text}" and propose a non-monetary growth intervention.`)}
                      className="text-xs font-bold text-[#ff3f6c] hover:underline flex items-center gap-1"
                    >
                      <span>Analyze with AI</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
