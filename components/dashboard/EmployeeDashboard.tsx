
import React, { useState, useEffect, useRef } from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import { useLanguage } from '../../LanguageContext';

const useContainerWidth = () => {
  const [width, setWidth] = useState(1200);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        {
            "i": "profile",
            "x": 0,
            "y": 0,
            "w": 8,
            "h": 10,
            "minW": 5,
            "minH": 6,
            "moved": false,
            "static": false
        },
        {
            "i": "quickActions",
            "x": 8,
            "y": 0,
            "w": 4,
            "h": 10,
            "minW": 3,
            "minH": 6,
            "moved": false,
            "static": false
        },
        {
            "i": "todo",
            "x": 0,
            "y": 10,
            "w": 8,
            "h": 20,
            "minW": 5,
            "minH": 18,
            "moved": false,
            "static": false
        },
        {
            "i": "learning",
            "x": 8,
            "y": 10,
            "w": 4,
            "h": 20,
            "minW": 3,
            "minH": 15,
            "moved": false,
            "static": false
        },
        {
            "i": "jobs",
            "x": 0,
            "y": 30,
            "w": 12,
            "h": 18,
            "minW": 3,
            "minH": 15,
            "moved": false,
            "static": false
        },
        {
            "i": "appCenter",
            "x": 0,
            "y": 48,
            "w": 12,
            "h": 20,
            "minW": 6,
            "minH": 15,
            "moved": false,
            "static": false
        }
    ],
  md: [
      { i: 'profile', x: 0, y: 0, w: 10, h: 10, minW: 6, minH: 10 },
      { i: 'quickActions', x: 0, y: 10, w: 10, h: 10, minW: 4, minH: 10 },
      { i: 'todo', x: 0, y: 20, w: 10, h: 20, minW: 4, minH: 18 },
      { i: 'learning', x: 0, y: 40, w: 10, h: 20, minW: 4, minH: 15 },
      { i: 'jobs', x: 0, y: 60, w: 10, h: 18, minW: 4, minH: 18 },
      { i: 'appCenter', x: 0, y: 78, w: 10, h: 20, minW: 6, minH: 15 },
      { i: 'team', x: 0, y: 98, w: 10, h: 20, minW: 4, minH: 18 },
      { i: 'competency', x: 0, y: 118, w: 10, h: 20, minW: 4, minH: 18 },
      { i: 'level', x: 0, y: 138, w: 10, h: 20, minW: 4, minH: 18 },
      { i: 'age', x: 0, y: 158, w: 10, h: 20, minW: 5, minH: 18 },
      { i: 'recruitment', x: 0, y: 178, w: 10, h: 20, minW: 5, minH: 18 },
    ],
    sm: [
      { i: 'profile', x: 0, y: 0, w: 6, h: 20, minW: 4, minH: 12 },
      { i: 'quickActions', x: 0, y: 20, w: 6, h: 20, minW: 3, minH: 11 },
      { i: 'todo', x: 0, y: 40, w: 6, h: 20, minW: 4, minH: 18 },
      { i: 'learning', x: 0, y: 60, w: 6, h: 20, minW: 3, minH: 15 },
      { i: 'jobs', x: 0, y: 80, w: 6, h: 20, minW: 3, minH: 18 },
      { i: 'appCenter', x: 0, y: 100, w: 6, h: 20, minW: 6, minH: 15 },
      { i: 'team', x: 0, y: 120, w: 6, h: 20, minW: 3, minH: 18 },
      { i: 'competency', x: 0, y: 140, w: 6, h: 20, minW: 3, minH: 18 },
      { i: 'level', x: 0, y: 160, w: 6, h: 20, minW: 3, minH: 18 },
      { i: 'age', x: 0, y: 180, w: 6, h: 20, minW: 3, minH: 18 },
      { i: 'recruitment', x: 0, y: 200, w: 6, h: 20, minW: 3, minH: 18 },
    ],
};

