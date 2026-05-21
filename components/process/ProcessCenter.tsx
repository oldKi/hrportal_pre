import React, { useState } from 'react';
import { 
  GitPullRequest, 
  CheckCircle, 
  Clock, 
  FileText, 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  BarChart3,
  X,
  Info,
  Briefcase,
  Shield,
  ClipboardList,
  // Added missing Layers icon import
  Layers,
  Bell,
  Eye,
  CheckSquare
} from 'lucide-react';
import { NewProcessModal } from './NewProcessModal';
import { BPMTask, PROCESS_CATEGORIES } from './types';
import mockTasksData from './mock.json';

const MOCK_TASKS: BPMTask[] = mockTasksData as BPMTask[];

export const ProcessCenter: React.FC<{ initialTab?: 'todo' | 'done' | 'cc' | 'created' }> = ({ initialTab }) => {
  const [tasks, setTasks] = useState<BPMTask[]>(MOCK_TASKS);
  const [activeTab, setActiveTab] = useState<'todo' | 'done' | 'cc' | 'created'>(initialTab && ['todo', 'done', 'cc', 'created'].includes(initialTab) ? (initialTab as 'todo' | 'done' | 'cc' | 'created') : 'todo');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'services' | 'tasks'>('services');

  // Filter states
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTitle, setFilterTitle] = useState('');
  const [filterApplicant, setFilterApplicant] = useState('');
  const [filterContent, setFilterContent] = useState('');
  const [filterSource, setFilterSource] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(10);

  const renderStatus = (status: BPMTask['status']) => {
    switch (status) {
      case 'Pending': return <span className="px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-600 border border-blue-100">直线经理确认</span>;
      case 'InProgress': return <span className="px-2 py-0.5 rounded text-xs bg-amber-50 text-amber-600 border border-amber-100">进行中</span>;
      case 'Completed': return <span className="px-2 py-0.5 rounded text-xs bg-green-50 text-green-600 border border-green-100">办结</span>;
      case 'Rejected': return <span className="px-2 py-0.5 rounded text-xs bg-red-50 text-red-600 border border-red-100">已驳回</span>;
    }
  };

  const handleTaskClick = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, isRead: true } : t));
  };

  const filteredTasks = tasks.filter(task => {
    let matchesTab = true;
    if (activeTab === 'todo') matchesTab = task.status === 'Pending';
    else if (activeTab === 'done') matchesTab = task.status === 'Completed' || task.status === 'Rejected';
    else if (activeTab === 'cc') matchesTab = task.status !== 'Pending';
    else if (activeTab === 'created') matchesTab = task.status !== 'Completed';
    
    const matchesCategory = !selectedCategoryId || task.categoryId === selectedCategoryId;
    
    const matchesSearch = !searchQuery || 
      (task.title && task.title.includes(searchQuery)) || 
      (task.applicant && task.applicant.includes(searchQuery)) || 
      (task.processName && task.processName.includes(searchQuery));

    const matchesFilterTitle = !filterTitle || task.title.includes(filterTitle);
    const matchesFilterApplicant = !filterApplicant || (task.applicant && task.applicant.includes(filterApplicant));
    const matchesFilterContent = !filterContent || (task.content && task.content.includes(filterContent));
    const matchesFilterSource = !filterSource || (task.processName && task.processName.includes(filterSource));
    const matchesFilterCategory = !filterCategory || (task.category && task.category.includes(filterCategory));
    
    return matchesTab && matchesCategory && matchesSearch && matchesFilterTitle && matchesFilterApplicant && matchesFilterContent && matchesFilterSource && matchesFilterCategory;
  });

  // Pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <GitPullRequest className="mr-3 text-blue-600" />
            待办中心
          </h2>
        </div>
        
        {/* Mobile View Toggle */}
        <div className="md:hidden flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm w-full">
          <button 
            onClick={() => setMobileView('services')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mobileView === 'services' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
          >
            服务分类
          </button>
          <button 
            onClick={() => setMobileView('tasks')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mobileView === 'tasks' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
          >
            我的事项
          </button>
        </div>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:flex bg-white rounded-xl shadow-sm border border-gray-100 p-2 gap-2 mb-6">
        {[
          { id: 'todo', label: '待办', icon: <Clock size={14} />, count: tasks.filter(t => t.status === 'Pending').length },
          { id: 'done', label: '已办', icon: <CheckCircle size={14} />, count: tasks.filter(t => t.status === 'Completed' || t.status === 'Rejected').length },
          { id: 'cc', label: '知会', icon: <Bell size={14} />, count: tasks.filter(t => t.status !== 'Pending').length },
          { id: 'created', label: '创建', icon: <CheckSquare size={14} />, count: tasks.filter(t => t.status !== 'Completed').length },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id as any); setSelectedCategoryId(null); setCurrentPage(1); }}
            className={`group flex-1 flex flex-col items-center justify-center py-3 px-4 transition-all rounded-xl border-2 ${
              activeTab === tab.id 
                ? 'bg-blue-50 border-blue-200 shadow-sm' 
                : 'border-transparent hover:bg-gray-50'
            }`}
          >
            <div className={`w-12 h-12 flex items-center justify-center shrink-0 font-black text-xl rounded-xl shadow-sm mb-0 transition-all ${
              activeTab === tab.id 
                ? (tab.id === 'todo' ? 'bg-[#ff4d4f] text-white scale-110 shadow-red-100' : 
                   tab.id === 'cc' ? 'bg-[#ffa940] text-white scale-110 shadow-orange-100' : 
                   tab.id === 'created' ? 'bg-[#1890ff] text-white scale-110 shadow-blue-100' : 
                   'bg-[#52c41a] text-white scale-110 shadow-emerald-100')
                : (tab.id === 'todo' ? 'bg-red-50 text-[#ff4d4f] border border-red-100' : 
                   tab.id === 'cc' ? 'bg-orange-50 text-[#ffa940] border border-orange-100' : 
                   tab.id === 'created' ? 'bg-blue-50 text-[#1890ff] border border-blue-100' : 
                   'bg-green-50 text-[#52c41a] border border-green-100')
            }`}>
              {tab.count}
            </div>
            <div className={`flex flex-col items-center transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'opacity-100 max-h-12 mt-2 translate-y-0' 
                  : 'opacity-0 max-h-0 translate-y-2 group-hover:opacity-100 group-hover:max-h-12 group-hover:mt-2 group-hover:translate-y-0'
            }`}>
              <div className="flex items-center gap-1">
                <span className={`text-[13px] font-bold ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-500'}`}>{tab.label}</span>
                <span className={`${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400 opacity-50'}`}>{tab.icon}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Mobile Services Landing Page (Matching Screenshot App Center) */}
      {mobileView === 'services' && (
        <div className="md:hidden space-y-6 animate-fade-in">
           <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="grid grid-cols-2 gap-4">
                 {PROCESS_CATEGORIES.map(cat => (
                    <button 
                       key={cat.id}
                       onClick={() => { setSelectedCategoryId(cat.id); setMobileView('tasks'); }}
                       className="bg-white rounded-2xl border border-gray-50 p-6 flex flex-col items-center justify-center text-center shadow-sm active:bg-blue-50 transition-all border-dashed border-2"
                    >
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${cat.color || 'bg-blue-50 text-blue-600'}`}>
                          <Layers size={24} />
                       </div>
                       <span className="font-bold text-gray-800 text-sm mb-1">{cat.name}</span>
                       <span className="text-[10px] text-gray-600 font-black">{tasks.filter(t => t.categoryId === cat.id && t.status === 'Pending').length} 项待办</span>
                    </button>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* Main Task List (Visible on Desktop always, or Mobile when tasks selected) */}
      {(mobileView === 'tasks' || typeof window === 'undefined' || window.innerWidth >= 768) && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50/30">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="搜索标题 / 申请人..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                {selectedCategoryId && (
                   <button 
                      onClick={() => setSelectedCategoryId(null)}
                      className="flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-200 transition-colors"
                   >
                      {PROCESS_CATEGORIES.find(c => c.id === selectedCategoryId)?.name}
                      <X size={14} className="ml-2"/>
                   </button>
                )}
                <button 
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white shadow-sm"
                >
                  <Filter size={16} className="mr-2" /> 更多筛选
                </button>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto min-h-[300px]">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50/80 text-gray-500 font-medium">
                  <tr>
                    <th className="p-4 pl-6 uppercase tracking-wider text-[11px] font-bold">标题</th>
                    <th className="p-4 uppercase tracking-wider text-[11px] font-bold">申请人</th>
                    <th className="p-4 uppercase tracking-wider text-[11px] font-bold">内容</th>
                    <th className="p-4 uppercase tracking-wider text-[11px] font-bold">来源</th>
                    <th className="p-4 uppercase tracking-wider text-[11px] font-bold">分类</th>
                    <th className="p-4 uppercase tracking-wider text-[11px] font-bold">时间</th>
                    {(activeTab !== 'cc' && activeTab !== 'created') && (
                      <th className="p-4 text-right pr-6 uppercase tracking-wider text-[11px] font-bold">操作</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentTasks.length > 0 ? currentTasks.map(task => (
                    <tr key={task.id} className="hover:bg-blue-50/20 transition-colors group cursor-pointer" onClick={() => handleTaskClick(task.id)}>
                      <td className="p-4 pl-6 font-bold text-gray-800">
                        <div className="flex items-center">
                          <span className="truncate">{task.title}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-800">{task.applicant}</td>
                      <td className="p-4 text-xs text-gray-500 truncate max-w-xs" title={task.content}>{task.content}</td>
                      <td className="p-4 text-gray-600">{task.processName}</td>
                      <td className="p-4 text-gray-600">{task.category}</td>
                      <td className="p-4 text-gray-600 text-xs">{task.requestTime}</td>
                      {(activeTab !== 'cc' && activeTab !== 'created') && (
                        <td className="p-4 text-right pr-6">
                          {activeTab !== 'done' && (
                            <button className="text-blue-600 font-bold hover:underline flex items-center justify-end ml-auto group-hover:translate-x-1 transition-transform">
                              {activeTab === 'todo' ? '马上办理' : '查看明细'} <ChevronRight size={14} className="ml-1" />
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={activeTab === 'cc' ? 6 : 7} className="py-24 text-center text-gray-400">
                        <div className="flex flex-col items-center">
                           <div className="p-5 bg-gray-50 rounded-full inline-block mb-4 shadow-inner">
                             <FileText size={48} className="opacity-10" />
                           </div>
                           <p className="text-sm font-medium">暂无流程数据</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile List Widget View */}
            <div className="md:hidden block min-h-[300px]">
               <div className="grid grid-cols-12 px-4 py-3 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase border-b border-gray-100">
                  <div className="col-span-5">标题</div>
                  <div className="col-span-5 text-center">内容</div>
                  <div className="col-span-2 text-right">分类</div>
               </div>
               
               <div className="divide-y divide-gray-50">
                 {currentTasks.length > 0 ? currentTasks.map(task => (
                    <div key={task.id} className="grid grid-cols-12 px-4 py-4 items-center hover:bg-blue-50/10 active:bg-blue-50/20 transition-colors cursor-pointer" onClick={() => handleTaskClick(task.id)}>
                       <div className="col-span-5 pr-2">
                          <div className="text-[13px] font-bold text-gray-800 leading-tight truncate flex items-center" title={task.title}>
                            <span className="truncate">{task.title}</span>
                          </div>
                          <div className="text-[10px] text-gray-400 mt-0.5 truncate">{task.processName}</div>
                       </div>
                       <div className="col-span-5 text-[11px] text-gray-500 line-clamp-2 px-2" title={task.content}>
                          {task.content}
                       </div>
                       <div className="col-span-2 text-right">
                         <div className="text-[11px] text-gray-600">{task.category}</div>
                         <div className="text-[9px] text-gray-400 mt-0.5">{task.requestTime.split(' ')[0]}</div>
                       </div>
                    </div>
                 )) : (
                    <div className="py-20 text-center text-gray-400">
                       <p className="text-xs">暂无流程数据</p>
                    </div>
                 )}
               </div>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                共 {filteredTasks.length} 条记录
              </div>
              <div className="flex items-center space-x-4">
                <select 
                  value={tasksPerPage} 
                  onChange={(e) => { setTasksPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value={10}>10 条/页</option>
                  <option value={50}>50 条/页</option>
                  <option value={100}>100 条/页</option>
                </select>
                {totalPages > 1 && (
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-1.5 rounded border border-gray-300 text-gray-500 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-7 h-7 rounded text-sm font-medium transition-colors ${
                            currentPage === page 
                              ? 'bg-blue-600 text-white' 
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded border border-gray-300 text-gray-500 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <NewProcessModal isOpen={isNewModalOpen} onClose={() => setIsNewModalOpen(false)} />

      {/* Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsFilterDrawerOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-fade-in">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <Filter className="mr-2 text-blue-600" size={20} />
                更多筛选
              </h3>
              <button 
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">标题</label>
                <input 
                  type="text" 
                  value={filterTitle}
                  onChange={(e) => setFilterTitle(e.target.value)}
                  placeholder="请输入标题"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">申请人</label>
                <input 
                  type="text" 
                  value={filterApplicant}
                  onChange={(e) => setFilterApplicant(e.target.value)}
                  placeholder="请输入申请人姓名"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">内容</label>
                <input 
                  type="text" 
                  value={filterContent}
                  onChange={(e) => setFilterContent(e.target.value)}
                  placeholder="请输入内容"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">来源</label>
                <input 
                  type="text" 
                  value={filterSource}
                  onChange={(e) => setFilterSource(e.target.value)}
                  placeholder="请输入来源"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
                <input 
                  type="text" 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  placeholder="请输入分类"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 flex space-x-4 bg-gray-50">
              <button 
                onClick={() => {
                  setFilterTitle('');
                  setFilterApplicant('');
                  setFilterContent('');
                  setFilterSource('');
                  setFilterCategory('');
                }}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors bg-white"
              >
                重置
              </button>
              <button 
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};