import React from 'react';
import { UserPlus, TrendingUp, Users, ChevronRight } from 'lucide-react';
import { DashboardWidget } from './Shared';

const recruitmentData = [
  { id: 1, pos: '高级Java开发工程师', hc: 2, applicants: 145, screening: '65%', rescreening: '40%', phoneInterview: '55%', interview: '25%', offer: '15%', hired: '100%' },
  { id: 2, pos: '产品经理 (移动端)', hc: 1, applicants: 89, screening: '45%', rescreening: '35%', phoneInterview: '40%', interview: '20%', offer: '10%', hired: '100%' },
  { id: 3, pos: '前端架构师', hc: 1, applicants: 56, screening: '30%', rescreening: '50%', phoneInterview: '45%', interview: '30%', offer: '20%', hired: '100%' },
  { id: 4, pos: 'HRBP (研发中心)', hc: 1, applicants: 120, screening: '70%', rescreening: '45%', phoneInterview: '60%', interview: '15%', offer: '12%', hired: '100%' },
  { id: 5, pos: '大数据分析师', hc: 2, applicants: 78, screening: '55%', rescreening: '30%', phoneInterview: '42%', interview: '22%', offer: '18%', hired: '100%' },
  { id: 6, pos: 'UI/UX 设计师', hc: 1, applicants: 210, screening: '40%', rescreening: '25%', phoneInterview: '35%', interview: '18%', offer: '8%', hired: '100%' },
  { id: 7, pos: '测试开发专家', hc: 1, applicants: 45, screening: '50%', rescreening: '40%', phoneInterview: '48%', interview: '35%', offer: '25%', hired: '100%' },
  { id: 8, pos: '运维工程师 (SRE)', hc: 2, applicants: 67, screening: '60%', rescreening: '35%', phoneInterview: '50%', interview: '20%', offer: '15%', hired: '100%' },
  { id: 9, pos: '市场运营经理', hc: 1, applicants: 156, screening: '35%', rescreening: '30%', phoneInterview: '28%', interview: '12%', offer: '10%', hired: '100%' },
  { id: 10, pos: '财务分析主管', hc: 1, applicants: 92, screening: '50%', rescreening: '40%', phoneInterview: '45%', interview: '25%', offer: '20%', hired: '100%' },
];

export const RecruitmentWidget: React.FC<{ 
  onNavigate?: (view: string) => void;
  isEditMode?: boolean;
  onHide?: () => void;
}> = ({ onNavigate, isEditMode, onHide }) => {
  return (
    <DashboardWidget 
      title="招聘进度概览" 
      isEditMode={isEditMode}
      onHide={onHide}
      onExpand={() => onNavigate?.('recruitment')}
      className="h-full"
      headerRight={
        <button 
          onClick={() => onNavigate?.('job-postings')}
          className="flex items-center text-xs text-blue-600 font-bold hover:underline"
        >
          <UserPlus size={12} className="mr-1" /> 发布职位
        </button>
      }
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left text-[11px] whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
              <tr>
                <th className="px-3 py-2.5">职位名称</th>
                <th className="px-3 py-2.5 text-center">招聘人数</th>
                <th className="px-3 py-2.5 text-center">投递人数</th>
                <th className="px-3 py-2.5 text-center bg-blue-50/50">初筛通过率</th>
                <th className="px-3 py-2.5 text-center bg-blue-50/50">复筛通过率</th>
                <th className="px-3 py-2.5 text-center bg-blue-50/50">电话面试通过率</th>
                <th className="px-3 py-2.5 text-center bg-blue-50/50">面试通过率</th>
                <th className="px-3 py-2.5 text-center bg-blue-50/50">Offer率</th>
                <th className="px-3 py-2.5 text-center bg-blue-50/50">录用率</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recruitmentData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-3 py-2.5">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{item.pos}</span>
                      <span className="text-[9px] text-gray-400">ID: REQ-00{item.id}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-center font-mono font-bold text-gray-700">{item.hc}</td>
                  <td className="px-3 py-2.5 text-center font-mono font-bold text-blue-600">{item.applicants}</td>
                  <td className="px-3 py-2.5 text-center font-medium text-gray-600">{item.screening}</td>
                  <td className="px-3 py-2.5 text-center font-medium text-gray-600">{item.rescreening}</td>
                  <td className="px-3 py-2.5 text-center font-medium text-gray-600">{item.phoneInterview}</td>
                  <td className="px-3 py-2.5 text-center font-medium text-gray-600">{item.interview}</td>
                  <td className="px-3 py-2.5 text-center font-medium text-gray-600">{item.offer}</td>
                  <td className="px-3 py-2.5 text-center font-bold text-green-600">{item.hired}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-[10px] text-gray-500 font-medium">进行中: 12</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-[10px] text-gray-500 font-medium">已完成: 45</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardWidget>
  );
};
