import React, { useState } from 'react';
import { X, ChevronDown, Search, User, LayoutGrid, MoreHorizontal, Users, Info, ExternalLink, Contact, Network } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_DEPARTMENTS } from './mockData';

interface DepartmentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  department: any;
  onSelectPerson: (person: any) => void;
  defaultSection?: 'info' | 'personnel' | 'positions';
}

const CollapsibleSection = ({ title, children, isOpen, onToggle, icon: HeaderIcon }: { title: string, children: React.ReactNode, isOpen: boolean, onToggle: () => void, icon?: any }) => {
  return (
    <div className="border-b border-gray-100">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <BlueIconWrapper>
            {HeaderIcon ? <HeaderIcon size={14} /> : <Info size={14} />}
          </BlueIconWrapper>
          <span className={`text-[15px] font-bold ${isOpen ? 'text-blue-600' : 'text-gray-700'}`}>{title}</span>
        </div>
        {isOpen ? <ChevronDown size={18} className="text-blue-600" /> : <ChevronRight size={18} className="text-gray-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-gray-50/30"
          >
            <div className="px-6 py-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper for ChevronRight since it's not imported
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

const CardLinkIcon = () => (
  <svg 
    width="18" 
    height="14" 
    viewBox="0 0 20 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="inline-block align-middle ml-1.5 cursor-pointer text-[#0066FF] hover:text-blue-800 transition-colors"
  >
    <rect x="0.5" y="0.5" width="19" height="15" rx="2" fill="white" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="5.5" cy="6.5" r="2.5" fill="currentColor"/>
    <path d="M2.5 13C2.5 11 4.5 10.5 5.5 10.5C6.5 10.5 8.5 11 8.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="11" y1="4.5" x2="16.5" y2="4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="11" y1="8" x2="16.5" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="11" y1="11.5" x2="15" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const InfoRow = ({ label, required, value, icon }: { label: string; required?: boolean; value: React.ReactNode; icon?: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-[140px_1fr] items-start gap-4 py-1 text-[13.5px] leading-6">
      <div className="text-right text-gray-500 select-none flex-shrink-0">
        <span>{label}</span>
        {required && <span className="text-red-500 ml-1 font-bold">*</span>}
      </div>
      <div className="text-gray-900 font-normal flex items-center gap-1.5 flex-wrap flex-1 min-w-0">
        <span className="break-all">{value}</span>
        {icon}
      </div>
    </div>
  );
};

export const DepartmentDetailModal: React.FC<DepartmentDetailModalProps> = ({ isOpen, onClose, department, onSelectPerson, defaultSection = 'info' }) => {
  const [openSection, setOpenSection] = useState<string | null>(defaultSection);

  // Sync section if defaultSection changes (though usually modal re-mounts)
  React.useEffect(() => {
    setOpenSection(defaultSection);
  }, [defaultSection, isOpen]);

  if (!department) return null;

  const dept = MOCK_DEPARTMENTS[department.id] || department;
  const personnel = dept.personnel || [];
  const positions = dept.positions || [];

  const parentDept = dept.parentId ? MOCK_DEPARTMENTS[dept.parentId] : null;
  const parentText = parentDept ? `${parentDept.name} (${parentDept.externalId})` : '无';

  const formatLeader = (l: any) => {
    if (!l) return '无';
    if (typeof l === 'string') return l;
    if (l.name === '席诺德') {
      return 'HillesKnut 席诺德 (81063)';
    }
    const parts = [];
    if (l.name) parts.push(l.name);
    if (l.enName) parts.push(l.enName);
    const nameStr = parts.join(' ');
    if (l.id) {
      return `${nameStr} (${l.id})`;
    }
    return nameStr || '无';
  };

  const renderLeaders = () => {
    if (dept.leaders && dept.leaders.length > 0) {
      return dept.leaders.map((leader: any, idx: number) => (
        <InfoRow 
          key={idx} 
          label="负责人" 
          value={formatLeader(leader)} 
        />
      ));
    }
    return (
      <InfoRow 
        label="负责人" 
        value={formatLeader(dept.leader)} 
      />
    );
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

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
                  <h2 className="text-gray-400 text-[13px] font-bold uppercase tracking-wider mb-1">部门详情</h2>
                  <h1 className="text-lg font-bold text-gray-900">{dept.name}</h1>
                  <p className="text-gray-500 text-sm">{dept.externalId} | {dept.code}</p>
                </div>
                <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <CollapsibleSection 
                title="基本信息" 
                icon={Info}
                isOpen={openSection === 'info'} 
                onToggle={() => toggleSection('info')}
              >
                <div className="space-y-1">
                  <InfoRow label="生效日期" required value={dept.effectiveDate || '2025 年 5 月 14 日'} />
                  <InfoRow label="状态" required value={dept.status || '活动'} />
                  <InfoRow label="部门编码" required value={dept.externalId || '50000300'} />
                  <InfoRow label="部门名称（中文）" required value={dept.name} />
                  <InfoRow label="部门名称（英文）" required value={dept.nameEn || 'Information System'} />
                  <InfoRow label="部门代号" required value={dept.code} />
                  <InfoRow 
                    label="上级部门" 
                    required 
                    value={parentText} 
                    icon={parentDept ? <CardLinkIcon /> : null} 
                  />
                  <InfoRow label="汇报层级" required value={dept.reportingLevel || 'R1 (R1)'} />
                  <InfoRow label="部门级别" value={dept.deptLevel || 'TM/UM'} />
                  <InfoRow 
                    label="成本中心" 
                    required 
                    value={dept.costCenter || 'CI信息系统 (84000)'} 
                    icon={<CardLinkIcon />} 
                  />
                  <InfoRow label="人事子范围" required value={dept.hrSubarea || '安亭本部-SVW Anting (9001)'} />
                  <InfoRow label="人事范围" required value={dept.hrArea || '上汽大众 (安亭) (0SVW)'} />
                  {renderLeaders()}
                </div>
              </CollapsibleSection>


              <CollapsibleSection 
                title={`岗位汇报人员 (${personnel.length})`} 
                icon={Users}
                isOpen={openSection === 'personnel'} 
                onToggle={() => toggleSection('personnel')}
              >
                <div className="space-y-3">
                  {personnel.length > 0 ? personnel.map((person: any) => (
                    <div 
                      key={person.id} 
                      onClick={() => onSelectPerson(person)}
                      className="flex items-center gap-3 p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                        {person.avatar ? <img src={person.avatar} className="w-full h-full object-cover" /> : <User className="w-5 h-5 m-2.5 text-gray-400" />}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-sm">{person.name}</div>
                        <div className="text-gray-500 text-xs">{person.title}</div>
                      </div>
                    </div>
                  )) : <div className="text-gray-400 text-center py-4 italic">暂无人员数据</div>}
                </div>
              </CollapsibleSection>

              <CollapsibleSection 
                title={`职位列表 (${positions.length})`} 
                icon={Network}
                isOpen={openSection === 'positions'} 
                onToggle={() => toggleSection('positions')}
              >
                <div className="space-y-3">
                  {positions.length > 0 ? positions.map((pos: any) => (
                    <div key={pos.id} className="p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-gray-800 text-sm">{pos.title}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${pos.status === '已占' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                          {pos.status}
                        </span>
                      </div>
                      <div className="text-gray-500 text-xs flex items-center gap-1">
                        <User size={12} />
                        {pos.occupant}
                      </div>
                    </div>
                  )) : <div className="text-gray-400 text-center py-4 italic">暂无职位数据</div>}
                </div>
              </CollapsibleSection>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
