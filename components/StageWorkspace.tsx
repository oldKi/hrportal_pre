import React, { useState } from 'react';
import { 
  User, 
  CheckSquare, 
  LayoutGrid, 
  Clock, 
  BookOpen, 
  TrendingUp, 
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  Search,
  Bell,
  Heart,
  GitMerge,
  Layers,
  Pen,
  Calendar,
  Zap,
  Building,
  MapPin,
  Flame,
  Award,
  AlertCircle,
  Utensils
} from 'lucide-react';
import { EmployeeProfile } from './personnel/EmployeeProfile';
import { UnifiedTodoPanel } from './dashboard/UnifiedTodoPanel';
import { InternalJobBoard } from './recruitment/InternalJobBoard';
import { LearningAndTrainingPanel } from './training/LearningAndTrainingPanel';

interface StageWindow {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  component: React.ReactNode;
  previewLabel: string;
  hasNew?: boolean;
}

export const StageWorkspace: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const [activeStageId, setActiveStageId] = useState('etms'); // 默认选中工时统计查看效果
  
  const stages: StageWindow[] = [
    {
      id: 'profile',
      title: '个人主页',
      icon: <User size={20} />,
      color: 'bg-blue-500',
      previewLabel: '档案与概览',
      component: (
        <div className="h-full overflow-y-auto custom-scrollbar">
          <EmployeeProfile onNavigate={onNavigate} />
        </div>
      )
    },
    {
      id: 'todo',
      title: '待办中心',
      icon: <CheckSquare size={20} />,
      color: 'bg-indigo-600',
      previewLabel: '4 项待办',
      hasNew: true,
      component: (
        <div className="h-full flex flex-col p-6">
           <UnifiedTodoPanel 
              title="待办中心"
              onProcessTasks={() => {}}
              onNavigate={onNavigate}
              tasks={[
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
                }
              ]}
              className="flex-1 shadow-none border-0"
           />
        </div>
      )
    },
    {
      id: 'launchpad',
      title: '应用启动板',
      icon: <LayoutGrid size={20} />,
      color: 'bg-purple-600',
      previewLabel: '系统快捷方式',
      component: (
        <div className="h-full flex flex-col items-center justify-center p-12 bg-gray-50/50">
           <div className="max-w-4xl w-full grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: 'SuccessFactors', icon: <Heart />, color: 'bg-blue-600' },
                { name: 'ProC 流程', icon: <GitMerge />, color: 'bg-purple-600' },
                { name: '职位能级', icon: <Layers />, color: 'bg-orange-500' },
                { name: '合同签署', icon: <Pen />, color: 'bg-indigo-600' },
                { name: '假期 ETMS', icon: <Clock />, color: 'bg-orange-400' },
                { name: '报表中心', icon: <TrendingUp />, color: 'bg-teal-500' },
                { name: '考勤打卡', icon: <MapPin />, color: 'bg-red-500' },
                { name: '消息通知', icon: <Bell />, color: 'bg-yellow-500' },
              ].map((app, i) => (
                <div key={i} className="flex flex-col items-center group cursor-pointer">
                   <div className={`w-20 h-20 rounded-[2.5rem] ${app.color} text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-active:scale-95 transition-all duration-300`}>
                      {React.cloneElement(app.icon as React.ReactElement<any>, { size: 40 })}
                   </div>
                   <span className="mt-4 font-bold text-gray-700 group-hover:text-blue-600 transition-colors">{app.name}</span>
                </div>
              ))}
           </div>
        </div>
      )
    },
    {
      id: 'etms',
      title: '工时统计',
      icon: <Clock size={20} />,
      color: 'bg-orange-500',
      previewLabel: '本周 42.5h',
      component: (
        <div className="h-full p-8 flex flex-col">
           <div className="flex justify-between items-center mb-8">
              <div className="flex items-baseline space-x-4">
                <h3 className="text-3xl font-bold text-gray-800">本周工时回顾</h3>
                <p className="text-gray-500 font-medium">2024.03.18 - 2024.03.24</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-black text-blue-600">42.5</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Total Hours</div>
              </div>
           </div>
           
           <div className="flex-1 flex flex-col gap-4">
              {/* Time scale labels */}
              <div className="flex justify-between px-16 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 border-b border-gray-100 pb-2">
                <span>00:00</span>
                <span>04:00</span>
                <span>08:00</span>
                <span>12:00</span>
                <span>16:00</span>
                <span>20:00</span>
                <span>24:00</span>
              </div>

              {[
                { day: '周一', hours: 8.5, checkIn: '8:48', checkOut: '18:20', inColor: 'text-red-500', outColor: 'text-orange-500', isLeave: false },
                { day: '周二', hours: 8.5, checkIn: '9:00', checkOut: '18:00', inColor: 'text-gray-400', outColor: 'text-gray-400', isLeave: false },
                { day: '周三', hours: 8.5, checkIn: '9:05', checkOut: '18:00', inColor: 'text-orange-500', outColor: 'text-red-500', isLeave: false }, 
                { day: '周四', hours: 0.0, checkIn: '--:--', checkOut: '休假', inColor: 'text-gray-300', outColor: 'text-blue-500', isLeave: true }, 
                { day: '周五', hours: 8.5, checkIn: '9:10', checkOut: '18:00', inColor: 'text-orange-500', outColor: 'text-gray-400', isLeave: false },
                { day: '周六', hours: 0.0, checkIn: '--:--', checkOut: '--:--', inColor: 'text-gray-300', outColor: 'text-gray-300', isLeave: false, isWeekend: true },
                { day: '周日', hours: 0.0, checkIn: '--:--', checkOut: '--:--', inColor: 'text-gray-300', outColor: 'text-gray-300', isLeave: false, isWeekend: true },
              ].map((item, i) => {
                const timeToPercent = (time: string) => {
                  if (!time || time === '--:--' || time === '休假') return 0;
                  const [h, m] = time.split(':').map(Number);
                  return ((h * 60 + m) / (24 * 60)) * 100;
                };

                const startPercent = timeToPercent(item.checkIn);
                const endPercent = timeToPercent(item.checkOut);
                const widthPercent = Math.max(endPercent - startPercent, 0.5); // Minimum width for visibility

                const isWeekend = item.day === '周六' || item.day === '周日';

                return (
                  <div key={i} className={`flex items-center gap-6 group h-14 px-4 rounded-2xl hover:bg-white hover:shadow-sm transition-all cursor-default ${isWeekend ? 'opacity-60' : ''}`}>
                    <div className="w-12 shrink-0">
                      <span className={`font-bold text-sm ${isWeekend ? 'text-gray-400' : 'text-gray-800'}`}>{item.day}</span>
                    </div>
                    
                    <div className="flex-1 h-10 relative flex items-center">
                      {/* Background Track */}
                      <div className="absolute inset-0 bg-gray-100/50 rounded-xl border border-gray-200/20"></div>
                      
                      {/* Background Grid Lines */}
                      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-10">
                        {[...Array(7)].map((_, idx) => (
                          <div key={idx} className="w-px h-full bg-gray-400"></div>
                        ))}
                      </div>

                      {item.isLeave ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex items-center gap-2 text-blue-400">
                            <Calendar size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">On Leave</span>
                          </div>
                        </div>
                      ) : (
                        <div className="relative w-full h-full flex items-center">
                          {/* Check-in Time Label (Hover only) */}
                          <div 
                            className="absolute -top-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0"
                            style={{ left: `${startPercent}%`, transform: 'translateX(-50%)' }}
                          >
                            <span className="text-[10px] font-mono font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 shadow-sm">
                              {item.checkIn}
                            </span>
                          </div>

                          {/* The Range Bar */}
                          <div 
                            className={`absolute h-5 rounded-full shadow-sm transition-all duration-500 ${isWeekend ? 'bg-gray-300' : 'bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:from-blue-400 group-hover:to-indigo-500'}`}
                            style={{ 
                              left: `${startPercent}%`, 
                              width: `${widthPercent}%` 
                            }}
                          ></div>

                          {/* Check-out Time Label (Hover only) */}
                          <div 
                            className="absolute -top-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0"
                            style={{ left: `${endPercent}%`, transform: 'translateX(-50%)' }}
                          >
                            <span className="text-[10px] font-mono font-black text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100 shadow-sm">
                              {item.checkOut}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="w-16 text-right shrink-0">
                      <span className={`text-xs font-black ${item.isLeave ? 'text-blue-400' : 'text-gray-600'}`}>
                        {item.isLeave ? '全天' : `${item.hours}h`}
                      </span>
                    </div>
                  </div>
                );
              })}
           </div>
           <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Calendar className="text-blue-600" />
                <div>
                   <p className="font-bold text-blue-800">剩余年假余额: 5 天</p>
                   <p className="text-sm text-blue-600">建议在 Q2 结束前使用</p>
                </div>
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-md transition-all active:scale-95">去申请休假</button>
           </div>
        </div>
      )
    },
    {
      id: 'jobs',
      title: '内部机会',
      icon: <TrendingUp size={20} />,
      color: 'bg-rose-500',
      previewLabel: '新发布岗位',
      hasNew: true,
      component: (
        <div className="h-full p-6 flex flex-col">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <Flame size={20} className="mr-2 text-orange-500" /> 推荐内部转岗
              </h3>
           </div>
           <div className="space-y-4">
              {[
                { title: '高级 Java 开发工程师', dept: '研发中心', loc: '上海', level: 'P6', type: '技术' },
                { title: '产品经理 (供应链方向)', dept: '产品部', loc: '上海', level: 'P5', type: '产品' },
                { title: '资深数据分析师', dept: '运营部', loc: '上海', level: 'P7', type: '专业' }
              ].map((job, i) => (
                <div key={i} className="bg-white border border-gray-100 p-5 rounded-2xl flex justify-between items-center hover:shadow-md transition-all cursor-pointer group">
                   <div className="flex items-center">
                      <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mr-4 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                         <Building size={24} />
                      </div>
                      <div>
                         <h4 className="font-bold text-gray-800 group-hover:text-rose-600 transition-colors">{job.title}</h4>
                         <p className="text-xs text-gray-500 mt-1">{job.dept} | {job.loc} | {job.level}</p>
                      </div>
                   </div>
                   <button className="p-2 text-gray-300 hover:text-rose-500">
                      <ChevronRight size={20} />
                   </button>
                </div>
              ))}
           </div>
           <button 
              onClick={() => onNavigate('internal-job-board')}
              className="mt-6 w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
           >
              进入内部招聘公告板 <TrendingUp size={16} />
           </button>
        </div>
      )
    },
    {
      id: 'training',
      title: '学习培训',
      icon: <BookOpen size={20} />,
      color: 'bg-emerald-600',
      previewLabel: '2 项待办课程',
      hasNew: true,
      component: (
        <div className="h-full p-8 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800">学习培训中心</h3>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
              <Award size={20} />
              <span className="font-bold">已获 12 个勋章</span>
            </div>
          </div>
          <LearningAndTrainingPanel />
        </div>
      )
    }
  ];

  const activeStage = stages.find(s => s.id === activeStageId)!;

  return (
    <div className="h-[calc(100vh-140px)] min-h-[600px] flex gap-12 relative animate-fade-in p-4 md:p-8">
       {/* Tech-Gradient Industrial Background Image Layer - Updated to use provided Pexels URL */}
       <div className="absolute inset-0 -z-20 rounded-[3rem] overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/3156482/pexels-photo-3156482.jpeg" 
            alt="Tech Industrial Workspace Background" 
            className="w-full h-full object-cover"
          />
          {/* Multi-layered Tech Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-blue-900/30 to-purple-900/20"></div>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
       </div>

       {/* Left Shelf (macOS Style Stage Previews) */}
       <div className="hidden lg:flex flex-col justify-center gap-6 w-48 shrink-0 py-8">
          {stages.map((stage) => {
            const isActive = stage.id === activeStageId;
            return (
              <div 
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`
                  group relative w-40 h-28 rounded-2xl cursor-pointer transition-all duration-500 transform
                  ${isActive 
                    ? 'translate-x-8 opacity-0 pointer-events-none scale-110' 
                    : 'hover:translate-x-2 translate-x-0 opacity-10 hover:opacity-100 hover:scale-105'}
                `}
              >
                 {/* Preview Container */}
                 <div className={`
                    w-full h-full rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg overflow-hidden flex flex-col relative
                    ${!isActive && 'ring-2 ring-transparent group-hover:ring-blue-400/30'}
                 `}>
                    <div className="h-6 flex items-center justify-between px-3 bg-white/5 border-b border-white/10">
                       <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                       </div>
                       <span className="text-[8px] font-bold text-white/50 truncate max-w-[60px] uppercase tracking-tighter">{stage.title}</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center p-2 text-center">
                       <div className="relative">
                          <div className={`${stage.color} text-white p-2 rounded-xl mb-1 shadow-lg ring-2 ring-white/10`}>
                             {React.cloneElement(stage.icon as React.ReactElement<any>, { size: 14 })}
                          </div>
                          {!isActive && stage.hasNew && (
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white/50 shadow-sm z-30 animate-pulse"></div>
                          )}
                       </div>
                       <span className="text-[9px] font-bold text-white/90 leading-none drop-shadow-md">{stage.previewLabel}</span>
                    </div>
                 </div>

                 {!isActive && (
                   <div className="absolute -left-28 top-1/2 -translate-y-1/2 bg-blue-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-2xl border border-white/10">
                      {stage.title}
                   </div>
                 )}
              </div>
            );
          })}
       </div>

       {/* Main Stage Area */}
       <div className="flex-1 flex flex-col relative">
          <div className="flex-1 bg-white/90 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.3)] border border-white/40 overflow-hidden flex flex-col transition-all duration-500 animate-scale-up">
             {/* Window Title Bar - Made bg-transparent as per request */}
             <div className="h-14 flex items-center justify-between px-8 bg-transparent shrink-0">
                <div className="flex items-center gap-4">
                   <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400/80 shadow-sm hover:bg-red-500 cursor-pointer transition-colors" onClick={() => setActiveStageId('launchpad')}></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400/80 shadow-sm"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400/80 shadow-sm"></div>
                   </div>
                   <div className="h-6 w-px bg-gray-300 mx-2"></div>
                   <div className="flex items-center gap-2">
                      <div className={`${activeStage.color} text-white p-1.5 rounded-lg shadow-md ring-1 ring-white/20`}>
                         {activeStage.icon}
                      </div>
                      <span className="font-extrabold text-gray-900 text-sm tracking-tight">{activeStage.title}</span>
                   </div>
                </div>

                <div className="flex items-center gap-4">
                   <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                         type="text" 
                         placeholder="在窗口内搜索..." 
                         className="pl-9 pr-4 py-1.5 bg-gray-100/80 border border-transparent rounded-full text-xs focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all w-48 outline-none shadow-inner"
                      />
                   </div>
                   <div className="h-6 w-px bg-gray-200 mx-1"></div>
                   <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Maximize2 size={18}/></button>
                   <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><X size={20}/></button>
                </div>
             </div>

             {/* Window Body */}
             <div className="flex-1 overflow-hidden relative bg-white/30">
                {activeStage.component}
             </div>
          </div>

          {/* Activity Bar (Bottom Navigation for smaller screens) */}
          <div className="lg:hidden mt-4 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-2 flex justify-between gap-2 overflow-x-auto no-scrollbar shadow-xl">
             {stages.map(stage => (
                <button 
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`flex flex-col items-center justify-center min-w-[70px] py-2 rounded-xl transition-all relative ${
                    activeStageId === stage.id ? 'bg-blue-600 text-white shadow-lg border border-white/20' : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                   {stage.hasNew && activeStageId !== stage.id && (
                     <div className="absolute top-1 right-3 w-2 h-2 bg-red-500 rounded-full border border-white/50"></div>
                   )}
                   {stage.icon}
                   <span className="text-[10px] mt-1 font-bold">{stage.title.split(' ')[0]}</span>
                </button>
             ))}
          </div>
       </div>

       {/* Floating Quick Action Widget (Siri/AI-like) */}
       <div className="fixed bottom-24 right-8 z-[70] group">
          <div className="absolute bottom-full right-0 mb-4 w-64 bg-white/95 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl p-5 opacity-0 scale-90 translate-y-4 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 origin-bottom-right pointer-events-none group-hover:pointer-events-auto ring-1 ring-black/5">
             <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                <Sparkles size={16} className="text-blue-600 animate-pulse" />
                <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Stage 智能建议</span>
             </div>
             <div className="space-y-3">
                <div 
                   onClick={() => setActiveStageId('profile')}
                   className="p-3 bg-orange-50/50 hover:bg-orange-50 rounded-2xl cursor-pointer transition-all border border-orange-100 hover:shadow-sm flex items-start gap-3"
                >
                   <AlertCircle size={16} className="text-orange-500 mt-0.5 shrink-0" />
                   <div>
                     <p className="text-[11px] font-black text-orange-900">个人档案待更新</p>
                     <p className="text-[10px] text-orange-700 mt-1 leading-tight">已有 99 天未核对信息，请及时确认当前联系方式。</p>
                   </div>
                </div>
                <div 
                   onClick={() => setActiveStageId('jobs')}
                   className="p-3 bg-blue-50/50 hover:bg-blue-50 rounded-2xl cursor-pointer transition-all border border-blue-100 hover:shadow-sm flex items-start gap-3"
                >
                   <Zap size={16} className="text-blue-500 mt-0.5 shrink-0" />
                   <div>
                     <p className="text-[11px] font-black text-blue-900">智能职位匹配</p>
                     <p className="text-[10px] text-blue-700 mt-1 leading-tight">您有 2 个新职位匹配您的技能，点击查看机会。</p>
                   </div>
                </div>
             </div>
          </div>
          <button className="relative w-16 h-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-full shadow-[0_10px_40px_rgba(37,99,235,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-4 border-white/50 group-active:shadow-inner">
             <Zap size={28} className="fill-white drop-shadow-md" />
             <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
               <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
             </div>
          </button>
       </div>
    </div>
  );
};
