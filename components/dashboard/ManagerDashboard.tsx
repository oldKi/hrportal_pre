import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  Users, 
  FileCheck, 
  FileText,
  Briefcase, 
  UserPlus, 
  TrendingUp, 
  Star, 
  AlertCircle, 
  Clock, 
  Target, 
  PieChart as PieChartIcon, 
  BarChart2,
  GitMerge,
  Layers,
  Bell,
  CheckSquare,
  Settings,
  Search,
  GitPullRequest,
  MoreHorizontal,
  Heart,
  Network,
  CheckCircle,
  X,
  MessageSquare,
  MessageCircle,
  Compass,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  ChevronUp,
  Plus,
  LayoutGrid,
  Video,
  Database,
  UserCheck,
  Megaphone,
  Mail
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
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
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
        {
            "i": "profile",
            "x": 0,
            "y": 0,
            "w": 8,
            "h": 10,
            "minH": 6,
            "moved": false,
            "static": false
        },{
            "i": "apps",
            "x": 8,
            "y": 0,
            "w": 4,
            "h": 10,
            "moved": false,
            "static": false
        },
        {
            "i": "todo",
            "x": 0,
            "y": 11,
            "w": 8,
            "h": 20,
            "minW": 4,
            "minH": 18,
            "moved": false,
            "static": false
        },
       {
            "i": "orgChart",
            "x": 8,
            "y": 15,
            "w": 4,
            "h": 20,
            "minW": 4,
            "minH": 20,
            "moved": false,
            "static": false
        }, 
        {
            "i": "teamTable",
            "x": 0,
            "y": 39,
            "w": 12,
            "h": 22,
            "minW": 6,
            "minH": 18,
            "moved": false,
            "static": false
        },
        {
            "i": "recruitment",
            "x": 0,
            "y": 61,
            "w": 4,
            "h": 20,
            "minW": 3,
            "minH": 15,
            "moved": false,
            "static": false
        },
        {
            "i": "levelDist",
            "x": 4,
            "y": 61,
            "w": 4,
            "h": 20,
            "minW": 3,
            "minH": 18,
            "moved": false,
            "static": false
        },
        {
            "i": "ageDist",
            "x": 8,
            "y": 61,
            "w": 4,
            "h": 20,
            "minW": 3,
            "minH": 18,
            "moved": false,
            "static": false
        }
    ]
};
import { PersonalInfoCard } from './PersonalInfoCard';
import { MessageNotificationPanel } from './MessageNotificationPanel';
import { TeamMemberTable } from './TeamMemberTable';
import { UnifiedTodoPanel } from './UnifiedTodoPanel';
import { RecruitmentWidget } from './RecruitmentWidget';
import { DepartmentRecruitmentWidget } from './DepartmentRecruitmentWidget';
import { VerticalOrgChartWidget } from './VerticalOrgChartWidget';
import { QuickActionsCard } from './QuickActionsCard';
import { TodoItem } from '../../types';

// --- Custom Icons ---

const FeishuLogo = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.8 8.1C18.8 8.1 12.9 8.2 9.1 11.1C6.1 13.4 5.3 17.5 5.3 17.5C5.3 17.5 9 17.1 11.9 14.8C14.7 12.6 18.8 8.1 18.8 8.1Z" fill="#1F56D2"/>
    <path d="M15.1 5.3C15.1 5.3 9.2 5.4 5.4 8.3C2.4 10.6 1.6 14.7 1.6 14.7C1.6 14.7 5.3 14.3 8.2 12C11 9.8 15.1 5.3 15.1 5.3Z" fill="#00D6B9"/>
    <path d="M22.5 11C22.5 11 16.6 11.1 12.8 14C9.8 16.3 9 20.4 9 20.4C9 20.4 12.7 20 15.6 17.7C18.4 15.5 22.5 11 22.5 11Z" fill="#3370FF"/>
  </svg>
);

