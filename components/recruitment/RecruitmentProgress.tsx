
import React, { useState, useMemo } from 'react';
import { 
  ChevronRight, 
  Search, 
  Filter, 
  ChevronLeft, 
  MoreHorizontal,
  Clock,
  User,
  CheckCircle2,
  FileText,
  Calendar,
  Building2,
  MapPin,
  Mail,
  ShieldCheck,
  Award,
  BookOpen,
  History,
  GraduationCap,
  // Added missing icon imports
  Briefcase,
  Phone,
  XCircle,
  Plus
} from 'lucide-react';

// --- Types ---

interface ProgressJob {
  id: string;
  title: string;
  department: string;
  location: string;
  totalApplicants: number;
  inProgressCount: number;
  offerCount: number;
  publishDate: string;
}

interface InterviewStep {
  stage: string;
  interviewer: string;
  date: string;
  score: string;
  feedback: string;
  status: 'passed' | 'rejected' | 'pending';
}

interface ProgressCandidate {
  id: string;
  name: string;
  currentStage: string;
  lastUpdated: string;
  avatar?: string;
  mobile: string;
  email: string;
  edu: string;
  major: string;
  history: InterviewStep[];
}

// --- Mock Data ---

const MOCK_JOBS: ProgressJob[] = [
  { id: 'JOB-001', title: '高级Java开发工程师', department: '研发中心', location: '上海', totalApplicants: 45, inProgressCount: 12, offerCount: 2, publishDate: '2024-03-01' },
  { id: 'JOB-002', title: '资深产品经理', department: '产品部', location: '北京', totalApplicants: 32, inProgressCount: 8, offerCount: 1, publishDate: '2024-03-05' },
  { id: 'JOB-003', title: 'HRBP 经理', department: '人力资源', location: '上海', totalApplicants: 18, inProgressCount: 5, offerCount: 0, publishDate: '2024-03-10' },
  { id: 'JOB-004', title: '大数据架构师', department: '数字化中心', location: '深圳', totalApplicants: 24, inProgressCount: 10, offerCount: 1, publishDate: '2024-03-12' },
  { id: 'JOB-005', title: '前端专家', department: '研发中心', location: '上海', totalApplicants: 56, inProgressCount: 15, offerCount: 3, publishDate: '2024-02-28' },
];

const MOCK_CANDIDATES: Record<string, ProgressCandidate[]> = {
  'JOB-001': [
    { 
      id: 'C1', name: '张三', currentStage: '第一轮面试', lastUpdated: '2024-03-20', mobile: '13812345678', email: 'zhangsan@example.com', edu: '硕士', major: '计算机科学',
      history: [
        { stage: '简历初筛', interviewer: 'HR Lisa', date: '2024-03-15', score: 'A', feedback: '基础扎实，项目经验丰富。', status: 'passed' },
        { stage: '第一轮面试', interviewer: '架构师 老王', date: '2024-03-20', score: '-', feedback: '正在评估中...', status: 'pending' },
      ]
    },
    { 
      id: 'C2', name: '李四', currentStage: '第二轮面试', lastUpdated: '2024-03-21', mobile: '13987654321', email: 'lisi@example.com', edu: '本科', major: '软件工程',
      history: [
        { stage: '简历初筛', interviewer: 'HR Lisa', date: '2024-03-14', score: 'A', feedback: '背景契合。', status: 'passed' },
        { stage: '第一轮面试', interviewer: 'TL 张大', date: '2024-03-18', score: 'A-', feedback: '代码能力强。', status: 'passed' },
        { stage: '第二轮面试', interviewer: '总监 赵六', date: '2024-03-21', score: '-', feedback: '待面', status: 'pending' },
      ]
    },
    { 
      id: 'C3', name: 'Lisa', currentStage: 'Offer确认', lastUpdated: '2024-03-19', mobile: '13700001111', email: 'lisa.w@example.com', edu: '本科', major: '通信工程',
      history: [
        { stage: '简历初筛', interviewer: 'HR Lisa', date: '2024-03-01', score: 'S', feedback: '极其优秀。', status: 'passed' },
        { stage: '第一轮面试', interviewer: 'TL 张大', date: '2024-03-05', score: 'S', feedback: '技术全面。', status: 'passed' },
        { stage: '第二轮面试', interviewer: '总监 赵六', date: '2024-03-10', score: 'A+', feedback: '领导力潜质。', status: 'passed' },
        { stage: 'Offer确认', interviewer: 'HRBP 王五', date: '2024-03-15', score: 'A', feedback: '薪资已谈妥，待签。', status: 'passed' },
      ]
    },
  ],
};

