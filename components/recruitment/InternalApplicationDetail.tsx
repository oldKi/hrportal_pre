
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  User, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Database, 
  FileText, 
  History, 
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  Send,
  Loader2,
  MailCheck,
  X
} from 'lucide-react';
import { InternalApplication } from '../../types';

interface InternalApplicationDetailProps {
  application: InternalApplication;
  onUpdateStatus?: (id: string, newStatus: InternalApplication['status']) => void;
  onBack: () => void;
}

export const InternalApplicationDetail: React.FC<InternalApplicationDetailProps> = ({ application, onUpdateStatus, onBack }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'job'>('profile');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInvitationSuccess, setShowInvitationSuccess] = useState(false);

  // Mock SuccessFactors (SF) Data Source
  const sfData = {
    name: application.candidateName,
    id: application.candidateId,
    gender: '男',
    tenure: '4.5年',
    mobile: '138-xxxx-5678',
    email: 'xiaoming.wang@company.com',
    currentPosition: '资深软件开发',
    performanceLastYear: 'A (优秀)',
    performanceHistory: ['A', 'S', 'A'],
    competencies: ['技术攻坚', '跨部门协作', '快速学习'],
    education: [
      { degree: '硕士', school: '上海交通大学', major: '计算机科学', period: '2016-2018' },
      { degree: '本科', school: '同济大学', major: '软件工程', period: '2012-2016' }
    ],
    careerHistory: [
      { title: '资深开发工程师', dept: '产研中心', period: '2021/06 - 至今', description: '负责核心中间件开发与维护' },
      { title: '中级开发工程师', dept: '产研中心', period: '2019/03 - 2021/06', description: '参与电商中台研发' }
    ]
  };

  const handleNextStage = () => {
    setIsProcessing(true);
    setTimeout(() => {
      let nextStatus: InternalApplication['status'] = 'Screening';
      
      if (application.status === 'Screening') {
        nextStatus = 'DeptScreening'; // Pass to K2
      } else if (application.status === 'DeptScreening') {
        nextStatus = 'Interview'; // Send invite and move to interview
        setShowInvitationSuccess(true);
      }
      
      onUpdateStatus?.(application.id, nextStatus);
      setIsProcessing(false);
    }, 1200);
  };

  const renderHeaderActions = () => {
    if (isProcessing) {
      return (
        <button disabled className="px-6 py-2 bg-gray-200 text-gray-500 rounded-lg flex items-center font-bold">
           <Loader2 size={16} className="mr-2 animate-spin"/> 处理中...
        </button>
      );
    }

    switch (application.status) {
      case 'Screening':
        return (
          <>
            <button className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-medium flex items-center justify-center">
               <XCircle size={16} className="mr-2"/> 拒绝申请
            </button>
            <button 
              onClick={handleNextStage}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all active:scale-95 text-sm font-bold flex items-center justify-center"
            >
               <CheckCircle size={16} className="mr-2"/> 初筛通过，送 K2 审核
            </button>
          </>
        );
      case 'DeptScreening':
        return (
          <>
            <button className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-medium flex items-center justify-center">
               <XCircle size={16} className="mr-2"/> 部门 K2 拒绝
            </button>
            <button 
              onClick={handleNextStage}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-md transition-all active:scale-95 text-sm font-bold flex items-center justify-center"
            >
               <Send size={16} className="mr-2"/> K2 审核通过并发送面试邀请
            </button>
          </>
        );
      case 'Interview':
        return (
          <div className="flex items-center text-green-600 font-bold bg-green-50 px-4 py-2 rounded-lg border border-green-200">
             <MailCheck size={18} className="mr-2"/> 面试邀请已发送 (内部邮件)
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in pb-20">
      {/* Back Button moved to Top Left as per screenshot request */}
      <div className="flex items-center px-1">
        <button 
          onClick={onBack}
          className="flex items-center text-sm text-gray-500 hover:text-gray-800 font-bold transition-colors group"
        >
          <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform"/> 
          返回管理列表
        </button>
      </div>

      {/* Toast Notification for Invitation */}
      {showInvitationSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[100] animate-bounce">
           <div className="bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center">
              <CheckCircle size={20} className="mr-2"/>
              <span>已向员工 {application.candidateName} 发送面试邀请内部邮件！</span>
              <button onClick={() => setShowInvitationSuccess(false)} className="ml-4 hover:opacity-70"><X size={16}/></button>
           </div>
        </div>
      )}

      {/* Header Info Banner */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-slate-800 p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
           <div className="flex items-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center font-bold text-2xl shadow-lg border-2 border-slate-700 mr-5 shrink-0">
                 {application.candidateName[0]}
              </div>
              <div>
                 <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">{application.candidateName}</h1>
                    <span className="bg-blue-500/20 text-blue-300 text-[10px] px-2 py-0.5 rounded border border-blue-500/30 font-bold uppercase tracking-wider">Internal Candidate</span>
                 </div>
                 <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-300">
                    <span className="flex items-center"><User size={14} className="mr-1.5 opacity-60"/> 工号: {application.candidateId}</span>
                    <span className="flex items-center"><Briefcase size={14} className="mr-1.5 opacity-60"/> {sfData.currentPosition}</span>
                    <span className="flex items-center"><MapPin size={14} className="mr-1.5 opacity-60"/> {application.currentDept}</span>
                 </div>
              </div>
           </div>
           
           <div className="flex gap-3 shrink-0 w-full md:w-auto">
              {renderHeaderActions()}
           </div>
        </div>

        {/* Local Navigation Tabs */}
        <div className="flex border-b border-gray-100 px-6 bg-gray-50">
           <button 
             onClick={() => setActiveTab('profile')}
             className={`px-6 py-4 text-sm font-bold transition-colors relative ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
           >
              <span className="flex items-center"><User size={16} className="mr-2"/> 候选人简历档案</span>
              {activeTab === 'profile' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
           </button>
           <button 
             onClick={() => setActiveTab('job')}
             className={`px-6 py-4 text-sm font-bold transition-colors relative ${activeTab === 'job' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
           >
              <span className="flex items-center"><FileText size={16} className="mr-2"/> 申请职位明细</span>
              {activeTab === 'job' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Left Main Column */}
         <div className="lg:col-span-2 space-y-6">
            {activeTab === 'profile' ? (
               <>
                  {/* SF Profile Integration */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                     <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center">
                           <Database size={20} className="mr-2 text-blue-600"/> 核心档案 (Sourced from SuccessFactors)
                        </h3>
                        <button className="text-blue-600 text-xs font-medium flex items-center hover:underline">
                           查看 SF 完整档案 <ExternalLink size={12} className="ml-1"/>
                        </button>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                        <div className="flex justify-between border-b border-gray-50 pb-2">
                           <span className="text-gray-400 text-sm">联系手机</span>
                           <span className="text-gray-800 font-medium flex items-center"><Phone size={12} className="mr-2 text-gray-300"/> {sfData.mobile}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-50 pb-2">
                           <span className="text-gray-400 text-sm">电子邮箱</span>
                           <span className="text-gray-800 font-medium flex items-center"><Mail size={12} className="mr-2 text-gray-300"/> {sfData.email}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-50 pb-2">
                           <span className="text-gray-400 text-sm">司龄</span>
                           <span className="text-gray-800 font-medium">{sfData.tenure}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-50 pb-2">
                           <span className="text-gray-400 text-sm">年度绩效</span>
                           <span className="text-blue-600 font-bold">{sfData.performanceLastYear}</span>
                        </div>
                     </div>
                     
                     <div className="mt-8">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">核心能力能力 (Competencies)</label>
                        <div className="flex flex-wrap gap-2">
                           {sfData.competencies.map(c => (
                              <span key={c} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">{c}</span>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Company Work History */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                     <h3 className="text-lg font-bold text-gray-800 flex items-center mb-6">
                        <History size={20} className="mr-2 text-blue-600"/> 公司任职记录 (Career Path)
                     </h3>
                     <div className="space-y-8 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                        {sfData.careerHistory.map((item, idx) => (
                           <div key={idx} className="relative pl-9">
                              <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${idx === 0 ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                 {idx === 0 && <CheckCircle size={10} className="text-white"/>}
                              </div>
                              <div className="flex justify-between items-start">
                                 <div>
                                    <h4 className="font-bold text-gray-800">{item.title}</h4>
                                    <p className="text-sm text-gray-500 font-medium">{item.dept}</p>
                                 </div>
                                 <span className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded">{item.period}</span>
                              </div>
                              <p className="mt-2 text-sm text-gray-600 leading-relaxed italic">"{item.description}"</p>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Education Background */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                     <h3 className="text-lg font-bold text-gray-800 flex items-center mb-6">
                        <GraduationCap size={22} className="mr-2 text-blue-600"/> 学历信息 (Education)
                     </h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sfData.education.map((edu, idx) => (
                           <div key={idx} className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-white hover:border-blue-200 transition-all group">
                              <div className="flex justify-between items-start mb-2">
                                 <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase">{edu.degree}</span>
                                 <span className="text-[10px] text-gray-400 font-mono">{edu.period}</span>
                              </div>
                              <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{edu.school}</h4>
                              <p className="text-xs text-gray-500 mt-1">{edu.major}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </>
            ) : (
               /* Job Detail View */
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8 animate-fade-in">
                  <section>
                     <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center border-b border-gray-50 pb-2">
                        申请岗位明细
                     </h3>
                     <div className="grid grid-cols-2 gap-6">
                        <div>
                           <label className="text-xs font-bold text-gray-400 uppercase block mb-1">应聘职位</label>
                           <p className="text-gray-900 font-bold">{application.appliedPosition}</p>
                        </div>
                        <div>
                           <label className="text-xs font-bold text-gray-400 uppercase block mb-1">所属部门</label>
                           <p className="text-gray-900 font-bold">{application.appliedDept}</p>
                        </div>
                        <div>
                           <label className="text-xs font-bold text-gray-400 uppercase block mb-1">需求编号</label>
                           <p className="text-gray-900 font-mono">REQ-2024-001</p>
                        </div>
                        <div>
                           <label className="text-xs font-bold text-gray-400 uppercase block mb-1">申请日期</label>
                           <p className="text-gray-900 font-mono">{application.applyDate}</p>
                        </div>
                     </div>
                  </section>
                  
                  <section>
                     <label className="block text-xs font-bold text-gray-400 uppercase mb-3">岗位职责概览</label>
                     <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 text-sm text-gray-700 leading-loose">
                        负责集团数字化转型相关的产品规划与设计，协调内外部资源，推动重点项目如期上线。
                     </div>
                  </section>
               </div>
            )}
         </div>

         {/* Right Sidebar Column */}
         <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions Card - Progress Tracker */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Clock size={18} className="mr-2 text-blue-600"/> 申请状态追踪
               </h3>
               <div className="space-y-6 relative before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-50">
                  {/* Stage 1 */}
                  <div className={`relative pl-6 ${application.status !== 'Screening' ? 'opacity-50' : ''}`}>
                     <div className={`absolute left-0 top-1 w-4 h-4 rounded-full ${application.status === 'Screening' ? 'bg-blue-600 ring-4 ring-blue-50' : 'bg-green-50'}`}>
                        {application.status !== 'Screening' && <CheckCircle size={14} className="text-white"/>}
                     </div>
                     <p className={`text-sm font-bold ${application.status === 'Screening' ? 'text-blue-600' : 'text-gray-500'}`}>简历初筛 (HRBP)</p>
                     <p className="text-[10px] text-gray-400 mt-0.5">{application.applyDate}</p>
                  </div>
                  
                  {/* Stage 2 */}
                  <div className={`relative pl-6 ${application.status === 'Screening' ? 'opacity-30' : application.status === 'DeptScreening' ? '' : 'opacity-50'}`}>
                     <div className={`absolute left-0 top-1 w-4 h-4 rounded-full ${
                       application.status === 'DeptScreening' ? 'bg-purple-600 ring-4 ring-purple-50' : 
                       (application.status === 'Interview' || application.status === 'Evaluation' || application.status === 'Confirmed') ? 'bg-green-500' : 'bg-gray-200'
                     }`}>
                        {(application.status === 'Interview' || application.status === 'Evaluation' || application.status === 'Confirmed') && <CheckCircle size={14} className="text-white"/>}
                     </div>
                     <p className={`text-sm font-bold ${application.status === 'DeptScreening' ? 'text-purple-600' : 'text-gray-500'}`}>部门 K2 负责人筛选</p>
                     <p className="text-[10px] text-gray-400 mt-0.5">
                       {application.status === 'Screening' ? '等待同步' : application.status === 'DeptScreening' ? '处理中' : '审核通过'}
                     </p>
                  </div>

                  {/* Stage 3 */}
                  <div className={`relative pl-6 ${application.status === 'Interview' ? '' : (application.status === 'Evaluation' || application.status === 'Confirmed') ? 'opacity-50' : 'opacity-30'}`}>
                     <div className={`absolute left-0 top-1 w-4 h-4 rounded-full ${
                       application.status === 'Interview' ? 'bg-orange-500 ring-4 ring-orange-50' : 
                       (application.status === 'Evaluation' || application.status === 'Confirmed') ? 'bg-green-500' : 'bg-gray-200'
                     }`}>
                        {(application.status === 'Evaluation' || application.status === 'Confirmed') && <CheckCircle size={14} className="text-white"/>}
                     </div>
                     <p className={`text-sm font-bold ${application.status === 'Interview' ? 'text-orange-500' : 'text-gray-500'}`}>面试环节 (Invitation Sent)</p>
                     {application.status === 'Interview' && <p className="text-[10px] text-gray-400 mt-0.5">已发送内部邀请邮件</p>}
                  </div>

                  {/* Final Stage */}
                  <div className={`relative pl-6 ${application.status === 'Evaluation' || application.status === 'Confirmed' ? '' : 'opacity-30'}`}>
                     <div className={`absolute left-0 top-1 w-4 h-4 rounded-full ${application.status === 'Confirmed' ? 'bg-green-50 ring-4 ring-green-50' : 'bg-gray-200'}`}></div>
                     <p className={`text-sm font-bold ${application.status === 'Confirmed' ? 'text-green-600' : 'text-gray-500'}`}>录用/异动确认</p>
                  </div>
               </div>
            </div>

            {/* Assessment Summary Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
               <h3 className="font-bold mb-4 flex items-center">
                  <Award size={18} className="mr-2"/> 绩效评估快照
               </h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/10 p-3 rounded-lg backdrop-blur-md">
                     <span className="text-xs opacity-80">2023 绩效</span>
                     <span className="text-xl font-bold">A</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/10 p-3 rounded-lg backdrop-blur-md">
                     <span className="text-xs opacity-80">胜任力评分</span>
                     <span className="text-xl font-bold">4.8 <span className="text-[10px] font-normal opacity-60">/ 5.0</span></span>
                  </div>
               </div>
               <p className="text-[10px] mt-4 opacity-60 italic">* 该数据实时同步自 SF 绩效模块</p>
            </div>
         </div>
      </div>
    </div>
  );
};
