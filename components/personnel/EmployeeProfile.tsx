import React from 'react';
import { 
  User, 
  ChevronRight,
  Target,
  Settings,
  HelpCircle
} from 'lucide-react';
import { MOCK_EMPLOYEE_DETAILS } from './employeeData';

export const EmployeeProfile: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const person = MOCK_EMPLOYEE_DETAILS['10000'];

  return (
    <div className="max-w-2xl mx-auto space-y-4 animate-fade-in pb-20 font-sans">
      
      {/* Top Section: Avatar, Name, Position */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => onNavigate('personnel-details')}>
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-100 shrink-0 shadow-sm">
          <img 
            src={person.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200"} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">{person.name}</h2>
          <p className="text-sm font-medium text-slate-500">{person.position}</p>
          <p className="text-xs text-slate-400 mt-1">ID: {person.id}</p>
        </div>
        <ChevronRight size={24} className="text-slate-300" />
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* First Menu Item: Edit Profile */}
        <button className="w-full flex items-center justify-between p-5 border-b border-slate-50 hover:bg-slate-50 transition-colors group" onClick={() => onNavigate('personnel-details')}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <User size={20} />
            </div>
            <span className="font-bold text-slate-700 text-base">个人档案</span>
          </div>
          <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
        </button>

        {/* Second Menu Item: My Performance Goals */}
        <button className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Target size={20} />
            </div>
            <span className="font-bold text-slate-700 text-base">我的绩效目标</span>
          </div>
          <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
        </button>

      </div>

      {/* Additional Settings (Optional, for completeness of a "Me" page) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-4">
        <button className="w-full flex items-center justify-between p-5 border-b border-slate-50 hover:bg-slate-50 transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Settings size={20} />
            </div>
            <span className="font-bold text-slate-700 text-base">系统设置</span>
          </div>
          <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
        </button>

        <button className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <HelpCircle size={20} />
            </div>
            <span className="font-bold text-slate-700 text-base">帮助与反馈</span>
          </div>
          <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
        </button>
      </div>

    </div>
  );
};

