import React from 'react';
import {
  LayoutDashboard,
  Database,
  ShieldAlert,
  Bot,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Zap,
  Layers,
  HeartHandshake
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, activeStreamsCount }) {
  const navItems = [
    {
      id: "Overview",
      label: "Overview",
      icon: LayoutDashboard,
      badge: "Core",
      desc: "Insights & conversion metrics"
    },
    {
      id: "Data Sources",
      label: "Data Sources",
      icon: Database,
      badge: `${activeStreamsCount} Streams`,
      desc: "120 Verified Customer Reviews"
    },
    {
      id: "Barrier Analysis",
      label: "Barrier Analysis",
      icon: ShieldAlert,
      badge: "4 Barriers",
      desc: "Fit, AI Slop, Tags, & Bot Gaps"
    },
    {
      id: "AI Assistant",
      label: "AI Assistant",
      icon: Bot,
      badge: "Grounded",
      desc: "Verbatim-anchored reasoning"
    }
  ];

  return (
    <aside className="w-72 bg-white border-r border-[#eaeaec] flex flex-col justify-between h-screen sticky top-0 select-none shadow-[2px_0_12px_rgba(40,44,63,0.03)] z-30">
      {/* Top Brand Area */}
      <div>
        <div className="p-5 border-b border-[#f0f0f2]">
          <div className="flex items-center gap-3">
            {/* Myntra-inspired vibrant monogram */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff3f6c] to-[#ff6b8b] flex items-center justify-center shadow-md shadow-[#ff3f6c]/25 text-white font-black text-xl tracking-tighter">
              W
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[15px] tracking-tight text-[#282c3f] font-['Outfit']">
                  Wishlist Discovery Engine
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-bold text-[#ff3f6c] tracking-wider uppercase bg-[#fff0f4] px-1.5 py-0.5 rounded">
                  GROWTH PM EDITION
                </span>
                <span className="text-[11px] text-[#94969f]">v2.5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Status indicator */}
        <div className="mx-4 mt-4 px-3 py-2 bg-[#f5f6f8] rounded-lg border border-[#eaeaec] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#03a685] animate-pulse"></span>
            <span className="text-[11px] font-semibold text-[#535766]">Feed Status</span>
          </div>
          <span className="text-[11px] font-bold text-[#282c3f]">120 Ingested Reviews</span>
        </div>

        {/* Navigation Area */}
        <nav className="p-3 space-y-1 mt-2">
          <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase text-[#94969f]">
            Platform Views
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${isActive
                  ? "bg-[#fff0f4] text-[#ff3f6c] font-semibold shadow-sm border border-[#ff3f6c]/20"
                  : "text-[#535766] hover:bg-[#f5f6f8] hover:text-[#282c3f]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-md ${isActive ? 'bg-[#ff3f6c] text-white shadow-sm' : 'text-[#535766]'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-[13px] leading-tight ${isActive ? 'text-[#ff3f6c] font-bold' : 'text-[#282c3f]'}`}>
                      {item.label}
                    </div>
                    <div className="text-[10px] text-[#94969f] font-normal leading-tight mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive
                      ? "bg-[#ff3f6c] text-white"
                      : "bg-[#f0f0f2] text-[#535766]"
                      }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer / PM Profile */}
      <div className="p-4 border-t border-[#f0f0f2] bg-[#fafafb]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#ff3f6c]/10 border border-[#ff3f6c]/30 flex items-center justify-center text-[#ff3f6c] font-bold text-xs">
            SM
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-[#282c3f] truncate">
              Sukalyan Mallick
            </div>
            <div className="text-[11px] text-[#94969f] truncate">
              Growth PM • Apparel & Retention
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#eaeaec] flex items-center justify-between text-[11px] text-[#94969f]">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#ff3f6c]" /> Non-Monetary Engine
          </span>
          <span className="font-semibold text-[#03a685]">Zero Discount</span>
        </div>
      </div>
    </aside>
  );
}
