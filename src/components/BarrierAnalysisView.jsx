import React, { useState } from 'react';
import { 
  ShieldAlert, 
  TrendingDown, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  BarChart3,
  Sliders,
  Sparkles,
  Layers,
  ChevronDown
} from 'lucide-react';
import { BARRIER_ANALYSIS_DATA } from '../data/mockData';

export default function BarrierAnalysisView({ onAskAi }) {
  const [selectedBarrier, setSelectedBarrier] = useState(BARRIER_ANALYSIS_DATA[0]);

  const funnelSteps = [
    { step: "1. Verified Experiences", pct: "100%", count: "120 Reviews", sub: "Play Store Customer Dataset" },
    { step: "2. Positive Quality Experience", pct: "73.3%", count: "88 Reviews", sub: "True-to-size & fabric delight" },
    { step: "3. Negative Friction Points", pct: "21.7%", count: "26 Reviews", sub: "Fit, AI slop & return issues", isDrop: true },
    { step: "4. Sizing / Tag Dread", pct: "38.5%", count: "46 Signals", sub: "Cancelled pickups & exchanges", isDrop: true },
    { step: "5. Non-Monetary Conversion Lift", pct: "+28.4%", count: "Dr. Sood Formula", sub: "Zero discount recovery", isFinal: true }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#eaeaec]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-[#282c3f] font-['Outfit']">
              Barrier Analysis & Funnel Diagnostics
            </h1>
            <span className="badge badge-warning text-[11px] font-bold">
              Root Causes
            </span>
          </div>
          <p className="text-sm text-[#535766] mt-0.5">
            Pinpointing exact psychological and logistical friction points causing checkout postponement.
          </p>
        </div>
      </div>

      {/* Funnel Flow Visualization */}
      <div className="bg-white p-5 rounded-xl border border-[#eaeaec] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-extrabold text-[#282c3f] uppercase tracking-wider font-['Outfit']">
              Wishlist-to-Checkout Funnel Leakage Map
            </h2>
            <p className="text-xs text-[#535766]">
              Tracing drop-offs driven by qualitative doubts rather than item price
            </p>
          </div>
          <span className="text-xs font-bold text-[#ff3f6c] bg-[#fff0f4] px-2 py-1 rounded">
            -85.2% Overall Drop-off
          </span>
        </div>

        {/* Steps Horizontal Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-2">
          {funnelSteps.map((f, idx) => (
            <div 
              key={idx} 
              className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                f.isDrop 
                  ? 'bg-[#fef2f2] border-[#fecaca]' 
                  : f.isFinal 
                    ? 'bg-[#e6f7f3] border-[#a7f3d0]' 
                    : 'bg-[#f5f6f8] border-[#eaeaec]'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold text-[#94969f] uppercase">
                  Step 0{idx + 1}
                </span>
                <div className="text-xs font-bold text-[#282c3f] mt-0.5">
                  {f.step}
                </div>
                <div className="text-lg font-black mt-1 font-['Outfit'] text-[#282c3f]">
                  {f.pct}
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-black/5 text-[10px] text-[#535766]">
                <div>{f.count} signals</div>
                <div className="text-[#94969f] truncate">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ICE Prioritized Opportunity Roadmap */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-[#282c3f] font-['Outfit']">
              ICE Prioritization: Non-Monetary Barrier Interventions
            </h2>
            <p className="text-xs text-[#535766]">
              Ranked by Impact, Confidence, and Ease of implementation for zero-discount growth.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#eaeaec] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#fafafb] border-b border-[#eaeaec] text-[#94969f] font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Priority / Barrier</th>
                  <th className="py-3 px-3">Funnel Drop-off</th>
                  <th className="py-3 px-3">Impact</th>
                  <th className="py-3 px-3">Ease</th>
                  <th className="py-3 px-4">Recommended Non-Monetary Fix</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f2]">
                {BARRIER_ANALYSIS_DATA.map((item, idx) => {
                  const isSelected = selectedBarrier.barrier === item.barrier;
                  return (
                    <tr 
                      key={idx}
                      onClick={() => setSelectedBarrier(item)}
                      className={`hover:bg-[#f9f9fa] cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#fff0f4]/50 font-medium' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-[#ff3f6c] bg-[#fff0f4] px-1.5 py-0.5 rounded">
                            {item.iceRank}
                          </span>
                          <span className="font-bold text-[#282c3f]">{item.barrier}</span>
                        </div>
                        <div className="text-[10px] text-[#94969f] mt-0.5">
                          {item.categoryImpact}
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="font-black text-[#b45309] font-['Outfit']">
                          {item.dropOffPct}
                        </span>
                        <div className="text-[10px] text-[#94969f]">
                          {item.signalsVolume.toLocaleString()} signals
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="font-bold text-[#282c3f]">{item.impactScore}/10</span>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="font-bold text-[#282c3f]">{item.easeScore}/10</span>
                      </td>

                      <td className="py-3.5 px-4 text-[#535766]">
                        <div className="font-semibold text-[#282c3f]">
                          {item.recommendedFix}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAskAi(`Propose an A/B experiment spec for: "${item.barrier}" targeting ${item.categoryImpact}`);
                          }}
                          className="text-xs font-bold text-[#ff3f6c] hover:underline flex items-center gap-1 ml-auto"
                        >
                          <span>Spec Test</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Selected Barrier Deep Dive Card */}
      {selectedBarrier && (
        <div className="myntra-card p-5 bg-white space-y-4 border-l-4 border-l-[#ff3f6c]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#ff3f6c] bg-[#fff0f4] px-2 py-0.5 rounded">
                Selected Focus Barrier
              </span>
              <h3 className="text-base font-extrabold text-[#282c3f] mt-1 font-['Outfit']">
                {selectedBarrier.barrier}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="badge badge-magenta">
                Drop-off Impact: {selectedBarrier.dropOffPct}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-[#fafafb] rounded-lg border border-[#f0f0f2]">
              <span className="text-[10px] font-bold text-[#94969f] uppercase">Affected Categories</span>
              <div className="font-bold text-[#282c3f] mt-1">{selectedBarrier.categoryImpact}</div>
            </div>

            <div className="p-3 bg-[#fafafb] rounded-lg border border-[#f0f0f2]">
              <span className="text-[10px] font-bold text-[#94969f] uppercase">Funnel Location</span>
              <div className="font-bold text-[#282c3f] mt-1">{selectedBarrier.funnelStep}</div>
            </div>

            <div className="p-3 bg-[#e6f7f3] rounded-lg border border-[#03a685]/20">
              <span className="text-[10px] font-bold text-[#03a685] uppercase">Non-Monetary Solution</span>
              <div className="font-bold text-[#282c3f] mt-1">{selectedBarrier.recommendedFix}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