import { 
  Calendar, 
  Briefcase, 
  Shield, 
  ClipboardList, 
  User, 
  CreditCard, 
  Wallet, 
  MapPin, 
  Archive, 
  Landmark, 
  TrendingUp, 
  Heart, 
  Clock, 
  Pen, 
  PenTool,
  FileText, 
  Smile, 
  Activity,
  PieChart,
  Plus,
  X,
  LayoutGrid,
  MessageSquare,
  Video,
  Database,
  Sparkles,
  Loader2,
  ArrowRight,
  CheckSquare,
  CheckCircle,
  Building,
  ChevronRight,
  Info,
  GitMerge,
  Layers,
  Utensils,
  Maximize2,
  Minimize2,
  BookOpen,
  PlayCircle,
  AlertCircle,
  BarChart2,
  UserCircle,
  Award,
  Zap,
  Tag,
  Star,
  AppWindow,
  Mail,
  Search,
  Target,
  Trophy,
  Megaphone,
  UserCheck,
  ThumbsUp,
  Grid,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { DashboardWidget } from './Shared';
import { PersonalInfoCard } from './PersonalInfoCard';
import { QuickActionsCard } from './QuickActionsCard';
import { UnifiedTodoPanel } from './UnifiedTodoPanel';
import { RecruitmentWidget } from './RecruitmentWidget';
import { LearningAndTrainingPanel } from '../training/LearningAndTrainingPanel';
import { TodoItem } from '../../types';
import { AppCenter } from '../system/AppCenter';

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
  targetView: task.targetView,
  targetParams: task.targetParams,
});

const initialTodoList = MOCK_TASKS.filter(t => t.status === 'Pending').map(mapBpmTaskToTodoItem);
const initialDoneTasks = MOCK_TASKS.filter(t => t.status === 'Completed' || t.status === 'Rejected').map(mapBpmTaskToTodoItem);
const initialCCTasks = MOCK_TASKS.filter(t => !t.isRead && t.status !== 'Pending').map(mapBpmTaskToTodoItem);
const initialReadTasks = MOCK_TASKS.filter(t => t.isRead && t.status !== 'Pending').map(mapBpmTaskToTodoItem);
const initialMyAppTasks = MOCK_TASKS.filter(t => t.status !== 'Completed').map(mapBpmTaskToTodoItem);

const etmsData = [
    { day: '周一', date: '03-18', hours: 8.5, checkIn: '08:48', checkOut: '18:20', status: 'Normal' },
    { day: '周二', date: '03-19', hours: 9.0, checkIn: '09:00', checkOut: '18:00', status: 'Normal' },
    { day: '周三', date: '03-20', hours: 8.0, checkIn: '09:05', checkOut: '18:00', status: 'Normal' },
    { day: '周四', date: '03-21', hours: 8.0, checkIn: '--:--', checkOut: '--:--', status: 'Normal' },
    { day: '周五', date: '03-22', hours: 8.0, checkIn: '09:15', checkOut: '18:00', status: 'Normal' },
    { day: '周六', date: '03-23', hours: 0.0, checkIn: '--:--', checkOut: '--:--', status: 'Weekend' },
    { day: '周日', date: '03-24', hours: 0.0, checkIn: '--:--', checkOut: '--:--', status: 'Weekend' },
];

const internalJobsPreview = [
  { id: 'IJ-2024-001', title: '高级 Java 开发工程师', dept: '研发中心', loc: '上海' },
  { id: 'IJ-2024-002', title: '产品经理 (供应链方向)', dept: '产品部', loc: '上海' },
  { id: 'IJ-2024-003', title: '数据分析专家', dept: '运营部', loc: '上海' },
  { id: 'IJ-2024-004', title: '行政主管', dept: '行政部', loc: '长沙' },
];

