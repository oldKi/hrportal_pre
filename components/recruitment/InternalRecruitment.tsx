
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Users, 
  Filter, 
  CheckCircle,
  FileText,
  Calendar,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  User,
  XCircle,
  ShieldCheck,
  Eye,
  X,
  Send,
  ArrowRight,
  GripHorizontal
} from 'lucide-react';
import { JobPosting, Candidate, InternalApplication } from '../../types';
import { JobDetail } from './JobDetail';
import { CandidateList } from './CandidateList';
import { InterviewEvaluationForm } from './InterviewEvaluationForm';
import { InternalApplicationDetail } from './InternalApplicationDetail';

interface InternalRecruitmentProps {
  onNavigate?: (view: string) => void;
  view?: 'jobs' | 'candidates' | 'mgmt';
}

// --- Mock Data ---

const initialInternalApplications: InternalApplication[] = [
  { id: 'A1', candidateName: '王小明', candidateId: 'E1002', currentDept: '销售部', appliedPosition: '产品经理', appliedDept: '产品部', applyDate: '2024-03-12', status: 'Interview', interviewer: '张三' },
  { id: 'A2', candidateName: '李华', candidateId: 'E1005', currentDept: '技术部', appliedPosition: '高级Java开发', appliedDept: '研发部', applyDate: '2024-03-14', status: 'Screening' },
  { id: 'A3', candidateName: '赵芳', candidateId: 'E1008', currentDept: '客服部', appliedPosition: '行政主管', appliedDept: '行政部', applyDate: '2024-03-10', status: 'Evaluation', interviewer: '李四' },
  { id: 'A4', candidateName: '陈志强', candidateId: 'E1009', currentDept: '财务部', appliedPosition: '资深会计', appliedDept: '财务部', applyDate: '2024-03-08', status: 'Confirmed', interviewer: '王五' },
  { id: 'A5', candidateName: '张力', candidateId: 'E1010', currentDept: '供应链', appliedPosition: '采购经理', appliedDept: '采购部', applyDate: '2024-03-05', status: 'DeptScreening' },
];

const mgmtStages = [
  { id: 'All', label: '全部简历' },
  { id: 'Screening', label: '简历初筛' },
  { id: 'DeptScreening', label: '用人部门筛选 (K2)' },
  { id: 'Interview', label: '面试' },
  { id: 'Confirmed', label: '面试通过' }, 
];

const STAGE_ORDER: InternalApplication['status'][] = ['Screening', 'DeptScreening', 'Interview', 'Confirmed'];

