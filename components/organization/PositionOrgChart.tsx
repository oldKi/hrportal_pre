
import React from 'react';
import { User, Plus, UserPlus } from 'lucide-react';

interface FTEPosition {
  id: string;
  code: string;
  department: string;
  shortTitle: string;
  fullTitle: string;
  occupant?: {
    name: string;
    avatar?: string;
  };
  subordinateCount?: number;
  children?: FTEPosition[];
}

const MOCK_FTE_DATA: FTEPosition = {
  id: 'P0075',
  code: 'P0075',
  department: 'HSSEQ',
  shortTitle: 'Director',
  fullTitle: 'Senior HSSEQ Director',
  occupant: {
    name: 'Kenneth Scannell',
    avatar: 'KS'
  },
  subordinateCount: 15,
  children: [
    {
      id: 'P0129',
      code: 'P0129',
      department: 'HSSEQ',
      shortTitle: 'Senior Manager',
      fullTitle: '環安卫副总监',
      occupant: {
        name: 'Andrea Ferdinands',
        avatar: 'AF'
      }
    },
    {
      id: 'P0158',
      code: 'P0158',
      department: 'HSSEQ',
      shortTitle: 'Executive',
      fullTitle: 'HSSEQ Senior Quality Manager',
    },
    {
      id: 'P0164',
      code: 'P0164',
      department: 'HSSEQ',
      shortTitle: 'Executive',
      fullTitle: 'Deputy HSSEQ Manager',
    },
    {
      id: 'P0200',
      code: 'P0200',
      department: 'HSSEQ',
      shortTitle: 'Executive',
      fullTitle: 'HSSEQ Senior Quality Manager',
    }
  ]
};

const PositionCard: React.FC<{ data: FTEPosition; isRoot?: boolean; compact?: boolean }> = ({ data, isRoot, compact }) => {
  return (
    <div className="flex flex-col items-center">
      <div className={`bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col relative transition-transform hover:scale-105 ${
        compact ? 'w-44 p-4' : 'w-64 p-6'
      }`}>
        {/* Top Info */}
        <div className={`${compact ? 'space-y-0.5 mb-3' : 'space-y-1 mb-6'}`}>
          <div className="flex items-center gap-1.5 flex-wrap">
            {data.department && <span className={`${compact ? 'text-xs' : 'text-sm'} text-gray-500 font-medium`}>{data.department}</span>}
            <div className={`${compact ? 'text-[11px]' : 'text-xs'} text-gray-900 font-bold truncate`}>{data.fullTitle}</div>
            {!data.occupant && (
              <button 
                className="p-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
                title="创建招聘需求"
                onClick={(e) => {
                  e.stopPropagation();
                  alert('正在跳转到创建招聘需求页面...');
                }}
              >
                <UserPlus size={compact ? 10 : 12} />
              </button>
            )}
          </div>
        </div>

        {/* Occupant */}
        <div className={`flex items-center space-x-2 ${compact ? 'mb-1 mt-1' : 'mb-2 mt-2'}`}>
          {data.occupant ? (
            <>
              <div className={`${compact ? 'w-7 h-7' : 'w-10 h-10'} rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-[10px]`}>
                {data.occupant.avatar || <User size={compact ? 14 : 20} />}
              </div>
              <div className="text-gray-900 text-[11px] font-medium truncate">{data.occupant.name}</div>
            </>
          ) : (
            <div className="flex items-center space-x-2 opacity-60">
              <div className={`${compact ? 'w-7 h-7' : 'w-10 h-10'} rounded-full border border-dashed border-blue-400 flex items-center justify-center text-blue-400`}>
                <Plus size={compact ? 14 : 20} />
              </div>
              <div className="text-gray-400 text-[10px]">空缺</div>
            </div>
          )}
        </div>

        {/* Extra Info */}
        <div className="mt-auto">
          {data.subordinateCount && (
            <div className={`${compact ? 'text-[9px]' : 'text-xs'} text-blue-500 font-medium mt-1 cursor-pointer hover:underline`}>
              {data.subordinateCount}个下属职位
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const PositionOrgChart: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  return (
    <div className={`${compact ? '' : 'w-full h-full bg-gray-50 p-8 overflow-auto'} flex flex-col items-center custom-scrollbar`}>
      {/* Top Navigation */}
      {!compact && (
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors mb-12 flex items-center">
          向上一个级别
        </button>
      )}

      <div className={`flex flex-col items-center ${compact ? 'mt-2' : ''}`}>
        {/* Root Node */}
        <div className="relative">
          <PositionCard data={MOCK_FTE_DATA} isRoot compact={compact} />
          {/* Connector Down */}
          {MOCK_FTE_DATA.children && (
            <div className={`absolute left-1/2 w-0.5 bg-gray-400 -translate-x-1/2 ${compact ? 'bottom-[-20px] h-5' : 'bottom-[-48px] h-12'}`}></div>
          )}
        </div>

        {/* Children Grid */}
        {MOCK_FTE_DATA.children && (
          <div className={`${compact ? 'mt-5' : 'mt-12'} relative`}>
            {/* Horizontal Connector Line */}
            <div className={`absolute top-0 bg-gray-400 h-0.5 ${compact ? 'left-[22px] right-[22px]' : 'left-[32px] right-[32px]'}`}></div>
            
            <div className={`flex ${compact ? 'gap-3' : 'gap-8'} px-2`}>
              {MOCK_FTE_DATA.children.map((child, idx) => (
                <div key={child.id} className={`relative ${compact ? 'pt-5' : 'pt-12'}`}>
                  {/* Vertical connector line for each child */}
                  <div className={`absolute top-0 left-1/2 w-0.5 bg-gray-400 -translate-x-1/2 ${compact ? 'h-5' : 'h-12'}`}></div>
                  <PositionCard data={child} compact={compact} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
