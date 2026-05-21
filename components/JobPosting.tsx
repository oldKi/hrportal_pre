
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  ChevronRight, 
  Filter, 
  Clock, 
  Settings, 
  ChevronLeft, 
  X, 
  History,
  FileText,
  Download,
  Plus,
  Building2,
  MapPin,
  Mail,
  GraduationCap,
  Briefcase,
  Hash,
  Layers,
  User,
  CheckCircle2,
  CheckSquare,
  Square,
  ClipboardList,
  ShieldCheck,
  Target,
  FilterX,
  Calendar,
  Tag,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Info,
  Upload,
  ChevronDown,
  Pause,
  Eye,
  XCircle,
  MinusSquare,
  UserCircle,
  Edit3,
  Share2
} from 'lucide-react';
import { JobRequirement } from '../types';
import { JobRequirementForm } from './recruitment/JobRequirementForm';

// --- Column Definitions ---
const ALL_COLUMNS = [
  { id: 'reqCode', label: '需求编码', permanent: true },
  { id: 'latestOpTime', label: '最新操作时间', permanent: false },
  { id: 'latestOpType', label: '最新操作类型', permanent: false },
  { id: 'applyTime', label: '申请时间', permanent: false },
  { id: 'department', label: 'R3部门', permanent: false },
  { id: 'internalTitle', label: '招聘需求名称', permanent: false },
  { id: 'hiringManager', label: '需求部门经理', permanent: false },
  { id: 'status', label: '需求状态', permanent: false },
  { id: 'standardTitle', label: '岗位名称', permanent: false },
  { id: 'jobLevel', label: '能级', permanent: false },
  { id: 'headcount', label: '需求人数', permanent: false },
  { id: 'r1Code', label: 'R1部门', permanent: false },
  { id: 'r2Code', label: 'R2部门', permanent: false },
  { id: 'r3Code', label: 'R3部门', permanent: false },
  { id: 'laborType', label: '劳动关系', permanent: false },
  { id: 'workNature', label: '工作性质', permanent: false },
  { id: 'location', label: '工作地点', permanent: false },
  { id: 'createDate', label: '需求提出时间', permanent: false },
  { id: 'recruiterName', label: '招聘负责人', permanent: false },
  { id: 'originatorName', label: '岗位负责人', permanent: false },
  { id: 'hrbpName', label: 'HRBP', permanent: false },
];

const STATUS_MAP: Record<string, string> = {
  'Draft': '草稿',
  'Approving': '审批中',
  'Published': '进行中',
  'Paused': '已暂停',
  'Closed': '已关闭'
};

// --- Mock Data Generator ---
const generateMockReqs = (): JobRequirement[] => {
  const baseReqs: any[] = [];
  const depts = ['研发中心', '产品部', '市场部', '数字化部'];
  const managers = ['张大伟', '李小龙', '王美丽', '赵敏'];

  for (let i = 1; i <= 30; i++) {
    const statusKeys = Object.keys(STATUS_MAP);
    const currentStatus = statusKeys[i % 5] as any;
    const dateStr = `2024-03-${String(Math.ceil(i/2) + 10).padStart(2, '0')}`;
    const codePrefix = dateStr.replace(/-/g, '');
    const dailySeq = (i % 2 === 0) ? 2 : 1; // Resets sequence daily (for every 2 items in mock)
    
    const title = i === 10 ? `产品经理` : (i % 2 === 0 ? `高级Java开发工程师` : `资深产品经理`);

    baseReqs.push({
      id: `req-${i}`,
      reqNumber: `REQ-2024-${String(i).padStart(3, '0')}`,
      reqCode: `${codePrefix}-${String(dailySeq).padStart(3, '0')}`,
      title: title,
      externalTitle: title,
      internalTitle: title,
      standardTitle: i === 10 ? '产品经理' : (i % 2 === 0 ? '高级软件工程师' : '产品经理'),
      type: i % 2 === 0 ? 'Internal' : 'External',
      department: depts[i % 4],
      hiringManager: i === 10 ? '李小龙' : managers[i % 4],
      recruiterName: '陈招聘',
      originatorName: '王美丽',
      hrbpName: 'Lisa',
      hrbpEmail: 'lisa.bp@company.com',
      interviewerName: '面试评审委员会',
      recruitmentType: '社会招聘',
      laborType: '全日制劳动合同',
      workNature: '全职',
      jobLevel: i === 10 ? 'P7' : (i % 2 === 0 ? `P6` : `P7`),
      keywords: ['Java', 'Spring Cloud', 'Redis'],
      headcount: i === 10 ? 1 : (Math.floor(Math.random() * 5) + 1),
      filledCount: 0,
      status: currentStatus,
      applyTime: `${dateStr} 09:15`,
      createDate: `${dateStr} 09:00`,
      latestOpTime: `${dateStr} 16:45`,
      latestOpType: i % 3 === 0 ? '创建' : '更新',
      location: '上海嘉定',
      education: '本科',
      major: '计算机科学',
      otherRequirements: '具备德语基础优先',
      nonExternalNotes: '内部流程优先考虑高潜人才',
      r1Code: 'CF',
      r2Code: 'PLAT-SVC-02',
      r3Code: 'NODE-JS-GRP',
      description: '1. 负责公司核心系统的研发与调优；\n2. 参与技术方案设计与评审；\n3. 解决线上疑难问题，保证系统高可用。',
      requirements: '1. 5年以上相关经验；\n2. 扎实的技术功底；\n3. 优秀的抗压与沟通能力。',
      approvalFlow: [
        { id: 's1', role: 'Originator', name: '王美丽', status: 'Approved', date: `2024-03-15 09:30` },
        { id: 's2', role: 'K2BP_Notify', name: '赵敏 & Lisa', status: 'Approved', date: `2024-03-15 11:20` },
        { id: 's3', role: 'Recruiter', name: '陈招聘', status: 'Pending', date: '' }
      ],
      logs: [
        { id: 'l1', timestamp: `2024-03-15 10:00`, operator: '王美丽', action: 'Create', comment: '发起需求申请' }
      ]
    });
  }
  return baseReqs;
};

