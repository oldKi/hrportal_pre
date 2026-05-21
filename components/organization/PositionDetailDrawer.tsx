import React, { useState } from 'react';
import { X, ChevronDown, Contact, Clock, Calendar, Info, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_POSITIONS } from './mockData';

interface PositionDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position: any;
  onSelectPerson: (person: any) => void;
}

const CollapsibleSection = ({ title, children, defaultOpen = false, icon: HeaderIcon }: { title: string, children: React.ReactNode, defaultOpen?: boolean, icon?: any }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-gray-100">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {HeaderIcon ? (
            <div className="text-blue-600">
              <HeaderIcon size={18} />
            </div>
          ) : (
            isOpen ? <ChevronDown size={18} className="text-blue-600" /> : <ChevronRight size={18} className="text-gray-400" />
          )}
          <span className={`text-[15px] font-bold ${isOpen ? 'text-blue-600' : 'text-gray-700'}`}>{title}</span>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-10 pb-6 text-sm">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ChevronRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const BlueIconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-600 p-1 rounded text-white flex items-center justify-center">
    {children}
  </div>
);

export const PositionDetailDrawer: React.FC<PositionDetailDrawerProps & { onNavigate?: (view: string, params?: any) => void }> = ({ isOpen, onClose, position, onSelectPerson, onNavigate }) => {
  if (!position) return null;

  const parentPosition = position.parentId ? MOCK_POSITIONS[position.parentId] : null;
  const parentName = parentPosition 
    ? `${parentPosition.title} (${parentPosition.occupant || '空缺'})` 
    : '无';

  const positionNameFull = position.title.includes(position.department)
    ? position.title
    : `${position.department} ${position.title}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-[1px]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[101] h-full w-[480px] bg-white shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 relative">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h1 className="text-base font-bold text-gray-900">{position.title} ({position.externalId || '50093190'})</h1>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={onClose} className="p-1 text-blue-600 hover:text-blue-800 transition-colors">
                    <X size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {/* Position Detailed Info */}
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-[15px] font-bold text-gray-700 mb-4">岗位详细信息</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-[140px_1fr] items-center">
                    <span className="text-gray-400">生效日期</span>
                    <span className="font-medium text-gray-800">{position.effectiveDate || '2024 年 9 月 14 日'}</span>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] items-center">
                    <span className="text-gray-400">岗位编码</span>
                    <span className="font-medium text-gray-800">{position.code || '60111039'}</span>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] items-center">
                    <span className="text-gray-400">岗位名称 (全)</span>
                    <span className="font-bold text-gray-800">{positionNameFull}</span>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] items-center">
                    <span className="text-gray-400">标准岗位</span>
                    <span className="font-medium text-gray-800">{position.standardPosition || '项目经理 (50091819)'}</span>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] items-center">
                    <span className="text-gray-400">上级岗位</span>
                    <span className="font-medium text-gray-800">{parentName}</span>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] items-center">
                    <span className="text-gray-400">所属部门</span>
                    <span className="font-medium text-gray-800">{position.department}</span>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] items-center">
                    <span className="text-gray-400">所属公司</span>
                    <span className="font-medium text-gray-800">{position.company || '上汽大众 (8000)'}</span>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] items-center">
                    <span className="text-gray-400">人事子范围</span>
                    <span className="font-medium text-gray-800">{position.hrSubarea || '安亭本部-SVW Anting (9001)'}</span>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] items-center">
                    <span className="text-gray-400">人事范围</span>
                    <span className="font-medium text-gray-800">{position.hrArea || '上汽大众 (安亭) (0SVW)'}</span>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] items-center">
                    <span className="text-gray-400">成本中心</span>
                    <span className="font-medium text-gray-800">{position.costCenter || 'MP产品开发中心 (LA001)'}</span>
                  </div>
                </div>
              </div>
              
              {/* Personnel Link */}
              <div className="p-6">
                {position.isEmpty ? (
                  <div className="text-gray-400 font-medium text-sm italic">
                    该岗位目前处于空缺状态，暂无可关联的在职人员。
                  </div>
                ) : (
                  <button 
                    onClick={() => { onClose(); onNavigate?.('personnel-details', { personId: position.personId || 'default' }); }}
                    className="text-blue-600 font-bold text-sm hover:underline"
                  >
                    点击跳转个人档案
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const RotateCcw = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);
