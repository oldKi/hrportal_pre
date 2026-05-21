
import React from 'react';
import { 
  ChevronRight, 
  ChevronDown,
  Search,
  X,
  User,
  FileText,
  Filter,
  Eye
} from 'lucide-react';
import { JobPosting } from '../../types';

interface JobDetailProps {
  job: JobPosting;
  onBack: () => void;
}

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

export const JobDetail: React.FC<JobDetailProps> = ({ job, onBack }) => {
  // Mock data for the specific job view
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
    { id: 'pre-hire', label: '准备录用', count: 1, active: false },
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

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header / Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
         <button onClick={onBack} className="hover:text-blue-600 hover:underline">职位列表</button>
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
};
