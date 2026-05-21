import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Filter, 
  Search, 
  MoreHorizontal, 
  User, 
  CheckCircle, 
  RefreshCw, 
  ExternalLink, 
  Globe, 
  Users, 
  Settings, 
  ChevronRight, 
  ChevronDown,
  Eye,
  FileText,
  X, 
  GripVertical 
} from 'lucide-react';
import { 
  FunnelChart, 
  Funnel, 
  LabelList, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { JobPosting, Candidate } from '../types';

interface RecruitmentProps {
  onNavigate?: (view: string) => void;
  type?: 'internal' | 'external';
  view?: 'jobs' | 'candidates';
}

// Mock Data for External Recruitment (招聘管理)
const externalJobPostings: JobPosting[] = [
  { 
    id: 'e1', 
    title: '高级前端工程师', 
    department: '技术部', 
    applicants: 156, 
    status: 'Published', 
    publishDate: '2024-03-01',
    beisenStats: { interviewing: 12, passed: 4, offerSent: 2, offerConfirmed: 1 }
  },
  { 
    id: 'e2', 
    title: '销售总监', 
    department: '销售部', 
    applicants: 48, 
    status: 'Published', 
    publishDate: '2024-02-20',
    beisenStats: { interviewing: 5, passed: 2, offerSent: 1, offerConfirmed: 1 }
  },
  { 
    id: 'e3', 
    title: '市场营销经理', 
    department: '市场部', 
    applicants: 92, 
    status: 'Draft', 
    publishDate: '-',
    beisenStats: { interviewing: 0, passed: 0, offerSent: 0, offerConfirmed: 0 }
  },
];

// Mock Data for Internal Recruitment
const internalJobPostings: JobPosting[] = [
  { 
    id: 'i1', 
    title: '产品经理 (内部竞聘)', 
    department: '产品部', 
    applicants: 5, 
    status: 'Published', 
    publishDate: '2024-03-10',
    beisenStats: undefined
  },
  { 
    id: 'i2', 
    title: '行政主管', 
    department: '行政部', 
    applicants: 3, 
    status: 'Published', 
    publishDate: '2024-03-05',
    beisenStats: undefined
  },
];

const externalFunnelData = [
  { name: '简历初筛', count: 125 },
  { name: '复筛', count: 68 },
  { name: '电话面试', count: 32 },
  { name: '复试', count: 15 },
  { name: 'offer', count: 8 },
  { name: '入职', count: 5 },
];

const internalFunnelData = [
  { name: '申请', count: 8 },
  { name: '部门面试', count: 5 },
  { name: 'HRBP面谈', count: 3 },
  { name: '异动审批', count: 2 },
  { name: '调岗完成', count: 1 },
];

// Mock Candidates Data
const mockCandidates: Candidate[] = [
  { id: 'C00000165', name: '王小明', gender: '男', age: 26, degree: '硕士研究生', experience: '3年', latestScreener: '张三', applyDate: '2024-03-15', status: 'DeptScreening' },
  { id: 'C00000164', name: '李晓华', gender: '女', age: 24, degree: '本科', experience: '1年', latestScreener: '李四', applyDate: '2024-03-14', status: 'Initial' },
  { id: 'C00000163', name: '陈志强', gender: '男', age: 26, degree: '本科', experience: '5年', latestScreener: '王五', applyDate: '2020-07-20', status: 'FirstInterview' },
  { id: 'C00000162', name: '刘芳', gender: '女', age: 28, degree: '硕士研究生', experience: '4年', latestScreener: '张三', applyDate: '2024-03-12', status: 'DeptScreening' },
  { id: 'C00000161', name: '赵伟', gender: '男', age: 30, degree: '本科', experience: '8年', latestScreener: '系统自动', applyDate: '2024-03-10', status: 'Initial' },
  { id: 'C00000160', name: '孙梅', gender: '女', age: 25, degree: '本科', experience: '2年', latestScreener: '李四', applyDate: '2024-03-09', status: 'WrittenTest' },
];

// Available Columns Configuration
const allColumns = [
  { id: 'id', label: '应聘者ID', required: true },
  { id: 'name', label: '姓名', required: true },
  { id: 'gender', label: '性别', required: false },
  { id: 'age', label: '年龄', required: false },
  { id: 'degree', label: '最高学历', required: false },
  { id: 'experience', label: '工作年限', required: false },
  { id: 'latestScreener', label: '最近筛选人', required: false },
  { id: 'applyDate', label: '申请创建时间', required: false },
];

// New Interface for Job Detail View Data
interface PipelineStage {
  id: string;
  label: string;
  count: number;
  active?: boolean;
}

interface JobCandidateDetail {
  id: string;
  name: string;
  status: string;
  referrer: string;
  type: string;
  score: number;
  source: string;
  phone: string;
  lastUpdated: string;
}

export const Recruitment: React.FC<RecruitmentProps> = ({ onNavigate, type = 'external', view = 'jobs' }) => {
  const isExternal = type === 'external';
  const data = isExternal ? externalJobPostings : internalJobPostings;
  const funnelData = isExternal ? externalFunnelData : internalFunnelData;

  // Candidate View States
  const [activeStage, setActiveStage] = useState('All');
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['id', 'name', 'gender', 'age', 'degree', 'experience', 'latestScreener', 'applyDate']);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  useEffect(() => {
    setSelectedJob(null);
  }, [type, view]);

  const toggleColumn = (columnId: string) => {
    if (visibleColumns.includes(columnId)) {
      setVisibleColumns(visibleColumns.filter(id => id !== columnId));
    } else {
      setVisibleColumns([...visibleColumns, columnId]);
    }
  };

  const stages = [
    { id: 'All', label: '全部简历', count: 211 },
    { id: 'Initial', label: '简历初筛', count: 156 },
    { id: 'DeptScreening', label: '用人部门筛选', count: 27 },
    { id: 'WrittenTest', label: '笔试', count: 3 },
    { id: 'FirstInterview', label: '初试', count: 17 },
    { id: 'SecondInterview', label: '复试', count: 1 },
  ];

  // Mock data for the specific job view (from screenshot)
  const pipelineStages: PipelineStage[] = [
    { id: 'forwarded', label: '已转发', count: 3 },
    { id: 'invited', label: '已发送申请邀请', count: 0 },
    { id: 'new', label: '新申请人', count: 1 },
    { id: 'screen1', label: '简历初筛', count: 1 },
    { id: 'screen2', label: '简历复筛', count: 1 },
    { id: 'interview', label: '面试', count: 3, active: true },
    { id: 'background', label: '背景核查', count: 1 },
    { id: 'test', label: '综合能力测试', count: 1 },
    { id: 'offer', label: 'Offer', count: 1 },
    { id: 'pre-hire', label: '准备录用', count: 1, active: false }, // Updated based on description, but screenshot shows 3 interview active
    { id: 'hired', label: '已录用', count: 0 },
    { id: 'onboarded', label: '入职', count: 2 },
    { id: 'rejected', label: '不成功', count: 0 },
    { id: 'cancelled', label: '已自动取消资格', count: 0 },
    { id: 'closed', label: '申请已关闭', count: 0 },
  ];

  const jobCandidateList: JobCandidateDetail[] = [
    { id: '1', name: 'FonchillasRickey', status: '第二轮面试', referrer: '', type: '外部', score: 33.0, source: '职位公告板: RCM Redirect', phone: '213.345.5674', lastUpdated: '2019年 12月 21日' },
    { id: '2', name: 'SchwartzKasey', status: '第一轮面试', referrer: '', type: '外部', score: 33.0, source: '职位公告板: RCM Redirect', phone: '555.555.5555', lastUpdated: '2019年 12月 21日' },
    { id: '3', name: 'WatsonGus', status: '已完成', referrer: '', type: '外部', score: 33.0, source: '职位公告板: RCM Redirect', phone: '555.555.5555', lastUpdated: '2019年 12月 21日' },
  ];

  const filteredCandidates = activeStage === 'All' 
    ? mockCandidates 
    : mockCandidates.filter(c => c.status === activeStage);

  // Helper to render Job Detail View
  const renderJobDetail = (job: JobPosting) => {
    return (
      <div className="space-y-4 animate-fade-in">
        {/* Header / Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
           <button onClick={() => setSelectedJob(null)} className="hover:text-blue-600 hover:underline">职位列表</button>
           <ChevronRight size={14} />
           <span className="text-gray-800 font-medium">{job.title} ({job.id})</span>
        </div>

        {/* Top Info Bar */}
        <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center rounded-t-lg">
            <div>
               <h2 className="text-xl font-bold text-gray-800">{job.title} <span className="text-gray-400 font-normal">({job.applicants})</span></h2>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
               <span>状态: <span className="font-medium text-gray-900 border border-gray-300 rounded px-2 py-0.5">待处理</span></span>
               <span>雇员经理: <span className="font-medium text-gray-900">BakerJada</span></span>
               <span>时间: <span className="bg-yellow-100 text-yellow-800 px-1 rounded">52d</span></span>
            </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200">
           <div className="flex space-x-6 px-4 overflow-x-auto hide-scrollbar">
              {['职位需求详情', '职位档案', '候选人', '自职位发布 (1)', '候选人搜索', '查看候选人评分 (4)', '活动 URL 生成器'].map((tab, i) => (
                 <button 
                   key={tab} 
                   className={`py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${tab === '候选人' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
                 >
                   {tab}
                 </button>
              ))}
           </div>
        </div>

        {/* Sub Navigation */}
        <div className="bg-white px-4 py-2 border-b border-gray-200 flex items-center space-x-4 text-sm overflow-x-auto">
           <button className="flex items-center text-gray-500 hover:text-blue-600 whitespace-nowrap"><ChevronDown size={14} className="mr-1"/> 人才管道</button>
           <button className="font-bold text-gray-800 border-b-2 border-gray-800 pb-0.5 whitespace-nowrap">查看活动的候选人 15</button>
           <button className="text-gray-500 hover:text-gray-800 whitespace-nowrap">查看所有候选人 (15)</button>
        </div>

        {/* Pipeline Stages Ribbon */}
        <div className="bg-white border-b border-gray-200 overflow-x-auto">
           <div className="flex min-w-max divide-x divide-gray-100">
              {pipelineStages.map(stage => (
                 <div 
                   key={stage.id} 
                   className={`flex flex-col items-center justify-center px-4 py-3 min-w-[100px] cursor-pointer transition-colors relative ${stage.active ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                 >
                    <span className={`text-2xl font-bold ${stage.active ? 'text-blue-600' : 'text-gray-700'}`}>{stage.count}</span>
                    <span className={`text-xs mt-1 text-center whitespace-nowrap ${stage.active ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>{stage.label}</span>
                    {stage.label === '准备录用' && <span className="absolute top-2 right-2 text-red-500">*</span>}
                    {stage.active && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>}
                 </div>
              ))}
              <div className="flex items-center justify-center px-2 cursor-pointer hover:bg-gray-50 text-gray-400">
                 <ChevronRight size={16} />
              </div>
           </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-gray-50 p-2 border-b border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between text-sm gap-2">
           <div className="flex flex-wrap items-center space-x-2 md:space-x-4">
              <span className="text-gray-500">已选定 0 名</span>
              <button className="text-blue-600 font-medium flex items-center hover:bg-blue-50 px-2 py-1 rounded">操作 <ChevronDown size={14} className="ml-1"/></button>
              <button className="text-gray-600 flex items-center hover:bg-gray-100 px-2 py-1 rounded"><Eye size={14} className="mr-1"/> 显示选项</button>
              <button className="text-gray-600 flex items-center hover:bg-gray-100 px-2 py-1 rounded"><Filter size={14} className="mr-1"/> 过滤选项</button>
           </div>
           <div className="flex items-center space-x-2 w-full md:w-auto">
              <span className="text-gray-500 whitespace-nowrap">突出显示候选人</span>
              <div className="relative flex-1 md:flex-none">
                 <Search size={14} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                 <input type="text" placeholder="输入申请人姓名" className="pl-7 pr-6 py-1 border border-gray-300 rounded text-xs focus:outline-none w-full md:w-48"/>
                 <X size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"/>
              </div>
           </div>
        </div>

        {/* Candidate Table */}
        <div className="bg-white min-h-[400px] overflow-x-auto rounded-b-lg shadow-sm border border-gray-200 border-t-0">
           <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                 <tr>
                    <th className="p-3 w-8"><input type="checkbox" className="rounded border-gray-300" /></th>
                    <th className="p-3">名称</th>
                    <th className="p-3">状态</th>
                    <th className="p-3">转发者</th>
                    <th className="p-3">候选人类型</th>
                    <th className="p-3">评分</th>
                    <th className="p-3">来源</th>
                    <th className="p-3">候选人来源</th>
                    <th className="p-3">电话号码</th>
                    <th className="p-3">上次更新的</th>
                    <th className="p-3">面试结果</th>
                    <th className="p-3">入职初始化状态</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {jobCandidateList.map(c => (
                    <tr key={c.id} className="hover:bg-blue-50/30">
                       <td className="p-3"><input type="checkbox" className="rounded border-gray-300" /></td>
                       <td className="p-3">
                          <div className="flex items-center space-x-2">
                             <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                             <User size={14} className="text-gray-400"/>
                             <span className="text-blue-600 font-medium hover:underline cursor-pointer">{c.name}</span>
                             <FileText size={14} className="text-orange-400"/>
                          </div>
                       </td>
                       <td className="p-3 text-gray-700">{c.status}</td>
                       <td className="p-3 text-gray-500">{c.referrer}</td>
                       <td className="p-3 text-gray-700">{c.type}</td>
                       <td className="p-3 text-gray-700">{c.score.toFixed(1)}</td>
                       <td className="p-3 text-gray-600">{c.source}</td>
                       <td className="p-3 text-gray-600">{c.source}</td>
                       <td className="p-3 text-gray-600">{c.phone}</td>
                       <td className="p-3 text-gray-600">{c.lastUpdated}</td>
                       <td className="p-3 text-gray-600"></td>
                       <td className="p-3 text-gray-600"></td>
                    </tr>
                 ))}
                 {[...Array(3)].map((_, i) => (
                    <tr key={`empty-${i}`} className="hover:bg-gray-50">
                        <td className="p-3"></td>
                        <td className="p-3"></td>
                        <td className="p-3"></td>
                        <td className="p-3"></td>
                        <td className="p-3"></td>
                        <td className="p-3"></td>
                        <td className="p-3"></td>
                        <td className="p-3"></td>
                        <td className="p-3"></td>
                        <td className="p-3"></td>
                        <td className="p-3"></td>
                        <td className="p-3"></td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    );
  }

  // Render Candidates View
  if (view === 'candidates') {
    return (
      <div className="space-y-4">
        {/* Header with Title & Beisen Sync */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
           <div>
             <h2 className="text-2xl font-bold text-gray-800">
               {isExternal ? '候选人管理' : '候选人筛选'} ({isExternal ? '外部' : '内部'})
             </h2>
             <p className="text-sm text-gray-500 mt-1">
            {isExternal ? '招聘管理系统实时同步' : '内部员工竞聘管理'}
             </p>
           </div>
           {isExternal && (
             <div className="flex space-x-2">
                <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 flex items-center shadow-sm text-sm">
                  <RefreshCw size={14} className="mr-2" /> 同步数据
                </button>
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 flex items-center shadow-sm text-sm">
                  <Plus size={16} className="mr-2" /> 新建应聘者
                </button>
             </div>
           )}
        </div>

        {/* Pipeline Tabs */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 overflow-x-auto hide-scrollbar">
          <div className="flex min-w-max">
            {stages.map((stage, idx) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`relative flex flex-col items-start justify-center px-6 py-3 min-w-[120px] transition-colors border-r border-gray-100 group ${
                  activeStage === stage.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'
                }`}
              >
                <span className={`text-xs mb-1 ${activeStage === stage.id ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                  {stage.label}
                </span>
                <span className={`text-xl font-bold ${activeStage === stage.id ? 'text-blue-700' : 'text-gray-800'}`}>
                  {stage.count}
                </span>
                {activeStage === stage.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                )}
                {/* Simulated Arrow Effect */}
                <div className="absolute top-0 bottom-0 right-0 w-4 overflow-hidden pointer-events-none">
                   {/* This could be an SVG arrow, but simplified here with border/bg */}
                </div>
              </button>
            ))}
            <div className="flex-1 border-b border-gray-200 min-w-[50px]"></div>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="bg-white p-4 rounded-t-lg border border-gray-200 border-b-0 flex justify-between items-center mt-4">
           <div className="flex space-x-2">
             <button className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium">
               下一阶段
             </button>
             <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50">
               发业务筛选
             </button>
             <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50">
               转移
             </button>
             <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 flex items-center">
               更多操作 <ChevronRight size={14} className="ml-1 rotate-90" />
             </button>
           </div>
           
           <div className="flex items-center space-x-3">
              {/* Settings Cog - Toggles Modal */}
              <button 
                onClick={() => setShowColumnSettings(true)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors relative"
                title="设置显示字段"
              >
                <Settings size={20} />
              </button>
              
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="搜索候选人..." 
                  className="pl-8 pr-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none w-48"
                />
              </div>
           </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-gray-200 rounded-b-lg overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="p-4 w-10">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                {allColumns.filter(col => visibleColumns.includes(col.id)).map(col => (
                  <th key={col.id} className="p-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-1">
                       <span>{col.label}</span>
                       <div className="flex flex-col opacity-30 hover:opacity-100">
                          {/* Sort icons placeholder */}
                       </div>
                    </div>
                  </th>
                ))}
                <th className="p-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCandidates.length > 0 ? filteredCandidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="p-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  {visibleColumns.includes('id') && <td className="p-4 text-gray-500 font-mono">{candidate.id}</td>}
                  {visibleColumns.includes('name') && <td className="p-4 font-medium text-blue-600 hover:underline cursor-pointer">{candidate.name}</td>}
                  {visibleColumns.includes('gender') && <td className="p-4 text-gray-700">{candidate.gender}</td>}
                  {visibleColumns.includes('age') && <td className="p-4 text-gray-700">{candidate.age}</td>}
                  {visibleColumns.includes('degree') && <td className="p-4 text-gray-700">{candidate.degree}</td>}
                  {visibleColumns.includes('experience') && <td className="p-4 text-gray-700">{candidate.experience}</td>}
                  {visibleColumns.includes('latestScreener') && <td className="p-4 text-gray-700">{candidate.latestScreener}</td>}
                  {visibleColumns.includes('applyDate') && <td className="p-4 text-gray-500">{candidate.applyDate}</td>}
                  
                  <td className="p-4 text-right">
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-blue-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={visibleColumns.length + 2} className="p-12 text-center text-gray-400">
                    <User size={48} className="mx-auto mb-3 opacity-20" />
                    <p>当前阶段暂无候选人数据</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Column Settings Modal */}
        {showColumnSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-fade-in">
              <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-blue-600 text-white">
                <h3 className="font-medium">编辑显示字段</h3>
                <button onClick={() => setShowColumnSettings(false)} className="hover:bg-blue-500 p-1 rounded transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex h-[400px]">
                {/* Left Panel: Available (Hidden) Fields - Simulated */}
                <div className="w-1/2 p-4 border-r border-gray-100 bg-gray-50 overflow-y-auto">
                   <div className="text-xs font-semibold text-gray-400 uppercase mb-3">隐藏字段</div>
                   <div className="space-y-2">
                      <div className="p-2 bg-white border border-gray-200 rounded text-sm text-gray-500 cursor-move flex items-center opacity-70">
                        <GripVertical size={14} className="mr-2 text-gray-300" />
                        手机号码
                      </div>
                      <div className="p-2 bg-white border border-gray-200 rounded text-sm text-gray-500 cursor-move flex items-center opacity-70">
                        <GripVertical size={14} className="mr-2 text-gray-300" />
                        邮箱地址
                      </div>
                      <div className="p-2 bg-white border border-gray-200 rounded text-sm text-gray-500 cursor-move flex items-center opacity-70">
                         <GripVertical size={14} className="mr-2 text-gray-300" />
                        当前公司
                      </div>
                       <div className="p-2 bg-white border border-gray-200 rounded text-sm text-gray-500 cursor-move flex items-center opacity-70">
                         <GripVertical size={14} className="mr-2 text-gray-300" />
                        期望薪资
                      </div>
                   </div>
                   <p className="text-xs text-gray-400 mt-4 text-center">拖动到右侧以显示</p>
                </div>

                {/* Right Panel: Displayed Fields - Actual Toggles */}
                <div className="w-1/2 p-4 overflow-y-auto">
                   <div className="flex justify-between items-center mb-3">
                      <div className="text-xs font-semibold text-gray-400 uppercase">显示字段 ({visibleColumns.length})</div>
                   </div>
                   
                   <div className="space-y-2">
                     {allColumns.map((col) => (
                       <div key={col.id} className={`flex items-center justify-between p-2 rounded border ${visibleColumns.includes(col.id) ? 'border-blue-200 bg-blue-50' : 'border-gray-100'}`}>
                         <div className="flex items-center">
                            <GripVertical size={14} className="mr-2 text-gray-400 cursor-move" />
                            <span className="text-sm text-gray-700">{col.label}</span>
                         </div>
                         
                         {col.required ? (
                           <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">必选</span>
                         ) : (
                           <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={visibleColumns.includes(col.id)}
                                onChange={() => toggleColumn(col.id)}
                              />
                              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                         )}
                       </div>
                     ))}
                   </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
                 <button onClick={() => setShowColumnSettings(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm">取消</button>
                 <button onClick={() => setShowColumnSettings(false)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">确定</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- Main Job List View (Default) ---

  // Check if detail view should be shown
  if (selectedJob) {
    return renderJobDetail(selectedJob);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            {isExternal ? <Globe className="mr-3 text-blue-500" /> : <Users className="mr-3 text-orange-500" />}
            {isExternal ? '招聘管理 (外部集成)' : '内部招聘 (员工门户)'}
          </h2>
          <p className="text-sm text-gray-500 mt-1 flex items-center">
            <span className={`w-2 h-2 rounded-full mr-2 ${isExternal ? 'bg-green-500' : 'bg-blue-500'}`}></span>
            {isExternal ? '招聘管理系统 API 已连接' : '按照部门和岗位进行年度招聘需求计划，部门BP来根据hRO的岗位描述填写招聘职位需求和人数'}
          </p>
        </div>
        <button 
          onClick={() => onNavigate && onNavigate('job-postings')}
          className={`${isExternal ? 'bg-blue-600 hover:bg-blue-700' : 'bg-orange-500 hover:bg-orange-600'} text-white px-4 py-2 rounded-md flex items-center shadow-sm transition-colors w-full sm:w-auto justify-center`}
        >
          <Plus size={18} className="mr-2" />
          发布新职位 ({isExternal ? '外部' : '内部'})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Job List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
             <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="搜索职位..." 
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                />
             </div>
             {isExternal && (
               <button className="text-gray-500 hover:text-blue-600 flex items-center text-sm border border-gray-200 px-3 py-2 rounded-md w-full sm:w-auto justify-center">
                 <RefreshCw size={14} className="mr-2" /> 同步数据
               </button>
             )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="text-gray-500 text-sm border-b border-gray-100">
                  <th className="py-3 pl-2 font-medium w-1/4">职位名称 / 部门</th>
                  <th className="py-3 font-medium w-1/2">
                    {isExternal ? '招聘管理状态 (实时)' : '内部申请状态'}
                  </th>
                  <th className="py-3 font-medium">状态</th>
                  <th className="py-3 text-right pr-2">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {data.map((job) => (
                  <tr key={job.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                    <td className="py-4 pl-2">
                      <button 
                        onClick={() => setSelectedJob(job)}
                        className={`font-medium flex items-center hover:underline text-left ${isExternal ? 'text-blue-600' : 'text-gray-800'}`}
                      >
                        {job.title}
                        {job.status === 'Published' && <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </button>
                      <div className="text-xs text-gray-500 mt-1">{job.department} | {job.publishDate} 发布</div>
                    </td>
                    <td className="py-4">
                      {job.status === 'Draft' ? (
                         <span className="text-gray-400 text-xs italic">尚未发布</span>
                      ) : isExternal ? (
                        <div className="flex items-center space-x-4 bg-gray-50/50 p-2 rounded-lg border border-gray-100 mr-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setSelectedJob(job)}>
                          <div className="flex flex-col items-center min-w-[3rem]">
                             <span className="font-bold text-gray-800 text-lg leading-none">{job.beisenStats?.interviewing}</span>
                             <span className="text-[10px] text-gray-500 scale-90 mt-1">面试中</span>
                          </div>
                          <div className="h-6 w-px bg-gray-200"></div>
                          <div className="flex flex-col items-center min-w-[3rem]">
                             <span className="font-bold text-blue-600 text-lg leading-none">{job.beisenStats?.passed}</span>
                             <span className="text-[10px] text-blue-500 scale-90 mt-1">通过</span>
                          </div>
                          <div className="h-6 w-px bg-gray-200"></div>
                          <div className="flex flex-col items-center min-w-[3rem]">
                             <span className="font-bold text-orange-500 text-lg leading-none">{job.beisenStats?.offerSent}</span>
                             <span className="text-[10px] text-orange-500 scale-90 mt-1">Offer</span>
                          </div>
                          <div className="h-6 w-px bg-gray-200"></div>
                          <div className="flex flex-col items-center min-w-[3rem]">
                             <span className="font-bold text-green-600 text-lg leading-none">{job.beisenStats?.offerConfirmed}</span>
                             <span className="text-[10px] text-green-600 scale-90 mt-1">入职</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                           <div className="bg-orange-50 text-orange-700 px-3 py-1 rounded-md text-xs font-medium border border-orange-100">
                             {job.applicants} 人已申请
                           </div>
                        </div>
                      )}
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.status === 'Published' ? 'bg-green-100 text-green-700' :
                        job.status === 'Draft' ? 'bg-gray-100 text-gray-600' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {job.status === 'Published' ? '招聘中' : job.status === 'Draft' ? '草稿' : '已关闭'}
                      </span>
                    </td>
                    <td className="py-4 text-right pr-2">
                       <button className="text-gray-400 hover:text-blue-600 p-1 hover:bg-gray-100 rounded">
                         <MoreHorizontal size={18} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Funnel & Stats */}
        <div className="space-y-6">
           <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center">
                <Filter size={18} className="mr-2 text-blue-600" />
                招聘漏斗 ({isExternal ? '本月' : '本季度'})
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <FunnelChart margin={{ top: 20, bottom: 20, left: 20, right: 80 }}>
                    <Tooltip 
                      formatter={(value, name, props) => [value, props.payload.name]}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                    />
                    <Funnel
                      dataKey="count"
                      data={funnelData}
                      isAnimationActive
                    >
                      <LabelList position="right" fill="#4b5563" stroke="none" dataKey="name" />
                      <LabelList position="center" fill="#ffffff" stroke="none" dataKey="count" fontSize={12} fontWeight="bold" />
                      {funnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={isExternal ? `rgba(59, 130, 246, ${1 - (index * 0.15)})` : `rgba(249, 115, 22, ${1 - (index * 0.15)})`} />
                      ))}
                    </Funnel>
                  </FunnelChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className={`${isExternal ? 'bg-blue-600' : 'bg-orange-500'} rounded-lg shadow-md p-6 text-white`}>
              <div className="flex items-center mb-4">
                <CheckCircle className="mr-2 opacity-80" size={20} />
                <h4 className="font-semibold">待办任务</h4>
              </div>
              <ul className="space-y-3 text-sm text-white/90">
                {isExternal ? (
                  <>
                    <li className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span>筛选 "高级前端" 简历</span>
                      <span className="bg-white/20 px-2 py-0.5 rounded text-xs">12 份</span>
                    </li>
                    <li className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span>安排 "产品经理" 二面</span>
                      <span className="bg-white/20 px-2 py-0.5 rounded text-xs">3 人</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>录入新员工入职信息</span>
                      <span className="bg-white/20 px-2 py-0.5 rounded text-xs">今天</span>
                    </li>
                  </>
                ) : (
                  <>
                     <li className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span>审核内部异动申请</span>
                      <span className="bg-white/20 px-2 py-0.5 rounded text-xs">2 单</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>更新岗位说明书</span>
                      <span className="bg-white/20 px-2 py-0.5 rounded text-xs">待定</span>
                    </li>
                  </>
                )}
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};