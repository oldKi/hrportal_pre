
import React from 'react';
import { 
  Users, 
  Clock, 
  BookOpen, 
  Award, 
  Star, 
  BarChart2, 
  PieChart, 
  Briefcase, 
  TrendingUp,
  X,
  Plus,
  FileCheck
} from 'lucide-react';

interface AppCard {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const AVAILABLE_CARDS: AppCard[] = [
  { id: 'team', name: '团队成员', icon: <Users size={24} />, color: 'bg-blue-500' },
  { id: 'workhours', name: '工时统计', icon: <Clock size={24} />, color: 'bg-emerald-500' },
  { id: 'etms', name: '工时与考勤', icon: <Clock size={24} />, color: 'bg-emerald-600' },
  { id: 'learning', name: '学习与培训', icon: <BookOpen size={24} />, color: 'bg-indigo-500' },
  { id: 'performance', name: '绩效与发展', icon: <Award size={24} />, color: 'bg-purple-500' },
  { id: 'competency', name: '能力模型', icon: <Star size={24} />, color: 'bg-rose-500' },
  { id: 'level', name: '能级结构', icon: <BarChart2 size={24} />, color: 'bg-teal-500' },
  { id: 'levelDist', name: '能级结构分布', icon: <BarChart2 size={24} />, color: 'bg-teal-600' },
  { id: 'age', name: '团队年龄结构', icon: <PieChart size={24} />, color: 'bg-cyan-500' },
  { id: 'ageDist', name: '年龄结构图', icon: <PieChart size={24} />, color: 'bg-cyan-600' },
  { id: 'jobs', name: '内部职位', icon: <Briefcase size={24} />, color: 'bg-orange-600' },
  { id: 'recruitment', name: '招聘需求进度', icon: <TrendingUp size={24} />, color: 'bg-blue-600' },
  { id: 'approvals', name: '审批待办', icon: <FileCheck size={24} />, color: 'bg-amber-500' },
  { id: 'todo', name: '待办事项', icon: <FileCheck size={24} />, color: 'bg-amber-600' },
  { id: 'ai', name: 'AI 助手', icon: <Star size={24} />, color: 'bg-indigo-600' },
  { id: 'budget', name: '部门预算', icon: <TrendingUp size={24} />, color: 'bg-emerald-700' },
  { id: 'funnel', name: '招聘漏斗', icon: <TrendingUp size={24} />, color: 'bg-rose-600' },
];

interface SystemAppCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (id: string) => void;
  addedCards: string[];
}

export const SystemAppCenterModal: React.FC<SystemAppCenterModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddCard,
  addedCards
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[85vh] animate-scale-up overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h3 className="font-bold text-gray-900 text-xl">系统应用卡片</h3>
            <p className="text-sm text-gray-500 mt-1">为您的工作台增加功能卡片 (默认大小 360x360)</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {AVAILABLE_CARDS.map(card => {
              const isAdded = addedCards.includes(card.id);
              return (
                <div 
                  key={card.id} 
                  onClick={() => !isAdded && onAddCard(card.id)}
                  className={`group relative bg-white border-2 rounded-2xl p-6 flex flex-col items-center text-center transition-all ${
                    isAdded 
                      ? 'border-gray-100 opacity-60 cursor-default' 
                      : 'border-gray-50 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 cursor-pointer'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-2xl ${card.color} text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    {card.icon}
                  </div>
                  <h4 className="font-bold text-gray-800 text-base mb-1">{card.name}</h4>
                  <p className="text-xs text-gray-400">360 x 360 像素</p>
                  
                  {isAdded ? (
                    <div className="mt-4 flex items-center text-green-600 text-[10px] font-bold bg-green-50 px-3 py-1 rounded-full">
                      已在工作台
                    </div>
                  ) : (
                    <div className="mt-4 flex items-center text-blue-600 text-[10px] font-bold bg-blue-50 px-3 py-1 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Plus size={12} className="mr-1" /> 添加到工作台
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-md active:scale-95"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};
