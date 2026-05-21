import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

export const DashboardWidget: React.FC<{ 
  title: React.ReactNode; 
  children: React.ReactNode; 
  className?: string;
  headerRight?: React.ReactNode;
  onHide?: () => void;
  onReplace?: () => void;
  onExpand?: () => void;
  isEditMode?: boolean;
}> = ({ title, children, className = '', headerRight, onHide, onReplace, onExpand, isEditMode }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 px-5 pb-5 pt-2.5 flex flex-col relative transition-all duration-300 overflow-hidden ${className} ${isEditMode ? 'ring-2 ring-blue-400 ring-inset' : ''}`}>
       <div className="flex justify-between items-center mb-4">
          <div className="font-bold text-gray-800 text-lg flex-1 min-w-0 pr-2">{title}</div>
          <div className="flex items-center shrink-0">
             {headerRight}
             {onExpand && !isEditMode && (
               <button 
                 onClick={onExpand}
                 className="text-blue-500 hover:text-blue-700 text-xs font-bold transition-colors ml-2"
               >
                 查看更多
               </button>
             )}
             {isEditMode && (
               <button 
                 onClick={onHide}
                 className="p-1 text-red-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors ml-2"
                 title="移除卡片"
               >
                 <Trash2 size={18} />
               </button>
             )}
          </div>
       </div>
       {children}
    </div>
  );
};

export const AnimatedIcon: React.FC<{ icon1: React.ReactNode; icon2: React.ReactNode }> = ({ icon1, icon2 }) => {
  const [showFirst, setShowFirst] = useState(true);

  useEffect(() => {
    const intervalTime = 3000 + Math.random() * 5000;
    const interval = setInterval(() => {
      setShowFirst(prev => !prev);
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <div className={`absolute transition-all duration-700 transform ${showFirst ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
        {icon1}
      </div>
      <div className={`absolute transition-all duration-700 transform ${showFirst ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
        {icon2}
      </div>
    </div>
  );
};

export const QuickActionCard: React.FC<{ title: string; icon: React.ReactNode; altIcon: React.ReactNode; color: string; onClick?: () => void }> = ({ title, icon, altIcon, color, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center hover:shadow-md transition-shadow cursor-pointer group"
  >
    <div className={`p-3 rounded-lg mr-4 ${color} text-white group-hover:scale-105 transition-transform`}>
      <AnimatedIcon icon1={icon} icon2={altIcon} />
    </div>
    <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{title}</span>
  </div>
);