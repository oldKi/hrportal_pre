
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { TalentReview } from './performance/TalentReview';
import { SuccessionPlanning } from './performance/SuccessionPlanning';

interface PerformanceProps {
  view?: string;
}

const teamMembers = [
  { id: 1, name: '李明', role: '高级开发', score: 92, trend: 'up' },
  { id: 2, name: '王芳', role: 'UI设计', score: 88, trend: 'stable' },
  { id: 3, name: '陈志', role: '初级开发', score: 74, trend: 'down' },
  { id: 4, name: '赵强', role: '测试工程师', score: 85, trend: 'up' },
];

export const Performance: React.FC<PerformanceProps> = ({ view = 'dashboard' }) => {
  // 1. TALENT REVIEW VIEW
  if (view === 'talent-review') {
    return <TalentReview />;
  }

  // 2. SUCCESSION PLANNING VIEW
  if (view === 'succession-planning') {
    return <SuccessionPlanning />;
  }

  // 3. DASHBOARD VIEW (Default)
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">绩效管理 (部门经理)</h2>
        <div className="flex space-x-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 text-sm font-medium">
            导出报表
          </button>
          <button className="flex-1 sm:flex-none bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium shadow-sm">
            发起考核
          </button>
        </div>
      </div>
      
      {/* Team Overview List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
           <h3 className="font-bold text-gray-800 mb-4">团队绩效概览</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {teamMembers.map((member) => (
                 <div key={member.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800 flex items-center justify-end">
                        {member.score}
                        {member.trend === 'up' && <TrendingUp size={16} className="text-green-500 ml-2" />}
                      </div>
                      <p className={`text-xs ${member.score >= 90 ? 'text-green-600' : 'text-blue-600'}`}>
                        {member.score >= 90 ? '优秀' : '良好'}
                      </p>
                    </div>
                 </div>
               ))}
           </div>
      </div>
    </div>
  );
};
