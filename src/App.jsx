import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import OverviewView from './components/OverviewView';
import DataSourcesView from './components/DataSourcesView';
import BarrierAnalysisView from './components/BarrierAnalysisView';
import AiAssistantView from './components/AiAssistantView';
import { 
  Bot, 
  Sparkles, 
  X, 
  ChevronUp, 
  Zap, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  // Navigation State: 'Overview' | 'Data Sources' | 'Barrier Analysis' | 'AI Assistant'
  const [activeTab, setActiveTab] = useState("Overview");

  // Date Filter State
  const [selectedDate, setSelectedDate] = useState("30d");

  // Active Data Streams State (Derived directly from User-Provided Database)
  const [activeStreamIds, setActiveStreamIds] = useState([
    "play-store-fit", 
    "play-store-fabric", 
    "play-store-returns", 
    "play-store-support"
  ]);

  // Bridge to trigger prompt into AI assistant
  const [bridgedPrompt, setBridgedPrompt] = useState(null);

  // Quick slide-over mini chat modal toggle (for quick consultations from any view)
  const [isQuickChatOpen, setIsQuickChatOpen] = useState(false);

  // Toggle single stream state between active and inactive
  const toggleStream = (streamId) => {
    setActiveStreamIds(prev => {
      if (prev.includes(streamId)) {
        // Keep at least 1 active for meaningful insights
        if (prev.length === 1) return prev;
        return prev.filter(id => id !== streamId);
      } else {
        return [...prev, streamId];
      }
    });
  };

  // Switch tab and send prompt to AI assistant
  const handleAskAi = (promptText) => {
    setBridgedPrompt(promptText);
    setActiveTab("AI Assistant");
  };

  return (
    <div className="flex min-h-screen bg-[#f5f6f8]">
      {/* Interactive Left Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeStreamsCount={activeStreamIds.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Notification Bar */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#eaeaec] px-6 py-3 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#535766]">
              Workspace: <strong className="text-[#282c3f]">Myntra Fashion E-Commerce</strong>
            </span>
            <span className="text-[#eaeaec]">•</span>
            <div className="flex items-center gap-1.5 text-xs text-[#03a685] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#03a685] animate-pulse"></span>
              <span>Discovery Engine Synced</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {activeTab !== "AI Assistant" && (
              <button
                type="button"
                onClick={() => setIsQuickChatOpen(true)}
                className="text-xs font-bold text-[#ff3f6c] bg-[#fff0f4] hover:bg-[#ff3f6c] hover:text-white px-3 py-1.5 rounded-lg border border-[#ff3f6c]/30 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Quick Copilot</span>
              </button>
            )}

            <span className="text-xs font-bold px-2.5 py-1 bg-[#f5f6f8] text-[#282c3f] rounded-md border border-[#eaeaec]">
              Non-Monetary Mode
            </span>
          </div>
        </header>

        {/* Dynamic View Swapping */}
        <div className="p-6 max-w-7xl w-full mx-auto pb-16">
          {activeTab === "Overview" && (
            <OverviewView 
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              activeStreamIds={activeStreamIds}
              toggleStream={toggleStream}
              onAskAi={handleAskAi}
            />
          )}

          {activeTab === "Data Sources" && (
            <DataSourcesView 
              activeStreamIds={activeStreamIds}
              toggleStream={toggleStream}
              onAskAi={handleAskAi}
            />
          )}

          {activeTab === "Barrier Analysis" && (
            <BarrierAnalysisView 
              onAskAi={handleAskAi}
            />
          )}

          {activeTab === "AI Assistant" && (
            <AiAssistantView 
              initialPrompt={bridgedPrompt}
              clearInitialPrompt={() => setBridgedPrompt(null)}
            />
          )}
        </div>
      </main>

      {/* Quick Floating Chat Drawer Modal (accessible when browsing Overview or Barrier Analysis) */}
      {isQuickChatOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-4 bg-black/30 backdrop-blur-xs animate-fade-in">
          <div className="w-full sm:w-[500px] h-[85vh] bg-white rounded-2xl shadow-2xl border border-[#eaeaec] flex flex-col overflow-hidden animate-fade-in">
            <div className="p-3.5 bg-gradient-to-r from-[#ff3f6c] to-[#ff527b] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-wider font-['Outfit']">
                  Quick AI Copilot Drawer
                </span>
              </div>
              <button 
                onClick={() => setIsQuickChatOpen(false)}
                className="p-1 hover:bg-white/20 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <AiAssistantView 
                initialPrompt={null}
                clearInitialPrompt={null}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
