
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Building, 
  Users, 
  ChevronRight, 
  X, 
  FileText, 
  CheckCircle2, 
  Filter,
  ArrowLeft,
  Calendar,
  Layers,
  Sparkles,
  Send,
  Briefcase,
  Upload,
  File,
  MessageSquare,
  ChevronLeft,
  Loader2,
  LayoutGrid,
  Table as TableIcon,
  List as ListIcon,
  Flame,
  MoreHorizontal
} from 'lucide-react';

interface InternalJob {
  id: string;
  title: string;
  department: string;
  location: string;
  category: string;
  headcount: number;
  level: string;
  postDate: string;
  description: string;
  requirements: string[];
  applied?: boolean;
}

const MOCK_INTERNAL_JOBS: InternalJob[] = [
  {
    id: 'IJ-2024-001',
    title: '高级 Java 开发工程师',
    department: '研发中心 - 核心交易组',
    location: '上海嘉定',
    category: '技术序列',
    headcount: 2,
    level: 'P6',
    postDate: '2024-03-20',
    description: '负责集团核心支付系统的架构设计与开发，支撑双十一等高并发场景，进行技术难点攻关及系统优化。',
    requirements: [
      '5年以上 Java 开发经验，熟悉 Spring Cloud 微服务架构',
      '精通 MySQL 调优及 Redis、Kafka 等中间件',
      '具备高并发、分布式系统实战经验优先'
    ]
  },
  {
    id: 'IJ-2024-002',
    title: '产品经理 (供应链方向)',
    department: '产品部 - 智慧物流',
    location: '上海嘉定',
    category: '产品序列',
    headcount: 1,
    level: 'P5-P6',
    postDate: '2024-03-22',
    description: '统筹供应链中台产品规划，对接业务部门需求，输出高质量 PRD，推动研发落地并持续迭代。',
    requirements: [
      '3年以上互联网产品经验，有物流 or 供应链背景优先',
      '出色的逻辑分析能力与跨部门沟通协作能力',
      '熟悉常用的产品设计工具（Axure, Figma 等）'
    ]
  },
  {
    id: 'IJ-2024-003',
    title: '数据分析专家',
    department: '运营部 - 商业分析',
    location: '上海嘉定',
    category: '专业序列',
    headcount: 1,
    level: 'P7',
    postDate: '2024-03-18',
    description: '通过数据挖掘分析用户行为，为业务决策提供洞察支撑，建立科学的运营指标评估体系。',
    requirements: [
      '精通 SQL, Python/R 等数据分析工具',
      '具备较强的数据敏感度和商业洞察力',
      '有大型项目数据看板设计经验者优先'
    ]
  },
  {
    id: 'IJ-2024-004',
    title: '行政主管',
    department: '行政部 - 员工体验',
    location: '长沙分公司',
    category: '职能序列',
    headcount: 1,
    level: 'M1',
    postDate: '2024-03-25',
    description: '全面负责分公司行政管理工作，优化办公环境，提升员工服务满意度。',
    requirements: [
      '具备优秀的组织协调能力与突发事件处理能力',
      '熟悉行政成本控制与外包供应商管理',
      '有团队管理经验者优先'
    ]
  }
];