const managerCapabilityData = [
  { subject: 'A1 Strategic Planning', A: 85, fullMark: 100 },
  { subject: 'A2 Make Operational Decisions', A: 92, fullMark: 100 },
  { subject: 'A3 变革引领', A: 88, fullMark: 100 },
  { subject: 'A4 Entrepreneurial Spirit', A: 75, fullMark: 100 },
  { subject: 'A5 Team Leadership', A: 95, fullMark: 100 },
  { subject: 'A6 Strategic Execution', A: 89, fullMark: 100 },
  { subject: 'A7 Strategic Win-Win', A: 82, fullMark: 100 },
  { subject: 'A8 Strategy Impact', A: 87, fullMark: 100 },
  { subject: 'A9 Pursue Excellence', A: 93, fullMark: 100 },
];
// --- Mock Data ---

const availableApps = [
    { id: 'wecom', name: '企业微信', desc: '商务通讯', icon: <MessageCircle size={24}/>, color: 'bg-blue-600', view: 'messages' },
    { id: 'feishu', name: '飞书', desc: '协作办公', icon: <FeishuLogo size={24}/>, color: 'bg-white border border-gray-100', view: 'messages' },
    { id: 'jira', name: 'Jira', desc: '项目追踪', icon: <LayoutGrid size={24}/>, color: 'bg-blue-500', view: 'todo' },
    { id: 'slack', name: 'Slack', desc: '团队协作', icon: <MessageSquare size={24}/>, color: 'bg-purple-500', view: 'messages' },
    { id: 'zoom', name: 'Zoom', desc: '视频会议', icon: <Video size={24}/>, color: 'bg-blue-400', view: 'messages' },
    { id: 'confluence', name: 'Confluence', desc: '文档协作', icon: <FileText size={24}/>, color: 'bg-blue-600', view: 'todo' },
    { id: 'tableau', name: 'Tableau', desc: '数据分析', icon: <PieChartIcon size={24}/>, color: 'bg-orange-500', view: 'analytics' },
    { id: 'ad', name: 'AD域控', desc: '账号管理', icon: <Database size={24}/>, color: 'bg-gray-600', view: 'personnel' },
];

const initialTodoList: TodoItem[] = [
  { 
    id: 1, 
    title: '高级前端工程师 招聘需求审批', 
    date: '2024-03-25', 
    type: '招聘', 
    initials: 'BS', 
    sourceSystem: '招聘管理',
    content: '申请招聘2名高级前端工程师，负责核心业务模块开发，期望5月1日前到岗。',
    targetView: 'job-postings',
    targetParams: { jobId: 'req-1' },
    details: {
      '需求名称': '高级前端工程师',
      '需求部门': '研发中心',
      '招聘人数': 2,
      '期望到岗日期': '2024-05-01',
      '申请人': '张三'
    }
  },
  { 
    id: 2, 
    title: '2024年Q1部门团建费用报销申请', 
    date: '2024-03-26', 
    type: '流程', 
    initials: 'OA', 
    sourceSystem: 'EC',
    content: '报销2024年Q1研发中心部门团建活动费用，共计5000元。',
    details: {
      '流程标题': '2024年Q1部门团建费用报销申请',
      '流程类型': '费用报销',
      '创建人': '李四',
      '节点名称': '部门经理审批',
      '接收时间': '2024-03-11 10:00'
    }
  },
  { 
    id: 3, 
    title: '王五 晋升审批 (P5 -> P6)', 
    date: '2024-03-24', 
    type: '审批', 
    initials: 'SF', 
    sourceSystem: 'SuccessFactors',
    content: '王五在过去一年表现优异，主导了多个核心项目，申请晋升至P6级别。',
    details: {
      '审批主题': '王五 晋升审批',
      '员工姓名': '王五',
      '业务类型': '晋升',
      '生效日期': '2024-04-01',
      '发起人': 'HRBP-赵六'
    }
  },
  { id: 4, title: '签署年度劳动合同续签协议', date: '2024-04-15', type: 'Sign', initials: 'ES' },
];

