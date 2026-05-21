import React from 'react';
import { Briefcase, ChevronRight } from 'lucide-react';
import { DashboardWidget } from './Shared';

const recruitmentRequests = [
  { id: 'REQ-2024-001', title: '高级前端开发工程师', status: '进行中', updateTime: '2024-03-25 10:30' },
  { id: 'REQ-2024-002', title: '产品经理 (B端)', status: '进行中', updateTime: '2024-03-26 14:20' },
  { id: 'REQ-2024-003', title: '数据分析师', status: '草稿', updateTime: '2024-03-24 09:15' },
  { id: 'REQ-2024-004', title: 'UI设计师', status: '完成', updateTime: '2024-03-20 16:45' },
  { id: 'REQ-2024-005', title: '后端架构师', status: '待确认', updateTime: '2024-03-27 11:00' },
];

export const DepartmentRecruitmentWidget: React.FC<{ 
  onNavigate?: (view: string) => void;
  isEditMode?: boolean;
  onHide?: () => void;
}> = ({ onNavigate, isEditMode, onHide }) => {
  return (
    <DashboardWidget 
      title={
        <div className="flex items-center">
          <Briefcase className="mr-2 text-blue-600" size={20} />
          <span>部门招聘需求进度</span>
        </div>
      }
      isEditMode={isEditMode}
      onHide={onHide}
      onExpand={() => onNavigate?.('recruitment')}
      className="h-full"
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left text-[12px] whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-3">对外发布职位名称</th>
                <th className="px-4 py-3">更新时间</th>
                <th className="px-4 py-3">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recruitmentRequests.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => onNavigate?.('recruitment')}>
                  <td className="px-4 py-3 font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-500">
                    {item.updateTime}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      item.status === '进行中' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                      item.status === '待确认' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                      item.status === '草稿' ? 'bg-gray-100 text-gray-600 border border-gray-200' :
                      'bg-green-50 text-green-600 border border-green-100'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-50">
          <div className="text-[11px] text-gray-500 font-medium">
            共 <span className="font-bold text-gray-800">{recruitmentRequests.length}</span> 个活跃需求
          </div>
        </div>
      </div>
    </DashboardWidget>
  );
};