export const InternalJobBoard: React.FC<{ initialJobId?: string }> = ({ initialJobId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedJob, setSelectedJob] = useState<InternalJob | null>(null);
  const [jobs, setJobs] = useState(MOCK_INTERNAL_JOBS);
  const [isApplying, setIsApplying] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'list'>('grid');
  
  // New State for Application Flow
  const [viewStep, setViewStep] = useState<'list' | 'details' | 'upload'>('list');
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string, size: string }>>([]);

  useEffect(() => {
    if (initialJobId) {
      const job = MOCK_INTERNAL_JOBS.find(j => j.id === initialJobId);
      if (job) {
        setSelectedJob(job);
        setViewStep('details');
      }
    }
  }, [initialJobId]);

  const categories = ['All', '技术序列', '产品序列', '专业序列', '职能序列'];

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, jobs]);

  const handleSelectJob = (job: InternalJob) => {
    setSelectedJob(job);
    setViewStep('details');
  };

  const handleGoToUpload = () => {
    setViewStep('upload');
  };

  const handleConfirmApply = () => {
    if (!selectedJob) return;

    if (!window.confirm(`您确定要提交对 [${selectedJob.title}] 岗位的投递申请吗？\n提交后招聘负责人将收到您的简历。`)) {
      return;
    }

    setIsApplying(true);
    
    setTimeout(() => {
      setJobs(prev => prev.map(j => j.id === selectedJob.id ? { ...j, applied: true } : j));
      setSelectedJob({ ...selectedJob, applied: true });
      setIsApplying(false);
      setViewStep('details');
      alert('投递成功！您的简历与申请资料已同步至招聘管理系统。');
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Added explicit File type to the map callback to fix 'unknown' type errors for file.name and file.size properties.
      const newFiles = Array.from(e.target.files).map((file: File) => ({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
      }));
      
      setUploadedFiles(prev => {
        const combined = [...prev, ...newFiles];
        if (combined.length > 5) {
          alert('最多支持上传 5 个附件');
          return combined.slice(0, 5);
        }
        return combined;
      });
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const renderListView = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg overflow-hidden relative">
         <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold mb-1 flex items-center">
              <Sparkles className="mr-2" /> 探索内部职业机遇
            </h2>
         </div>
         <div className="absolute top-0 right-0 p-6 opacity-10 transform scale-150 translate-x-1/4 -translate-y-1/4">
            <Layers size={200} />
         </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
         <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
               type="text" 
               placeholder="搜索职位名称、部门、职责关键词..."
               className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm overflow-x-auto no-scrollbar">
               {categories.map(cat => (
                  <button
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                       selectedCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                     }`}
                  >
                     {cat === 'All' ? '全部' : cat}
                  </button>
               ))}
            </div>

            <div className="flex bg-gray-100 rounded-xl p-1 shadow-inner shrink-0">
               <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                  title="卡片视图"
               >
                  <LayoutGrid size={18} />
               </button>
               <button 
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                  title="表格视图"
               >
                  <TableIcon size={18} />
               </button>
               <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                  title="列表组件视图"
               >
                  <ListIcon size={18} />
               </button>
            </div>
         </div>
      </div>

      {viewMode === 'grid' && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredJobs.length > 0 ? (
               filteredJobs.map(job => (
                  <div 
                     key={job.id} 
                     className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 cursor-pointer group flex flex-col h-full"
                     onClick={() => handleSelectJob(job)}
                  >
                     <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                           <Briefcase size={24} />
                        </div>
                        {job.applied && (
                           <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center border border-green-200">
                              <CheckCircle2 size={12} className="mr-1"/> 已申请
                           </span>
                        )}
                     </div>
                     
                     <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                     
                     <div className="flex flex-wrap gap-y-2 gap-x-4 text-base text-gray-600 mb-4 font-medium">
                        <span className="flex items-center"><Building size={16} className="mr-2 text-blue-500" /> {job.department.split(' ')[0]}</span>
                        <span className="flex items-center"><MapPin size={16} className="mr-2 text-blue-500" /> {job.location}</span>
                     </div>

                     <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-6 flex-1">
                        {job.description}
                     </p>

                     <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                        <span className="text-sm text-gray-500 font-medium">发布日期: {job.postDate}</span>
                        <div className="text-blue-600 text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">
                           查看明细 <ChevronRight size={16} className="ml-1" />
                        </div>
                     </div>
                  </div>
               ))
            ) : renderEmpty()}
         </div>
      )}

      {viewMode === 'table' && (
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-50/80 text-gray-500 font-bold uppercase tracking-wider text-[11px] border-b border-gray-100">
                     <tr>
                        <th className="p-5 pl-6">职位名称</th>
                        <th className="p-5">所属部门</th>
                        <th className="p-5">工作地点</th>
                        <th className="p-5">需求人数</th>
                        <th className="p-5">职级</th>
                        <th className="p-5">发布时间</th>
                        <th className="p-5 text-right pr-6">操作</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {filteredJobs.length > 0 ? filteredJobs.map(job => (
                        <tr key={job.id} className="hover:bg-blue-50/20 transition-colors group cursor-pointer" onClick={() => handleSelectJob(job)}>
                           <td className="p-5 pl-6">
                              <div className="flex items-center gap-2">
                                 <span className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{job.title}</span>
                                 {job.applied && <CheckCircle2 size={14} className="text-green-500" />}
                              </div>
                           </td>
                           <td className="p-5 text-gray-600">{job.department}</td>
                           <td className="p-5 text-gray-600">{job.location}</td>
                           <td className="p-5 text-gray-600 font-mono">{job.headcount} 人</td>
                           <td className="p-5">
                              <span className="px-2 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200">{job.level}</span>
                           </td>
                           <td className="p-5 text-gray-400 font-mono">{job.postDate}</td>
                           <td className="p-5 text-right pr-6">
                              <button className="text-blue-600 font-bold hover:underline flex items-center justify-end ml-auto">
                                 详情 <ChevronRight size={14} className="ml-1" />
                              </button>
                           </td>
                        </tr>
                     )) : (
                        <tr><td colSpan={7}>{renderEmpty()}</td></tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      )}

      {viewMode === 'list' && (
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-50">
               {filteredJobs.length > 0 ? filteredJobs.map(job => (
                  <div 
                     key={job.id} 
                     className="p-5 hover:bg-blue-50/10 active:bg-blue-50/20 transition-colors cursor-pointer group"
                     onClick={() => handleSelectJob(job)}
                  >
                     <div className="flex items-start justify-between">
                        <div className="flex items-center">
                           <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mr-4 shadow-sm border border-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-all">
                              <Briefcase size={24} />
                           </div>
                           <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                 <span className="font-bold text-gray-900 text-lg truncate group-hover:text-blue-600 transition-colors">{job.title}</span>
                                 {job.applied && (
                                    <span className="bg-green-50 text-green-600 text-[10px] font-bold px-1.5 py-0.5 rounded border border-green-100">已申请</span>
                                 )}
                              </div>
                              <div className="text-sm text-gray-600 font-medium flex items-center gap-3">
                                 <span className="flex items-center"><Building size={14} className="mr-1 opacity-70"/> {job.department}</span>
                                 <span className="mx-1 text-gray-200">|</span>
                                 <span className="flex items-center"><MapPin size={14} className="mr-1 opacity-70"/> {job.location}</span>
                              </div>
                           </div>
                        </div>
                        <button className="p-2 text-gray-300 hover:text-blue-600 group-hover:text-blue-400 transition-colors">
                           <ChevronRight size={24} />
                        </button>
                     </div>
                     
                     <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-50">
                        <div className="flex flex-col">
                           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">岗位序列</span>
                           <span className="text-[13px] text-gray-700 font-bold">{job.category}</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">职位等级</span>
                           <span className="text-[13px] text-blue-600 font-bold">{job.level}</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">招聘人数</span>
                           <span className="text-[13px] text-gray-700 font-bold">{job.headcount} 人</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">发布时间</span>
                           <span className="text-[13px] text-gray-700 font-bold font-mono">{job.postDate}</span>
                        </div>
                     </div>
                  </div>
               )) : renderEmpty()}
            </div>
         </div>
      )}
    </div>
  );

  const renderEmpty = () => (
     <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400 bg-white rounded-2xl border border-gray-100 border-dashed w-full">
        <Search size={48} className="mb-4 opacity-20" />
        <p className="text-lg font-medium">未找到符合条件的岗位</p>
        <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="mt-2 text-blue-600 hover:underline">清除搜索条件</button>
     </div>
  );

  const renderDetailView = () => {
    if (!selectedJob) return null;
    return (
       <div className="animate-fade-in max-w-4xl mx-auto pb-12">
          <button 
             onClick={() => setViewStep('list')}
             className="flex items-center text-gray-500 hover:text-gray-800 text-sm mb-6 transition-colors font-bold"
          >
             <ArrowLeft size={16} className="mr-1.5" /> 返回岗位列表
          </button>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-8 border-b border-gray-50 bg-gray-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                   <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{selectedJob.title}</h1>
                   <div className="flex flex-wrap gap-y-3 gap-x-8 text-[15px] font-bold text-gray-700">
                      <span className="flex items-center"><MapPin size={18} className="mr-2 text-blue-600"/> {selectedJob.location}</span>
                      <span className="flex items-center"><Calendar size={18} className="mr-2 text-blue-600"/> 发布日期: {selectedJob.postDate}</span>
                   </div>
                </div>
                {!selectedJob.applied && (
                  <button 
                    onClick={handleGoToUpload}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold transition-all shadow-md flex items-center shrink-0 hover:bg-blue-700 active:scale-95"
                  >
                    <Send size={18} className="mr-2"/> 立即申请
                  </button>
                )}
                {selectedJob.applied && (
                  <div className="px-8 py-3 bg-green-50 text-green-600 border border-green-200 rounded-xl font-bold flex items-center shrink-0">
                    <CheckCircle2 size={20} className="mr-2"/> 已提交申请
                  </div>
                )}
             </div>

             <div className="p-8 md:p-12 space-y-10">
                <section>
                   <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <div className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></div>
                      部门
                   </h3>
                   <div className="text-gray-700 leading-loose text-lg font-medium bg-blue-50/30 p-6 rounded-xl border border-blue-50/50 flex items-center">
                      <Building size={20} className="mr-3 text-blue-600" />
                      {selectedJob.department}
                   </div>
                </section>

                <section>
                   <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <div className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></div>
                      岗位职责
                   </h3>
                   <p className="text-gray-700 leading-loose text-lg font-medium bg-blue-50/30 p-6 rounded-xl border border-blue-50/50">
                      {selectedJob.description}
                   </p>
                </section>

                <section>
                   <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <div className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></div>
                      任职要求
                   </h3>
                   <ul className="space-y-4">
                      {selectedJob.requirements.map((req, idx) => (
                         <li key={idx} className="flex items-start text-gray-700 leading-relaxed text-lg font-medium">
                            <div className="mt-2.5 mr-3 w-2 h-2 rounded-full bg-blue-400 shrink-0"></div>
                            {req}
                         </li>
                      ))}
                   </ul>
                </section>
             </div>
          </div>
       </div>
    );
  };

  const renderUploadView = () => {
    if (!selectedJob) return null;
    return (
      <div className="animate-fade-in max-w-4xl mx-auto pb-12">
        <button 
          onClick={() => setViewStep('details')}
          className="flex items-center text-gray-500 hover:text-gray-800 text-sm mb-6 transition-colors font-bold"
        >
          <ChevronLeft size={16} className="mr-1.5" /> 返回岗位详情
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 bg-blue-50/30">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">简历与申请附件上传</h1>
            <p className="text-sm text-blue-600 font-medium flex items-center">
              <Briefcase size={14} className="mr-1.5" /> 正在申请：{selectedJob.title}
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            {/* Upload Area */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">上传简历附件 <span className="text-red-500">*</span></label>
              <div className="relative group">
                <input 
                  type="file" 
                  multiple
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  accept=".pdf,.doc,.docx"
                />
                <div className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all ${
                  uploadedFiles.length > 0 ? 'border-blue-300 bg-blue-50/10' : 'border-gray-200 group-hover:border-blue-300 bg-gray-50/50'
                }`}>
                  <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={40} />
                  </div>
                  <div className="text-center">
                    <p className="text-base font-bold text-gray-800 mb-1">点击或拖拽文件到此处</p>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed">支持 PDF, Word 格式，文件大小不超过 10MB</p>
                    <p className="text-xs text-blue-600 font-bold mt-2">温馨提示：最多上传5个附件</p>
                  </div>
                </div>
              </div>
              
              {/* Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-3">
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl animate-fade-in">
                      <div className="flex items-center min-w-0">
                        <File className="text-blue-500 mr-3 shrink-0" size={20} />
                        <div className="truncate">
                          <p className="text-sm font-bold text-gray-800 truncate">{file.name}</p>
                          <p className="text-[10px] text-gray-400 font-medium">文件大小: {file.size}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFile(idx)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleConfirmApply}
                disabled={uploadedFiles.length === 0 || isApplying}
                className={`flex-1 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center active:scale-95 ${
                  uploadedFiles.length === 0 || isApplying
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isApplying ? (
                  <><Loader2 size={18} className="mr-2 animate-spin"/> 正在提交...</>
                ) : (
                  <><CheckCircle2 size={18} className="mr-2"/> 确认投递申请</>
                )}
              </button>
              <button 
                onClick={() => setViewStep('details')}
                className="px-8 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all"
              >
                返回
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans">
       {viewStep === 'list' && renderListView()}
       {viewStep === 'details' && renderDetailView()}
       {viewStep === 'upload' && renderUploadView()}
    </div>
  );
};