const recruitmentProgressData = [
  { name: '简历初筛', count: 120, color: '#3b82f6', icon: <FileText size={14} /> },
  { name: '面试中', count: 45, color: '#8b5cf6', icon: <MessageSquare size={14} /> },
  { name: 'Offer阶段', count: 12, color: '#10b981', icon: <ThumbsUp size={14} /> },
  { name: '已入职', count: 8, color: '#6366f1', icon: <UserCheck size={14} /> },
];

const managerCapabilityData = [
  { subject: '战略规划', A: 85, fullMark: 100 },
  { subject: '决策能力', A: 92, fullMark: 100 },
  { subject: '变革引领', A: 88, fullMark: 100 },
  { subject: '团队领导', A: 95, fullMark: 100 },
  { subject: '执行力', A: 89, fullMark: 100 },
  { subject: '影响力', A: 87, fullMark: 100 },
];

const levelData = [
  { name: 'P4', value: 4 }, 
  { name: 'P5', value: 6 }, 
  { name: 'P6', value: 12 }, 
  { name: 'P7', value: 8 }, 
  { name: 'P8', value: 4 },
];

const ageData = [
  { name: '20-30岁', value: 10 }, { name: '30-40岁', value: 15 }, { name: '40岁+', value: 5 }
];

const COLORS = ['#60a5fa', '#34d399', '#ffb74d', '#f87171', '#8b5cf6'];

const workHoursData = [
  { day: '周一', hours: 8.5 },
  { day: '周二', hours: 9.0 },
  { day: '周三', hours: 8.0 },
  { day: '周四', hours: 10.5 },
  { day: '周五', hours: 8.0 },
  { day: '周六', hours: 0.0 },
  { day: '周日', hours: 0.0 },
];