export const InternalRecruitment: React.FC<InternalRecruitmentProps> = ({ onNavigate, view = 'jobs' }) => {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [activeApplication, setActiveApplication] = useState<InternalApplication | null>(null);
  const [viewingDetailApp, setViewingDetailApp] = useState<InternalApplication | null>(null);
  const [cancellingApp, setCancellingApp] = useState<InternalApplication | null>(null);
  const [activeMgmtStage, setActiveMgmtStage] = useState('All');
  const [applications, setApplications] = useState<InternalApplication[]>(initialInternalApplications);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);

  useEffect(() => {
    setSelectedJob(null);
    setActiveApplication(null);
    setViewingDetailApp(null);
    setCancellingApp(null);
  }, [view]);

  // 根据当前选中的节点过滤数据
  const filteredApplications = useMemo(() => {
    if (activeMgmtStage === 'All') return applications;
    if (activeMgmtStage === 'Interview') {
      return applications.filter(app => app.status === 'Interview' || app.status === 'Evaluation');
    }
    return applications.filter(app => app.status === activeMgmtStage);
  }, [applications, activeMgmtStage]);

  const handleUpdateStatus = (id: string, newStatus: InternalApplication['status']) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    if (viewingDetailApp && viewingDetailApp.id === id) {
      setViewingDetailApp({ ...viewingDetailApp, status: newStatus });
    }
  };

  const handleNextStep = (app: InternalApplication) => {
    const currentIndex = STAGE_ORDER.indexOf(app.status === 'Evaluation' ? 'Interview' : app.status);
    if (currentIndex !== -1 && currentIndex < STAGE_ORDER.length - 1) {
      const nextStatus = STAGE_ORDER[currentIndex + 1];
      handleUpdateStatus(app.id, nextStatus);
    }
  };

  // --- Drag and Drop Handlers ---
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('applicationId', id);
    e.dataTransfer.effectAllowed = 'move';
    
    // 创建一个轻量级的预览样式
    const ghost = document.createElement('div');
    ghost.style.padding = '8px 12px';
    ghost.style.background = '#3b82f6';
    ghost.style.color = 'white';
    ghost.style.borderRadius = '6px';
    ghost.style.position = 'absolute';
    ghost.style.top = '-1000px';
    ghost.innerText = `正在移动应聘者...`;
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 0, 0);
    setTimeout(() => document.body.removeChild(ghost), 0);
  };

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    if (stageId !== 'All') {
      setDragOverStage(stageId);
    }
  };

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    setDragOverStage(null);
    const appId = e.dataTransfer.getData('applicationId');
    if (appId && stageId !== 'All') {
      handleUpdateStatus(appId, stageId as InternalApplication['status']);
    }
  };

  if (activeApplication) {
    return (
      <InterviewEvaluationForm 
        application={activeApplication} 
        onBack={() => setActiveApplication(null)} 
      />
    );
  }

  if (viewingDetailApp) {
    return (
      <InternalApplicationDetail 
        application={viewingDetailApp} 
        onUpdateStatus={handleUpdateStatus}
        onBack={() => setViewingDetailApp(null)} 
      />
    );
  }

  if (selectedJob) {
    return <JobDetail job={selectedJob} onBack={() => setSelectedJob(null)} />;
  }

  if (view === 'mgmt') {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <ClipboardCheck className="mr-3 text-blue-600" />
            内部招聘管理
          </h2>
          <div className="flex space-x-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
                <input type="text" placeholder="应聘人 / 职位检索..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none"/>
             </div>
             <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm flex items-center hover:bg-gray-50">
               <Filter size={16} className="mr-2"/> 筛选
             </button>
          </div>
        </div>

        {/* Stage Filter Header - Acting as Drop Zones */}
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm flex overflow-hidden">
           {mgmtStages.map((stage) => (
             <div 
               key={stage.id}
               onClick={() => setActiveMgmtStage(stage.id)}
               onDragOver={(e) => handleDragOver(e, stage.id)}
               onDragLeave={() => setDragOverStage(null)}
               onDrop={(e) => handleDrop(e, stage.id)}
               className={`flex-1 p-5 border-r border-gray-100 last:border-r-0 cursor-pointer transition-all flex flex-col items-center justify-center relative
                 ${activeMgmtStage === stage.id ? 'bg-blue-50/30' : 'hover:bg-gray-50'}
                 ${dragOverStage === stage.id ? 'bg-blue-100 ring-2 ring-inset ring-blue-500 z-10' : ''}`}
             >
                <span className={`text-sm mb-2 font-medium transition-colors ${activeMgmtStage === stage.id || dragOverStage === stage.id ? 'text-blue-600' : 'text-gray-500'}`}>
                  {stage.label}
                </span>
                <span className={`text-3xl font-bold transition-transform ${dragOverStage === stage.id ? 'scale-110' : ''} ${activeMgmtStage === stage.id ? 'text-blue-700' : 'text-slate-800'}`}>
                  {stage.id === 'All' ? applications.length : applications.filter(a => stage.id === 'Interview' ? (a.status === 'Interview' || a.status === 'Evaluation') : a.status === stage.id).length}
                </span>
                {activeMgmtStage === stage.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>}
                {dragOverStage === stage.id && stage.id !== 'All' && (
                  <div className="absolute top-1 right-1">
                    <Plus size={14} className="text-blue-600 animate-pulse" />
                  </div>
                )}
             </div>
           ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="p-4 pl-6">应聘人</th>
                <th className="p-4">当前部门</th>
                <th className="p-4">申请职位 / 部门</th>
                <th className="p-4">申请日期</th>
                <th className="p-4">当前状态</th>
                <th className="p-4 text-right pr-6">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredApplications.length > 0 ? filteredApplications.map(app => {
                const canGoNext = STAGE_ORDER.indexOf(app.status === 'Evaluation' ? 'Interview' : app.status) < STAGE_ORDER.length - 1 && app.status !== 'Rejected';
                
                return (
                  <tr 
                    key={app.id} 
                    draggable 
                    onDragStart={(e) => handleDragStart(e, app.id)}
                    className="hover:bg-blue-50/20 transition-colors group cursor-grab active:cursor-grabbing"
                  >
                    <td className="p-4 pl-6">
                      <div className="flex items-center">
                        <GripHorizontal size={14} className="text-gray-300 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">{app.candidateName[0]}</div>
                        <div>
                          <div className="font-bold text-gray-800">{app.candidateName}</div>
                          <div className="text-[10px] text-gray-400">{app.candidateId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{app.currentDept}</td>
                    <td className="p-4">
                      <div className="font-medium text-gray-800">{app.appliedPosition}</div>
                      <div className="text-xs text-gray-500">{app.appliedDept}</div>
                    </td>
                    <td className="p-4 font-mono text-gray-400">{app.applyDate}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-xs border ${
                        app.status === 'Interview' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                        app.status === 'Screening' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                        app.status === 'DeptScreening' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                        app.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-200' :
                        app.status === 'Confirmed' ? 'bg-green-50 text-green-600 border-green-200' :
                        'bg-teal-50 text-teal-600 border-teal-200'
                      }`}>
                        {app.status === 'Interview' ? '待面试' : 
                        app.status === 'Screening' ? '简历初筛' : 
                        app.status === 'DeptScreening' ? '部门筛选(K2)' :
                        app.status === 'Rejected' ? '已取消' :
                        app.status === 'Confirmed' ? '面试通过' :
                        '评价中'}
                      </span>
                    </td>
                    <td className="p-4 text-right pr-6">
                      <div className="flex justify-end space-x-2">
                        <button 
                            onClick={() => setViewingDetailApp(app)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center bg-blue-50 px-2.5 py-1.5 rounded-md border border-blue-100 transition-colors"
                        >
                            <Eye size={14} className="mr-1.5"/> 查看
                        </button>
                        
                        {(app.status === 'Interview' || app.status === 'Evaluation') && (
                            <button 
                              onClick={() => setActiveApplication(app)}
                              className="bg-orange-500 text-white px-3 py-1.5 rounded text-xs hover:bg-orange-600 flex items-center shadow-sm"
                            >
                              <ShieldCheck size={14} className="mr-1.5" /> 评价
                            </button>
                        )}

                        {app.status !== 'Rejected' && app.status !== 'Confirmed' && (
                            <button 
                              onClick={() => setCancellingApp(app)}
                              className="text-red-600 hover:text-red-800 font-medium text-xs flex items-center bg-red-50 px-2.5 py-1.5 rounded-md border border-red-100 transition-colors"
                            >
                              <XCircle size={14} className="mr-1.5"/> 取消
                            </button>
                        )}

                        {canGoNext && (
                            <button 
                              onClick={() => handleNextStep(app)}
                              className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs hover:bg-blue-700 flex items-center shadow-md active:scale-95 transition-all font-bold"
                            >
                              下一步 <ArrowRight size={14} className="ml-1.5" />
                            </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={6} className="py-20 text-center text-gray-400">
                    <div className="flex flex-col items-center">
                       <ClipboardCheck size={48} className="opacity-10 mb-2"/>
                       <p>当前阶段暂无应聘人数据</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Cancellation Modal */}
        {cancellingApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-md animate-scale-up">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 text-lg flex items-center">
                  <XCircle size={20} className="text-red-500 mr-2"/>
                  取消申请 - {cancellingApp.candidateName}
                </h3>
                <button onClick={() => setCancellingApp(null)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">取消原因 <span className="text-red-500">*</span></label>
                  <textarea 
                     className="w-full border border-gray-300 rounded-lg p-3 text-sm h-32 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                     placeholder="请输入取消招聘/申请的具体原因..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">同步抄送 (可选)</label>
                  <div className="flex flex-wrap gap-4">
                     {['业务主管', 'HRBP', '应聘者'].map(role => (
                        <label key={role} className="flex items-center space-x-2 cursor-pointer group">
                           <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                           <span className="text-sm text-gray-600 group-hover:text-gray-900">{role}</span>
                        </label>
                     ))}
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3 rounded-b-xl">
                <button onClick={() => setCancellingApp(null)} className="px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 font-medium transition-colors">返回</button>
                <button 
                   onClick={() => {
                      handleUpdateStatus(cancellingApp.id, 'Rejected');
                      setCancellingApp(null);
                   }}
                   className="px-8 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 shadow-md transition-all active:scale-95 flex items-center"
                >
                   确认取消
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Jobs view (default)
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Users className="mr-3 text-orange-500" />
            内部招聘 (需求计划)
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            年度招聘需求计划及部门 BP 岗位需求录入
          </p>
        </div>
        <button 
          onClick={() => onNavigate && onNavigate('job-postings')}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center shadow-sm transition-colors w-full sm:w-auto justify-center"
        >
          <Plus size={18} className="mr-2" />
          发布新需求
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="text-gray-500 text-sm border-b border-gray-100">
                  <th className="py-3 pl-2 font-medium w-1/4">职位名称 / 部门</th>
                  <th className="py-3 font-medium w-1/2">内部申请状态</th>
                  <th className="py-3 font-medium">状态</th>
                  <th className="py-3 text-right pr-2">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {initialInternalApplications.map((job, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                    <td className="py-4 pl-2">
                      <div className="font-medium text-gray-800">{job.appliedPosition}</div>
                      <div className="text-xs text-gray-500 mt-1">{job.appliedDept}</div>
                    </td>
                    <td className="py-4">
                        <div className="flex items-center">
                           <div className="bg-orange-50 text-orange-700 px-3 py-1 rounded-md text-xs font-medium border border-orange-100">
                             活动中
                           </div>
                        </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700`}>
                        招聘中
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
      </div>
    </div>
  );
};
