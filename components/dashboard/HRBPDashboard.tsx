
import React, { useState } from 'react';
import { 
  Users, 
  FileCheck, 
  Briefcase, 
  UserPlus, 
  TrendingUp, 
  Target, 
  PieChart as PieChartIcon, 
  BarChart2,
  Globe,
  GitMerge,
  Layers,
  Bell,
  CheckSquare,
  CheckCircle,
  Clock,
  Mail,
  ClipboardList,
  Settings,
  Search,
  BookOpen,
  GitPullRequest,
  Filter,
  MoreHorizontal,
  PlusCircle,
  ChevronDown,
  Network,
  X,
  Maximize2,
  LayoutGrid
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend,
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import { DashboardWidget } from './Shared';

const useContainerWidth = () => {
  const [width, setWidth] = useState(1200);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = Math.floor(entry.contentRect.width);
        setWidth(prev => prev !== newWidth ? newWidth : prev);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return { width, containerRef };
};

const defaultLayouts = {
  lg: [
    { i: 'profile', x: 0, y: 0, w: 8, h: 10, minH: 10, static: false },
    { i: 'quickAccess', x: 8, y: 0, w: 4, h: 10, static: false },
    { i: 'orgChart', x: 8, y: 15, w: 4, h: 20, minW: 4, minH: 18 },
    { i: 'approvals', x: 0, y: 15, w: 8, h: 20, minW: 4, minH: 18 },
    { i: 'teamTable', x: 0, y: 48, w: 12, h: 20, minW: 6, minH: 18 },
    { i: 'levelDist', x: 0, y: 100, w: 4, h: 20, minW: 3, minH: 18 },
    { i: 'ageDist', x: 4, y: 100, w: 4, h: 20, minW: 3, minH: 18 },
    { i: 'funnel', x: 8, y: 100, w: 4, h: 20, minW: 3, minH: 18 },
    { i: 'recruitment', x: 0, y: 134, w: 12, h: 24, minW: 4, minH: 18 },
  ]
};
import { PersonalInfoCard } from './PersonalInfoCard';
import { MessageNotificationPanel } from './MessageNotificationPanel';
import { TeamMemberTable } from './TeamMemberTable';
import { PositionOrgChart } from '../organization/PositionOrgChart';
import { UnifiedTodoPanel } from './UnifiedTodoPanel';
import { RecruitmentWidget } from './RecruitmentWidget';
import { QuickActionsCard } from './QuickActionsCard';
import { TodoItem } from '../../types';

// --- Mock Data ---

import mockTasksData from '../process/mock.json';
import { BPMTask } from '../process/types';

const MOCK_TASKS = mockTasksData as BPMTask[];

const mapBpmTaskToTodoItem = (task: BPMTask): TodoItem => ({
  id: task.id,
  title: task.title,
  date: task.requestTime,
  type: task.category,
  initials: task.applicant ? task.applicant.substring(0, 2) : 'SYS',
  sourceSystem: task.processName as any,
  content: task.content,
  processStatus: task.status === 'Completed' ? '已通过' : task.status === 'InProgress' ? '处理中' : undefined,
});

const initialHrbpApprovalList = MOCK_TASKS.filter(t => t.status === 'Pending').map(mapBpmTaskToTodoItem);
const initialDoneTasks = MOCK_TASKS.filter(t => t.status === 'Completed' || t.status === 'Rejected').map(mapBpmTaskToTodoItem);
const initialCCTasks = MOCK_TASKS.filter(t => !t.isRead && t.status !== 'Pending').map(mapBpmTaskToTodoItem);
const initialReadTasks = MOCK_TASKS.filter(t => t.isRead && t.status !== 'Pending').map(mapBpmTaskToTodoItem);
const initialMyAppTasks = MOCK_TASKS.filter(t => t.status !== 'Completed').map(mapBpmTaskToTodoItem);

const activeJobs = [
  { pos: '高级Java开发', dept: '研发中心', status: '面试中 (5人)', hc: 2 },
  { pos: '产品总监', dept: '产品部', status: '简历筛选 (12份)', hc: 1 },
  { pos: 'HRBP 实习生', dept: '人力资源', status: 'Offer 发放', hc: 1 },
];

const levelDataC = [
  { name: 'C1', value: 10 }, { name: 'C2', value: 25 }, { name: 'C3', value: 15 }, { name: 'C4', value: 8 }, { name: 'C5', value: 3 }
];
const levelDataJ = [
  { name: 'P4', value: 15 }, 
  { name: 'P5', value: 35 }, 
  { name: 'P6', value: 48 }, 
  { name: 'P7', value: 30 }, 
  { name: 'P8', value: 12 },
  { name: 'P9', value: 5 },
  { name: 'P10', value: 2 }
];

const ageDataC = [
  { name: '20-25', value: 5 }, { name: '26-30', value: 20 }, { name: '31-35', value: 15 }, { name: '36+', value: 10 }
];
const ageDataJ = [
  { name: '20-25', value: 15 }, { name: '26-30', value: 45 }, { name: '31-35', value: 20 }, { name: '36+', value: 5 }
];

const funnelData = [
  { value: 100, name: '简历初筛', fill: '#60a5fa' },
  { value: 75, name: '复筛', fill: '#4ade80' },
  { value: 50, name: '电话面试', fill: '#34d399' },
  { value: 25, name: '复试', fill: '#fbbf24' },
  { value: 10, name: 'offer', fill: '#818cf8' },
  { value: 8, name: '入职', fill: '#6366f1' },
];

const COLORS = ['#60a5fa', '#34d399', '#ffb74d', '#f87171'];

// --- Components ---

const hrbpQuickActions = [
  { id: 'org', label: '组织架构', icon: <GitPullRequest />, color: 'bg-indigo-100 text-indigo-600', view: 'organization' },
  { id: 'reports', label: '报表中心', icon: <BarChart2 />, color: 'bg-blue-100 text-blue-600', view: 'analytics' },
  { id: 'recruitment', label: '招聘需求', icon: <FileCheck />, color: 'bg-orange-100 text-orange-600', view: 'recruitment' },
  { id: 'performance', label: '绩效校准', icon: <TrendingUp />, color: 'bg-purple-100 text-purple-600', view: 'performance' },
  { id: 'talent', label: '人才盘点', icon: <PieChartIcon />, color: 'bg-teal-100 text-teal-600', view: 'personnel' },
  { id: 'succession', label: '继任计划', icon: <Target />, color: 'bg-rose-100 text-rose-600', view: 'organization' },
];

export const HRBPDashboard: React.FC<{ 
  onNavigate?: (view: string, params?: any) => void;
  visibleWidgets?: string[];
  onRemoveWidget?: (id: string) => void;
  isEditMode?: boolean;
}> = ({ onNavigate, visibleWidgets = ['profile', 'quickAccess', 'orgChart', 'approvals', 'teamTable', 'levelDist', 'ageDist', 'funnel', 'recruitment'], onRemoveWidget, isEditMode = false }) => {
  const { width, containerRef } = useContainerWidth();
  const [chartCategory, setChartCategory] = useState<'C' | 'J'>('J');
  const [hrbpApprovalList, setHrbpApprovalList] = useState(initialHrbpApprovalList);
  const [ccTasks, setCcTasks] = useState(initialCCTasks);

  const [currentLayouts, setCurrentLayouts] = useState(() => {
    const saved = localStorage.getItem('hrbpDashboardLayouts_v2');
    const parsed = saved ? JSON.parse(saved) : defaultLayouts;
    
    // Ensure minW and minH are preserved
    Object.keys(parsed).forEach(breakpoint => {
      parsed[breakpoint] = parsed[breakpoint].map((item: any) => {
        const defaultItem = defaultLayouts.lg.find(d => d.i === item.i);
        return {
          ...item,
          minW: defaultItem?.minW || item.minW,
          minH: defaultItem?.minH || item.minH
        };
      });
    });
    return parsed;
  });

  const handleLayoutChange = React.useCallback((layout: any, layouts: any) => {
    setCurrentLayouts(layouts);
    localStorage.setItem('hrbpDashboardLayouts_v2', JSON.stringify(layouts));
  }, []);

  const handleHideWidget = (id: string) => {
    onRemoveWidget?.(id);
  };

  const handleProcessApprovals = (ids: (string | number)[], comment: string) => {
    setHrbpApprovalList(prev => prev.filter(item => !ids.includes(item.id)));
    console.log('HRBP Processing approvals:', ids, 'comment:', comment);
  };

  return (
    <div ref={containerRef} className="animate-fade-in min-h-screen pb-20">
      <ResponsiveGridLayout
        className="layout mt-1"
        width={width}
        layouts={currentLayouts}
        onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={16}
        margin={[6, 6]}
        dragConfig={{ enabled: isEditMode, handle: ".drag-handle" }}
        resizeConfig={{ enabled: isEditMode }}
      >
        {/* 0. Personal Info Card */}
        <div key="profile">
          <div className="h-full w-full relative group">
             {isEditMode && (
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-black/20 hover:bg-black/40 rounded cursor-move text-white animate-pulse">
                  <LayoutGrid size={12} />
               </div>
             )}
             <div className="h-full">
                <PersonalInfoCard onViewDetails={() => onNavigate?.('personnel')} />
             </div>
          </div>
        </div>
        
        {/* 1. Quick Access / Core Modules */}
        <div key="quickAccess">
          <div className="h-full w-full relative group">
             {isEditMode && (
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                  <LayoutGrid size={12} />
               </div>
             )}
             <QuickActionsCard 
                isEditMode={isEditMode}
                onNavigate={onNavigate}
                initialActions={hrbpQuickActions}
             />
          </div>
        </div>

        {/* 2. Position Arch & Approvals */}
        {/* Left: Position Architecture Overview (FTE Tree) */}
        <div key="orgChart">
          <div className="h-full w-full relative group bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col overflow-hidden">
             {isEditMode && (
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                  <LayoutGrid size={12} />
               </div>
             )}
             <div className="flex justify-between items-center mb-4 z-10 shrink-0">
                <h3 className="font-bold text-gray-800 flex items-center">
                   <Network size={18} className="mr-2 text-indigo-600" /> 职位架构概览
                </h3>
                <button 
                   onClick={() => onNavigate?.('organization-v2', { tab: 'position' })}
                   className="text-xs text-indigo-600 hover:underline flex items-center"
                >
                   <Maximize2 size={12} className="mr-1"/> 查看大图
                </button>
             </div>
             <div className="flex-1 bg-gray-50/50 rounded-xl border border-gray-100 overflow-hidden shadow-inner relative flex justify-center items-center">
                <div className="scale-[0.5] sm:scale-[0.6] md:scale-[0.7] origin-center transform transition-transform duration-500 w-full flex items-center justify-center">
                   <PositionOrgChart compact />
                </div>
             </div>
          </div>
        </div>

        {/* Right: Unified Approvals Panel */}
        <div key="approvals">
          <div className="h-full w-full relative group">
             {isEditMode && (
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                  <LayoutGrid size={12} />
               </div>
             )}
             <UnifiedTodoPanel 
                title="待办中心"
                icon={<ClipboardList size={18} />}
                tabs={[
                   { id: 'approvals', label: '待办', tasks: hrbpApprovalList, icon: <Clock size={16} /> },
                   { id: 'done', label: '已办', tasks: initialDoneTasks, icon: <CheckCircle size={16} /> },
                   { id: 'cc', label: '知会', tasks: [...ccTasks, ...initialReadTasks], icon: <Mail size={16} /> },
                   { id: 'created', label: '创建', tasks: initialMyAppTasks, icon: <CheckSquare size={16} /> }
                ]}
                primaryActionLabel="审批"
                onProcessTasks={handleProcessApprovals}
                onNavigate={onNavigate}
                className="h-full"
                onExpand={() => onNavigate?.('process-center')}
             />
          </div>
        </div>

        {/* 3. Team Member Table */}
        <div key="teamTable">
          <div className="h-full w-full relative group">
             {isEditMode && (
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                  <LayoutGrid size={12} />
               </div>
             )}
             <div className="h-full">
                <TeamMemberTable onNavigate={onNavigate} />
             </div>
          </div>
        </div>

        {/* 4. Analytics (Charts) */}
        <div key="levelDist">
          <div className="h-full w-full relative group">
             {isEditMode && (
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                  <LayoutGrid size={12} />
               </div>
             )}
             <DashboardWidget 
                className="h-full"
                title="能级结构分布" 
                isEditMode={isEditMode}
                onHide={() => handleHideWidget('levelDist')}
                onExpand={() => onNavigate?.('org-analytics')}
                headerRight={
                <div className="flex space-x-1 bg-gray-100 p-0.5 rounded-lg text-[10px]">
                   <button onClick={() => setChartCategory('C')} className={`px-1.5 py-0.5 rounded transition-colors ${chartCategory === 'C' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-50'}`}>管理类 (C)</button>
                   <button onClick={() => setChartCategory('J')} className={`px-1.5 py-0.5 rounded transition-colors ${chartCategory === 'J' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-50'}`}>技术类 (J)</button>
                </div>
             }>
                <div className="flex-1 w-full mt-4">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartCategory === 'C' ? levelDataC : levelDataJ} margin={{top: 10, right: 10, left: -25, bottom: 0}}>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                         <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} interval={0} />
                         <YAxis axisLine={false} tickLine={false} fontSize={10} />
                         <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none'}} />
                         <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                      </BarChart>
                   </ResponsiveContainer>
                </div>
             </DashboardWidget>
          </div>
        </div>

        <div key="ageDist">
          <div className="h-full w-full relative group">
             {isEditMode && (
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                  <LayoutGrid size={12} />
               </div>
             )}
             <DashboardWidget 
                className="h-full"
                title="学习与培训" 
                isEditMode={isEditMode}
                onHide={() => handleHideWidget('ageDist')}
                onExpand={() => onNavigate?.('org-analytics')}
                headerRight={
                <div className="flex space-x-1 bg-gray-100 p-0.5 rounded-lg text-[10px]">
                   <button onClick={() => setChartCategory('C')} className={`px-1.5 py-0.5 rounded transition-colors ${chartCategory === 'C' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-50'}`}>C类</button>
                   <button onClick={() => setChartCategory('J')} className={`px-1.5 py-0.5 rounded transition-colors ${chartCategory === 'J' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-50'}`}>J类</button>
                </div>
             }>
                <div className="flex-1 w-full mt-4">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie
                            data={chartCategory === 'C' ? ageDataC : ageDataJ}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={5}
                            dataKey="value"
                         >
                            {(chartCategory === 'C' ? ageDataC : ageDataJ).map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                         </Pie>
                         <Tooltip />
                         <Legend verticalAlign="bottom" height={36} iconSize={8} wrapperStyle={{ fontSize: '10px' }}/>
                      </PieChart>
                   </ResponsiveContainer>
                </div>
             </DashboardWidget>
          </div>
        </div>

        <div key="funnel">
          <div className="h-full w-full relative group">
             {isEditMode && (
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                  <LayoutGrid size={12} />
               </div>
             )}
             <DashboardWidget 
                className="h-full"
                title="人才招聘漏斗"
                isEditMode={isEditMode}
                onHide={() => handleHideWidget('funnel')}
                onExpand={() => onNavigate?.('recruitment')}
             >
                <div className="flex flex-col h-full mt-2">
                  {/* Legend Section */}
                  <div className="flex flex-wrap gap-x-3 gap-y-2 mb-2 p-2 bg-gray-50/50 rounded-xl border border-gray-100">
                    {funnelData.map((item, index) => (
                      <div key={index} className="flex items-center gap-1.5">
                        <div 
                          className="w-2.5 h-2.5 rounded-sm shrink-0" 
                          style={{ backgroundColor: item.fill }}
                        />
                        <span className="text-[11px] font-medium text-gray-600">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <FunnelChart>
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Funnel dataKey="value" data={funnelData} isAnimationActive>
                          <LabelList position="right" fill="#6b7280" stroke="none" dataKey="name" fontSize={10} />
                          <LabelList position="center" fill="#fff" stroke="none" dataKey="value" fontSize={12} fontWeight="bold" />
                          {funnelData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.fill} />
                           ))}
                        </Funnel>
                      </FunnelChart>
                    </ResponsiveContainer>
                  </div>
                </div>
             </DashboardWidget>
          </div>
        </div>

        <div key="recruitment">
          <div className="h-full w-full relative group">
             {isEditMode && (
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                  <LayoutGrid size={12} />
               </div>
             )}
             <RecruitmentWidget 
                isEditMode={isEditMode}
                onHide={() => handleHideWidget('recruitment')}
                onNavigate={onNavigate}
             />
          </div>
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};
