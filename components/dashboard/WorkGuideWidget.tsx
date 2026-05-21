
import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowRight, X, MessageSquare, Search, Zap } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const WorkGuideWidget: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [query, setQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);

  const handleSearch = async (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (!finalQuery.trim()) return;
    
    setQuery(finalQuery);
    setIsThinking(true);
    setAnswer(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `作为一个HR平台的智能助手，请简洁地回答以下关于办事指南的问题：${finalQuery}。如果是不确定的问题，请告知联系HRBP。`,
        config: {
          systemInstruction: "你是一个专业的HR智能助手，负责为企业员工提供办事指引。",
          temperature: 0.7,
        }
      });
      setAnswer(response.text || "暂时无法获取相关指南，请咨询线下HR。");
    } catch (error) {
      setAnswer("抱歉，智能助手中午休息了，请稍后再试或直接联系HR。");
    } finally {
      setIsThinking(false);
    }
  };

  const commonQuestions = [
    '如何申请调休？',
    '我的公积金缴纳标准是多少？',
    '如何查看我的工资单？',
    '年假余额查询'
  ];

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Row 1: Smart Recommendation */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <Sparkles size={12} className="text-blue-600" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">智能推荐</span>
        </div>
        <div className="flex flex-col gap-2">
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
            # 2024年度绩效考核政策解读
          </a>
          <a href="#" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
            # 员工福利手册：最新升级内容
          </a>
        </div>
      </div>

      {/* Row 2: Search Box & Answer Area */}
      <div className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="输入您想咨询的 HR 问题..." 
            className="w-full pl-10 pr-12 py-2.5 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
          />
          <button 
            onClick={() => handleSearch()}
            disabled={isThinking}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm flex items-center justify-center"
          >
            {isThinking ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
          </button>
        </div>

        {/* Answer Display */}
        {isThinking ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-2 bg-blue-50/30 rounded-xl border border-blue-50">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <p className="text-[10px] text-blue-400 font-medium italic">AI 正在为您查询...</p>
          </div>
        ) : answer && (
          <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 animate-fade-in relative group/answer">
            <button 
              onClick={() => setAnswer(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 opacity-0 group-hover/answer:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 p-1.5 rounded-lg shrink-0 mt-0.5 shadow-sm">
                <Sparkles size={12} className="text-white" />
              </div>
              <div className="text-[11px] text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">
                {answer}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Row 3: Common Questions */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <Zap size={12} className="text-blue-600" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">你常用的问题</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {commonQuestions.map((q, i) => (
            <button 
              key={i} 
              onClick={() => handleSearch(q)}
              className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-[11px] text-gray-700 transition-all border border-gray-100 hover:border-blue-200 hover:shadow-sm"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