// --- Sub Components ---

const JobCard: React.FC<{ job: ProgressJob; onClick: () => void }> = ({ job, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <Briefcase size={24} />
      </div>
      <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded uppercase tracking-widest">{job.id}</span>
    </div>
    
    <h3 className="text-xl font-extrabold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{job.title}</h3>
    
    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
       <span className="flex items-center"><Building2 size={14} className="mr-1.5" /> {job.department}</span>
       <span className="flex items-center"><MapPin size={14} className="mr-1.5" /> {job.location}</span>
    </div>

    <div className="grid grid-cols-3 gap-2 border-t border-gray-50 pt-4">
       <div className="text-center">
          <div className="text-lg font-bold text-gray-800">{job.totalApplicants}</div>
          <div className="text-[10px] text-gray-400 font-bold uppercase">总申请</div>
       </div>
       <div className="text-center border-x border-gray-100">
          <div className="text-lg font-bold text-blue-600">{job.inProgressCount}</div>
          <div className="text-[10px] text-gray-400 font-bold uppercase">流程中</div>
       </div>
       <div className="text-center">
          <div className="text-lg font-bold text-green-600">{job.offerCount}</div>
          <div className="text-[10px] text-gray-400 font-bold uppercase">Offer</div>
       </div>
    </div>
  </div>
);

// --- Main View Component ---

export const RecruitmentProgress: React.FC = () => {
  const [view, setView] = useState<'jobs' | 'candidates' | 'detail'>('jobs');
  const [selectedJob, setSelectedJob] = useState<ProgressJob | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<ProgressCandidate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.department.includes(searchQuery));
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleBack = () => {
    if (view === 'detail') setView('candidates');
    else if (view === 'candidates') setView('jobs');
  };

  // --- Views ---

  const renderJobsList = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative flex-1 w-full max-w-md">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input 
               type="text" 
               placeholder="搜索职位、部门或工单号..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
             />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <button className="flex-1 md:flex-none px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-center">
                <Filter size={16} className="mr-2"/> 筛选选项
             </button>
             <button className="flex-1 md:flex-none px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md">
                导出报表
             </button>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedJobs.map(job => (
            <JobCard key={job.id} job={job} onClick={() => { setSelectedJob(job); setView('candidates'); }} />
          ))}
       </div>

       {/* Pagination */}
       <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-sm text-gray-500">
          <span>显示 {(currentPage-1)*itemsPerPage+1} 到 {Math.min(currentPage*itemsPerPage, filteredJobs.length)} 条记录</span>
          <div className="flex items-center space-x-2">
             <button 
               onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
               disabled={currentPage === 1}
               className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-30"
             >
                <ChevronLeft size={16} />
             </button>
             <div className="flex gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                   <button 
                     key={i} 
                     onClick={() => setCurrentPage(i + 1)}
                     className={`w-8 h-8 rounded-lg font-bold text-xs ${currentPage === i+1 ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-100'}`}
                   >
                     {i + 1}
                   </button>
                ))}
             </div>
             <button 
               onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
               disabled={currentPage === totalPages}
               className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-30"
             >
                <ChevronRight size={16} />
             </button>
          </div>
       </div>
    </div>
  );

  const renderCandidatePipeline = () => {
    const candidates = selectedJob ? (MOCK_CANDIDATES[selectedJob.id] || []) : [];
    return (
      <div className="space-y-6 animate-fade-in">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"><ChevronLeft size={20}/></button>
               <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedJob?.title}</h2>
                  <p className="text-sm text-gray-500">{selectedJob?.department} | 候选人面试进度详情</p>
               </div>
            </div>
            <div className="flex space-x-2">
               <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-600 bg-white hover:bg-gray-50 flex items-center">
                  <Mail size={16} className="mr-2" /> 批量通知
               </button>
            </div>
         </div>

         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-[11px] border-b border-gray-100">
                  <tr>
                     <th className="p-5 pl-8">候选人姓名</th>
                     <th className="p-5">最高学历</th>
                     <th className="p-5">专业</th>
                     <th className="p-5">当前面试阶段</th>
                     <th className="p-5">最后更新日期</th>
                     <th className="p-5 text-right pr-8">操作</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {candidates.map(cand => (
                    <tr 
                      key={cand.id} 
                      className="hover:bg-blue-50/20 transition-colors cursor-pointer group"
                      onClick={() => { setSelectedCandidate(cand); setView('detail'); }}
                    >
                       <td className="p-5 pl-8">
                          <div className="flex items-center">
                             <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mr-3 shadow-inner">
                                {cand.name[0]}
                             </div>
                             <div className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{cand.name}</div>
                          </div>
                       </td>
                       <td className="p-5 text-gray-600">{cand.edu}</td>
                       <td className="p-5 text-gray-600">{cand.major}</td>
                       <td className="p-5">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                            cand.currentStage === 'Offer确认' ? 'bg-green-50 text-green-700 border-green-200' :
                            cand.currentStage === '淘汰' ? 'bg-red-50 text-red-700 border-red-200' :
                            'bg-blue-50 text-blue-600 border-blue-200'
                          }`}>
                             {cand.currentStage}
                          </span>
                       </td>
                       <td className="p-5 text-gray-400 font-mono text-xs">{cand.lastUpdated}</td>
                       <td className="p-5 text-right pr-8">
                          <div className="flex justify-end gap-2">
                             <button className="text-blue-600 font-bold hover:underline">详情</button>
                             <button className="text-gray-400 hover:text-blue-600 transition-colors p-1"><MoreHorizontal size={16}/></button>
                          </div>
                       </td>
                    </tr>
                  ))}
                  {candidates.length === 0 && (
                     <tr>
                        <td colSpan={6} className="p-20 text-center text-gray-400 italic">暂无候选人简历投递该职位</td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
    );
  };

  const renderCandidateDetail = () => {
    if (!selectedCandidate) return null;
    return (
      <div className="space-y-6 animate-fade-in max-w-5xl mx-auto pb-12">
         {/* Breadcrumbs & Actions */}
         <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
               <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"><ChevronLeft size={20}/></button>
               <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedCandidate.name} 的面试评估</h2>
                  <p className="text-sm text-gray-500">申请职位: {selectedJob?.title}</p>
               </div>
            </div>
            <div className="flex gap-3">
               <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-600 bg-white hover:bg-gray-50 flex items-center">
                  <FileText size={16} className="mr-2" /> 生成 PDF 报告
               </button>
               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md">
                  处理下一阶段
               </button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Resume Snapshot (Styled like SF Profile) */}
            <div className="lg:col-span-1 space-y-6">
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-slate-800 p-8 text-center text-white relative">
                     <div className="w-24 h-24 rounded-3xl bg-blue-500 mx-auto flex items-center justify-center font-extrabold text-4xl shadow-xl border-4 border-slate-700 mb-4">
                        {selectedCandidate.name[0]}
                     </div>
                     <h3 className="text-2xl font-bold">{selectedCandidate.name}</h3>
                     <p className="text-slate-400 text-sm mt-1">{selectedCandidate.edu} | {selectedCandidate.major}</p>
                     <div className="absolute top-4 right-4">
                        <Award className="text-yellow-500" size={20}/>
                     </div>
                  </div>
                  <div className="p-6 space-y-6">
                     <div>
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">联系方式</h4>
                        <div className="space-y-2 text-sm">
                           <div className="flex items-center text-gray-600"><Phone size={14} className="mr-2 opacity-60"/> {selectedCandidate.mobile}</div>
                           <div className="flex items-center text-gray-600"><Mail size={14} className="mr-2 opacity-60"/> {selectedCandidate.email}</div>
                        </div>
                     </div>
                     <div className="border-t border-gray-50 pt-6">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">教育背景</h4>
                        <div className="flex items-start gap-3">
                           <div className="p-2 bg-gray-100 rounded-lg text-gray-500"><GraduationCap size={18}/></div>
                           <div>
                              <p className="text-sm font-bold text-gray-800">同济大学</p>
                              <p className="text-xs text-gray-500">{selectedCandidate.major}</p>
                           </div>
                        </div>
                     </div>
                     <button className="w-full py-2.5 mt-4 bg-gray-50 border border-gray-200 rounded-lg text-blue-600 font-bold text-xs hover:bg-blue-50 transition-colors flex items-center justify-center">
                        <FileText size={14} className="mr-2"/> 查看完整附件简历
                     </button>
                  </div>
               </div>
            </div>

            {/* Right: Interview History Timeline */}
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center mb-8">
                     <History size={20} className="mr-2 text-blue-600"/> 面试过程追踪 (Interview Timeline)
                  </h3>

                  <div className="relative space-y-12 before:content-[''] before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                     {selectedCandidate.history.map((step, idx) => (
                        <div key={idx} className="relative pl-12 group">
                           {/* Step Indicator */}
                           <div className={`absolute left-0 top-1 w-9 h-9 rounded-full border-4 border-white shadow-md flex items-center justify-center z-10 transition-transform group-hover:scale-110 ${
                              step.status === 'passed' ? 'bg-green-50' :
                              step.status === 'rejected' ? 'bg-red-50' :
                              'bg-blue-500 animate-pulse'
                           }`}>
                              {step.status === 'passed' ? <CheckCircle2 size={16} className="text-white"/> : 
                               step.status === 'rejected' ? <XCircle size={16} className="text-white"/> : 
                               <Clock size={16} className="text-white"/>}
                           </div>

                           <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 transition-all hover:bg-white hover:shadow-lg hover:border-blue-100">
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                                 <div>
                                    <h4 className="text-lg font-bold text-gray-900">{step.stage}</h4>
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                       <span className="flex items-center"><User size={12} className="mr-1"/> 面试官: {step.interviewer}</span>
                                       <span className="flex items-center"><Calendar size={12} className="mr-1"/> {step.date}</span>
                                    </div>
                                 </div>
                                 {step.score !== '-' && (
                                    <div className="flex items-center bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm">
                                       <span className="text-[10px] font-bold text-gray-400 mr-2 uppercase">面试得分</span>
                                       <span className="text-xl font-black text-blue-600">{step.score}</span>
                                    </div>
                                 )}
                              </div>
                              
                              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-inner">
                                 <p className="text-sm text-gray-700 leading-relaxed italic">
                                    "{step.feedback}"
                                 </p>
                              </div>

                              {step.status === 'passed' && (
                                 <div className="mt-4 flex items-center text-green-600 text-xs font-bold">
                                    <ShieldCheck size={14} className="mr-1.5" /> 已通过面试并签署保密协议
                                 </div>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Future Steps Indicator */}
                  {selectedCandidate.currentStage !== 'Offer确认' && (
                    <div className="mt-12 p-6 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 group cursor-pointer hover:border-blue-300 hover:text-blue-500 transition-all">
                       <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center mr-4 group-hover:bg-blue-50">
                          <Plus size={20}/>
                       </div>
                       <div className="font-bold text-sm">点击安排下一轮面试 / 阶段</div>
                    </div>
                  )}
               </div>
            </div>
         </div>
      </div>
    );
  };

  return (
    <div className="p-1 md:p-4">
       {view === 'jobs' && renderJobsList()}
       {view === 'candidates' && renderCandidatePipeline()}
       {view === 'detail' && renderCandidateDetail()}
    </div>
  );
};