export const EmployeeDashboard: React.FC<{ 
  onNavigate?: (view: string, params?: any) => void;
  visibleWidgets?: string[];
  onRemoveWidget?: (id: string) => void;
  isEditMode?: boolean;
}> = ({ onNavigate, visibleWidgets = ['jobs', 'todo', 'learning', 'appCenter'], onRemoveWidget, isEditMode = false }) => {
  const { t } = useLanguage();
  const { width, containerRef } = useContainerWidth();
  const [todoList, setTodoList] = useState(initialTodoList);
  const [isPerfVisible, setIsPerfVisible] = useState(true);
  const [ccTasks, setCcTasks] = useState(initialCCTasks);
  const [myAppTasks, setMyAppTasks] = useState(initialMyAppTasks);
  const [jobTab, setJobTab] = useState<'recommend' | 'applied'>('recommend');

  const handleProcessTasks = (ids: (string | number)[], comment: string) => {
    setTodoList(prev => prev.filter(t => !ids.includes(t.id)));
    alert('已提交处理申请');
  };

  const handleHideWidget = (id: string) => {
    onRemoveWidget?.(id);
  };

  const [currentLayouts, setCurrentLayouts] = useState(() => {
    const saved = localStorage.getItem('dashboardLayouts_v4');
    if (!saved) return defaultLayouts;
    
    try {
      const parsed = JSON.parse(saved);
      // Merge minW and minH from defaultLayouts to ensure constraints are always applied
      const merged: any = {};
      Object.keys(defaultLayouts).forEach((breakpoint) => {
        const defaultBreakpointLayout = (defaultLayouts as any)[breakpoint];
        const savedBreakpointLayout = parsed[breakpoint] || [];
        
        merged[breakpoint] = savedBreakpointLayout.map((item: any) => {
          const defaultItem = defaultBreakpointLayout.find((d: any) => d.i === item.i);
          if (defaultItem) {
            return {
              ...item,
              minW: defaultItem.minW,
              minH: defaultItem.minH,
              // Also ensure current w/h are not smaller than min
              w: Math.max(item.w, defaultItem.minW || 0),
              // Also ensure current w/h are not smaller than min
              h: Math.max(item.h, defaultItem.minH || 0)
            };
          }
          return item;
        });
      });
      return merged;
    } catch (e) {
      console.error('Failed to parse saved layouts', e);
      return defaultLayouts;
    }
  });

  const handleLayoutChange = React.useCallback((layout: any, layouts: any) => {
    setCurrentLayouts(layouts);
    localStorage.setItem('dashboardLayouts_v4', JSON.stringify(layouts));
  }, []);

  return (
    <div className="relative pb-2" ref={containerRef}>
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
        
        <div key="quickActions">
          <div className="h-full w-full relative group">
             {isEditMode && (
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                  <LayoutGrid size={12} />
               </div>
             )}
             <QuickActionsCard className="h-full" isEditMode={isEditMode} onNavigate={onNavigate} />
          </div>
        </div>

        {visibleWidgets.includes('todo') && (
          <div key="todo">
            <div className="h-full w-full relative group">
               {isEditMode && (
                 <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                    <LayoutGrid size={12} />
                 </div>
               )}
               <UnifiedTodoPanel 
                 title="待办中心"
                 icon={<ClipboardList size={12} />}
                 tabs={[
                   { id: 'pending', label: '待办', tasks: todoList },
                   { id: 'done', label: '已办', tasks: initialDoneTasks },
                   { id: 'cc', label: '知会', tasks: [...ccTasks, ...initialReadTasks] },
                   { id: 'created', label: '创建', tasks: initialMyAppTasks }
                 ]}
                 primaryActionLabel="办理"
                 onProcessTasks={handleProcessTasks}
                 onFooterClick={(tabId) => {
                   if (tabId === 'pending') onNavigate?.('todo', { tab: 'pending' });
                   else if (tabId === 'done') onNavigate?.('todo', { tab: 'done' });
                   else if (tabId === 'cc') onNavigate?.('todo', { tab: 'cc' });
                   else if (tabId === 'created') onNavigate?.('todo', { tab: 'my-apps' });
                 }}
                 onNavigate={onNavigate}
                 className="h-full"
                 onHide={() => handleHideWidget('todo')}
                 onExpand={() => onNavigate?.('process-center')}
               />
            </div>
          </div>
        )}

        {visibleWidgets.includes('etms') && (
          <div key="etms">
            <div className="h-full w-full relative group">
               {isEditMode && (
                 <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                    <LayoutGrid size={12} />
                 </div>
               )}
               <DashboardWidget 
                  className="h-full"
                  title="本周工时统计" 
                  isEditMode={isEditMode}
                  onHide={() => handleHideWidget('etms')}
               >
                  <div className="flex flex-col h-full">
                     <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4">
                        <div className="flex items-center">
                           <div className="p-2 bg-blue-200 rounded-lg mr-3 text-blue-700">
                              <Clock size={20} />
                           </div>
                           <div className="flex items-baseline space-x-2">
                              <div className="text-sm font-bold text-blue-800">本周工时统计</div>
                              <div className="text-xs text-blue-600 opacity-80 font-medium whitespace-nowrap">2024.03.18 - 2024.03.24</div>
                           </div>
                        </div>
                        <span className="text-2xl font-bold text-blue-700">42.5 <span className="text-sm font-normal">h</span></span>
                     </div>
                     
                     <div className="flex-1 min-h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={etmsData} margin={{top: 10, right: 10, left: -20, bottom: 0}}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={10} />
                              <YAxis axisLine={false} tickLine={false} fontSize={10} />
                              <Tooltip 
                                 cursor={{fill: '#f1f5f9'}}
                                 content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                       const data = payload[0].payload;
                                       return (
                                          <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-lg text-xs">
                                             <p className="font-bold text-gray-800 mb-1">{data.day} ({data.date})</p>
                                             <p className="text-blue-600 font-bold mb-2">工时: {data.hours}h</p>
                                             <div className="flex items-center gap-4 text-gray-500">
                                                <div>
                                                   <p className="text-[10px] uppercase tracking-wider opacity-60">打卡开始</p>
                                                   <p className="font-mono font-bold">{data.checkIn}</p>
                                                </div>
                                                <div>
                                                   <p className="text-[10px] uppercase tracking-wider opacity-60">打卡结束</p>
                                                   <p className="font-mono font-bold">{data.checkOut}</p>
                                                </div>
                                             </div>
                                          </div>
                                       );
                                    }
                                    return null;
                                 }}
                              />
                              <Bar dataKey="hours" radius={[4, 4, 0, 0]} barSize={30}>
                                 {etmsData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.status === 'Weekend' ? '#cbd5e1' : '#3b82f6'} />
                                 ))}
                              </Bar>
                           </BarChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
               </DashboardWidget>
            </div>
          </div>
        )}

        {visibleWidgets.includes('performance') && (
          <div key="performance">
            <div className="h-full w-full relative group">
               {isEditMode && (
                 <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                    <LayoutGrid size={12} />
                 </div>
               )}
               <DashboardWidget 
                 className="h-full"
                 title={
                   <div className="flex items-center gap-2">
                     <Award className="mr-2 text-purple-600" size={20} />
                     <span>绩效与发展</span>
                     <button 
                        onClick={(e) => { e.stopPropagation(); setIsPerfVisible(!isPerfVisible); }}
                        className="p-1 hover:bg-purple-100/50 rounded-full text-purple-400 transition-colors"
                        title={isPerfVisible ? "隐藏数值" : "显示数值"}
                     >
                        {isPerfVisible ? <EyeOff size={14} /> : <Eye size={14} />}
                     </button>
                   </div>
                 }
                 isEditMode={isEditMode}
                 onHide={() => handleHideWidget('performance')}
                 onExpand={() => window.open('https://performancemanager.successfactors.com/', '_blank')}
               >
                  <div className="flex flex-col h-full min-h-[280px] space-y-3">
                     <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                        <div className="flex justify-between items-start mb-3">
                           <div>
                              <div className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">当前考评周期</div>
                              <div className="text-sm font-bold text-gray-800">2024 Q2 个人绩效考核</div>
                           </div>
                           <span className="px-2 py-0.5 bg-white text-purple-600 border border-purple-200 rounded text-[10px] font-bold">待设定</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px] text-purple-600/80">
                           <span>截止日期: 2024-06-30</span>
                           <button className="text-purple-700 font-bold hover:underline flex items-center">
                              立即前往 <ChevronRight size={12} />
                           </button>
                        </div>
                     </div>

                     <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                        <div className="flex justify-between items-start mb-3">
                           <div>
                              <div className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">最近考评周期</div>
                              <div className="text-sm font-bold text-gray-800">2024 Q1 个人绩效考核</div>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="text-lg font-black text-green-600">{isPerfVisible ? 'S' : '**'}</span>
                              <span className="px-2 py-0.5 bg-white text-green-600 border border-green-200 rounded text-[10px] font-bold">已完成</span>
                           </div>
                        </div>
                        <div className="flex justify-between items-center text-[11px] text-green-600/80">
                           <span>完成日期: 2024-03-31</span>
                           <button className="text-green-700 font-bold hover:underline flex items-center">
                              查看结果 <ChevronRight size={12} />
                           </button>
                        </div>
                     </div>

                     <div className="pt-3 border-t border-gray-50 flex-1">
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1 mb-3">绩效历史</h4>
                        <div className="flex gap-4">
                           {[
                              { period: '2023 年度', score: 'A' },
                              { period: '2023 H1', score: 'S' },
                              { period: '2022 年度', score: 'A' }
                           ].map((h, i) => (
                              <div key={i} className="flex-1 text-center py-2 bg-gray-50 rounded-lg border border-gray-100">
                                 <div className="text-[10px] text-gray-400 font-medium mb-1">{h.period}</div>
                                 <div className="text-base font-black text-purple-600">{isPerfVisible ? h.score : '*'}</div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </DashboardWidget>
            </div>
          </div>
        )}

        {visibleWidgets.includes('jobs') && (
          <div key="jobs">
            <div className="h-full w-full relative group">
               {isEditMode && (
                 <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                    <LayoutGrid size={12} />
                 </div>
               )}
               <DashboardWidget 
                 className="h-full"
                 isEditMode={isEditMode}
                 onHide={() => handleHideWidget('jobs')}
                 onExpand={() => onNavigate?.('internal-job-board')}
                 title={
                     <div className="flex items-center">
                        <Trophy className="mr-2 text-orange-500" size={20} />
                        <span>内部职位</span>
                     </div>
                 }
               >
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {jobTab === 'recommend' ? (
                        internalJobsPreview.map((job) => (
                          <div 
                            key={job.id}
                            onClick={() => onNavigate?.('internal-job-board', { jobId: job.id })}
                            className="p-3 bg-gray-50 hover:bg-blue-50/30 border border-gray-100 hover:border-blue-200 rounded-xl transition-all cursor-pointer group flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                               <div className="p-2 bg-white rounded-lg text-orange-500 shadow-sm shrink-0">
                                  <Briefcase size={16} />
                               </div>
                               <div className="min-w-0">
                                  <h4 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 truncate">{job.title}</h4>
                                  <div className="flex items-center text-[11px] text-gray-400 space-x-2">
                                    <span className="truncate">{job.dept.split(' ')[0]}</span>
                                    <span>•</span>
                                    <span className="flex items-center"><MapPin size={10} className="mr-0.5"/> {job.loc}</span>
                                  </div>
                               </div>
                            </div>
                            <div className="flex items-center gap-3">
                               <span className="text-[10px] font-bold text-blue-600 group-hover:underline whitespace-nowrap">立即投递</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10 text-gray-400 text-xs">暂无申请记录</div>
                      )}
                   </div>
               </DashboardWidget>
            </div>
          </div>
        )}

        {visibleWidgets.includes('workhours') && (
          <div key="workhours">
            <div className="h-full w-full relative group">
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move opacity-0 group-hover:opacity-100 transition-opacity text-gray-500">
                  <LayoutGrid size={12} />
               </div>
               <DashboardWidget 
                 className="h-full"
                 title="工时统计" 
                 onHide={() => handleHideWidget('workhours')}
                 onExpand={() => onNavigate?.('etms')}
               >
                  <div className="h-full min-h-[200px] w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={workHoursData} margin={{top: 10, right: 10, left: -25, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={10} />
                        <YAxis axisLine={false} tickLine={false} fontSize={10} />
                        <Tooltip cursor={{fill: '#f1f5f9'}} />
                        <Bar dataKey="hours" radius={[4, 4, 0, 0]} barSize={20}>
                          {workHoursData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.day === '周六' || entry.day === '周日' ? '#cbd5e1' : '#10b981'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
               </DashboardWidget>
            </div>
          </div>
        )}

        {visibleWidgets.includes('appCenter') && (
          <div key="appCenter">
            <div className="h-full w-full relative group">
               {isEditMode && (
                 <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                    <LayoutGrid size={12} />
                 </div>
               )}
               <DashboardWidget 
                 className="h-full"
                 title={
                   <div className="flex items-center">
                     <Grid className="mr-2 text-blue-600" size={20} />
                     <span>应用中心</span>
                   </div>
                 }
                 isEditMode={isEditMode}
                 onHide={() => handleHideWidget('appCenter')}
                 onExpand={() => onNavigate?.('my-app-center')}
               >
                  <AppCenter mode="user" />
               </DashboardWidget>
            </div>
          </div>
        )}

        {visibleWidgets.includes('team') && (
          <div key="team">
            <div className="h-full w-full relative group">
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move opacity-0 group-hover:opacity-100 transition-opacity text-gray-500">
                  <LayoutGrid size={12} />
               </div>
               <DashboardWidget 
                 className="h-full"
                 title="团队成员" 
                 onHide={() => handleHideWidget('team')}
                 onExpand={() => onNavigate?.('organization')}
               >
                  <div className="space-y-3 mt-2">
                    {[
                      { name: '张三', role: '前端开发', status: '在线', color: 'bg-green-500' },
                      { name: '李四', role: '后端开发', status: '忙碌', color: 'bg-red-500' },
                      { name: '王五', role: '产品经理', status: '离线', color: 'bg-gray-400' },
                      { name: '赵六', role: 'UI设计', status: '在线', color: 'bg-green-500' },
                    ].map((m, i) => (
                      <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                            {m.name[0]}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-800">{m.name}</div>
                            <div className="text-[10px] text-gray-400">{m.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${m.color}`}></div>
                          <span className="text-[10px] text-gray-500">{m.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
               </DashboardWidget>
            </div>
          </div>
        )}

        {visibleWidgets.includes('competency') && (
          <div key="competency">
            <div className="h-full w-full relative group">
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move opacity-0 group-hover:opacity-100 transition-opacity text-gray-500">
                  <LayoutGrid size={12} />
               </div>
               <DashboardWidget 
                 className="h-full"
                 title="能力模型" 
                 onHide={() => handleHideWidget('competency')}
                 onExpand={() => onNavigate?.('performance')}
               >
                  <div className="h-full min-h-[240px] w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={managerCapabilityData}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="能力值" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
               </DashboardWidget>
            </div>
          </div>
        )}

        {visibleWidgets.includes('level') && (
          <div key="level">
            <div className="h-full w-full relative group">
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move opacity-0 group-hover:opacity-100 transition-opacity text-gray-500">
                  <LayoutGrid size={14} />
               </div>
               <DashboardWidget 
                 className="h-full"
                 title="能级结构分布" 
                 onHide={() => handleHideWidget('level')}
                 onExpand={() => onNavigate?.('organization')}
               >
                  <div className="h-full min-h-[240px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={levelData} margin={{top: 10, right: 10, left: -25, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} interval={0} />
                        <YAxis axisLine={false} tickLine={false} fontSize={10} />
                        <Tooltip cursor={{fill: '#f1f5f9'}} />
                        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
               </DashboardWidget>
            </div>
          </div>
        )}

        {visibleWidgets.includes('age') && (
          <div key="age">
            <div className="h-full w-full relative group">
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move opacity-0 group-hover:opacity-100 transition-opacity text-gray-500">
                  <LayoutGrid size={14} />
               </div>
               <DashboardWidget 
                 className="h-full"
                 title="团队年龄结构" 
                 onHide={() => handleHideWidget('age')}
                 onExpand={() => onNavigate?.('organization')}
               >
                  <div className="h-full min-h-[240px] w-full mt-4 flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie data={ageData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value">
                          {ageData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} iconSize={10} wrapperStyle={{ fontSize: '10px' }}/>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
               </DashboardWidget>
            </div>
          </div>
        )}

        {visibleWidgets.includes('learning') && (
          <div key="learning">
            <div className="h-full w-full relative group">
               {isEditMode && (
                 <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                    <LayoutGrid size={14} />
                 </div>
               )}
               <DashboardWidget 
                 className="h-full"
                 title="学习与培训" 
                 onHide={() => handleHideWidget('learning')}
                 onExpand={() => onNavigate?.('training')}
               >
                  <div className="h-full w-full overflow-hidden">
                    <LearningAndTrainingPanel />
                  </div>
               </DashboardWidget>
            </div>
          </div>
        )}

        {visibleWidgets.includes('recruitment') && (
          <div key="recruitment">
            <div className="h-full w-full relative group">
               {isEditMode && (
                 <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                    <LayoutGrid size={14} />
                 </div>
               )}
               <RecruitmentWidget 
                  isEditMode={isEditMode}
                  onHide={() => handleHideWidget('recruitment')}
                  onNavigate={onNavigate}
               />
            </div>
          </div>
        )}
      </ResponsiveGridLayout>

    </div>
  );
};