const initialDoneTasks: TodoItem[] = [
  { 
    id: 'd1', 
    title: '完成 2023 年度年终绩效确认', 
    date: '2024-01-20', 
    type: 'Perf', 
    initials: 'PF',
    sourceSystem: '内部系统',
    details: {
      '考核周期': '2023年度',
      '考核对象': '全体员工',
      '确认时间': '2024-01-20 15:30'
    }
  },
  { id: 'd2', title: '2024年2月饭卡充值申请', date: '2024-02-15', type: 'Sign', initials: 'ES' },
  { id: 'd3', title: '2024年3月办公用品领用', date: '2024-03-10', type: 'Sign', initials: 'ES' },
];

const initialMyAppTasks: TodoItem[] = [
  { id: 'm1', title: '居住证积分续办申请', date: '2024-03-01', type: 'Sign', initials: 'ES' },
  { id: 'm2', title: '收入证明开具申请', date: '2024-03-05', type: 'Sign', initials: 'ES' },
];

const initialCCTasks: TodoItem[] = [
  { 
    id: 'cc1', 
    title: '抄送：张三的入职申请已通过', 
    date: '2024-03-20', 
    type: '通知', 
    initials: 'CC',
    sourceSystem: 'EC',
    processStatus: '已通过',
    details: {
      '主题': '入职申请抄送',
      '申请人': '张三',
      '审批状态': '已通过'
    }
  },
  { 
    id: 'cc2', 
    title: '抄送：李四的请假申请处理中', 
    date: '2024-03-21', 
    type: '通知', 
    initials: 'CC',
    sourceSystem: '内部系统',
    processStatus: '处理中',
    details: {
      '主题': '请假申请抄送',
      '申请人': '李四',
      '审批状态': '处理中'
    }
  }
];

const levelDataC = [
  { name: 'C1', value: 5 }, { name: 'C2', value: 12 }, { name: 'C3', value: 8 }, { name: 'C4', value: 3 }, { name: 'C5', value: 1 }
];
const levelDataJ = [
  { name: 'P4', value: 4 }, 
  { name: 'P5', value: 6 }, 
  { name: 'P6', value: 12 }, 
  { name: 'P7', value: 8 }, 
  { name: 'P8', value: 4 },
  { name: 'P9', value: 2 },
  { name: 'P10', value: 1 }
];

const ageData = [
  { name: '20-30', value: 10 }, { name: '30-40', value: 15 }, { name: '40+', value: 5 }
];

const COLORS = ['#60a5fa', '#34d399', '#ffb74d', '#f87171'];

// --- Components ---

const managerQuickActions = [
  { id: 'sf', label: 'Success Factors', icon: <Heart />, color: 'bg-blue-100 text-blue-600', view: 'personnel' },
  { id: 'proc', label: 'ProC', icon: <GitMerge />, color: 'bg-purple-100 text-purple-600', view: 'process-center' },
  { id: 'etms', label: '假期与考勤', icon: <Clock />, color: 'bg-orange-100 text-orange-600', view: 'attendance' },
  { id: 'level', label: '职位能级', icon: <Layers />, color: 'bg-teal-100 text-teal-600', view: 'organization' },
  { id: 'reports', label: '报表中心', icon: <BarChart2 />, color: 'bg-indigo-100 text-indigo-600', view: 'analytics' },
  { id: 'org', label: '组织架构', icon: <GitPullRequest />, color: 'bg-cyan-100 text-cyan-600', view: 'organization' },
  { id: 'leadership', label: '领导力模型', icon: <Star />, color: 'bg-rose-100 text-rose-600', view: 'performance' },
];

