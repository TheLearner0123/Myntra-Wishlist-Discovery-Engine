import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Check, 
  Copy, 
  ArrowRight, 
  Zap, 
  ShieldAlert, 
  Share2, 
  RotateCcw,
  Sliders,
  ExternalLink,
  MessageSquare,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { AI_STARTER_PROMPTS } from '../data/mockData';
import { generateAiDiscoveryResponse } from '../data/aiSimulator';

export default function AiAssistantView({ initialPrompt, clearInitialPrompt }) {
  const [messages, setMessages] = useState([
    {
      id: "msg-init",
      sender: "assistant",
      timestamp: "Just now",
      content: {
        type: "welcome",
        title: "Wishlist Intent & Non-Monetary Discovery Agent",
        text: "Hello Sukalyan! I am your Growth PM AI Discovery Agent. I synthesize qualitative signals across verified customer reviews to uncover why shoppers hesitate to purchase without resorting to margin-eroding discounts.",
        prompts: AI_STARTER_PROMPTS
      }
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const chatBottomRef = useRef(null);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle passed initial prompt from other views
  useEffect(() => {
    if (initialPrompt) {
      handleSend(initialPrompt);
      if (clearInitialPrompt) clearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleSend = (textToSend) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isTyping) return;

    // Add user message
    const userMsgId = `user-${Date.now()}`;
    const newUserMsg = {
      id: userMsgId,
      sender: "user",
      timestamp: "Just now",
      content: {
        text: query
      }
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputQuery("");
    setIsTyping(true);

    // Simulate AI synthesis with realistic delay
    setTimeout(() => {
      const responseData = generateAiDiscoveryResponse(query);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "assistant",
        timestamp: "Just now",
        content: {
          type: "analysis",
          ...responseData
        }
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 550);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (msgId, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "msg-init",
        sender: "assistant",
        timestamp: "Just now",
        content: {
          type: "welcome",
          title: "Wishlist Intent & Non-Monetary Discovery Agent",
          text: "Chat reset. Ask any question about user hesitation, sizing, styling barriers, or non-monetary experimentation hypotheses.",
          prompts: AI_STARTER_PROMPTS
        }
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)] bg-white rounded-xl border border-[#eaeaec] shadow-sm overflow-hidden animate-fade-in">
      {/* Top Header of Chat Window */}
      <div className="p-4 border-b border-[#eaeaec] bg-white flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff3f6c] to-[#ff6b8b] flex items-center justify-center text-white shadow-md shadow-[#ff3f6c]/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-[#282c3f] font-['Outfit']">
                AI Discovery Copilot
              </h2>
              <span className="badge badge-magenta text-[10px]">Active Reasoning</span>
            </div>
            <p className="text-xs text-[#535766]">
              Analyzing Sizing • Styling • Social Validation • Non-Monetary Solutions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetChat}
            className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 text-[#535766] hover:text-[#282c3f]"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#fafafb]">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-3.5 max-w-4xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs ${
                isUser 
                  ? 'bg-[#282c3f] text-white' 
                  : 'bg-[#fff0f4] text-[#ff3f6c] border border-[#ff3f6c]/30'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              {/* Message Content Container */}
              <div className={`space-y-2 max-w-2xl ${isUser ? 'text-right' : 'text-left'}`}>
                {/* Timestamp / Sender tag */}
                <div className="text-[10px] font-bold text-[#94969f] px-1">
                  {isUser ? 'Growth PM' : 'Wishlist Discovery Engine AI'} • {msg.timestamp}
                </div>

                {isUser ? (
                  /* User Bubble */
                  <div className="bg-[#282c3f] text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-xs shadow-sm inline-block font-medium text-left">
                    {msg.content.text}
                  </div>
                ) : msg.content.type === 'welcome' ? (
                  /* AI Welcome Card */
                  <div className="bg-white p-5 rounded-2xl rounded-tl-xs border border-[#eaeaec] shadow-sm space-y-4">
                    <div>
                      <h3 className="text-sm font-extrabold text-[#282c3f] flex items-center gap-2 font-['Outfit']">
                        <Zap className="w-4 h-4 text-[#ff3f6c]" />
                        {msg.content.title}
                      </h3>
                      <p className="text-xs text-[#535766] mt-1.5 leading-relaxed">
                        {msg.content.text}
                      </p>
                    </div>

                    {/* Starter Prompts */}
                    <div className="space-y-2 pt-2 border-t border-[#f0f0f2]">
                      <div className="text-[11px] font-bold text-[#282c3f] uppercase tracking-wider">
                        Suggested Prompts to Explore:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {msg.content.prompts.map((promptText, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSend(promptText)}
                            className="text-xs font-semibold text-[#282c3f] bg-[#f5f6f8] hover:bg-[#fff0f4] hover:text-[#ff3f6c] hover:border-[#ff3f6c]/40 border border-[#eaeaec] px-3 py-1.5 rounded-lg transition-all text-left flex items-center gap-1.5"
                          >
                            <span>{promptText}</span>
                            <ArrowRight className="w-3 h-3 opacity-60" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Rich AI Analysis Response */
                  <div className="bg-white p-5 rounded-2xl rounded-tl-xs border border-[#eaeaec] shadow-sm space-y-5">
                    {/* Header with Title and Query echo */}
                    <div className="border-b border-[#f0f0f2] pb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff3f6c] bg-[#fff0f4] px-2 py-0.5 rounded">
                          Synthesized PM Analysis
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(msg.id, JSON.stringify(msg.content, null, 2))}
                          className="text-[11px] font-medium text-[#535766] hover:text-[#ff3f6c] flex items-center gap-1"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-[#03a685]" />
                              <span className="text-[#03a685]">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy JSON</span>
                            </>
                          )}
                        </button>
                      </div>
                      <h3 className="text-base font-extrabold text-[#282c3f] mt-1.5 font-['Outfit']">
                        {msg.content.title}
                      </h3>
                      <p className="text-xs text-[#535766] mt-1 leading-relaxed">
                        {msg.content.summary}
                      </p>
                    </div>

                    {/* Three Pillars: Sizing, Styling, Social Validation */}
                    <div className="space-y-3">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#282c3f] flex items-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5 text-[#ff3f6c]" />
                        <span>Core Drop-Off Friction Pillars:</span>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        {msg.content.barriers.map((barr, bIdx) => (
                          <div key={bIdx} className="p-3 rounded-lg bg-[#f9f9fa] border border-[#f0f0f2] space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#282c3f]">
                                {barr.pillar}
                              </span>
                              <span className="text-[10px] font-bold text-[#ff3f6c] bg-[#fff0f4] px-1.5 py-0.5 rounded">
                                {barr.dataTag}
                              </span>
                            </div>
                            <p className="text-xs text-[#535766] leading-relaxed">
                              {barr.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Non-Monetary Solutions */}
                    <div className="space-y-3 pt-2 border-t border-[#f0f0f2]">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#03a685] flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Proposed Non-Monetary Growth Solutions (Zero-Discount):</span>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        {msg.content.nonMonetarySolutions.map((sol, sIdx) => (
                          <div key={sIdx} className="p-3 rounded-lg bg-[#e6f7f3]/50 border border-[#03a685]/20">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#282c3f]">
                                {sIdx + 1}. {sol.name}
                              </span>
                              <span className="text-[11px] font-black text-[#03a685] bg-white px-2 py-0.5 rounded shadow-2xs">
                                {sol.projectedLift}
                              </span>
                            </div>
                            <p className="text-xs text-[#535766] mt-1 leading-relaxed">
                              {sol.mechanism}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Customer Verbatim Snippet */}
                    {msg.content.supportingVerbatim && (
                      <div className="p-3 bg-[#fff0f4]/60 rounded-lg border border-[#ff3f6c]/20 text-xs italic text-[#535766] leading-relaxed">
                        <span className="font-bold text-[#ff3f6c] not-italic mr-1">Customer Quote:</span>
                        {msg.content.supportingVerbatim}
                      </div>
                    )}

                    {/* Actionable PM Next Step */}
                    {msg.content.actionablePmNextStep && (
                      <div className="p-3 bg-[#282c3f] text-white rounded-lg flex items-start gap-2.5 text-xs">
                        <Sparkles className="w-4 h-4 text-[#ff3f6c] flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#ff3f6c]">Growth PM Recommendation: </strong>
                          <span>{msg.content.actionablePmNextStep}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3.5 max-w-2xl animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-[#fff0f4] text-[#ff3f6c] border border-[#ff3f6c]/30 flex items-center justify-center flex-shrink-0 font-bold text-xs">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-xs border border-[#eaeaec] shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#282c3f]">
                  Analyzing sizing, styling & social barriers across 14,820 qualitative feedback signals...
                </span>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <div className="w-2 h-2 rounded-full bg-[#ff3f6c] animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-[#ff3f6c] animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-[#ff3f6c] animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Form Bar */}
      <div className="p-3 sm:p-4 bg-white border-t border-[#eaeaec] flex-shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask AI Copilot: e.g. Why do users postpone ethnic wear purchases?"
              className="w-full text-xs sm:text-sm py-3 px-4 pr-10 rounded-xl border border-[#eaeaec] bg-[#f5f6f8] text-[#282c3f] placeholder-[#94969f] focus:outline-none focus:border-[#ff3f6c] focus:bg-white focus:ring-2 focus:ring-[#ff3f6c]/15 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="btn-primary py-3 px-5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-transform duration-150"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-[#94969f]">
          <span>Grounded strictly in customer reviews (Play Store, Reddit, Twitter, YouTube)</span>
          <span className="font-semibold text-[#ff3f6c]">Non-Monetary Mode Active</span>
        </div>
      </div>
    </div>
  );
}
