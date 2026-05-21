
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  RefreshCw, 
  ExternalLink, 
  Globe, 
  MoreHorizontal,
  Filter,
  CheckCircle
} from 'lucide-react';
import { 
  FunnelChart, 
  Funnel, 
  LabelList, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { JobPosting, Candidate } from '../../types';
import { JobDetail } from './JobDetail';
import { CandidateList } from './CandidateList';

interface ExternalRecruitmentProps {
  onNavigate?: (view: string) => void;
  view?: 'jobs' | 'candidates';
}

// Mock Data
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

const externalFunnelData = [
  { name: '简历初筛', count: 125 },
  { name: '复筛', count: 68 },
  { name: '电话面试', count: 32 },
  { name: '复试', count: 15 },
  { name: 'offer', count: 8 },
  { name: '入职', count: 5 },
];

const mockCandidates: Candidate[] = [
  { id: 'C00000165', name: '王小明', gender: '男', age: 26, degree: '硕士研究生', experience: '3年', latestScreener: '张三', applyDate: '2024-03-15', status: 'DeptScreening' },
  { id: 'C00000164', name: '李晓华', gender: '女', age: 24, degree: '本科', experience: '1年', latestScreener: '李四', applyDate: '2024-03-14', status: 'Initial' },
  { id: 'C00000163', name: '陈志强', gender: '男', age: 26, degree: '本科', experience: '5年', latestScreener: '王五', applyDate: '2020-07-20', status: 'FirstInterview' },
  { id: 'C00000162', name: '刘芳', gender: '女', age: 28, degree: '硕士研究生', experience: '4年', latestScreener: '张三', applyDate: '2024-03-12', status: 'DeptScreening' },
];

const stages = [
  { id: 'All', label: '全部简历', count: 211 },
  { id: 'Initial', label: '简历初筛', count: 156 },
  { id: 'DeptScreening', label: '用人部门筛选', count: 27 },
  { id: 'WrittenTest', label: '笔试', count: 3 },
  { id: 'FirstInterview', label: '初试', count: 17 },
  { id: 'SecondInterview', label: '复试', count: 1 },
];

export const ExternalRecruitment: React.FC<ExternalRecruitmentProps> = ({ onNavigate, view = 'jobs' }) => {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  useEffect(() => {
    setSelectedJob(null);
  }, [view]);

  if (selectedJob) {
    return <JobDetail job={selectedJob} onBack={() => setSelectedJob(null)} />;
  }

  if (view === 'candidates') {
    return <CandidateList candidates={mockCandidates} isExternal={true} stages={stages} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Globe className="mr-3 text-blue-500" />
            招聘管理 (外部集成)
          </h2>
          <p className="text-sm text-gray-500 mt-1 flex items-center">
            <span className="w-2 h-2 rounded-full mr-2 bg-green-500"></span>
            招聘管理系统 API 已连接
          </p>
        </div>
        <button 
          onClick={() => onNavigate && onNavigate('job-postings')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center shadow-sm transition-colors w-full sm:w-auto justify-center"
        >
          <Plus size={18} className="mr-2" />
          发布新职位 (外部)
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
             <button className="text-gray-500 hover:text-blue-600 flex items-center text-sm border border-gray-200 px-3 py-2 rounded-md w-full sm:w-auto justify-center">
               <RefreshCw size={14} className="mr-2" /> 同步数据
             </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="text-gray-500 text-sm border-b border-gray-100">
                  <th className="py-3 pl-2 font-medium w-1/4">职位名称 / 部门</th>
                  <th className="py-3 font-medium w-1/2">
                    招聘管理状态 (实时)
                  </th>
                  <th className="py-3 font-medium">状态</th>
                  <th className="py-3 text-right pr-2">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {externalJobPostings.map((job) => (
                  <tr key={job.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                    <td className="py-4 pl-2">
                      <button 
                        onClick={() => setSelectedJob(job)}
                        className="font-medium flex items-center hover:underline text-left text-blue-600"
                      >
                        {job.title}
                        {job.status === 'Published' && <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </button>
                      <div className="text-xs text-gray-500 mt-1">{job.department} | {job.publishDate} 发布</div>
                    </td>
                    <td className="py-4">
                      {job.status === 'Draft' ? (
                         <span className="text-gray-400 text-xs italic">尚未发布</span>
                      ) : (
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
                招聘漏斗 (本月)
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
                      data={externalFunnelData}
                      isAnimationActive
                    >
                      <LabelList position="right" fill="#4b5563" stroke="none" dataKey="name" />
                      <LabelList position="center" fill="#ffffff" stroke="none" dataKey="count" fontSize={12} fontWeight="bold" />
                      {externalFunnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`rgba(59, 130, 246, ${1 - (index * 0.15)})`} />
                      ))}
                    </Funnel>
                  </FunnelChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="bg-blue-600 rounded-lg shadow-md p-6 text-white">
              <div className="flex items-center mb-4">
                <CheckCircle className="mr-2 opacity-80" size={20} />
                <h4 className="font-semibold">待办任务</h4>
              </div>
              <ul className="space-y-3 text-sm text-white/90">
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
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};