const OrgChartPreview = ({ compact = false, onNavigate }: { compact?: boolean, onNavigate?: (view: string) => void }) => {
  const [viewLevel, setViewLevel] = useState(0);

  const orgData = {
    0: {
      mainNode: { name: 'John Doe', gender: '男', dept: '研发中心', role: '技术总监', phone: '13800138000', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', hasSuperior: true },
      subordinates: [
        { name: 'Alice', gender: '女', dept: '研发中心', role: '前端开发', phone: '13800138001', color: 'bg-blue-500' },
        { name: 'Bob', gender: '男', dept: '研发中心', role: '后端开发', phone: '13800138002', color: 'bg-green-500' },
        { name: 'Carol', gender: '女', dept: '研发中心', role: 'DevOps', phone: '13800138003', color: 'bg-orange-500' },
        { name: 'Dave', gender: '男', dept: '研发中心', role: 'QA', phone: '13800138004', color: 'bg-purple-500' }
      ]
    },
    1: {
      mainNode: { name: 'Sarah Smith', gender: '女', dept: '总经办', role: 'CEO', phone: '13800138888', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200', hasSuperior: false },
      subordinates: [
        { name: 'John Doe', gender: '男', dept: '研发中心', role: '技术总监', phone: '13800138000', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', color: 'bg-gray-800' },
        { name: 'Emma', gender: '女', dept: '市场部', role: '市场总监', phone: '13800138005', color: 'bg-pink-500' },
        { name: 'Michael', gender: '男', dept: '销售部', role: '销售总监', phone: '13800138006', color: 'bg-indigo-500' }
      ]
    }
  };

  const currentData = orgData[viewLevel as keyof typeof orgData];
  const { mainNode, subordinates } = currentData;

  const ProfileTooltip = ({ person }: { person: any }) => (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 p-3 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-left cursor-default">
       <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-gray-200 transform rotate-45"></div>
       <div className="relative z-10">
          <div className="flex justify-between items-center mb-2 border-b border-gray-100 pb-2">
             <div className="font-bold text-gray-800 text-sm">{person.name}</div>
             <button 
               onClick={(e) => { e.stopPropagation(); onNavigate?.('employee-profile'); }} 
               className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center"
             >
               查看更多 <ChevronRight size={12} />
             </button>
          </div>
          <div className="space-y-1 text-[11px] text-gray-600">
             <div className="flex"><span className="text-gray-400 w-10">性别:</span> <span>{person.gender}</span></div>
             <div className="flex"><span className="text-gray-400 w-10">部门:</span> <span>{person.dept}</span></div>
             <div className="flex"><span className="text-gray-400 w-10">职位:</span> <span>{person.role}</span></div>
             <div className="flex"><span className="text-gray-400 w-10">联系:</span> <span>{person.phone}</span></div>
          </div>
       </div>
       {/* Invisible bridge to keep hover active */}
       <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
    </div>
  );

  return (
    <div className={`flex flex-col items-center justify-center relative w-full ${compact ? 'min-h-[220px]' : 'min-h-[300px]'}`}>
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <div className={`border border-gray-100 border-dashed rounded-2xl p-4 bg-white/30 relative z-10 scale-[0.85] transform`}>
        {/* Main Node */}
        <div className="flex flex-col items-center mb-10 relative">
           {mainNode.hasSuperior && (
             <button 
               onClick={() => setViewLevel(1)}
               className="absolute -top-8 flex items-center space-x-1 bg-white border border-gray-200 shadow-sm rounded-full px-2 py-1 text-[10px] text-gray-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all z-20"
             >
               <ChevronUp size={12} />
               <span>查看上一级</span>
             </button>
           )}
           {mainNode.hasSuperior && (
             <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[1.5px] h-2 bg-gray-200"></div>
           )}
           
           <div className="relative group">
               <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center text-lg font-bold shadow-xl border-2 border-white mb-1 overflow-hidden ring-1 ring-gray-100 cursor-pointer transition-transform hover:scale-105`}>
                  {mainNode.img ? (
                    <img src={mainNode.img} alt={mainNode.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500">{mainNode.name[0]}</span>
                  )}
               </div>
               <ProfileTooltip person={mainNode} />
           </div>
           <div className="text-center">
              <div className="font-bold text-gray-800 text-[11px]">{mainNode.name}</div>
           </div>
           {/* Vertical connector */}
           <div className="absolute top-[64px] left-1/2 -translate-x-1/2 w-[1.5px] h-6 bg-gray-200"></div>
        </div>

        {/* Subordinate Grid with Line Connector */}
        <div className="relative w-full">
           {/* Horizontal connecting line */}
           <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gray-200"></div>
           
           <div className="flex justify-between w-full relative gap-2">
              {subordinates.map((p, i) => (
                 <div key={i} className="flex flex-col items-center w-14">
                    <div className="w-[1px] h-4 bg-gray-200"></div>
                    <div className="relative group">
                        <div 
                          onClick={() => {
                            if (p.name === 'John Doe') setViewLevel(0);
                          }}
                          className={`w-8 h-8 rounded-full ${p.color || 'bg-gray-400'} text-white flex items-center justify-center text-[10px] font-bold shadow-md transition-all group-hover:scale-110 mb-1 border-2 border-white ring-1 ring-gray-100 cursor-pointer overflow-hidden`}
                        >
                           {p.img ? (
                             <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                           ) : (
                             p.name[0]
                           )}
                        </div>
                        <ProfileTooltip person={p} />
                    </div>
                    <div className="text-center">
                       <div className="text-[9px] font-bold text-gray-700 truncate w-full">{p.name}</div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export const ManagerDashboard: React.FC<{ 
  onNavigate?: (view: string) => void;
  visibleWidgets?: string[];
  onRemoveWidget?: (id: string) => void;
  isEditMode?: boolean;
}> = ({ onNavigate, visibleWidgets = ['team', 'approvals', 'budget'], onRemoveWidget, isEditMode = false }) => {
  const { width, containerRef } = useContainerWidth();
  const [chartCategory, setChartCategory] = useState<'C' | 'J'>('J');
  const [todoList, setTodoList] = useState(initialTodoList);
  const [ccTasks, setCcTasks] = useState(initialCCTasks);
  const [showAppCenter, setShowAppCenter] = useState(false);

  const [currentLayouts, setCurrentLayouts] = useState(() => {
    const saved = localStorage.getItem('managerDashboardLayouts_v2');
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
    localStorage.setItem('managerDashboardLayouts_v2', JSON.stringify(layouts));
  }, []);

  const handleHideWidget = (id: string) => {
    onRemoveWidget?.(id);
  };

  const handleProcessTasks = (ids: (string | number)[], comment: string) => {
    setTodoList(prev => prev.filter(t => !ids.includes(t.id)));
    alert('已提交处理申请');
  };

  const handleAddApp = (app: any) => {
    setShowAppCenter(false);
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

        {/* 1. Main Grid: Todos */}
        <div key="todo">
          <div className="h-full w-full relative group">
             {isEditMode && (
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                  <LayoutGrid size={12} />
               </div>
             )}
             <UnifiedTodoPanel 
               title="待办任务"
               icon={<CheckSquare size={18} />}
               tabs={[
                 { id: 'pending', label: '待办', tasks: todoList, icon: <Clock size={16} /> },
                 { id: 'done', label: '已办', tasks: initialDoneTasks, icon: <CheckCircle size={16} /> },
                 { id: 'cc', label: '知会', tasks: ccTasks, icon: <Mail size={16} /> },
                 { id: 'created', label: '创建', tasks: initialMyAppTasks, icon: <CheckSquare size={16} /> }
               ]}
               primaryActionLabel="办理"
               onProcessTasks={handleProcessTasks}
               onNavigate={onNavigate}
               className="h-full"
               onExpand={() => onNavigate?.('process-center')}
             />
          </div>
        </div>

        {/* 1.5 Recruitment Widget */}
        <div key="recruitment">
          <div className="h-full w-full relative group">
             {isEditMode && (
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                  <LayoutGrid size={12} />
               </div>
             )}
             <DepartmentRecruitmentWidget 
               onNavigate={onNavigate} 
               isEditMode={isEditMode}
               onHide={() => handleHideWidget('recruitment')}
             />
          </div>
        </div>

        {/* 2. Team List */}
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
        
        {/* 4. Analytics Charts Section */}
        {/* My Team Org Chart */}
        <div key="orgChart">
          <div className="h-full w-full relative group">
             {isEditMode && (
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                  <LayoutGrid size={12} />
               </div>
             )}
             <VerticalOrgChartWidget 
               onNavigate={onNavigate} 
               isEditMode={isEditMode}
               onHide={() => handleHideWidget('orgChart')}
             />
          </div>
        </div>

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
                         <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none'}} />
                         <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
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
                title="团队年龄结构" 
                isEditMode={isEditMode}
                onHide={() => handleHideWidget('ageDist')}
                onExpand={() => onNavigate?.('org-analytics')}
                headerRight={
                <div className="flex space-x-1 bg-gray-100 p-0.5 rounded-lg text-[10px]">
                   <button className="px-1.5 py-0.5 rounded bg-white text-green-600 shadow-sm">管理类 (C)</button>
                   <button className="px-1.5 py-0.5 rounded text-gray-500">技术类 (J)</button>
                </div>
             }>
                <div className="flex-1 w-full mt-4 flex justify-center">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie data={ageData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value">
                            {ageData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                         </Pie>
                         <Tooltip />
                         <Legend verticalAlign="bottom" height={36} iconSize={10} wrapperStyle={{ fontSize: '10px' }}/>
                      </PieChart>
                   </ResponsiveContainer>
                </div>
             </DashboardWidget>
          </div>
        </div>

        {/* 5. BOTTOM: Core Apps */}
        <div key="apps">
          <div className="h-full w-full relative group">
             {isEditMode && (
               <div className="drag-handle absolute top-2 left-1/2 -translate-x-1/2 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-move text-gray-500 animate-pulse">
                  <LayoutGrid size={12} />
               </div>
             )}
             <QuickActionsCard 
                isEditMode={isEditMode}
                onNavigate={onNavigate}
                initialActions={managerQuickActions}
             />
          </div>
        </div>
      </ResponsiveGridLayout>

      {/* App Center Modal */}
      {showAppCenter && createPortal(
         <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[85vh] animate-scale-up">
               <div className="flex justify-between items-center p-5 border-b border-gray-100">
                  <div>
                     <h3 className="font-bold text-gray-800 text-lg">应用中心 (App Center)</h3>
                     <p className="text-sm text-gray-500 mt-1">添加经理常用应用到您的工作台</p>
                  </div>
                  <button onClick={() => setShowAppCenter(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} className="text-gray-500"/></button>
               </div>
               
               <div className="p-6 overflow-y-auto bg-gray-50/50 flex-1 custom-scrollbar">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                     {availableApps.map(app => {
                       return (
                         <div 
                           key={app.id} 
                           onClick={() => handleAddApp(app)}
                           className={`bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center transition-all hover:border-blue-400 hover:shadow-md cursor-pointer`}
                         >
                            <div className={`w-12 h-12 rounded-2xl ${app.color} text-white flex items-center justify-center mb-3 shadow-sm`}>
                               {app.icon}
                            </div>
                            <h4 className="font-bold text-gray-800 text-sm mb-1">{app.name}</h4>
                            <p className="text-xs text-gray-500 line-clamp-1">{app.desc}</p>
                         </div>
                       );
                     })}
                  </div>
               </div>
            </div>
         </div>,
         document.body
      )}
    </div>
  );
};