const MOCK_REQS = generateMockReqs();

// --- Components ---

const DetailInfoBlock: React.FC<{ 
  label: string; 
  value?: string | number; 
  mono?: boolean;
  isEditing?: boolean;
  onChange?: (val: string) => void;
}> = ({ label, value, mono, isEditing, onChange }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block pl-1">{label}</label>
    {isEditing ? (
      <input 
        type="text" 
        value={value || ''} 
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full border border-blue-200 rounded px-3 py-1.5 text-[13px] font-bold text-gray-800 outline-none focus:ring-1 focus:ring-blue-500 bg-white shadow-sm"
      />
    ) : (
      <div className="px-3 py-1.5 text-[13px] font-extrabold text-gray-800 bg-gray-50/30 rounded border border-transparent">
        <p className={`${mono ? 'font-mono' : ''}`}>{value || '--'}</p>
      </div>
    )}
  </div>
);

interface JobPostingProps {
  initialType?: 'External' | 'Internal';
  initialJobId?: string;
  initialPosition?: any;
}

export const JobPosting: React.FC<JobPostingProps> = ({ initialType, initialJobId, initialPosition }) => {
  const [viewMode, setViewMode] = useState<'list' | 'create-social' | 'create-campus' | 'detail'>('list');
  const [activeTab, setActiveTab] = useState<'External' | 'Internal'>(initialType || 'External');
  const [requirements, setRequirements] = useState<JobRequirement[]>(MOCK_REQS);
  const [currentReq, setCurrentReq] = useState<JobRequirement | null>(null);
  const [isEditingDetail, setIsEditingDetail] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const initializedJobIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (initialType) {
      setActiveTab(initialType);
    }
  }, [initialType]);

  useEffect(() => {
    if (initialPosition) {
      setViewMode('create-social');
    }
  }, [initialPosition]);

  useEffect(() => {
    if (initialJobId && initialJobId !== initializedJobIdRef.current) {
      const job = requirements.find(r => r.id === initialJobId);
      if (job) {
        setCurrentReq(job);
        setViewMode('detail');
        initializedJobIdRef.current = initialJobId;
      }
    }
  }, [initialJobId, requirements]);

  const [visibleColumnIds, setVisibleColumnIds] = useState<string[]>([
    'reqCode', 
    'latestOpTime', 
    'latestOpType', 
    'applyTime', 
    'department', 
    'internalTitle', 
    'hiringManager',
    'status'
  ]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [searchGlobal, setSearchGlobal] = useState('');
  const [selectedReqIds, setSelectedReqIds] = useState<Set<string>>(new Set());

  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState('');
  const itemsPerPage = 8;

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      setSortConfig(null);
      return;
    }
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    let result = requirements.filter(r => {
      if (r.type !== (activeTab === 'External' ? 'External' : 'Internal')) return false;
      if (searchGlobal && !r.title.toLowerCase().includes(searchGlobal.toLowerCase()) && !r.reqCode?.includes(searchGlobal)) return false;
      for (const key in filters) {
        if (filters[key]) {
          let itemVal = (r as any)[key]?.toString().toLowerCase() || '';
          if (key === 'status') itemVal = (STATUS_MAP[r.status] || r.status).toLowerCase();
          if (!itemVal.includes(filters[key].toLowerCase())) return false;
        }
      }
      return true;
    });

    if (sortConfig) {
      result.sort((a, b) => {
        let aVal = (a as any)[sortConfig.key];
        let bVal = (b as any)[sortConfig.key];

        if (sortConfig.key === 'status') {
           aVal = STATUS_MAP[a.status] || a.status;
           bVal = STATUS_MAP[b.status] || b.status;
        }

        if (typeof aVal === 'number' && typeof bVal === 'number') {
           return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }

        const strA = String(aVal || '').toLowerCase();
        const strB = String(bVal || '').toLowerCase();
        
        if (strA < strB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (strA > strB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [requirements, activeTab, searchGlobal, filters, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentTableData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleJumpPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const page = parseInt(pageInput);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        setPageInput('');
      }
    }
  };

  const renderStatusBadge = (status: string) => {
    const styles = {
      'Draft': 'bg-gray-100 text-gray-600 border-gray-200',
      'Approving': 'bg-blue-50 text-blue-600 border-blue-100',
      'Published': 'bg-green-100 text-green-700 border-green-200',
      'Paused': 'bg-orange-50 text-orange-600 border-orange-100',
      'Closed': 'bg-red-50 text-red-600 border-red-100'
    };
    // @ts-ignore
    return <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${styles[status] || 'bg-gray-100'}`}>{STATUS_MAP[status] || status}</span>;
  };

  const handleFieldChange = (field: string, val: any) => {
    if (!currentReq) return;
    setCurrentReq({ ...currentReq, [field]: val });
  };

  const handleSaveDetail = () => {
    if (!currentReq) return;
    setRequirements(prev => prev.map(r => r.id === currentReq.id ? currentReq : r));
    setIsEditingDetail(false);
    alert('保存成功');
  };

  const renderListView = () => {
    const isAllSelected = currentTableData.length > 0 && currentTableData.every(r => selectedReqIds.has(r.id));
    const isSomeSelected = currentTableData.some(r => selectedReqIds.has(r.id));

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
           <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold text-gray-800">
                {activeTab === 'External' ? '外招需求管理' : '内招需求管理'}
              </h2>
              {!initialType && (
                <div className="flex bg-gray-100 p-1 rounded-lg">
                   <button onClick={() => {setActiveTab('External'); setCurrentPage(1);}} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'External' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-50'}`}>外部招聘</button>
                   <button onClick={() => {setActiveTab('Internal'); setCurrentPage(1);}} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'Internal' ? 'bg-white text-gray-900 font-bold shadow-sm' : 'text-gray-50'}`}>内部竞聘</button>
                </div>
              )}
           </div>
           <div className="flex space-x-3 items-center">
              <button onClick={() => setShowImportModal(true)} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center shadow-sm active:scale-95"><Upload size={16} className="mr-2"/> 导入报表</button>
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center shadow-sm active:scale-95"><Download size={16} className="mr-2"/> 导出报表</button>
              
              <div className="relative">
                {activeTab === 'Internal' ? (
                  <button 
                    onClick={() => setViewMode('create-social')} 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-bold flex items-center shadow-md active:scale-95 transition-all"
                  >
                    <Plus size={16} className="mr-2"/> 创建需求
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => setShowCreateDropdown(!showCreateDropdown)} 
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-bold flex items-center shadow-md active:scale-95 transition-all"
                    >
                      <Plus size={16} className="mr-2"/> 创建需求 <ChevronDown size={14} className="ml-1" />
                    </button>
                    
                    {showCreateDropdown && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowCreateDropdown(false)}></div>
                        <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-100 z-20 overflow-hidden py-1 animate-scale-up origin-top-right">
                           <button onClick={() => { setViewMode('create-social'); setShowCreateDropdown(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center font-medium">社会招聘</button>
                           <button onClick={() => { setViewMode('create-campus'); setShowCreateDropdown(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center font-medium">校园招聘</button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
           </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4 bg-gray-50/30">
              <div className="flex items-center gap-4 flex-1">
                 <div className="relative max-w-md flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input type="text" placeholder="按关键词/标题/岗位..." value={searchGlobal} onChange={(e) => setSearchGlobal(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-inner" />
                 </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {selectedReqIds.size > 0 && (
                  <div className="flex items-center space-x-2 animate-fade-in bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                    <span className="text-[10px] font-bold text-blue-700 mr-2 uppercase tracking-tight">已选 {selectedReqIds.size} 项:</span>
                    <button className="flex items-center px-3 py-1 bg-white border border-orange-200 text-orange-600 rounded-lg text-[11px] font-bold hover:bg-orange-50 transition-all shadow-sm">
                       <Pause size={12} className="mr-1"/> 批量暂停
                    </button>
                    <button className="flex items-center px-3 py-1 bg-white border border-red-200 text-red-600 rounded-lg text-[11px] font-bold hover:bg-red-50 transition-all shadow-sm">
                       <XCircle size={12} className="mr-1"/> 批量关闭
                    </button>
                  </div>
                )}

                <div className="relative">
                  <button onClick={() => setShowFilterPanel(!showFilterPanel)} className={`flex items-center px-4 py-2.5 border rounded-lg text-sm shadow-sm transition-all ${showFilterPanel ? 'bg-blue-50 border-blue-500 text-blue-600 font-bold' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                    <Filter size={16} className="mr-2"/> 高级筛选
                  </button>
                  {showFilterPanel && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowFilterPanel(false)}></div>
                      <div className="absolute right-0 top-full mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-20 overflow-hidden animate-scale-up origin-top-right">
                          <div className="bg-gray-50/80 p-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-gray-800 text-sm flex items-center"><Settings size={16} className="mr-2 text-blue-600"/> 高级配置面板</h3>
                            <button onClick={() => setShowFilterPanel(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200"><X size={16}/></button>
                          </div>
                          <div className="p-6 grid grid-cols-12 gap-8 max-h-[550px] overflow-y-auto custom-scrollbar">
                            <div className="col-span-8 space-y-5">
                                <div className="flex justify-between items-center border-b border-gray-50 pb-2"><span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">属性过滤</span><button onClick={() => setFilters({})} className="text-[10px] text-blue-600 hover:underline flex items-center"><FilterX size={10} className="mr-1"/> 重置筛选</button></div>
                                <div className="grid grid-cols-2 gap-4">
                                  {ALL_COLUMNS.map(col => (
                                    <div key={`filter-${col.id}`} className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-500">{col.label}</label>
                                        <input type="text" value={filters[col.id] || ''} onChange={(e) => {setFilters({...filters, [col.id]: e.target.value}); setCurrentPage(1);}} className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 outline-none" placeholder={`输入${col.label}...`}/>
                                    </div>
                                  ))}
                                </div>
                            </div>
                            <div className="col-span-4 space-y-3 border-l border-gray-100 pl-6">
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-50 pb-2">可见列配置</span>
                                {ALL_COLUMNS.map(col => (
                                  <label key={`vis-${col.id}`} className={`flex items-center group cursor-pointer p-1.5 rounded transition-colors ${col.permanent ? 'opacity-50 cursor-default bg-gray-50' : 'hover:bg-blue-50'}`}>
                                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3" checked={visibleColumnIds.includes(col.id)} disabled={col.permanent} onChange={() => setVisibleColumnIds(prev => prev.includes(col.id) ? prev.filter(cid => cid !== col.id) : [...prev, col.id])}/>
                                      <span className={`text-[13px] ${visibleColumnIds.includes(col.id) ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>{col.label}</span>
                                  </label>
                                ))}
                            </div>
                          </div>
                          <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end"><button onClick={() => setShowFilterPanel(false)} className="bg-blue-600 text-white text-xs font-bold px-8 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition-all">确认应用</button></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200 uppercase tracking-wider text-[11px] font-bold">
                     <tr>
                        <th className="p-4 w-10">
                           <button onClick={() => { if(isAllSelected) setSelectedReqIds(new Set([...selectedReqIds].filter(id => !currentTableData.map(r => r.id).includes(id)))); else setSelectedReqIds(new Set([...selectedReqIds, ...currentTableData.map(r => r.id)])); }} className="text-gray-400 hover:text-blue-600">
                              {isAllSelected ? <CheckSquare size={18} className="text-blue-600"/> : isSomeSelected ? <MinusSquare size={18} className="text-blue-600"/> : <Square size={18}/>}
                           </button>
                        </th>
                        {ALL_COLUMNS.map(col => visibleColumnIds.includes(col.id) && (
                          <th 
                            key={col.id} 
                            className="p-4 cursor-pointer hover:bg-gray-100 transition-colors group/head"
                            onClick={() => handleSort(col.id)}
                          >
                             <div className="flex items-center space-x-1">
                                <span>{col.label}</span>
                                <div className={`transition-opacity ${sortConfig?.key === col.id ? 'opacity-100' : 'opacity-0 group-hover/head:opacity-40'}`}>
                                   {sortConfig?.key === col.id ? (
                                      sortConfig.direction === 'asc' ? <ArrowUp size={12} className="text-blue-600"/> : <ArrowDown size={12} className="text-blue-600"/>
                                   ) : (
                                      <ArrowUpDown size={12}/>
                                   )}
                                </div>
                             </div>
                          </th>
                        ))}
                        <th className="p-4 text-right pr-6">操作</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {currentTableData.map(req => (
                        <tr key={req.id} className={`hover:bg-blue-50/20 transition-colors group ${selectedReqIds.has(req.id) ? 'bg-blue-50/10' : ''}`}>
                           <td className="p-4">
                              <button onClick={() => { const s = new Set(selectedReqIds); if(s.has(req.id)) s.delete(req.id); else s.add(req.id); setSelectedReqIds(s); }} className="text-gray-400 hover:text-blue-600">{selectedReqIds.has(req.id) ? <CheckSquare size={18} className="text-blue-600"/> : <Square size={18}/>}</button>
                           </td>
                           {visibleColumnIds.includes('reqCode') && <td className="p-4 font-mono text-blue-600 font-bold">{req.reqCode || '--'}</td>}
                           {visibleColumnIds.includes('latestOpTime') && <td className="p-4 font-mono text-gray-500 text-xs">{req.latestOpTime || '--'}</td>}
                           {visibleColumnIds.includes('latestOpType') && <td className="p-4"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${req.latestOpType === '创建' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>{req.latestOpType || '--'}</span></td>}
                           {visibleColumnIds.includes('applyTime') && <td className="p-4 font-mono text-gray-400 text-xs">{req.applyTime || '--'}</td>}
                           {visibleColumnIds.includes('department') && <td className="p-4 text-gray-600">{req.department}</td>}
                           {visibleColumnIds.includes('internalTitle') && <td className="p-4 text-gray-600 text-sm whitespace-pre-wrap max-w-xs">{req.internalTitle}</td>}
                           {visibleColumnIds.includes('hiringManager') && <td className="p-4 text-gray-800 font-medium">{req.hiringManager}</td>}
                           {visibleColumnIds.includes('status') && <td className="p-4">{renderStatusBadge(req.status)}</td>}
                           {visibleColumnIds.includes('standardTitle') && <td className="p-4 text-gray-600">{req.standardTitle}</td>}
                           {visibleColumnIds.includes('jobLevel') && <td className="p-4"><span className="px-2 py-0.5 bg-gray-50 border rounded text-[10px] font-bold text-gray-500">{req.jobLevel}</span></td>}
                           {visibleColumnIds.includes('headcount') && <td className="p-4 font-bold text-gray-700">{req.headcount}</td>}
                           {visibleColumnIds.includes('r1Code') && <td className="p-4 font-mono text-gray-400">{req.r1Code}</td>}
                           {visibleColumnIds.includes('hrbpName') && <td className="p-4 text-gray-600">{req.hrbpName}</td>}
                           <td className="p-4 text-right pr-6">
                              <div className="flex justify-end items-center space-x-2">
                                 <button 
                                   className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors border border-transparent hover:border-orange-100"
                                   title="暂停"
                                 >
                                   暂停
                                 </button>
                                 <button 
                                   className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                   title="关闭"
                                 >
                                   关闭
                                 </button>
                                 <button 
                                   onClick={() => {setCurrentReq(req); setViewMode('detail'); setIsEditingDetail(true);}} 
                                   className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                                   title="编辑"
                                 >
                                   编辑
                                 </button>
                                 <button 
                                   onClick={() => {setCurrentReq(req); setViewMode('detail'); setIsEditingDetail(false);}} 
                                   className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                                   title="详情"
                                 >
                                   详情
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
              </table>
           </div>
           <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30 text-sm text-gray-500">
              <span>显示 {(currentPage - 1) * itemsPerPage + 1} 到 {Math.min(currentPage * itemsPerPage, filteredData.length)} 共 {filteredData.length} 条</span>
              <div className="flex items-center space-x-2">
                 <input 
                    type="text" 
                    className="w-10 px-2 py-1 border border-gray-200 rounded text-center text-xs focus:outline-none focus:border-blue-500" 
                    value={pageInput}
                    onChange={(e) => setPageInput(e.target.value)}
                    onKeyDown={handleJumpPage}
                    placeholder={String(currentPage)}
                    title="输入页码回车跳转"
                 />
                 <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="p-1.5 border border-gray-200 rounded hover:bg-white disabled:opacity-30"><ChevronLeft size={16} /></button>
                 <span className="text-gray-900 font-bold px-2">{currentPage} / {totalPages || 1}</span>
                 <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="p-1.5 border border-gray-200 rounded hover:bg-white disabled:opacity-30"><ChevronRight size={16} /></button>
              </div>
           </div>
        </div>

        {/* Import Modal */}
        {showImportModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col animate-scale-up overflow-hidden">
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                <div className="flex items-center text-blue-600">
                  <Upload size={20} className="mr-2" />
                  <h3 className="font-bold text-lg text-gray-800">导入招聘需求</h3>
                </div>
                <button onClick={() => setShowImportModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start">
                  <Info size={18} className="text-blue-600 mr-3 mt-0.5 shrink-0" />
                  <div className="text-sm text-blue-700 leading-relaxed">
                    请按照系统提供的标准模板填写需求信息，确保字段格式正确。导入成功后需求将进入“草稿”状态。
                  </div>
                </div>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-50 hover:border-blue-300 hover:bg-blue-50/10 transition-all cursor-pointer group">
                  <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={32} className="text-blue-600" />
                  </div>
                  <p className="text-sm font-bold text-gray-800">点击或将文件拖拽到这里上传</p>
                  <p className="text-xs text-gray-400 mt-1">支持扩展名：.xls, .xlsx</p>
                </div>
                <div className="flex justify-center">
                  <button className="text-blue-600 text-sm font-medium hover:underline flex items-center">
                    <Download size={14} className="mr-1.5" /> 下载报表模版
                  </button>
                </div>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <button onClick={() => setShowImportModal(false)} className="px-6 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 font-medium">取消</button>
                <button onClick={() => { alert('文件解析中...'); setShowImportModal(false); }} className="px-8 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md transition-all active:scale-95">开始上传</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDetailView = () => {
    if (!currentReq) return null;
    return (
      <div className="space-y-6 animate-fade-in pb-24 relative">
         <div className="flex justify-between items-center px-1">
            <button onClick={() => setViewMode('list')} className="flex items-center text-sm text-gray-500 cursor-pointer hover:text-gray-800 font-bold transition-colors group">
               <ChevronLeft className="mr-1 group-hover:-translate-x-1 transition-transform" size={18}/> 返回需求列表
            </button>
            <div className="text-sm text-gray-400 font-mono tracking-tight font-medium flex items-center bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
               <Hash size={14} className="mr-1.5 text-blue-500"/> 需求编码: {currentReq.reqCode || '--'}
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden border-t-4 border-t-blue-500">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                     <div className="flex items-center">
                        <FileText size={18} className="mr-2 text-blue-600" />
                        <h3 className="font-bold text-gray-800 text-[15px]">职位招聘需求详细报告</h3>
                     </div>
                     {!isEditingDetail && (
                       <button onClick={() => setIsEditingDetail(true)} className="text-xs text-blue-600 font-bold flex items-center hover:underline">
                         <Edit3 size={14} className="mr-1"/> 编辑报告内容
                       </button>
                     )}
                  </div>
                  
                  <div className="p-8 space-y-12">
                     <section className="space-y-6">
                        <h4 className="text-xs font-bold text-blue-600 flex items-center uppercase tracking-widest border-b border-blue-50 pb-2"><Building2 size={14} className="mr-2"/> 职位基本信息</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-6">
                           <DetailInfoBlock isEditing={isEditingDetail} onChange={(v) => handleFieldChange('r1Code', v)} label="R1 部门" value={currentReq.r1Code} mono />
                           <DetailInfoBlock isEditing={isEditingDetail} onChange={(v) => handleFieldChange('r2Code', v)} label="R2 部门" value={currentReq.r2Code} mono />
                           <DetailInfoBlock isEditing={isEditingDetail} onChange={(v) => handleFieldChange('r3Code', v)} label="R3 部门" value={currentReq.r3Code} mono />
                           <DetailInfoBlock isEditing={isEditingDetail} onChange={(v) => handleFieldChange('standardTitle', v)} label="岗位名称" value={currentReq.standardTitle} />
                           <DetailInfoBlock isEditing={isEditingDetail} onChange={(v) => handleFieldChange('recruitmentType', v)} label="招聘方式" value={currentReq.recruitmentType} />
                           <DetailInfoBlock isEditing={isEditingDetail} onChange={(v) => handleFieldChange('jobLevel', v)} label="需求能级" value={currentReq.jobLevel} />
                           <DetailInfoBlock isEditing={isEditingDetail} label="岗位类型" value="技术类" />
                           <DetailInfoBlock isEditing={isEditingDetail} onChange={(v) => handleFieldChange('headcount', v)} label="需求人数" value={currentReq.headcount} />
                           <DetailInfoBlock isEditing={isEditingDetail} onChange={(v) => handleFieldChange('hiringManager', v)} label="负责人" value={currentReq.hiringManager} />
                           <DetailInfoBlock isEditing={isEditingDetail} onChange={(v) => handleFieldChange('hrbpName', v)} label="对应 HRBP" value={currentReq.hrbpName} />
                           <DetailInfoBlock isEditing={isEditingDetail} label="部门经理" value="John Manager" />
                        </div>
                     </section>

                     <section className="space-y-6">
                        <h4 className="text-xs font-bold text-blue-600 flex items-center uppercase tracking-widest border-b border-blue-50 pb-2"><Info size={14} className="mr-2"/> 详情要求</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-6">
                           <DetailInfoBlock isEditing={isEditingDetail} onChange={(v) => handleFieldChange('interviewerName', v)} label="面试官/评审组" value={currentReq.interviewerName} />
                           <DetailInfoBlock isEditing={isEditingDetail} onChange={(v) => handleFieldChange('education', v)} label="学历要求" value={currentReq.education} />
                           <DetailInfoBlock isEditing={isEditingDetail} onChange={(v) => handleFieldChange('major', v)} label="专业要求" value={currentReq.major} />
                           <DetailInfoBlock isEditing={isEditingDetail} onChange={(v) => handleFieldChange('otherRequirements', v)} label="其他要求" value={currentReq.otherRequirements} />
                        </div>
                     </section>

                     <section className="space-y-8 border-2 border-dashed border-purple-100 p-8 rounded-2xl bg-purple-50/5">
                        <div className="space-y-3">
                           <h4 className="text-xs font-bold text-blue-600 flex items-center uppercase tracking-widest border-b border-blue-50 pb-2"><Tag size={14} className="mr-2"/> 关键词</h4>
                           {isEditingDetail ? (
                              <input 
                                type="text" 
                                value={currentReq.keywords?.join(', ') || ''} 
                                onChange={(e) => handleFieldChange('keywords', e.target.value.split(',').map(s => s.trim()))}
                                className="w-full border border-blue-200 rounded px-4 py-2 text-sm font-bold text-gray-800 outline-none focus:ring-1 focus:ring-blue-500 bg-white shadow-sm"
                              />
                           ) : (
                             <div className="flex flex-wrap gap-2">
                                {currentReq.keywords?.map((kw, idx) => (
                                   <span key={idx} className="flex items-center px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[11px] font-bold border border-blue-100">
                                      <Tag size={10} className="mr-1 text-blue-400"/> {kw}
                                   </span>
                                ))}
                             </div>
                           )}
                        </div>

                        <div className="space-y-3">
                           <h4 className="text-xs font-bold text-blue-600 flex items-center uppercase tracking-widest border-b border-blue-50 pb-3"><ClipboardList size={18} className="mr-2"/> 工作职责</h4>
                           {isEditingDetail ? (
                              <textarea 
                                value={currentReq.description} 
                                onChange={(e) => handleFieldChange('description', e.target.value)}
                                className="w-full border border-gray-300 rounded px-4 py-3 text-[13px] font-medium text-gray-800 outline-none focus:ring-1 focus:ring-blue-500 bg-white h-32 shadow-sm"
                              />
                           ) : (
                             <div className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                                {currentReq.description}
                             </div>
                           )}
                        </div>

                        <div className="space-y-3">
                           <h4 className="text-xs font-bold text-blue-600 flex items-center uppercase tracking-widest border-b border-blue-50 pb-3"><Target size={18} className="mr-2"/> 任职资格</h4>
                           {isEditingDetail ? (
                              <textarea 
                                value={currentReq.requirements} 
                                onChange={(e) => handleFieldChange('requirements', e.target.value)}
                                className="w-full border border-gray-300 rounded px-4 py-3 text-[13px] font-medium text-gray-800 outline-none focus:ring-1 focus:ring-blue-500 bg-white h-32 shadow-sm"
                              />
                           ) : (
                             <div className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                                {currentReq.requirements}
                             </div>
                           )}
                        </div>
                     </section>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
               <div className="sticky top-20 space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                     <h3 className="font-bold text-gray-800 mb-8 flex items-center text-sm uppercase tracking-widest border-b border-gray-50 pb-4">
                        <ShieldCheck size={18} className="mr-2 text-green-600"/> 审批进度
                     </h3>
                     <div className="space-y-0 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                        {currentReq.approvalFlow?.map((step: any, i: number) => {
                           const roleLabels: Record<string, string> = {
                              'Originator': `1. 创建`,
                              'K2BP_Notify': `2. 通知 k2和bp`,
                              'Recruiter': `3. 招聘负责人审批`
                           };
                           
                           const isActuallyApproved = i < 2; 

                           return (
                              <div key={i} className="flex items-start space-x-4 relative pl-8 pb-8 last:pb-0">
                                 <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 ${
                                    isActuallyApproved ? 'bg-green-500' : 'bg-blue-500 animate-pulse'
                                 }`}>
                                    {isActuallyApproved ? <CheckCircle2 size={12} className="text-white"/> : <Clock size={12} className="text-white"/>}
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                       <span className="text-xs font-bold text-gray-700">{roleLabels[step.role] || step.role}</span>
                                       {step.date ? (
                                         <span className="text-[10px] font-mono text-gray-400">{step.date}</span>
                                       ) : (
                                         i === 0 ? <span className="text-[10px] font-mono text-gray-400">2024-03-15 09:30</span> :
                                         i === 1 ? <span className="text-[10px] font-mono text-gray-400">2024-03-15 11:20</span> : null
                                       )}
                                    </div>
                                    <div className="text-[11px] text-gray-500 flex items-center">
                                       <UserCircle size={10} className="mr-1 text-blue-500"/> <span className="font-bold text-gray-700">{step.name}</span>
                                       <span className={`ml-2 px-1.5 rounded-[4px] border ${
                                          isActuallyApproved ? 'bg-green-50 text-green-600 border-green-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                                       } text-[9px] font-bold`}
                                       >
                                          {isActuallyApproved ? (i === 1 ? '已通知' : '已通过') : '待审批'}
                                       </span>
                                       {i === 1 && (
                                         <span className="ml-2 flex items-center text-[9px] font-bold text-blue-500">
                                            <Share2 size={10} className="mr-0.5" /> 已推送
                                         </span>
                                       )}
                                    </div>
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                     <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-3">
                        <h3 className="font-bold text-gray-800 flex items-center text-sm">
                           <History size={18} className="mr-2 text-purple-600"/> 变更历史记录
                        </h3>
                        <button 
                          onClick={() => alert('正在导出日志明细报表...')}
                          className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center bg-blue-50 px-2 py-1 rounded border border-blue-100 transition-colors shadow-sm active:scale-95"
                        >
                          <Download size={12} className="mr-1"/> 导出明细
                        </button>
                     </div>
                     <div className="space-y-8 relative px-1 pt-2">
                        <div className="absolute left-[13px] top-4 bottom-8 w-0.5 bg-gray-100"></div>
                        {currentReq.logs?.map((log: any) => (
                           <div key={log.id} className="relative pl-8">
                              <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ring-2 ring-white ${log.action === 'Create' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                              <div className="text-[10px] text-gray-400 mb-1 font-mono font-bold tracking-tight">{log.timestamp}</div>
                              <div className="text-[12px] font-extrabold text-gray-800">
                                 {log.operator} 执行了 <span className="text-blue-600">{log.action === 'Create' ? '创建' : '修改'}</span>
                              </div>
                              {log.comment && <div className="text-[11px] text-gray-400 mt-1 italic border-l-2 border-gray-200 pl-2">“{log.comment}”</div>}
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="fixed bottom-0 right-0 left-0 md:left-16 lg:left-16 bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 z-50 flex justify-end items-center gap-4 px-8 shadow-2xl">
            {isEditingDetail ? (
               <>
                 <button onClick={() => setIsEditingDetail(false)} className="px-6 py-2.5 bg-white border border-gray-300 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">取消修改</button>
                 <button onClick={handleSaveDetail} className="px-10 py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 shadow-lg shadow-green-200 transition-all active:scale-95">保存</button>
               </>
            ) : (
               <>
                 <button className="px-6 py-2.5 bg-white border border-red-500 text-red-500 rounded-xl text-sm font-bold hover:bg-red-50 transition-colors">退回修正</button>
                 <button className="px-10 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">审批通过并发布职位</button>
               </>
            )}
         </div>
      </div>
    );
  };

  return (
    <div className="font-sans">
       {viewMode === 'list' && renderListView()}
       {viewMode === 'create-social' && <JobRequirementForm type="social" onBack={() => setViewMode('list')} initialPosition={initialPosition} />}
       {viewMode === 'create-campus' && <JobRequirementForm type="campus" onBack={() => setViewMode('list')} initialPosition={initialPosition} />}
       {viewMode === 'detail' && renderDetailView()}
    </div>
  );
};
