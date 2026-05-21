import React, { useState } from 'react';
import { DashboardWidget } from './Shared';
import { Contact2, User, ChevronUp, Plus, Minus, ZoomOut } from 'lucide-react';
import { PersonDetailDrawer } from '../organization/PersonDetailDrawer';

const orgData = {
  managers: [
    {
      id: 'm1',
      name: '李正阳',
      enName: 'Li Zhengyang',
      title: 'PMIF部门经理',
      count: '8 / 56',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
      id: 'm2',
      name: '徐炯',
      enName: 'Xu Jiong',
      title: 'PMIF-5经理',
      count: '11 / 17',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
      id: 'm3',
      name: '张骏',
      enName: 'Zhang Jun',
      title: 'CIA-2经理',
      count: '6 / 6',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150',
    }
  ],
  subordinates: [
    {
      id: 's1',
      name: '何家俊',
      enName: 'He',
      title: 'CIA-2道一开发',
      avatar: null,
    },
    {
      id: 's2',
      name: '方兔斯基',
      enName: '',
      title: '项目经理',
      avatar: null,
    },
    {
      id: 's3',
      name: '朱晨杰',
      enName: 'Zhu Chenjie',
      title: 'CIA-2系统分析员',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
      id: 's4',
      name: '梁敏琪',
      enName: 'liang',
      title: 'CIA-2道一开发',
      avatar: null,
    },
    {
      id: 's5',
      name: '沈文君',
      enName: 'Shen Wenjun',
      title: 'CIA-2系统分析员',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
      id: 's6',
      name: '沈燕华',
      enName: 'Shen Yanhua',
      title: 'CIA-2系统分析员',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150',
    }
  ]
};

const OrgCard = ({ data, isManager = false, onClick }: { data: any, isManager?: boolean, onClick?: (data: any) => void }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-4 flex items-center gap-4 relative z-10 w-full max-w-[320px] mx-auto hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick?.(data)}
    >
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 flex items-center justify-center">
        {data.avatar ? (
          <img src={data.avatar} alt={data.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <User className="w-6 h-6 text-gray-400" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1.5 truncate">
          <span className="font-bold text-gray-900 text-[15px]">{data.name}</span>
          {data.enName && <span className="font-bold text-gray-900 text-[15px]">{data.enName}</span>}
        </div>
        <div className="text-[12px] text-gray-500 mt-0.5 truncate">{data.title}</div>
        {isManager && data.count && (
          <div className="text-[11px] font-bold text-gray-800 mt-1">{data.count}</div>
        )}
      </div>

      {/* Icon */}
      <div className="text-blue-600 flex-shrink-0">
        <Contact2 size={18} strokeWidth={2} />
      </div>
    </div>
  );
};

export const VerticalOrgChartWidget: React.FC<{
  onNavigate?: (view: string, params?: any) => void;
  isEditMode?: boolean;
  onHide?: () => void;
}> = ({ onNavigate, isEditMode, onHide }) => {
  const [visibleManagerCount, setVisibleManagerCount] = useState(1);
  const [zoom, setZoom] = useState(0.6);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);

  const handleExpandLevel = () => {
    setVisibleManagerCount(prev => Math.min(prev + 1, orgData.managers.length));
  };

  const handleResetZoom = () => {
    setZoom(0.6);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom(prev => Math.max(0.2, Math.min(2, prev + delta)));
    }
  };

  const currentManagers = orgData.managers.slice(orgData.managers.length - visibleManagerCount);

  return (
    <DashboardWidget
      title="汇报关系图"
      isEditMode={isEditMode}
      onHide={onHide}
      onExpand={() => onNavigate?.('organization-v2', { tab: 'reporting' })}
      className="h-full"
    >
      <div className="relative flex-1 flex flex-col overflow-hidden">
        <div 
          className="flex-1 overflow-auto custom-scrollbar bg-[#f8fafc] rounded-lg flex justify-center"
          onWheel={handleWheel}
        >
          <div 
            className="relative py-12 px-8 flex flex-col items-center justify-center min-h-full transition-transform duration-200 ease-out origin-top"
            style={{ 
              transform: `scale(${zoom})`, 
              width: zoom < 1 ? `${100 / zoom}%` : '100%',
              minWidth: 'fit-content'
            }}
          >
            {/* Previous Level Button */}
            <div className="mb-6 z-20">
              <button 
                onClick={handleExpandLevel}
                disabled={visibleManagerCount >= orgData.managers.length}
                className="flex items-center gap-1 px-4 py-1.5 bg-white border border-blue-100 text-blue-600 rounded-full text-[11px] font-bold shadow-sm hover:bg-blue-50 hover:border-blue-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronUp size={14} />
                上一级
              </button>
            </div>

            {/* Central Vertical Line */}
            <div className="absolute left-1/2 top-20 bottom-8 w-[2px] bg-[#94a3b8] -translate-x-1/2 z-0"></div>

            {/* Managers */}
            <div className="flex flex-col items-center gap-8 relative w-full z-10">
              {currentManagers.map((manager) => (
                <OrgCard key={manager.id} data={manager} isManager={true} onClick={setSelectedPerson} />
              ))}
            </div>

            {/* Subordinates Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full max-w-[660px] mt-8 relative z-10">
              {orgData.subordinates.map((sub) => (
                <OrgCard key={sub.id} data={sub} isManager={false} onClick={setSelectedPerson} />
              ))}
            </div>
          </div>
        </div>

        {/* Floating Zoom Control */}
        <div className="absolute bottom-4 right-4 flex flex-col items-center bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-1 gap-1 z-30">
          <button 
            onClick={() => setZoom(prev => Math.min(2, prev + 0.1))} 
            className="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors"
            title="放大"
          >
            <Plus size={14}/>
          </button>
          <button 
            onClick={handleResetZoom}
            className="text-[10px] font-bold text-gray-500 w-10 text-center border-y border-gray-100 py-1 hover:bg-gray-50 transition-colors"
            title="重置缩放"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button 
            onClick={() => setZoom(prev => Math.max(0.1, prev - 0.1))} 
            className="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors"
            title="缩小"
          >
            <Minus size={14}/>
          </button>
        </div>
      </div>
      <div className="px-4 py-1 text-[10px] text-gray-400 border-t border-gray-50 bg-gray-50/30">
        提示：按住 Ctrl + 滚轮可放大缩小
      </div>

      {selectedPerson && (
        <PersonDetailDrawer
          isOpen={!!selectedPerson}
          onClose={() => setSelectedPerson(null)}
          person={selectedPerson}
        />
      )}
    </DashboardWidget>
  );
};
