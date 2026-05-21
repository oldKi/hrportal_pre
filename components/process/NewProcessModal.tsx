
import React, { useState, useMemo } from 'react';
import { X, Search, Info, Briefcase, Shield, ClipboardList, FileText, MapPin, RotateCcw, PenTool } from 'lucide-react';
import { PROCESS_TEMPLATES, PROCESS_CATEGORIES } from './types';

interface NewProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewProcessModal: React.FC<NewProcessModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState(PROCESS_CATEGORIES[1].id); // Default to '办理'
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const filteredTemplates = useMemo(() => {
    return PROCESS_TEMPLATES.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           t.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = t.categoryId === activeCategoryId;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategoryId]);

  const getIcon = (templateId: string) => {
    switch (templateId) {
      case 'pt-cert': return <FileText size={32} />;
      case 'pt-residence': return <MapPin size={32} />;
      case 'pt-resume': return <Briefcase size={32} />;
      case 'pt-seal': return <PenTool size={32} />;
      default: return <FileText size={32} />;
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'info': return <Info size={20} />;
      case 'process': return <Briefcase size={20} />;
      case 'protection': return <Shield size={20} />;
      case 'survey': return <ClipboardList size={20} />;
      default: return <Info size={20} />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col h-[680px] animate-scale-up overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-6 pt-6 pb-2 flex justify-end shrink-0">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-8 flex justify-between border-b border-gray-50 shrink-0">
          {PROCESS_CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategoryId(category.id);
                setSelectedTemplateId(null);
              }}
              className={`flex flex-col items-center pb-3 px-2 relative transition-all ${
                activeCategoryId === category.id ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className={`mb-2 p-2 rounded-xl transition-colors ${
                activeCategoryId === category.id ? 'bg-blue-50' : 'bg-transparent'
              }`}>
                {getCategoryIcon(category.id)}
              </div>
              <span className="text-sm font-bold">{category.name}</span>
              {activeCategoryId === category.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="px-8 py-4 shrink-0">
          <div className="relative">
            <input 
              type="text" 
              placeholder="搜索流程名称" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Content - Grid of Cards */}
        <div className="flex-1 px-8 pb-8 overflow-y-auto custom-scrollbar bg-white">
          <div className="grid grid-cols-2 gap-4">
            {filteredTemplates.map(template => (
              <div 
                key={template.id}
                onClick={() => setSelectedTemplateId(template.id)}
                className={`flex flex-col items-center p-6 rounded-3xl border-2 transition-all cursor-pointer group ${
                  selectedTemplateId === template.id 
                    ? 'border-blue-600 bg-blue-50/30 shadow-lg shadow-blue-100' 
                    : 'border-gray-50 bg-white hover:border-blue-200 hover:shadow-md'
                }`}
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                  template.color || 'bg-gray-100 text-gray-600'
                }`}>
                  {getIcon(template.id)}
                </div>
                <h4 className={`text-lg font-bold mb-1 transition-colors ${
                  selectedTemplateId === template.id ? 'text-blue-600' : 'text-gray-800'
                }`}>
                  {template.name}
                </h4>
                <p className="text-xs text-gray-400 font-medium">
                  {template.description}
                </p>
              </div>
            ))}
            {filteredTemplates.length === 0 && (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400">
                <div className="p-4 bg-gray-50 rounded-full mb-3">
                  <Search size={32} className="opacity-20" />
                </div>
                <p className="text-sm">未找到相关流程模版</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {selectedTemplateId && (
          <div className="px-8 py-6 border-t border-gray-50 flex shrink-0 animate-slide-up">
            <button 
              onClick={() => {
                alert(`正在跳转到 [${PROCESS_TEMPLATES.find(t => t.id === selectedTemplateId)?.name}] 的申请页面...`);
                onClose();
              }}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl text-base font-bold hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95"
            >
              立即发起
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
